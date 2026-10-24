export const game = {
  tz: process.env.TIMEZONE || 'Asia/Jakarta',
  startBalance: 500000,
  taxThreshold: 5000000,  // pajak hanya untuk saldo di atas ini
  taxRate: 0.02,          // 2% dari kelebihannya, 1x per minggu
  minTransfer: 1000,
  jobs: [
    { id: 'kurir', name: 'Kurir', icon: '🛵', salary: 150000 },
    { id: 'kasir', name: 'Kasir', icon: '🧾', salary: 200000 },
    { id: 'barista', name: 'Barista', icon: '☕', salary: 250000 },
    { id: 'staf', name: 'Staf Kantor', icon: '💼', salary: 350000 },
  ],
};
