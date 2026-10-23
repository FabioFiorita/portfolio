/* Sprites for the pixel scenes. One character per pixel, '.' for empty; the palette names the colours. */

export const reviewer = {
  rows: ['..bbbb..', '.bbbbbb.', 'bbwbbwbb', 'bbkbbkbb', 'bbbbbbbb', '.bbbbbb.', '.b.bb.b.', 'b......b'],
  palette: { b: 'var(--porcelain)', w: 'var(--text)', k: 'var(--night)' },
} as const;

export const pill = {
  rows: ['..vvvvwwww..', '.vvvvvwwwww.', 'vvvvvvwwwwww', 'vvvvvvwwwwww', '.vvvvvwwwww.', '..vvvvwwww..'],
  palette: { v: 'var(--medtime)', w: 'var(--text)' },
} as const;

export const bell = {
  rows: ['....aa....', '...aaaa...', '..aaaaaa..', '..aaaaaa..', '.aaaaaaaa.', '.aaaaaaaa.', 'aaaaaaaaaa', '....aa....'],
  palette: { a: 'var(--alarm)' },
} as const;

export const check = {
  rows: ['......g', '.....gg', 'g...gg.', 'gg.gg..', '.ggg...', '..g....'],
  palette: { g: 'var(--tastik)' },
} as const;
