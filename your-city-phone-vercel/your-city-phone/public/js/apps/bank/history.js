import { rp, esc, when } from '../../core/format.js';

const META = { salary: ['💼', 1], transfer_in: ['⬇️', 1], transfer_out: ['⬆️', -1], tax: ['🧾', -1] };

export function renderHistory(el, list) {
  el.innerHTML = list.length ? list.map((t) => {
    const [ic, sign] = META[t.kind] || ['•', 1];
    return `<div class="row"><i>${ic}</i><div><b>${esc(t.note || t.kind)}</b><small>${when(t.created_at)}</small></div>
      <span class="${sign > 0 ? 'in' : 'out'}">${sign > 0 ? '+' : '-'}${rp(t.amount)}</span></div>`;
  }).join('') : '<p class="empty-note">Belum ada transaksi. Ambil pekerjaan lalu klaim gaji pertamamu.</p>';
}
