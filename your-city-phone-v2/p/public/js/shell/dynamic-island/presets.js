const rp = (n) => 'Rp ' + Number(n).toLocaleString('id-ID');

// Tambah jenis notifikasi baru = tambah 1 baris di sini
export const presets = {
  welcome: (d) => ({ icon: '👋', title: 'Selamat datang kembali', text: d.name }),
  salary:  (d) => ({ icon: '💰', title: 'Gaji masuk', text: '+' + rp(d.amount) }),
  tax:     (d) => ({ icon: '🧾', title: 'Pajak mingguan', text: '-' + rp(d.amount) }),
  message: (d) => ({ icon: '💬', title: d.from, text: d.text }),
  news:    (d) => ({ icon: '📰', title: 'Berita terbaru', text: d.headline, ms: 5000 }),
  levelup: (d) => ({ icon: '⭐', title: 'Naik level!', text: 'Sekarang level ' + d.level }),
};
export const demo = [
  ['salary', { amount: 250000 }], ['message', { from: 'Dina', text: 'Ketemu di taman jam 7?' }],
  ['news', { headline: 'Festival senja digelar akhir pekan ini' }], ['levelup', { level: 2 }],
];
