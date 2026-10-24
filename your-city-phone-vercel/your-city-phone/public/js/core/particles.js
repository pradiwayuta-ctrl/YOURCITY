import { stage, reduced } from './motion.js';

// Koin terbang dari satu elemen ke elemen lain (maks 8 partikel)
export function coinBurst(fromEl, toEl, n = 8) {
  if (reduced) return;
  const s = stage().getBoundingClientRect();
  const a = fromEl.getBoundingClientRect(), b = toEl.getBoundingClientRect();
  const x0 = a.left + a.width / 2 - s.left, y0 = a.top + a.height / 2 - s.top;
  const dx = b.left + b.width / 2 - s.left - x0, dy = b.top + b.height / 2 - s.top - y0;
  for (let i = 0; i < Math.min(n, 8); i++) {
    const c = document.createElement('div');
    c.textContent = '🪙';
    c.style.cssText = `position:absolute;z-index:90;left:${x0}px;top:${y0}px;font-size:22px;pointer-events:none`;
    stage().appendChild(c);
    const sx = (Math.random() - .5) * 120, sy = -40 - Math.random() * 60;
    c.animate([
      { transform: 'translate(0,0) scale(.4)', opacity: 0 },
      { transform: `translate(${sx}px,${sy}px) scale(1)`, opacity: 1, offset: .35 },
      { transform: `translate(${dx}px,${dy}px) scale(.6)`, opacity: .9 },
    ], { duration: 900, delay: i * 70, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'both' })
      .onfinish = () => c.remove();
  }
}
