import { mount } from '../core/motion.js';
import { apps } from '../apps/registry.js';
import { openApp } from './app-window.js';
import { emit } from '../core/eventbus.js';

export function startHome(state) {
  const el = mount(`<div class="grid">${apps.map((a) =>
    `<div class="app" data-id="${a.id}"><i>${a.icon}</i>${a.name}</div>`).join('')}</div>`, 'home');
  el.querySelectorAll('.app').forEach((a, i) => {
    a.style.cssText = 'opacity:0;transform:scale(.6)';
    setTimeout(() => (a.style.cssText = 'opacity:1;transform:none;transition:.5s var(--spring)'), 60 * i);
    a.addEventListener('click', () => openApp(apps.find((x) => x.id === a.dataset.id), a.querySelector('i')));
  });
  if (!state.isNew) emit('island:notify', { type: 'welcome', data: { name: state.citizen.full_name } });
}
