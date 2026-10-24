import { stage, sleep, frame } from '../../core/motion.js';
import { haptic } from '../../core/telegram.js';
import { on } from '../../core/eventbus.js';
import { presets, demo } from './presets.js';
import { createQueue } from './queue.js';

let el, i = 0;

async function run(n) {
  el.querySelector('.ic').textContent = n.icon;
  el.querySelector('b').textContent = n.title;
  el.querySelector('span').textContent = n.text;
  el.classList.add('open');
  haptic('medium');
  await sleep(n.ms || 3200);
  el.classList.remove('open');
  await sleep(500);
}
const enqueue = createQueue(run);

export function notify(type, data) {
  const make = presets[type];
  if (make) enqueue(make(data));
}

export function initIsland() {
  el = document.createElement('div');
  el.className = 'island';
  el.innerHTML = '<i class="ic"></i><div><b></b><span></span></div>';
  stage().appendChild(el);
  on('island:notify', ({ type, data }) => notify(type, data));
  // sementara untuk uji: ketuk pil untuk lihat contoh notifikasi
  el.addEventListener('click', () => { const [t, d] = demo[i++ % demo.length]; notify(t, d); });
  frame();
}
