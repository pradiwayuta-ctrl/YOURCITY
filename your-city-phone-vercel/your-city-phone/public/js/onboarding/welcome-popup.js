import { stage, sleep, frame } from '../core/motion.js';
import { haptic } from '../core/telegram.js';

export async function showWelcome(state) {
  const el = document.createElement('div');
  el.className = 'welcome';
  el.innerHTML = `<div class="sheet"><h2>Selamat datang di ${state.city}!</h2>
    <p>${state.citizen.full_name}, KTP kamu sudah aktif. Selamat memulai hidup baru di sini.</p>
    <button>Mulai</button></div>`;
  stage().appendChild(el);
  await frame();
  el.classList.add('show');
  haptic('medium');
  await new Promise((r) => el.querySelector('button').addEventListener('click', r, { once: true }));
  el.classList.remove('show');
  await sleep(500);
  el.remove();
}
