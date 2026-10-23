# Portfolio

A static Astro site, deployed as plain files from `dist/`.

- Words and figures live in `src/content.ts`. Every figure carries its source and date; change one only with a new reading of that source. `src/pages/llms.txt.ts` and the terminal read the same content, so the page, `/llms.txt` and the terminal never disagree.
- The page is `src/pages/index.astro`. Motion owns every animation: an element marked `data-reveal` or `data-letter` starts hidden only when `html` has the `motion` class, which the layout sets before paint unless the visitor prefers reduced motion, and removes after 2.5 s if the page script never ran.
- Looping scenes run only while on screen, through `whileVisible` in `src/scripts/loop.ts`. Pixel motion moves in steps (`pixelEase`), never smooth easing.
- Colours are tokens in `src/styles/global.css`: night ink, one colour per product (Porcelain blue, Tastik green, ItsMedTime violet) and alarm yellow. Do not hard-code a colour in markup.
- Type: Press Start 2P for display, Jersey 10 for labels and buttons, JetBrains Mono for reading text.
- Pixel art is drawn by `src/components/pixel.astro` from rows of characters in `src/components/sprites.ts`.
- Work examples under How I work describe what was built and why. They name no employer, product, ticket, team size or private metric.
- Prove a change by building, previewing, and screenshotting at 1440, 390 and 320 px wide, plus once with reduced motion.
- No co-author or AI attribution lines in commits.
