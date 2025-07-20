import confetti from 'canvas-confetti';

let activeConfetti = 0;
const MAX_CONFETTI = 5;

export function limitedConfetti(options) {
  if (activeConfetti >= MAX_CONFETTI) return;
  activeConfetti++;
  confetti(options);
  setTimeout(() => {
    activeConfetti--;
  }, 400); // adjust if needed
}
