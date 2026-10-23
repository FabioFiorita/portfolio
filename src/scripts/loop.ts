import { inView } from 'motion';

export const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/* Pixel motion moves in whole steps, the way an old screen redraws. */
export const pixelEase = (progress: number) => Math.round(progress * 6) / 6;

export const all = <T extends Element = HTMLElement>(scope: ParentNode, selector: string) => Array.from(scope.querySelectorAll<T>(selector));

/* Runs a looping scene only while it is on screen. A new generation stops the old loop. */
export const whileVisible = (element: Element, play: (live: () => boolean) => Promise<void>) => {
  let generation = 0;
  inView(element, () => {
    const mine = ++generation;
    void play(() => mine === generation);
    return () => {
      generation++;
    };
  });
};
