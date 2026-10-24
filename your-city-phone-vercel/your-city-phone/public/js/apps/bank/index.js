import { api } from '../../core/api.js';
import { roll } from '../../components/counter-roll.js';
import { esc } from '../../core/format.js';
import { renderHistory } from './history.js';
import { openTransfer } from './transfer.js';

export default async function bank(body) {
  body.innerHTML = '<div class="skeleton card-sk"></div>';
  const d = await api('/bank/summary');
  body.innerHTML = `<div class="dcard"><small>Your City Bank</small><div class="bal">Rp 0</div>
    <div class="meta"><span>${esc(d.name)}</span><span>${esc(d.phone)}</span></div></div>
    <div class="actions"><button class="go">⬆️ Kirim</button></div>
    <h4>Riwayat</h4><div class="hist"></div>`;
  const bal = body.querySelector('.bal'), hist = body.querySelector('.hist');
  let current = 0;
  const show = (n) => { roll(bal, current, n); current = n; };
  show(d.balance);
  renderHistory(hist, d.history);
  body.querySelector('.go').onclick = () => openTransfer(body, async (res) => {
    show(res.balance);
    renderHistory(hist, (await api('/bank/summary')).history);
  });
}
