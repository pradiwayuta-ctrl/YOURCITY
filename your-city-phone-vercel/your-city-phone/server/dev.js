// Hanya untuk jalan lokal (npm start). Di Vercel yang dipakai api/index.js.
import app from './app.js';
import { env } from './config/env.js';

app.listen(env.port, () => console.log(`${env.cityName} jalan di :${env.port}`));
