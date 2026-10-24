import { db } from '../../config/db.js';
import { game } from '../../config/game.config.js';
import { err } from '../../utils/httpError.js';

const TODAY = `(now() AT TIME ZONE $2)::date`;

export async function state(id) {
  const { rows } = await db.query(
    `SELECT c.job_title, (w.last_claim IS NULL OR w.last_claim < ${TODAY}) AS can_claim
     FROM citizens c JOIN wallets w USING (user_id) WHERE c.user_id=$1`, [id, game.tz]);
  const current = game.jobs.find((j) => j.name === rows[0].job_title) || null;
  return { jobs: game.jobs, current, canClaim: !!current && rows[0].can_claim };
}

export async function take(id, jobId) {
  const job = game.jobs.find((j) => j.id === jobId);
  if (!job) throw err(400, 'Pekerjaan tidak ada');
  await db.query('UPDATE citizens SET job_title=$2 WHERE user_id=$1', [id, job.name]);
  return state(id);
}

export async function claim(id) {
  const s = await state(id);
  if (!s.current) throw err(400, 'Kamu belum punya pekerjaan');
  const amount = s.current.salary;
  const c = await db.connect();
  try {
    await c.query('BEGIN');
    const r = await c.query(
      `UPDATE wallets SET balance=balance+$3, last_claim=${TODAY}
       WHERE user_id=$1 AND (last_claim IS NULL OR last_claim < ${TODAY}) RETURNING balance`,
      [id, game.tz, amount]);
    if (!r.rowCount) throw err(409, 'Gaji hari ini sudah diklaim');
    await c.query(`INSERT INTO transactions (user_id, kind, amount, note) VALUES ($1,'salary',$2,$3)`,
      [id, amount, 'Gaji ' + s.current.name]);
    await c.query('COMMIT');
    return { amount, balance: Number(r.rows[0].balance) };
  } catch (e) { await c.query('ROLLBACK'); throw e; }
  finally { c.release(); }
}
