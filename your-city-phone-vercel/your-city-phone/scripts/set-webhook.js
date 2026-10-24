// Jalankan sekali setelah deploy (dan setiap domain/secret berubah): npm run set-webhook
const { BOT_TOKEN, WEBAPP_URL, BOT_WEBHOOK_SECRET } = process.env;
if (!BOT_TOKEN || !WEBAPP_URL) { console.error('Isi BOT_TOKEN dan WEBAPP_URL di .env'); process.exit(1); }

const url = `${WEBAPP_URL.replace(/\/$/, '')}/api/bot`;
const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/setWebhook`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ url, drop_pending_updates: true, ...(BOT_WEBHOOK_SECRET && { secret_token: BOT_WEBHOOK_SECRET }) }),
});
console.log(url, await res.json());
