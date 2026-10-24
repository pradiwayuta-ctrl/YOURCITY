import app from './app.js';
import { env } from './config/env.js';
import { setupBot } from './bot/index.js';

setupBot(app);
app.listen(env.port, () => console.log(`${env.cityName} jalan di :${env.port}`));
