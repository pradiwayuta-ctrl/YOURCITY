import { db } from '../../config/db.js';
import { makeNik, makePhone } from './generators.js';

export async function getOrCreate(tg) {
  await db.query(
    `INSERT INTO users (id, username, first_name, photo_url) VALUES ($1,$2,$3,$4)
     ON CONFLICT (id) DO UPDATE SET username=$2, first_name=$3, photo_url=$4`,
    [tg.id, tg.username || null, tg.first_name, tg.photo_url || null]);
  for (let i = 0; i < 5; i++) {
    try {
      await db.query(
        `INSERT INTO citizens (user_id, nik, full_name, rp_phone) VALUES ($1,$2,$3,$4)
         ON CONFLICT (user_id) DO NOTHING`,
        [tg.id, makeNik(), [tg.first_name, tg.last_name].filter(Boolean).join(' '), makePhone()]);
      break;
    } catch (e) { if (e.code !== '23505') throw e; }
  }
  return find(tg.id);
}

export async function find(id) {
  const { rows } = await db.query(
    `SELECT c.*, u.username, u.photo_url FROM citizens c JOIN users u ON u.id=c.user_id
     WHERE c.user_id=$1`, [id]);
  return rows[0];
}

export async function confirm(id, gender) {
  const { rowCount } = await db.query(
    `UPDATE citizens SET gender=$2, confirmed=true WHERE user_id=$1 AND confirmed=false`,
    [id, gender]);
  if (!rowCount) throw Object.assign(new Error('Data sudah terkunci'), { status: 409 });
  return find(id);
}
