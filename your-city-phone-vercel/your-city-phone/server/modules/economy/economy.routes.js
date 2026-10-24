import { Router } from 'express';
import { handle } from '../../utils/httpError.js';
import * as bank from './bank.service.js';
import { transfer } from './transfer.service.js';
import * as job from './job.service.js';
const r = Router();

r.get('/bank/summary', handle((q) => bank.summary(q.tg.id)));
r.get('/bank/notices', handle((q) => bank.notices(q.tg.id)));
r.post('/bank/transfer', handle((q) => transfer(q.tg.id, String(q.body.phone || '').replace(/\D/g, ''), q.body.amount)));
r.get('/job', handle((q) => job.state(q.tg.id)));
r.post('/job/take', handle((q) => job.take(q.tg.id, q.body.id)));
r.post('/job/claim', handle((q) => job.claim(q.tg.id)));
export default r;
