import { Bot, InlineKeyboard, webhookCallback } from 'grammy';
import { env } from '../config/env.js';

export function setupBot(app) {
  if (!env.botToken) return console.log('BOT_TOKEN kosong, bot nonaktif');
  const bot = new Bot(env.botToken);
  bot.command('start', (ctx) =>
    ctx.reply(`Selamat datang di ${env.cityName}!`, {
      reply_markup: new InlineKeyboard().webApp('📱 Buka HP', env.webappUrl),
    }));
  const opts = env.webhookSecret ? { secretToken: env.webhookSecret } : {};
  app.use('/api/bot', webhookCallback(bot, 'express', opts));
  // Webhook TIDAK didaftarkan saat boot (serverless cold start). Jalankan sekali: npm run set-webhook
}
