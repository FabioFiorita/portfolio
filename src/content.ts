export const links = {
  github: 'https://github.com/FabioFiorita',
  linkedin: 'https://www.linkedin.com/in/fabiofioritapontes/',
  email: 'fabiolfp@gmail.com',
  x: 'https://x.com/flfiorita',
  medium: 'https://medium.com/@fabiolfp',
} as const;

/* From the Medium feed. Newest first. */
export const posts = [
  {
    title: 'I stopped babysitting my agent, and it finally fixed the feature I’d fought for weeks',
    date: '2026-06-05',
    minutes: 9,
    href: 'https://medium.com/@fabiolfp/i-stopped-babysitting-my-agent-and-it-finally-fixed-the-feature-id-fought-for-weeks-7e6442175e8e',
  },
  {
    title: 'Sharing my experience migrating a Flutter app to SwiftUI',
    date: '2024-01-27',
    minutes: 2,
    href: 'https://medium.com/@fabiolfp/sharing-my-experience-migrating-a-flutter-app-to-swiftui-a47ff0afcd8d',
  },
] as const;

/* Every figure here has a source and a date. Change one only with a new reading of that source. */
export const figures = {
  appDownloads: {
    value: 2528,
    label: '2,500+',
    note: 'First-time downloads of ItsMedTime (2,000) and Tastik (528) since launch, from App Store Connect, 22 Oct 2026.',
  },
  itsMedTimeRating: {
    value: 4.8,
    ratings: 22,
    note: 'App Store rating in Brazil, from 22 ratings, October 2026.',
  },
} as const;

export const projects = [
  {
    id: 'porcelain',
    name: 'Porcelain',
    tone: 'porcelain',
    kind: 'Developer tool · open source',
    platforms: ['Mac', 'Web', 'npm'],
    summary:
      'A code review tool for changes made with AI coding assistants. Instead of a list of files sorted by name, the review follows the decisions behind the change, one stop at a time, and you comment on a file or a line right where the question comes up.',
    detail: 'Free and MIT licensed. Runs on your own machines, with no account and no analytics.',
    stack: ['TypeScript', 'Effect', 'React', 'Electron', 'Expo', 'SQLite'],
    links: [
      { label: 'Website', href: 'https://porcelain.fabiofiorita.com' },
      { label: 'Source', href: 'https://github.com/FabioFiorita/porcelain' },
    ],
  },
  {
    id: 'tastik',
    name: 'Tastik',
    tone: 'tastik',
    kind: 'List app · App Store',
    platforms: ['iPhone', 'iPad', 'ChatGPT'],
    summary:
      'For the lists that don’t belong in a reminders app: groceries with steppers, budgets that add up, kanban boards, packing lists. Five list formats, none of them with a due date.',
    detail: 'The server holds the whole product, so the same lists open in the native app and inside ChatGPT.',
    stack: ['SwiftUI', 'Cloudflare Workers', 'D1', 'Effect', 'MCP'],
    links: [
      { label: 'Website', href: 'https://tastik.fabiofiorita.com' },
      { label: 'App Store', href: 'https://apps.apple.com/app/id6459197048' },
    ],
  },
  {
    id: 'itsmedtime',
    name: 'ItsMedTime',
    tone: 'medtime',
    kind: 'Health app · App Store',
    platforms: ['iPhone'],
    summary:
      'Medication reminders that get through. Critical Alerts that sound through Silent and Do Not Disturb, stock that warns before it runs out, and reports of how a treatment is going. Called MeuMedicamento in Brazil.',
    detail: 'Started in 2021 for a real family need. Private iCloud sync, no account and no tracking.',
    stack: ['SwiftUI', 'SQLiteData', 'CloudKit', 'StoreKit', 'WidgetKit'],
    links: [
      { label: 'Website', href: 'https://itsmedtime.fabiofiorita.com' },
      { label: 'App Store', href: 'https://apps.apple.com/app/id1580757092' },
    ],
  },
] as const;

/* Where an example comes from. Work examples stay at the level of what was built; they name no employer, product or number. */
export type Source = 'At work' | 'Porcelain' | 'Tastik' | 'ItsMedTime';

export const principles = [
  {
    title: 'Prove it works',
    line: 'Done means I ran the real thing and watched it work: the server, the browser, the phone. A passing type check is not a feature.',
    examples: [
      {
        source: 'At work',
        body: 'Automated checks that start the real server on its own database, sign in through the real one-time code, drive the web app and a phone simulator, and keep screenshots as evidence before a change is called done.',
      },
      {
        source: 'Porcelain',
        body: 'Proof is part of every review: the checks that ran and the screenshots taken sit next to the code, and they are flagged as out of date the moment the code changes after them.',
      },
    ],
  },
  {
    title: 'Strongest layer first',
    line: 'When a mistake repeats, I fix it in the types, then a lint rule, then CI. Documentation comes last, because a failing build cannot be skipped.',
    examples: [
      {
        source: 'At work',
        body: 'A set of house rules for a whole codebase, each one enforced as a lint rule or a check that fails the build, with no way to silence it. Every rule ships with a test that proves it fires. Rolled out by turning the code red, then green.',
      },
      {
        source: 'Porcelain',
        body: 'The architecture is checked, not described: dependency rules between packages, a custom lint plugin, duplicate and dead-code checks.',
      },
    ],
  },
  {
    title: 'Isolate parallel work',
    line: 'Work that runs side by side shares nothing by accident: not a branch, a port, a database or a device.',
    examples: [
      {
        source: 'At work',
        body: 'A worktree tool that gives every task its own checkout, its own set of ports and, for migrations, its own database, so several full stacks run side by side without stepping on each other.',
      },
      {
        source: 'Porcelain',
        body: 'One client reaches servers on many machines, local or remote, and every review belongs to the worktree it came from.',
      },
    ],
  },
  {
    title: 'The codebase is the memory',
    line: 'People and tools copy what they see. When a new way replaces an old one, every caller moves and the old way is deleted in the same change.',
    examples: [
      {
        source: 'At work',
        body: 'One source of truth for the AI coding tools the whole team uses: instructions next to the code they govern, in every package, instead of a separate setup per person.',
      },
      {
        source: 'At work',
        body: 'Rules that the web and the phone apps each re-implemented moved into shared modules, so both read one definition and there is no second copy to drift.',
      },
    ],
  },
  {
    title: 'Model the domain',
    line: 'Name the data shape first and let the structure carry the rules. One owner for every piece of state.',
    examples: [
      {
        source: 'Tastik',
        body: 'The five list formats are modelled once, on the server. The iPhone app and the ChatGPT app read the same lists and follow the same rules.',
      },
      {
        source: 'At work',
        body: 'A server, a web app and a phone app over one shared domain layer. The phone sends answers and shows the result the server worked out; it computes nothing on its own.',
      },
    ],
  },
  {
    title: 'Adopt before build',
    line: 'Use what the project already has, then a well-known library. Build only what makes the product different.',
    examples: [
      {
        source: 'At work',
        body: 'An audit of a phone app that handed its hand-rolled navigation and state back to the router and native stacks. Each change was checked on a device, and the one that misbehaved was reverted.',
      },
      {
        source: 'ItsMedTime',
        body: 'Version 5 moved storage and iCloud sync onto an established library instead of keeping custom sync code, so the effort goes into reminders, not plumbing.',
      },
    ],
  },
  {
    title: 'Experience first',
    line: 'When what is easy to build and what is good to use disagree, the person using it wins.',
    examples: [
      {
        source: 'ItsMedTime',
        body: 'Critical Alerts that sound through Silent and Do Not Disturb, because a missed dose matters more than a quiet phone.',
      },
      {
        source: 'Porcelain',
        body: 'A review that follows the decisions in reading order instead of listing files alphabetically, because that is the order a person understands a change in.',
      },
    ],
  },
] as const satisfies readonly {
  title: string;
  line: string;
  examples: readonly { source: Source; body: string }[];
}[];

export const stack = ['TypeScript', 'React', 'React Native', 'Expo', 'Swift', 'SwiftUI', 'Node', 'NestJS', 'PostgreSQL', 'Cloudflare'] as const;
