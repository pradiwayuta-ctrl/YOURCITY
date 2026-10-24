import { db } from '../config/db.js';
import { game } from '../config/game.config.js';

const parts = () => Object.fromEntries(new Intl.DateTimeFormat('en-CA', { timeZone: game.tz, weekday: 'short',
  hour: 'numeric', hour12: false, year: 'numeric', month: '2-digit', day: '2-digit' })
  .formatToParts(new Date()).map((p) => [p.type, p.value]));

async function run(today) {
  const r = await db.query(`
    WITH due AS (
      SELECT w.user_id, FLOOR((w.balance - $1) * $2)::bigint AS fee FROM wallets w
      JOIN citizens c USING (user_id)
      WHERE w.balance > $1 AND c.registered_at < now() - interval '7 days'
        AND (w.last_tax IS NULL OR w.last_tax < $3::date) FOR UPDATE OF w),
    upd AS (UPDATE wallets w SET balance = w.balance - d.fee, last_tax = $3::date
      FROM due d WHERE w.user_id = d.user_id RETURNING d.user_id, d.fee)
    INSERT INTO transactions (user_id, kind, amount, note, seen)
      SELECT user_id, 'tax', fee, 'Pajak mingguan', false FROM upd WHERE fee > 0`,
    [game.taxThreshold, game.taxRate, today]);
  return r.rowCount;
}

// Dipanggil Vercel Cron tiap Minggu 20:00 WIB (13:00 UTC). Hanya jalan di hari Minggu
// (zona waktu game) agar pemanggilan salah hari tidak memotong pajak lagi. force=true untuk eksekusi manual.
export async function runWeeklyTax({ force = false } = {}) {
  const p = parts();
  if (!force && p.weekday !== 'Sun') return { ran: false, reason: `bukan hari Minggu (${p.weekday})` };
  const taxed = await run(`${p.year}-${p.month}-${p.day}`);
  return { ran: true, taxed };
}
