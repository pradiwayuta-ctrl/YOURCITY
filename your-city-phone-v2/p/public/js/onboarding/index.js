import { runScan } from './scan.js';
import { showKtp } from './ktp-card.js';
import { askGender } from './gender-picker.js';
import { morphToLock } from './morph.js';
import { waitUnlock } from './lockscreen.js';
import { showWelcome } from './welcome-popup.js';
import { sleep } from '../core/motion.js';

const steps = [
  { run: runScan },
  { run: showKtp },
  { run: askGender, when: (s) => s.needsConfirm },
  { run: () => sleep(1200), when: (s) => !s.needsConfirm },
  { run: morphToLock },
  { run: showWelcome, when: (s) => s.isNew },
  { run: waitUnlock },
];

export async function runOnboarding() {
  const state = {};
  for (const step of steps) {
    if (step.when && !step.when(state)) continue;
    await step.run(state);
  }
  return state;
}
