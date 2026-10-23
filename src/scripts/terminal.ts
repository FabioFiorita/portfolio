import { findSecret } from './secrets';

type Line = { text: string; tone?: 'dim' | 'accent' | 'link'; href?: string };

/* The terminal reads the same facts as the page, from data the page embeds. */
type Facts = {
  links: Record<string, string>;
  projects: { name: string; kind: string; links: { label: string; href: string }[] }[];
  principles: string[];
  posts: { title: string; href: string }[];
};

export const startTerminal = (root: HTMLElement) => {
  const facts = JSON.parse(root.querySelector('script[type="application/json"]')!.textContent!) as Facts;
  const output = root.querySelector<HTMLElement>('[data-output]')!;
  const form = root.querySelector<HTMLFormElement>('form')!;
  const input = form.querySelector<HTMLInputElement>('input')!;

  const commands: Record<string, () => Line[]> = {
    help: () => [
      { text: 'Commands:', tone: 'dim' },
      { text: 'about     who I am' },
      { text: 'projects  what I have shipped' },
      { text: 'rules     how I work' },
      { text: 'posts     what I have written' },
      { text: 'contact   how to reach me' },
      { text: 'clear     start over' },
    ],
    about: () => [
      { text: 'Fábio Fiorita, full-stack engineer in São José dos Campos, Brazil.' },
      { text: 'TypeScript and Swift, from the database to the App Store.', tone: 'dim' },
    ],
    whoami: () => [{ text: 'guest. Type help to look around.', tone: 'dim' }],
    projects: () => facts.projects.flatMap((project) => [
      { text: `${project.name} · ${project.kind}`, tone: 'accent' as const },
      ...project.links.map((link) => ({ text: `${link.label} ↗`, tone: 'link' as const, href: link.href })),
    ]),
    rules: () => facts.principles.map((title, index) => ({ text: `${String(index + 1).padStart(2, '0')} ${title}` })),
    posts: () => facts.posts.map((post) => ({ text: `${post.title} ↗`, tone: 'link' as const, href: post.href })),
    contact: () => Object.entries(facts.links).map(([name, href]) => ({
      text: `${name.padEnd(9)}${href.replace(/^mailto:|^https:\/\/(www\.)?/, '')}`,
      tone: 'link' as const,
      href,
    })),
    sudo: () => {
      findSecret('sudo');
      return [{ text: 'Nice try. Secret found.', tone: 'accent' }];
    },
    coffee: () => {
      findSecret('coffee');
      return [{ text: 'Brewing… ☕ Secret found.', tone: 'accent' }];
    },
    ls: () => [{ text: 'porcelain/  tastik/  itsmedtime/  secrets.txt', tone: 'dim' }],
    'cat secrets.txt': () => [{ text: 'There are five. Two of them are in this terminal.', tone: 'dim' }],
  };

  const print = (lines: Line[]) => {
    for (const line of lines) {
      const row = document.createElement(line.href ? 'a' : 'p');
      row.textContent = line.text;
      row.className = { dim: 'text-dim', accent: 'text-porcelain', link: 'text-tastik underline-offset-4 hover:underline', none: '' }[line.tone ?? 'none'];
      if (row instanceof HTMLAnchorElement && line.href) {
        row.href = line.href;
        row.classList.add('block', 'w-fit', 'pl-4');
      }
      output.append(row);
    }
    output.scrollTop = output.scrollHeight;
  };

  const run = (raw: string) => {
    const command = raw.trim().toLowerCase();
    if (!command) return;
    print([{ text: `guest ~ $ ${raw.trim()}`, tone: 'dim' }]);
    if (command === 'clear') {
      output.replaceChildren();
      return;
    }
    const answer = commands[command] ?? commands[command.split(' ')[0]!];
    print(answer ? answer() : [{ text: `${command}: not found. Type help.`, tone: 'dim' }]);
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    run(input.value);
    input.value = '';
  });
  for (const button of root.querySelectorAll<HTMLButtonElement>('[data-run]')) {
    button.addEventListener('click', () => run(button.dataset.run!));
  }
};
