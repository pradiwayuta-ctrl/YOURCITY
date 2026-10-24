import { api } from '../core/api.js';
import { haptic } from '../core/telegram.js';
import { valueOf } from './ktp-card.js';

export function askGender(state) {
  const picker = state.ktpEl.querySelector('.picker');
  picker.innerHTML = `<button data-g="L">♂ Laki-laki</button><button data-g="P">♀ Perempuan</button>
    <button class="go">Konfirmasi data</button>`;
  picker.classList.add('show');
  let gender = null;
  const go = picker.querySelector('.go');

  return new Promise((resolve) => {
    picker.addEventListener('click', async (e) => {
      const b = e.target.closest('button');
      if (!b) return;
      haptic('light');
      if (b.dataset.g) {
        gender = b.dataset.g;
        picker.querySelectorAll('[data-g]').forEach((x) => x.classList.toggle('on', x === b));
        go.classList.add('ready');
      } else if (gender) {
        go.disabled = true;
        try {
          state.citizen = await api('/citizen/confirm', { gender });
          state.ktpEl.querySelector('[data-f="gender"]').textContent = valueOf(state.citizen, 'gender');
          haptic('medium');
          picker.classList.remove('show');
          resolve();
        } catch (err) { go.disabled = false; go.textContent = err.message; }
      }
    });
  });
}
