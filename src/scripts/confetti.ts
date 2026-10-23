import { animate } from 'motion';

/* Square pixel confetti in the three product colours and the alarm yellow, falling from the top of the screen. */
const colours = ['var(--porcelain)', 'var(--tastik)', 'var(--medtime)', 'var(--alarm)'];

export const confetti = () => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const layer = document.createElement('div');
  layer.setAttribute('aria-hidden', 'true');
  layer.className = 'pointer-events-none fixed inset-0 z-50 overflow-hidden';
  document.body.append(layer);
  const pieces = Array.from({ length: 90 }, (_, index) => {
    const piece = document.createElement('span');
    const size = 6 + (index % 3) * 3;
    piece.style.cssText = `position:absolute;top:-16px;left:${Math.random() * 100}%;width:${size}px;height:${size}px;background:${colours[index % colours.length]}`;
    layer.append(piece);
    return animate(
      piece,
      { y: [0, window.innerHeight + 40], x: [0, (Math.random() - 0.5) * 240], rotate: [0, (Math.random() - 0.5) * 720] },
      { duration: 1.8 + Math.random() * 1.4, delay: Math.random() * 0.5, ease: 'linear' },
    );
  });
  void Promise.all(pieces).then(() => layer.remove());
};
