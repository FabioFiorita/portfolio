/* Five things to find on the page. Found ones are remembered in this browser only. */
export const secretNames = ['reviewer', 'bell', 'konami', 'sudo', 'coffee'] as const;
export type Secret = (typeof secretNames)[number];

const key = 'fabiofiorita:secrets';

const read = (): Set<Secret> => {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem(key) ?? '[]');
    return new Set(Array.isArray(saved) ? saved.filter((name): name is Secret => secretNames.includes(name)) : []);
  } catch {
    return new Set();
  }
};

const found = read();
const listeners = new Set<(count: number, latest?: Secret) => void>();

export const onSecret = (listener: (count: number, latest?: Secret) => void) => {
  listeners.add(listener);
  listener(found.size);
};

export const findSecret = (name: Secret) => {
  if (found.has(name)) return;
  found.add(name);
  try {
    localStorage.setItem(key, JSON.stringify([...found]));
  } catch {
    /* Private windows can refuse storage; the count still works for this visit. */
  }
  for (const listener of listeners) listener(found.size, name);
};

export const watchSecrets = () => {
  for (const element of document.querySelectorAll<HTMLElement>('[data-secret]')) {
    element.addEventListener('click', () => findSecret(element.dataset.secret as Secret));
  }
  const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let progress = 0;
  window.addEventListener('keydown', (event) => {
    progress = event.key === konami[progress] ? progress + 1 : event.key === konami[0] ? 1 : 0;
    if (progress === konami.length) {
      progress = 0;
      findSecret('konami');
    }
  });
};
