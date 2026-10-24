import { Bot, InlineKeyboard, webhookCallback } from 'grammy';
import { env } from '../config/env.js';

export function setupBot(app) {
  if (!env.botToken) return console.log('BOT_TOKEN kosong, bot nonaktif');
  const bot = new Bot(env.botToken);
  bot.command('start', (ctx) =>
    ctx.reply(`Selamat datang di ${env.cityName}!`, {
      reply_markup: new InlineKeyboard().webApp('📱 Buka HP', env.webappUrl),
    }));
  app.use('/bot', webhookCallback(bot, 'express'));
  if (env.webappUrl) bot.api.setWebhook(`${env.webappUrl}/bot`);
}
