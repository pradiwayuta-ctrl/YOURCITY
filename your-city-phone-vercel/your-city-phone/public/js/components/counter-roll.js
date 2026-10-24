import { rp } from '../core/format.js';
import { reduced } from '../core/motion.js';

export function roll(el, from, to, ms = 900) {
  if (reduced || from === to) { el.textContent = rp(to); return; }
  const t0 = performance.now();
  const step = (t) => {
    const p = Math.min(1, (t - t0) / ms);
    el.textContent = rp(Math.round(from + (to - from) * (1 - Math.pow(1 - p, 3))));
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
