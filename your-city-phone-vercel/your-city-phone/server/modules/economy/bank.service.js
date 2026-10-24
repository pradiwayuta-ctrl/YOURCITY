import { db } from '../../config/db.js';
import { game } from '../../config/game.config.js';

export const ensureWallet = (id) =>
  db.query('INSERT INTO wallets (user_id, balance) VALUES ($1,$2) ON CONFLICT DO NOTHING', [id, game.startBalance]);

export async function summary(id) {
  const w = await db.query(
    `SELECT w.balance, c.full_name, c.rp_phone FROM wallets w JOIN citizens c USING (user_id) WHERE w.user_id=$1`, [id]);
  const h = await db.query(
    `SELECT kind, amount, note, created_at FROM transactions WHERE user_id=$1 ORDER BY id DESC LIMIT 30`, [id]);
  const r = w.rows[0];
  return { balance: Number(r.balance), name: r.full_name, phone: r.rp_phone,
    history: h.rows.map((x) => ({ ...x, amount: Number(x.amount) })) };
}

export async function notices(id) {
  const { rows } = await db.query(
    `UPDATE transactions SET seen=true WHERE user_id=$1 AND seen=false RETURNING kind, amount, note`, [id]);
  return rows.map((x) => ({ ...x, amount: Number(x.amount) }));
}
