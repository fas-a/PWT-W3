import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 10, // Jumlah virtual users
  duration: '1m', // Durasi pengujian
};

export default function () {
  // Endpoint autentikasi stateful
  let res = http.post('http://localhost:3000/auth/stateful', JSON.stringify({}), {
    headers: { 'Content-Type': 'application/json' },
  });

  // Mengecek apakah respons memiliki status 200
  check(res, { 'status was 200': (r) => r.status === 200 });

  sleep(1); // Menunggu selama 1 detik antara permintaan
}