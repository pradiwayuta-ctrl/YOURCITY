import { db } from '../../config/db.js';
import { game } from '../../config/game.config.js';
import { err } from '../../utils/httpError.js';

export async function transfer(fromId, phone, amount) {
  amount = Number(amount);
  if (!Number.isInteger(amount) || amount < game.minTransfer) throw err(400, `Minimal Rp ${game.minTransfer}`);
  const c = await db.connect();
  try {
    await c.query('BEGIN');
    const to = (await c.query('SELECT user_id, full_name FROM citizens WHERE rp_phone=$1', [phone])).rows[0];
    if (!to) throw err(404, 'Nomor tidak ditemukan');
    if (Number(to.user_id) === Number(fromId)) throw err(400, 'Tidak bisa transfer ke diri sendiri');
    const ids = [Number(fromId), Number(to.user_id)].sort((a, b) => a - b);
    await c.query('SELECT 1 FROM wallets WHERE user_id = ANY($1) ORDER BY user_id FOR UPDATE', [ids]);
    const out = await c.query(
      'UPDATE wallets SET balance=balance-$2 WHERE user_id=$1 AND balance>=$2 RETURNING balance', [fromId, amount]);
    if (!out.rowCount) throw err(400, 'Saldo tidak cukup');
    const inn = await c.query('UPDATE wallets SET balance=balance+$2 WHERE user_id=$1', [to.user_id, amount]);
    if (!inn.rowCount) throw err(500, 'Dompet penerima tidak ada');
    const me = (await c.query('SELECT full_name FROM citizens WHERE user_id=$1', [fromId])).rows[0];
    await c.query(`INSERT INTO transactions (user_id, kind, amount, note, seen) VALUES
      ($1,'transfer_out',$3,$4,true), ($2,'transfer_in',$3,$5,false)`,
      [fromId, to.user_id, amount, 'Ke ' + to.full_name, 'Dari ' + me.full_name]);
    await c.query('COMMIT');
    return { balance: Number(out.rows[0].balance), to: to.full_name };
  } catch (e) { await c.query('ROLLBACK'); throw e; }
  finally { c.release(); }
}
