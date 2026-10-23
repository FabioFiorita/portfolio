import type { APIRoute } from 'astro';
import { figures, links, posts, principles, projects, stack } from '../content';

/* The page's facts as plain text for language models (llmstxt.org). It reads the same content as the page. */
export const GET: APIRoute = ({ site }) => {
  const home = site?.href ?? 'https://portfolio.fabiofiorita.com/';
  const text = [
    '# Fábio Fiorita',
    '',
    '> Full-stack engineer in São José dos Campos, Brazil. He builds products end to end, from the server to the web and the phone, in TypeScript and Swift, and the apps Porcelain, Tastik and ItsMedTime.',
    '',
    `Website: ${home}`,
    `Skills: ${stack.join(', ')}.`,
    `App Store: ${figures.appDownloads.label} downloads across ItsMedTime and Tastik since launch.`,
    '',
    '## Projects',
    '',
    ...projects.flatMap((project) => [
      `### ${project.name}`,
      '',
      `${project.kind}. Platforms: ${project.platforms.join(', ')}.`,
      '',
      `${project.summary} ${project.detail}`,
      '',
      `Built with: ${project.stack.join(', ')}.`,
      ...(project.id === 'itsmedtime' ? [`Rating: ${figures.itsMedTimeRating.value} on the App Store in Brazil, from ${figures.itsMedTimeRating.ratings} ratings.`] : []),
      '',
      ...project.links.map((link) => `- [${link.label}](${link.href})`),
      '',
    ]),
    '## How he works',
    '',
    ...principles.flatMap((principle) => [
      `### ${principle.title}`,
      '',
      principle.line,
      '',
      ...principle.examples.map((example) => `- ${example.body}`),
      '',
    ]),
    '## Writing',
    '',
    ...posts.map((post) => `- [${post.title}](${post.href}) (${post.date})`),
    '',
    '## Contact',
    '',
    `- [Email](mailto:${links.email})`,
    `- [LinkedIn](${links.linkedin})`,
    `- [X](${links.x})`,
    `- [GitHub](${links.github})`,
    `- [Medium](${links.medium})`,
    '',
  ].join('\n');
  return new Response(text, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
