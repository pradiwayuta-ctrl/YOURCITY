// Antrean: satu notifikasi tampil pada satu waktu, tidak tumpang tindih
export function createQueue(run) {
  const items = [];
  let busy = false;
  async function next() {
    if (busy) return;
    busy = true;
    while (items.length) await run(items.shift());
    busy = false;
  }
  return (item) => { if (items.length < 5) items.push(item); next(); };
}
