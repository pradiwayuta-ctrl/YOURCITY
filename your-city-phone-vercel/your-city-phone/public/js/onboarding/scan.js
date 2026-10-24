import { api } from '../core/api.js';
import { tgUser, haptic } from '../core/telegram.js';
import { mount, sleep } from '../core/motion.js';

export async function runScan(state) {
  const name = tgUser?.first_name || 'Dev';
  const photo = tgUser?.photo_url ? `style="background-image:url('${tgUser.photo_url}')"` : '';
  const el = mount(`<div class="ring"><div class="sweep"></div>
    <div class="avatar" ${photo}>${photo ? '' : name[0].toUpperCase()}</div></div>
    <p>Mengenali akun…</p>`, 'scan');
  const [data] = await Promise.all([api('/auth', {}), sleep(2400)]);
  Object.assign(state, data);
  el.classList.add('ok');
  el.querySelector('p').textContent = 'Akun dikenali ✓';
  haptic('medium');
  await sleep(800);
  state.scanEl = el;
}
