import { stage, sleep, frame } from '../core/motion.js';
import { haptic } from '../core/telegram.js';

function transformFrom(rect) {
  const s = stage().getBoundingClientRect();
  return `translate(${rect.left - s.left}px, ${rect.top - s.top}px) scale(${rect.width / s.width}, ${rect.height / s.height})`;
}

export async function openApp(app, iconEl) {
  const win = document.createElement('div');
  win.className = 'app-window';
  win.innerHTML = `<header>${app.name}</header><div class="body"><div class="empty">${app.name} segera hadir</div></div>
    <div class="grab"><div class="bar"></div></div>`;
  const rect = iconEl.getBoundingClientRect();
  win.style.transform = transformFrom(rect);
  win.style.borderRadius = '22%';
  win.style.opacity = 0;
  stage().appendChild(win);
  await frame();
  win.classList.add('anim');
  win.style.transform = 'none';
  win.style.borderRadius = '0';
  win.style.opacity = 1;
  haptic('light');
  enableSwipeClose(win, iconEl);
  if (app.load) {
    const body = win.querySelector('.body');
    try { await (await app.load()).default(body); }
    catch (e) { body.innerHTML = `<div class="empty">${e.message}</div>`; }
  }
}

function enableSwipeClose(win, iconEl) {
  const grab = win.querySelector('.grab');
  let y0 = null;
  const close = async () => {
    haptic('light');
    win.classList.add('anim');
    win.style.transform = transformFrom(iconEl.getBoundingClientRect());
    win.style.borderRadius = '22%';
    win.style.opacity = 0;
    await sleep(560);
    win.remove();
  };
  grab.addEventListener('pointerdown', (e) => { y0 = e.clientY; grab.setPointerCapture(e.pointerId); win.classList.remove('anim'); });
  grab.addEventListener('pointermove', (e) => {
    if (y0 !== null) win.style.transform = `translateY(${Math.max(0, e.clientY - y0)}px)`;
  });
  grab.addEventListener('pointerup', (e) => {
    const d = e.clientY - y0; y0 = null;
    if (d > 80 || d < 6) return close();
    win.classList.add('anim'); win.style.transform = 'none';
  });
}
