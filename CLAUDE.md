# Abbas Fares — Portfolio

## Purpose
Personal portfolio / CV site. Single long homepage (Hero, About, Experience, Projects,
Skills, Contact) plus one statically prerendered detail page per project.

## Hard constraint: fast and light
This site exists to be **fast and light**. Every change is judged against that before
anything else. Concretely:

- **No new runtime dependencies** without asking. Current deps are only `next`, `react`,
  `react-dom`, `react-icons`. No animation library, no UI kit, no state manager, no
  icon font, no analytics bundle.
- **No webfonts.** `globals.css` sets the system font stack on `body`. (Geist was once
  imported in `layout.tsx` and downloaded on every visit while the system stack
  overrode it — two wasted font requests for zero visual effect. Don't reintroduce it.)
- **Light animation only.** One-shot, user-triggered, short (≤250ms), and limited to
  `transform` / `opacity` / colour. No infinite or decorative animation, no parallax,
  no `backdrop-filter` (see the `.glass` comment — it re-ran the blur on every scroll
  frame across nearly every card), no large blur shadows at scale.
- **Never `transition: all`.** Name the exact properties. `.modern-card` transitions
  only `border-color` and `background-color`; `transition: all` fired hundreds of
  transition events per scroll.
- **Budget check:** `npm run build` prints First Load JS. If a change grows it, say by
  how much and why.

## Architecture
Next.js 16 App Router, **`output: "export"`** (full static export, `images.unoptimized`),
React 19, TypeScript, Tailwind CSS v4 (`@theme` in `app/globals.css`, no config file),
`react-icons`.

**Server components are the default.** Only three files carry `"use client"`:
`NavBar.tsx` (scroll-spy), `Contact.tsx` (form), `Carousel.tsx` (page dots). Adding a
fourth needs a reason. The pattern for keeping a section server-rendered while part of
it is interactive: the client component takes the cards as `children`, so
`Projects.tsx` and `Skills.tsx` stay server components (see `Projects.tsx:80`).

Project data lives in one module, `app/data/projects.ts`, consumed by both
`Projects.tsx` and `app/projects/[slug]/page.tsx`. The detail page uses
`generateStaticParams()` + `generateMetadata()` — required under `output: "export"`.

## Conventions
- **Layout decisions belong in CSS, not JS.** Cards-per-view is a `basis-*` +
  breakpoint decision, never a measured-width hook. A `useState(false)` +
  `matchMedia` hook (the old `useIsMobile`) ships the desktop layout in the static
  HTML and then re-renders on hydration — a visible flash on mobile for a value CSS
  already knows at parse time.
- **No viewport/scroll-triggered reveals.** Everything paints immediately.
  `IntersectionObserver`, `whileInView`, `ScrollTrigger`, `animation-timeline` are all
  out. `ResizeObserver` for sizing is fine. (Global rule; restated because this site
  has carousels that invite it.)
- **No hover motion** — hover/focus feedback is an instant colour change, never a
  scale, translate, shadow-glow, or transition.
- Scroll listeners must be `{ passive: true }` and must not read layout. `Carousel`'s
  `onScroll` reads only cached offsets, so it cannot force a reflow.
- Horizontal carousels are **plain `overflow-x-auto`** — native scrolling, no
  scroll-snap, no `scroll-behavior` override on the track. Page dots are additive.
- Anchor scrolling is native `scroll-behavior: smooth` on `html`, neutralised under
  `prefers-reduced-motion`. No JS scroll-easing library.
- Breakpoints: Phone `<768` (base) · Tablet `md:` · Wide `lg:` · Full Wide `full-wide:`
  (1440px, `--breakpoint-full-wide`). Mobile-first, discrete breakpoints — not fluid
  scaling — except the `*-fluid` type classes, which are deliberate `clamp()`.
- Mobile nav is a side drawer over the content, never a header panel expanding down.

## Commands
```
npm run dev      # localhost:3000
npm run build    # static export -> ./out
npm run lint
```

## Deployment
GitHub Pages via `.github/workflows/deploy.yml`, which uploads `./out`. Anything that
breaks `output: "export"` (middleware, route handlers, ISR, server actions,
`next/image` optimization, dynamic routes without `generateStaticParams`) breaks the
deploy.

## Decisions
- **No chatbot.** It was removed, not disabled — 584 lines of commented-out code plus a
  commented `CV_DATA` export. Don't resurrect it.
- **No flip cards.** About and the project cards were flip cards; both are flat now.
  The project card's "Preview" link goes to `/projects/<slug>` instead.
- **The detail page deliberately omits `NavBar`** — its links are hash-only and would
  break off the homepage. It reuses existing utility classes only (`modern-card`,
  `glass`, `text-gradient`, `heading-fluid`, `text-ice`) so it can't drift into its own
  visual language.
- `--breakpoint-full-wide` currently has zero `full-wide:` usages. Kept as the
  documented fourth breakpoint, not dead code.

## Known issues
- Every `images` array in `app/data/projects.ts` is empty, so the detail page's
  Screenshots section renders for nobody yet. Drop files in `public/images/` and fill
  the arrays.
- The carousel dot counts were verified by simulating the layout math, not in a
  browser: Projects 6/6/2/2 dots and Skills 5/3/2/2 at 390/768/1024/1440px.
