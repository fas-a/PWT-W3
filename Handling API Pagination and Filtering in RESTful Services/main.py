from fastapi import FastAPI, Query
import psycopg2

app = FastAPI()

def get_db_connection():
    conn = psycopg2.connect("dbname=ecommerce_db user=postgres password=123")
    return conn

@app.get("/products/")
def get_products(page: int = 1, page_size: int = 10, category: str = None, min_price: float = None, max_price: float = None):
    offset = (page - 1) * page_size
    query = "SELECT * FROM products WHERE 1=1"
    
    # Filtering berdasarkan kategori
    if category:
        query += f" AND kategori = %s"
    
    # Filtering berdasarkan rentang harga
    if min_price is not None:
        query += f" AND harga >= %s"
    if max_price is not None:
        query += f" AND harga <= %s"
    
    query += f" LIMIT %s OFFSET %s"
    
    conn = get_db_connection()
    cur = conn.cursor()
    
    # Menyiapkan parameter untuk query
    params = []
    if category:
        params.append(category)
    if min_price is not None:
        params.append(min_price)
    if max_price is not None:
        params.append(max_price)
    params.extend([page_size, offset])
    
    cur.execute(query, params)
    products = cur.fetchall()
    cur.close()
    conn.close()
    
    return {"data": products, "page": page, "page_size": page_size}

@app.get("/products/no-pagination")
def get_all_products(category: str = None, min_price: float = None, max_price: float = None):
    query = "SELECT * FROM products WHERE 1=1"
    
    # Filtering berdasarkan kategori
    if category:
        query += f" AND kategori = %s"
    
    # Filtering berdasarkan rentang harga
    if min_price is not None:
        query += f" AND harga >= %s"
    if max_price is not None:
        query += f" AND harga <= %s"
    
    conn = get_db_connection()
    cur = conn.cursor()
    
    # Menyiapkan parameter untuk query
    params = []
    if category:
        params.append(category)
    if min_price is not None:
        params.append(min_price)
    if max_price is not None:
        params.append(max_price)
    
    cur.execute(query, params)
    products = cur.fetchall()
    cur.close()
    conn.close()
    return {"data": products}
