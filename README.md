# Boulder Computational Solutions — Next.js

Landing page (option **1a — dark lab**) exported to a Next.js App Router project (TypeScript, React 18).

## Run it

```bash
cd nextjs-bcs
npm install
npm run dev
```

Then open http://localhost:3000.

## Build for production

```bash
npm run build
npm start
```

## Structure

```
nextjs-bcs/
├── app/
│   ├── globals.css     # resets, body background, link styles
│   ├── layout.tsx      # <html>, metadata, Google Fonts (Space Grotesk, JetBrains Mono, Public Sans)
│   └── page.tsx        # the full landing page
├── next.config.mjs
├── tsconfig.json
└── package.json
```

## Notes

- Styling is inline (matching the original HTML design 1:1). If you prefer Tailwind
  or CSS Modules, the section markup maps cleanly onto either.
- The page centers a fixed 1120px column, as in the design. To make it fully fluid/
  responsive, replace the fixed `maxWidth`/paddings with responsive units and add
  breakpoints for the nav, metric strip, capabilities, and team grids.
- Content (capabilities, team, industries) lives in typed arrays at the top of
  `app/page.tsx` — edit there.
- Headshots are placeholder tiles; drop real images into `public/` and swap the
  placeholder divs for `next/image`.
# bcs
