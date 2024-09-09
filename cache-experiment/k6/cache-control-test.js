import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '1m', target: 100 }, // Uji dengan 100 pengguna virtual selama 1 menit
  ],
};

export default function () {
  // Kirim permintaan GET
  let response = http.get('http://localhost:3002/cache-control');
  
  // Periksa header Cache-Control
  check(response, {
    'Cache-Control header is present': (r) => r.headers['Cache-Control'] !== undefined,
  });
  
  // Tidur sejenak untuk menghindari permintaan berlebihan
  sleep(1);
}