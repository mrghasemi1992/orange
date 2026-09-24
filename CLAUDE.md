# Orange: a modern Hacker News reader

## What this is

Orange is a read-only Hacker News client with a modern reader UI. It is a portfolio project by Mohammad Reza Ghasemi (front-end engineer, React). The goal is to show clean architecture, a custom design system, and good UX to recruiters.

- English only.
- Light and dark themes.
- No login, voting, or commenting. The official HN API is read-only.
- Data is fetched fresh when a page loads or refreshes. There are no live updates.
- License: PolyForm Noncommercial 1.0.0 (`LICENSE`). Noncommercial use is free with credit; commercial use needs a paid license. The "Orange" name and logo are not licensed. Never call the project "open source".

## Features (full scope)

- Story lists: Top, New, Best, Ask, Show, Jobs
- Story page with the full comment tree, including polls
- User profiles
- Search
- Saved stories and read tracking (stored in the browser only)
- Keyboard shortcuts (for example j/k navigation)
- PWA and offline support

## Tech stack

- **Framework:** Next.js with the App Router, React, TypeScript (strict mode)
- **Data fetching:** TanStack Query + native `fetch`. No Axios.
- **Validation:** Zod for every API response
- **UI primitives:** Base UI (`@base-ui/react`, unstyled). Use it for interactive parts like Tooltip, Dialog, Menu, Collapsible.
- **Styling:** CSS Modules + CSS custom properties as design tokens. No Tailwind. No component libraries (no shadcn/ui, no MUI).
- **Icons:** lucide-react
- **Virtualization:** TanStack Virtual (mainly for long comment threads)
- **HTML sanitizing:** required for all HTML that comes from HN (comments, Ask HN text, user "about"). The library is chosen in Phase 3.
- **Global state:** none by default. Add Zustand only if Phase 6 proves it is needed.
- **Design system docs:** Storybook
- **Hosting:** Vercel
- **Tests:** not in scope yet. Planned later. Write code that is easy to test (small pure functions, data logic separate from UI).

## Data sources

- **Official HN API** (`https://hacker-news.firebaseio.com/v0`): story lists (`topstories`, `newstories`, `beststories`, `askstories`, `showstories`, `jobstories`), single items, and user profiles.
- **Algolia HN API** (`https://hn.algolia.com/api/v1`): full comment trees in one request (`/items/:id`) and search (`/search`, `/search_by_date`).
- **All API requests run on the Next.js server** (Server Components or Route Handlers). The browser never calls Firebase or Algolia directly. Reason: server fetching avoids hundreds of browser requests and gives faster first loads.

## Data rules

- Parse every API response with Zod. Schemas must allow real-world messy data: `null` items, `deleted: true`, `dead: true`, and missing or `null` fields like author and text.
- One bad item must never crash a page. Use `safeParse`, skip the bad item, and log it in development.
- **Story lists:** skip `null`, deleted, and dead stories.
- **Comments:**
  - Deleted or dead comment **with replies:** show a small muted placeholder ("[deleted]" or "[flagged]") and keep the replies.
  - Deleted or dead comment **without replies:** hide it.

## Design system

- **Brand:** name "Orange". The logo is an orange (the fruit).
- **Look:** modern reader, calm and readable. Orange accent color.
- **Fonts:** Noto Sans for the UI and reading text. IBM Plex Mono only for the "Orange" wordmark and keyboard keys (`Kbd` and the shortcut chip in tooltips). Both load with `next/font`.
- **Themes:** light and dark, both defined as tokens. No flash of the wrong theme on page load.
  - Light tokens live on `:root` (and `[data-theme="light"]`), dark tokens on `[data-theme="dark"]`.
  - An inline script in `<head>` sets `data-theme` on `<html>` before the first paint: the saved choice in `localStorage` (`orange-theme`), otherwise the OS setting.
  - `src/utils/theme.ts` holds the theme functions (`getThemeFromDocument`, `setThemePreference`, `subscribeToThemeChanges`). `src/constants/theme.ts` holds the storage key and the inline script (`THEME_SCRIPT`). `src/components/theme-sync/` holds `ThemeSync`, which follows OS and other-tab changes.
- **Icons:** lucide-react, stroke 1.75 (set globally in CSS), sized with the `--icon-size-*` tokens. Import the `*Icon` export (`SearchIcon`, not `Search`) so icon names never clash with other identifiers or text.
- **Breakpoints:** `@custom-media` rules in `src/styles/media.css` (`--nav-mobile` is `width < 48rem`, `--nav-desktop` is `width >= 48rem`). `postcss.config.mjs` (`@csstools/postcss-global-data` + `postcss-custom-media`) injects them into every CSS file, so modules write `@media (--nav-mobile)` and never a raw width. JavaScript (`matchMedia`) uses the same values from `src/constants/media.ts`; keep the two in sync.
- **Theme toggle:** one icon button that switches light and dark and saves the choice. No System option: the OS setting applies until the first click. Both icons render and CSS on `[data-theme]` shows the right one; the label comes from `useSyncExternalStore` ("Toggle theme" on the server). The tooltip shows `T`; the shortcut is wired in Phase 7.
- **Accessibility:** WCAG AA contrast in both themes, visible keyboard focus, respect `prefers-reduced-motion`.

## Conventions

- **Folder layout:** the repo root is the `orange` folder. All app code lives in `orange/src` (the App Router is in `src/app`). Config files (`package.json`, `next.config`, `tsconfig.json`, ESLint config, `.storybook/`) stay at the repo root. Never create a nested project folder.
- **Components:** design system components (from the Claude Design handoff) live in `src/components/ui/`. Feature components (sidebar, story row, and so on) live directly in `src/components/`. Storybook titles follow the folder: `Design system/<Name>` for `ui/`, `Components/<Name>` for feature components. Each component gets one lowercase folder, containing:
  - `index.tsx`
  - `styles.module.css`
  - `index.stories.tsx`
  - `spec.test.tsx` (added later, when testing starts)
- **Props types:** extend native element props with `ComponentProps<"button">` (React 19), not `ComponentPropsWithoutRef`. `ref` is a normal prop, so components pass it through with `...rest` and need no `forwardRef`. A component that can render a button or a link (`Button`, `IconButton`) is typed as a union and passes `...rest` to both.
- Use Server Components by default. Add `"use client"` only when a component needs state, effects, or browser APIs.
- Use design tokens (CSS variables) for all colors, spacing, radius, fonts, and shadows. No hard-coded values in component CSS. Part-specific sizes from the design (control heights, badge padding, sidebar width, and so on) go in `src/styles/tokens/components.css`. Media queries use the custom media rules from `src/styles/media.css`.
- **Types, constants, utils and helpers** go in their own top-level folders, one file per topic (for example `sections.ts`):
  - `src/types/`: shared TypeScript types
  - `src/constants/`: fixed data and config (for example `SECTIONS`, the theme storage key)
  - `src/utils/`: generic functions that could be copied into another project as they are (for example `cx`, the theme functions)
  - `src/helpers/`: functions specific to Orange and its data (for example `getSection`)
  - Rule of thumb: if a function would work unchanged in another project, it's a util. If it knows about Orange (its sections, HN data), it's a helper.
- Folder structure inside `src/`: see the "Project structure" section below.

## Workflow

1. Design one phase in Claude Design.
2. Send it to Claude Code with the "Send to Claude Code" button, together with that phase's Claude Code prompt.
3. Implement only that phase.
4. Commit on the phase branch and open a PR.
5. Merge when `build`, `lint`, and type check pass (tests are added later).
6. Move to the next phase.

Phase 0a (project setup) has no design step. It runs in Claude Code only.

- **Git:** project setup (Phase 0a) is committed directly on `main`. Every step after that gets its own branch created from `main`.
- **Approval before committing:** never commit without asking first. Show the files that changed and the proposed commit message(s), then wait for an explicit OK. An earlier approval does not cover later commits. The same applies to pushing.
- **Branch names:** follow [Conventional Branch](https://conventionalbranch.org/): `<type>/<description>`.
  - Types: `feature/`, `bugfix/`, `hotfix/`, `release/`, `chore/`. Use these full forms, not `feat/` or `fix/`.
  - Only lowercase letters, numbers, and hyphens. No double hyphens, and no hyphen at the start or end.
  - `main` has no prefix.
  - Phase branches use `feature/phase-<number>-<short-name>` (for example `feature/phase-0-design-system`, `feature/phase-1-app-shell`).
- **Commit messages:** follow [Conventional Commits](https://www.conventionalcommits.org/): `<type>: <description>` (for example `feat: add button component`, `fix: correct dark theme border color`, `chore: install storybook`).
- The PR description summarizes what the phase added.
- No hand-written design spec files. The design comes from the Claude Design handoff.
- When a decision changes, update this file in the same PR.

## Phases

| # | Phase | Status |
|---|-------|--------|
| 0a | Project setup (on `main`): Next.js, TypeScript, ESLint, packages, Storybook install | Done |
| 0b | Design system (branch `feature/phase-0-design-system`): logo, tokens, fonts, themes, base components, Storybook wiring, first Vercel deploy | Done |
| 1 | App shell (branch `feature/phase-1-app-shell`): sidebar (Top, New, Best, Ask, Show, Jobs), theme toggle, mobile top bar and drawer, loading/error/not-found pages | Done |
| 2 | Story lists: Zod schemas, story rows with type icons, load more on scroll | Not started |
| 3 | Story page and comments: Algolia comment tree, HTML sanitizing, collapse, deleted/dead handling, polls, virtualization | Not started |
| 4 | User profiles | Not started |
| 5 | Search | Not started |
| 6 | Saved stories and read tracking | Not started |
| 7 | Keyboard shortcuts | Not started |
| 8 | PWA and offline support | Not started |
| 9 | Tests | Not started |

## Routes

| Route | Page | Since |
|-------|------|-------|
| `/` | Top | Phase 1 (placeholder until Phase 2) |
| `/new` | New | Phase 1 (placeholder until Phase 2) |
| `/best` | Best | Phase 1 (placeholder until Phase 2) |
| `/ask` | Ask | Phase 1 (placeholder until Phase 2) |
| `/show` | Show | Phase 1 (placeholder until Phase 2) |
| `/jobs` | Jobs | Phase 1 (placeholder until Phase 2) |

The six section routes come from `SECTIONS` in `src/constants/sections.ts` (label, href, description, icon), shared by the sidebar and the pages. Every page renders inside `AppShell` (`src/app/layout.tsx`): skip link, sidebar (top bar and drawer below 48rem), and `<main id="main">`. `loading.tsx`, `error.tsx` and `not-found.tsx` render inside the shell too. Page titles read `<Label> | Orange`.

## Project structure

```
orange/                     # repo root
├── .storybook/             # Storybook config (@storybook/nextjs-vite)
│   ├── main.ts             # stories: src/**/*.stories.tsx
│   └── preview.tsx         # global CSS, next/font variables, light/dark toolbar, App Router mocks
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── globals.css     # imports the tokens, base styles and type helpers
│   │   ├── layout.tsx      # root layout: fonts, inline theme script, ThemeSync, AppShell
│   │   ├── page.tsx        # Top (/)
│   │   ├── new/  best/  ask/  show/  jobs/   # page.tsx per section
│   │   ├── loading.tsx     # story list skeleton
│   │   ├── error.tsx       # "Something went wrong" + Try again (retry)
│   │   ├── not-found.tsx   # "Page not found" + Back to Top
│   │   ├── icon.svg        # favicon
│   │   └── apple-icon.tsx  # app icon, rendered to PNG with next/og
│   ├── components/
│   │   ├── app-shell/      # skip link, sidebar or mobile nav, <main id="main">
│   │   ├── sidebar/        # logo, section links, theme toggle; `drawer` variant
│   │   ├── nav-link/       # sidebar link, sets aria-current from usePathname
│   │   ├── mobile-nav/     # top bar + Base UI Dialog drawer, MobileNavClose
│   │   ├── theme-toggle/   # light/dark icon button
│   │   ├── theme-sync/     # ThemeSync: renders nothing, only index.tsx
│   │   ├── page-header/    # page title + one-line description
│   │   ├── page-message/   # title, description, one action (error, not found)
│   │   ├── section-placeholder/  # temporary section body (replaced in Phase 2)
│   │   ├── story-list-skeleton/  # loading placeholder for a story list
│   │   └── ui/             # one lowercase folder per component
│   │       ├── badge/  button/  divider/  icon-button/  kbd/  link/
│   │       ├── logo/  logo-mark/  meta-item/  skeleton/  tooltip/
│   │       └── foundations/  # Storybook-only docs: tokens, type scale, real data
│   ├── constants/          # fixed data and config
│   │   ├── media.ts        # NAV_DESKTOP_QUERY for matchMedia (mirrors styles/media.css)
│   │   ├── sections.ts     # SECTIONS: label, href, description, icon
│   │   ├── site.ts         # SITE_NAME, SITE_DESCRIPTION
│   │   └── theme.ts        # storage key, data-theme attribute, THEME_SCRIPT
│   ├── helpers/            # functions specific to Orange
│   │   └── sections.ts     # getSection, getSectionMetadata
│   ├── types/              # shared types
│   │   ├── sections.ts     # Section, SectionId
│   │   └── theme.ts        # Theme, ThemePreference
│   ├── utils/              # generic functions, reusable in other projects
│   │   ├── cx.ts           # class name helper
│   │   └── theme.ts        # read, save and follow the theme
│   └── styles/
│       ├── tokens/         # colors, typography, spacing, radius, shadows, motion, components
│       ├── media.css       # @custom-media breakpoints, injected by PostCSS
│       ├── base.css        # element defaults, .visually-hidden
│       ├── typography.css  # global .type-* helper classes
│       └── fonts.ts        # next/font: Noto Sans, IBM Plex Mono
├── AGENTS.md               # generated and kept up to date by `next dev`
├── CLAUDE.md
├── LICENSE                 # PolyForm Noncommercial 1.0.0 + Required Notice lines
├── eslint.config.mjs       # flat config: next, storybook, prettier
├── next.config.ts          # allowedDevOrigins, dev badge bottom-right
├── postcss.config.mjs      # global-data + custom-media (Next.js and Storybook)
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── .prettierrc.json
├── .prettierignore
└── tsconfig.json           # strict, `@/*` → `src/*`
```

Component folders contain `index.tsx`, `styles.module.css` and `index.stories.tsx`. A component that renders nothing (`theme-sync`) has only `index.tsx`. Client components: `tooltip` (Base UI), `nav-link` (usePathname), `theme-toggle`, `mobile-nav` (Base UI Dialog), `theme-sync` and `src/app/error.tsx`. Everything else is a Server Component; `icon-button` and `sidebar` render client parts but stay server-rendered.

Stories that depend on the route set `parameters.nextjs.navigation.pathname` (App Router mocks are on in `.storybook/preview.tsx`).

Planned folders inside `src/` (created when first needed):

- `src/lib/`: API clients and Zod schemas (Phase 2+)

Tooling: pnpm, Turbopack (Next.js default), Prettier (default options) with `eslint-config-prettier`, React Compiler off.

The dev server and Storybook run on `orange.localhost` (`next dev -H orange.localhost`, `storybook dev --host orange.localhost`); `allowedDevOrigins` in `next.config.ts` allows that origin.

Scripts: `dev`, `build`, `start`, `lint`, `typecheck`, `format`, `format:check`, `storybook`, `build-storybook`.
