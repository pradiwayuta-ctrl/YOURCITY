import { Router } from 'express';
import { telegramAuth } from './middleware/telegramAuth.js';
import auth from './modules/auth/auth.routes.js';
import citizen from './modules/citizen/citizen.routes.js';

const api = Router();
api.use(telegramAuth);
api.use('/auth', auth);
api.use('/citizen', citizen);
// fitur baru: tambah 1 baris di sini
export default api;
