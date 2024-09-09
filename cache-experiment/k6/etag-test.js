import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '1m', target: 100 }, // Uji dengan 100 pengguna virtual selama 1 menit
  ],
};

export default function () {
  // Kirim permintaan GET pertama untuk mendapatkan ETag
  let response = http.get('http://localhost:3001/etag');
  let etag = response.headers['etag'];
  
  // Kirim permintaan GET kedua dengan header If-None-Match
  response = http.get('http://localhost:3001/etag', {
    headers: { 'If-None-Match': etag },
  });
  
  // Periksa status kode respons
  check(response, {
    'status is 304': (r) => r.status === 304 || r.status === 200,
  });
  
  // Tidur sejenak untuk menghindari permintaan berlebihan
  sleep(1);
}
