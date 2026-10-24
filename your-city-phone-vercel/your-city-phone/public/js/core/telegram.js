import { getPref } from './prefs.js';
const tg = window.Telegram?.WebApp;
tg?.ready();
tg?.expand();
tg?.disableVerticalSwipes?.();
export const initData = tg?.initData || '';
export const tgUser = tg?.initDataUnsafe?.user || null;

export function haptic(style = 'light') {
  const mode = getPref('haptic');
  if (mode === 'off') return;
  tg?.HapticFeedback?.impactOccurred(mode === 'light' ? 'light' : style);
}
