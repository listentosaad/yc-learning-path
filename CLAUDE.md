# CLAUDE.md — yc-learning-path

## Project Overview

An Arabic-language, single-page interactive learning path for YC-style startup founders. Users progress through 6 curated modules (YC videos + Paul Graham essays), check off items, and see their progress tracked in localStorage. Deployed at https://founder-path.com.

The UI is fully RTL (`lang="ar" dir="rtl"` on `<html>`). All user-facing text is in Arabic. Keep it that way.

---

## Tech Stack

| Layer      | Tool                                    |
|------------|-----------------------------------------|
| Framework  | React 18 (no router — single page)      |
| Build      | Vite 5                                  |
| Styling    | Tailwind CSS 3 + CSS custom properties  |
| Fonts      | ThmanyahSans / ThmanyahSerif (OTF)      |
| Analytics  | Umami (privacy-first, no cookies)       |
| State      | `useState` + `localStorage` (no Redux)  |
| Deployment | Static hosting (dist/ output)           |

No TypeScript. No test suite. No backend. No environment variables.

---

## Commands

```bash
npm install        # install dependencies
npm run dev        # dev server at http://localhost:5173 (HMR enabled)
npm run build      # production build → dist/
npm run preview    # preview the production build locally
```

---

## File Structure

```
src/
  main.jsx          # React entry point — mounts <App />
  App.jsx           # ENTIRE application (data + all components)
  index.css         # Font-face declarations, CSS vars, Tailwind imports, keyframes

public/
  fonts/            # ThmanyahSans & ThmanyahSerif OTF files (5 files)
  preview.png       # OG image for social sharing

index.html          # HTML shell — sets lang="ar" dir="rtl", Umami script, OG tags
tailwind.config.js  # Custom fonts, borderRadius.card, animation.card-in
postcss.config.js   # Tailwind + Autoprefixer
vite.config.js      # Minimal — just @vitejs/plugin-react
```

> **Note:** There are duplicate font `.otf` files at the project root. They are unused — only `/public/fonts/` is referenced in CSS. Safe to delete the root-level ones.

---

## Architecture

Everything lives in `src/App.jsx`. The file is organized top-to-bottom:

1. **`MODULES` array** — all content data (ids, titles, videos, readings)
2. **`STORAGE_KEY`** — localStorage key (`yc_study_plan_v1`)
3. **`loadChecked` / `saveChecked`** — localStorage helpers
4. **`ALL_ITEMS` / `TOTAL`** — derived constants computed once at module load
5. **Components** (in render order):
   - `RingProgress` — SVG circular progress ring with checkmark at 100%
   - `ItemRow` — a single video or reading row (checkbox + link)
   - `SectionLabel` — "فيديوهات" / "قراءات" section headers
   - `ModuleCard` — collapsible card (header with ring + expand/collapse body)
   - `CelebrationBox` — animated stars + completion message (shown when all done)
   - `ShareSection` — copy-to-clipboard invite button
   - `App` — root component, owns all state

---

## State Management

`App` holds one state object:

```js
const [checked, setChecked] = useState(loadChecked);
// Shape: { [itemId: string]: boolean }
// e.g. { m1v1: true, m2r1: false, ... }
```

Toggling an item:
```js
setChecked(prev => {
  const next = { ...prev, [id]: !prev[id] };
  saveChecked(next);
  return next;
});
```

Progress is derived: `const done = ALL_ITEMS.filter(i => checked[i.id]).length`.

No prop drilling issues — `checked` and `onToggle` flow down two levels max.

---

## Content Data Model

Modules are defined in the `MODULES` constant at the top of `App.jsx`:

```js
{
  id: 'm1',         // unique module id
  num: '01',        // display number (string, shown as badge)
  title: 'القرار بالبدء',
  subtitle: 'هل يجب أن تبني شركة ناشئة؟',
  videos: [
    { id: 'm1v1', label: '...', url: 'https://...' }
  ],
  readings: [
    { id: 'm1r1', label: '...', url: 'https://...' }
  ],
}
```

**ID convention:** `m{moduleNum}{type}{itemNum}` — e.g., `m3v2` = module 3, video 2.

**To add a new module:** append to `MODULES`. No other changes needed — `ALL_ITEMS` and `TOTAL` are computed dynamically.

**To add an item to an existing module:** append to its `videos` or `readings` array with a unique `id`. Existing checked state in localStorage is unaffected (new items just start unchecked).

**Never change an existing item's `id`** — doing so silently breaks localStorage progress for all existing users.

---

## Styling System

### CSS Custom Properties (in `index.css`)
```css
--accent: oklch(0.68 0.18 45)       /* warm golden/orange */
--accent-dim: oklch(.../ 0.15)      /* accent at 15% opacity — hover bg, borders */
--accent-glow: oklch(.../ 0.08)     /* accent at 8% opacity — subtle glow */
```

### Tailwind Custom Tokens (in `tailwind.config.js`)
- `rounded-card` → `14px` (module card corners)
- `animate-card-in` → fade + slide-up 0.4s (applied to `ModuleCard` body on open)

### Conventions
- Dark background: `#0d0d0d` — never use Tailwind's `bg-black` (too harsh)
- Hover states: `hover:bg-[#1a1a1a]` on rows
- Dividers: `border-white/[0.06]` (very subtle)
- Text hierarchy: white → `text-white/70` → `text-white/40`
- RTL layout: Tailwind's `flex-row-reverse` is not needed — the browser handles RTL automatically

### Fonts
- `ThmanyahSans` (weights: 300, 400, 700) — UI text
- `ThmanyahSerif` (weights: 500, 700) — headings

---

## Animation

Two animations defined in CSS:

1. **`cardIn`** — module body open animation. Applied via `animate-card-in` class. Starts hidden (`opacity: 0; transform: translateY(20px)`) and transitions in. The `opacity: 0` initial state is set in the utility layer to prevent flash before animation.

2. **`floatStar`** — celebration floating stars. Stars are absolutely positioned spans that animate up and fade out.

Stagger effect on module cards uses inline `animationDelay` style, e.g., `style={{ animationDelay: \`${index * 80}ms\` }}`.

---

## Analytics

Umami is loaded in `index.html` via script tag. It's cookieless and GDPR-compliant.

- Script: `https://cloud.umami.is/script.js`
- Website ID: `5598765b-d5c8-4d5a-8f19-b8dc17a71efa`
- No custom events are tracked currently — only page views

To track custom events (e.g., module completion), use:
```js
window.umami?.track('module-complete', { module: 'm1' });
```

---

## Deployment

The app builds to `dist/` as a fully static site. No server-side rendering, no API routes.

```bash
npm run build   # generates dist/
```

Deploy `dist/` to any static host (Netlify, Vercel, Cloudflare Pages, S3+CDN).

The site is live at https://founder-path.com.

---

## Known Tech Debt

- **All code in one file:** `App.jsx` is ~600+ lines. When adding significant features, consider splitting into `src/components/` and `src/data/modules.js`.
- **No tests:** No Vitest or testing-library setup. If adding tests, prefer Vitest (already have Vite) + React Testing Library.
- **No TypeScript:** JSDoc type comments are sufficient for now; add TS via `@ts-check` pragmas if needed without a full migration.
- **Root-level font files:** Five `.otf` files exist at the project root and are unused. Delete them.
- **Legacy HTML file:** `خطة دراسة ريادة الأعمال.html` (~1.56 MB) is the original pre-React version. It's not served — safe to delete once it's no longer needed for reference.
