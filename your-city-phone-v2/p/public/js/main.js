import { runOnboarding } from './onboarding/index.js';
import { startHome } from './shell/home.js';
import { initIsland } from './shell/dynamic-island/index.js';
import { mount } from './core/motion.js';

try {
  const state = await runOnboarding();
  initIsland();
  startHome(state);
} catch (e) {
  mount(`<h2>Buka lewat Telegram</h2><p style="margin:10px 0 18px;opacity:.7">${e.message}</p>
    <button onclick="location.reload()" style="padding:12px 22px;border-radius:14px;background:#f4b942;color:#0a1b33">Coba lagi</button>`, 'scan');
}
