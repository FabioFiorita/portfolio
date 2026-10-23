import { animate } from 'motion';
import { all, pixelEase, wait, whileVisible } from './loop';

const review = (scene: HTMLElement) => {
  const lines = all(scene, '[data-line]');
  const ticks = all(scene, '[data-tick]');
  const reviewer = scene.querySelector<HTMLElement>('[data-reviewer]')!;
  const stop = scene.querySelector<HTMLElement>('[data-stop]')!;
  const stamp = scene.querySelector<HTMLElement>('[data-stamp]')!;
  whileVisible(scene, async (live) => {
    while (live()) {
      for (const [index, line] of lines.entries()) {
        if (!live()) return;
        stop.textContent = String(index + 1);
        reviewer.style.transform = `translateY(${line.offsetTop - lines[0]!.offsetTop}px)`;
        await wait(700);
        ticks[index]!.classList.remove('hidden');
        await wait(250);
      }
      if (!live()) return;
      stamp.classList.remove('hidden');
      await animate(stamp, { scale: [1.6, 1], opacity: [0, 1] }, { duration: 0.25, ease: pixelEase });
      await wait(1500);
      stamp.classList.add('hidden');
      for (const tick of ticks) tick.classList.add('hidden');
    }
  });
};

const lists = (scene: HTMLElement) => {
  const items = all(scene, '[data-item]');
  const count = scene.querySelector<HTMLElement>('[data-count]')!;
  const done = scene.querySelector<HTMLElement>('[data-done]')!;
  const mark = (item: HTMLElement, on: boolean) => {
    item.querySelector('svg')?.toggleAttribute('data-on', on);
    item.querySelector('[data-label]')?.classList.toggle('text-dim', on);
    item.querySelector('[data-label]')?.classList.toggle('line-through', on);
  };
  whileVisible(scene, async (live) => {
    while (live()) {
      for (let lemons = 1; lemons <= 6; lemons++) {
        if (!live()) return;
        count.textContent = String(lemons);
        await wait(260);
      }
      for (const [index, item] of items.entries()) {
        if (!live()) return;
        await wait(550);
        mark(item, true);
        done.textContent = String(index + 1);
      }
      await wait(1600);
      for (const item of items) mark(item, false);
      done.textContent = '0';
      count.textContent = '1';
      await wait(400);
    }
  });
};

const dose = (scene: HTMLElement) => {
  const clock = scene.querySelector<HTMLElement>('[data-clock]')!;
  const bell = scene.querySelector<HTMLElement>('[data-bell]')!;
  const due = scene.querySelector<HTMLElement>('[data-dose]')!;
  const taken = scene.querySelector<HTMLElement>('[data-taken]')!;
  const streak = scene.querySelector<HTMLElement>('[data-streak]')!;
  const days = all(scene, '[data-day]');
  whileVisible(scene, async (live) => {
    while (live()) {
      for (const time of ['07:58', '07:59', '08:00']) {
        if (!live()) return;
        clock.textContent = time;
        await wait(800);
      }
      clock.classList.add('text-alarm');
      await animate(bell, { rotate: [0, -18, 18, -18, 18, 0] }, { duration: 0.9, ease: pixelEase });
      if (!live()) return;
      due.classList.add('hidden');
      taken.classList.remove('hidden');
      days[4]!.classList.replace('bg-grid', 'bg-medtime');
      streak.textContent = '5';
      await wait(1800);
      clock.classList.remove('text-alarm');
      due.classList.remove('hidden');
      taken.classList.add('hidden');
      days[4]!.classList.replace('bg-medtime', 'bg-grid');
      streak.textContent = '4';
      await wait(300);
    }
  });
};

const scenes = { review, lists, dose } as const;

export const playScenes = () => {
  for (const scene of all(document, '[data-scene]')) {
    const name = scene.dataset.scene as keyof typeof scenes | undefined;
    if (name && name in scenes) scenes[name](scene);
  }
};
