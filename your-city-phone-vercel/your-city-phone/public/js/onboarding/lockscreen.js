import { mount, sleep } from '../core/motion.js';
import { haptic } from '../core/telegram.js';

const tz = 'Asia/Jakarta';
function phase() {
  const h = +new Intl.DateTimeFormat('en', { hour: 'numeric', hour12: false, timeZone: tz }).format(new Date());
  return h >= 19 || h < 5 ? 'night' : h >= 9 && h < 15 ? 'day' : '';
}
const clock = () => new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', timeZone: tz }).replace('.', ':');
const date = () => new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', timeZone: tz });

export function buildLock() {
  const el = mount(`<div class="sun"></div><div class="sea"></div>
    <time></time><div class="date">${date()}</div><div class="hint">Geser ke atas untuk membuka</div>`, 'lock ' + phase());
  const t = el.querySelector('time');
  const tick = () => (t.textContent = clock());
  tick();
  el._timer = setInterval(tick, 10000);
  return el;
}

export function waitUnlock(state) {
  const el = state.lockEl;
  let y0 = null;
  return new Promise((resolve) => {
    const open = async () => {
      clearInterval(el._timer);
      haptic('light');
      el.style.transform = 'translateY(-100%)';
      await sleep(600);
      el.remove();
      resolve();
    };
    el.addEventListener('pointerdown', (e) => (y0 = e.clientY));
    el.addEventListener('pointerup', (e) => { if (y0 !== null && y0 - e.clientY > 90) open(); y0 = null; });
    el.addEventListener('click', (e) => { if (e.detail && y0 === null && !el._dragged) { /* tap tidak membuka */ } });
    el.querySelector('.hint').addEventListener('click', open);
  });
}
