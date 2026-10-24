export const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
export const sleep = (ms) => new Promise((r) => setTimeout(r, reduced ? 0 : ms));
export const frame = () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
export const stage = () => document.getElementById('stage');

export function mount(html, cls) {
  const el = document.createElement('div');
  el.className = 'screen ' + cls;
  el.innerHTML = html;
  stage().appendChild(el);
  return el;
}
