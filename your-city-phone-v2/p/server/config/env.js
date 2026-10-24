export const env = {
  port: process.env.PORT || 3000,
  botToken: process.env.BOT_TOKEN || '',
  webappUrl: process.env.WEBAPP_URL || '',
  dbUrl: process.env.DATABASE_URL,
  cityName: process.env.CITY_NAME || 'Your City',
  prod: process.env.NODE_ENV === 'production',
};
