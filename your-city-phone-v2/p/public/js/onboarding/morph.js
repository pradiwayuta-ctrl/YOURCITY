import { stage, sleep, frame } from '../core/motion.js';
import { buildLock } from './lockscreen.js';

export async function morphToLock(state) {
  const lock = buildLock(state);
  lock.style.opacity = 0;
  const screen = state.ktpEl;
  const card = screen.querySelector('.ktp');
  const r = card.getBoundingClientRect();
  const s = stage().getBoundingClientRect();
  screen.classList.add('morph');
  Object.assign(card.style, { left: r.left - s.left + 'px', top: r.top - s.top + 'px',
    width: r.width + 'px', height: r.height + 'px', transform: 'none', transition: 'none' });
  card.classList.add('morphing');
  await frame();
  card.style.transition = '';
  Object.assign(card.style, { left: 0, top: 0, width: '100%', height: '100%' });
  await sleep(700);
  lock.style.transition = 'opacity .5s';
  lock.style.opacity = 1;
  await sleep(600);
  screen.remove();
  state.lockEl = lock;
}
