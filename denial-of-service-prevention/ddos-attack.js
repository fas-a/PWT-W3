const axios = require('axios');

// Simulasi IP berbeda dengan variabel environment
const ip = process.env.IP || '127.0.0.1';

// Variabel untuk menghitung throughput dan tingkat penolakan
let rejectedRequests = 0;
const totalRequests = 15;
let totalLatency = 0;

const performAttack = async () => {
    const startTime = Date.now(); // Waktu mulai eksekusi
    for (let i = 0; i < totalRequests; i++) {
        const requestStartTime = Date.now(); // Catat waktu mulai untuk setiap permintaan
        try {
            const response = await axios.get('http://localhost:3000', { // Ganti dengan URL proxy server
                headers: { 'X-Forwarded-For': ip }
            });
            const latency = Date.now() - requestStartTime; // Hitung latensi untuk permintaan ini
            totalLatency += latency; // Tambah latensi ke total
            console.log(`Response ${i}:`, response.data, `Latency: ${latency} ms`);
        } catch (err) {
            if (err.response && err.response.status === 429) {
                rejectedRequests++; // Hitung berapa kali permintaan ditolak (status 429)
            }
            console.log(`Error ${i}:`, err.response ? err.response.status : 'No response');
        }
    }
    const endTime = Date.now(); // Waktu selesai eksekusi
    const durationInSeconds = (endTime - startTime) / 1000; // Total waktu dalam detik

    // Menghitung Throughput
    const throughput = (totalRequests - rejectedRequests) / durationInSeconds;
    console.log(`Throughput: ${throughput} requests per second`);

    // Menghitung Latensi Rata-Rata
    const averageLatency = totalLatency / (totalRequests - rejectedRequests);
    console.log(`Average Latency: ${averageLatency} ms`);

    // Menghitung Tingkat Penolakan
    const rejectionRate = (rejectedRequests / totalRequests) * 100;
    console.log(`Tingkat Penolakan: ${rejectionRate}%`);
};

performAttack();

// $env:IP = "192.168.0.1"; Start-Process -NoNewWindow -FilePath "node" -ArgumentList "ddos-attack.js"
// $env:IP = "192.168.0.2"; Start-Process -NoNewWindow -FilePath "node" -ArgumentList "ddos-attack.js"
// $env:IP = "192.168.0.3"; Start-Process -NoNewWindow -FilePath "node" -ArgumentList "ddos-attack.js"
