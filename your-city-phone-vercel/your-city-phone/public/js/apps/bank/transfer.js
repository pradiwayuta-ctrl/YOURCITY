import { api } from '../../core/api.js';
import { haptic } from '../../core/telegram.js';

export function openTransfer(body, onDone) {
  const sheet = document.createElement('div');
  sheet.className = 'tsheet';
  sheet.innerHTML = `<h3>Kirim uang</h3>
    <input id="ph" inputmode="numeric" placeholder="Nomor HP RP penerima (0812…)">
    <input id="am" inputmode="numeric" placeholder="Jumlah (Rp)">
    <p class="err"></p>
    <div class="two"><button class="ghost">Batal</button><button class="go">Kirim</button></div>`;
  body.appendChild(sheet);
  requestAnimationFrame(() => sheet.classList.add('show'));
  const close = () => { sheet.classList.remove('show'); setTimeout(() => sheet.remove(), 400); };
  sheet.querySelector('.ghost').onclick = close;
  sheet.querySelector('.go').onclick = async (e) => {
    const btn = e.currentTarget, msg = sheet.querySelector('.err');
    btn.disabled = true; msg.textContent = '';
    try {
      const res = await api('/bank/transfer', { phone: sheet.querySelector('#ph').value, amount: sheet.querySelector('#am').value });
      haptic('medium'); close(); onDone(res);
    } catch (er) { msg.textContent = er.message; btn.disabled = false; }
  };
}
