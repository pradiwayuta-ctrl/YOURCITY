import { api } from '../../core/api.js';
import { rp } from '../../core/format.js';
import { coinBurst } from '../../core/particles.js';
import { emit } from '../../core/eventbus.js';
import { haptic } from '../../core/telegram.js';

export default async function jobs(body) {
  const draw = (s) => {
    const c = s.current;
    body.innerHTML = `<div class="jcard">${c
      ? `<i>${c.icon}</i><b>${c.name}</b><small>Gaji harian ${rp(c.salary)}</small>
         <button class="claim go" ${s.canClaim ? '' : 'disabled'}>${s.canClaim ? 'Klaim gaji hari ini' : 'Sudah diklaim, kembali besok'}</button>`
      : '<i>🪪</i><b>Belum bekerja</b><small>Pilih pekerjaan di bawah</small>'}</div>
      <h4>Lowongan</h4>${s.jobs.map((j) => `<div class="row" data-id="${j.id}"><i>${j.icon}</i>
        <div><b>${j.name}</b><small>${rp(j.salary)} per hari</small></div>
        <button class="take ghost" ${c?.id === j.id ? 'disabled' : ''}>${c?.id === j.id ? 'Aktif' : 'Ambil'}</button></div>`).join('')}`;
    body.querySelectorAll('.take').forEach((b) => (b.onclick = async () => {
      haptic('light'); draw(await api('/job/take', { id: b.closest('.row').dataset.id }));
    }));
    const claim = body.querySelector('.claim');
    if (claim) claim.onclick = async () => {
      claim.disabled = true;
      try {
        const r = await api('/job/claim', {});
        coinBurst(claim, document.querySelector('.island'));
        emit('island:notify', { type: 'salary', data: { amount: r.amount } });
        draw(await api('/job'));
      } catch (e) { claim.textContent = e.message; }
    };
  };
  draw(await api('/job'));
}
