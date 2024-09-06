from faker import Faker
import psycopg2

fake = Faker()
conn = psycopg2.connect("dbname=ecommerce_db user=postgres password=123")
cursor = conn.cursor()

# Prepare data in batches
batch_size = 10000
data = []

for _ in range(1000000):
    data.append((
        fake.name(),
        fake.random_element(elements=('Electronics', 'Clothing', 'Food')),
        fake.random_number(digits=2),
        fake.random_int(min=1, max=100)
    ))
    if len(data) >= batch_size:
        cursor.executemany(
            "INSERT INTO products (nama_produk, kategori, harga, stok) VALUES (%s, %s, %s, %s)",
            data
        )
        data = []

# Insert remaining data
if data:
    cursor.executemany(
        "INSERT INTO products (nama_produk, kategori, harga, stok) VALUES (%s, %s, %s, %s)",
        data
    )

conn.commit()
cursor.close()
conn.close()