import express from 'express';
import api from './routes.js';
const app = express();
app.use(express.json());
app.use('/api', api);
app.use(express.static(new URL('../public', import.meta.url).pathname));
export default app;
