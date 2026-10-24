import { mount, sleep, frame } from '../core/motion.js';

const FIELDS = [
  ['NIK', 'nik'], ['Nama', 'full_name'], ['Username', 'username'],
  ['Jenis Kel.', 'gender'], ['Terdaftar', 'registered_at'],
  ['Pekerjaan', 'job_title'], ['No. HP RP', 'rp_phone'],
];
const fmt = {
  gender: (v) => (v === 'L' ? 'Laki-laki' : v === 'P' ? 'Perempuan' : '—'),
  registered_at: (v) => new Date(v).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
  username: (v) => (v ? '@' + v : '—'),
};
export const valueOf = (c, k) => (fmt[k] ? fmt[k](c[k]) : c[k] || '—');

export function buildKtp(state) {
  const c = state.citizen;
  const photo = c.photo_url ? `style="background-image:url('${c.photo_url}')"` : '';
  const rows = FIELDS.map(([l, k]) => `<div><b>${l}</b>: <span data-f="${k}"></span></div>`).join('');
  const el = mount(`<div class="ktp">
    <div class="face back">${state.city}</div>
    <div class="face front"><h3><small>KARTU TANDA PENDUDUK</small>KOTA ${state.city.toUpperCase()}</h3>
      <div class="rows">${rows}</div>
      <div class="photo" ${photo}>${photo ? '' : (c.full_name || '?')[0]}</div></div></div>
    <div class="picker"></div>`, 'ktp-screen');
  return el;
}

export async function showKtp(state) {
  state.scanEl?.remove();
  const el = buildKtp(state);
  const card = el.querySelector('.ktp');
  await frame();
  card.classList.add('in');
  await sleep(1000);
  card.classList.add('flip');
  await sleep(900);
  for (const span of el.querySelectorAll('[data-f]')) {
    const text = valueOf(state.citizen, span.dataset.f);
    for (const ch of text) { span.textContent += ch; await sleep(18); }
  }
  state.ktpEl = el;
}
