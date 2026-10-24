const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const env = {
  port: process.env.PORT || 3000,
  botToken: process.env.BOT_TOKEN || '',
  webhookSecret: process.env.BOT_WEBHOOK_SECRET || '',
  cronSecret: process.env.CRON_SECRET || '',
  webappUrl: process.env.WEBAPP_URL || (vercelHost ? `https://${vercelHost}` : ''),
  dbUrl: process.env.DATABASE_URL || process.env.POSTGRES_URL,
  cityName: process.env.CITY_NAME || 'Your City',
  prod: process.env.NODE_ENV === 'production',
};
