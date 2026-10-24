const KEY = 'yc:prefs';
const defaults = { haptic: 'full' }; // full | light | off
let data = { ...defaults };
try { data = { ...defaults, ...JSON.parse(localStorage.getItem(KEY) || '{}') }; } catch {}

export const getPref = (k) => data[k];
export function setPref(k, v) {
  data[k] = v;
  try { localStorage.setItem(KEY, JSON.stringify(data)); } catch {}
}
