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
- **Fonts:** Noto Sans for the UI and reading text. A monospace font only for the "Orange" wordmark.
- **Themes:** light and dark, both defined as tokens. No flash of the wrong theme on page load.
- **Accessibility:** WCAG AA contrast in both themes, visible keyboard focus, respect `prefers-reduced-motion`.

## Conventions

- **Folder layout:** the repo root is the `orange` folder. All app code lives in `orange/src` (the App Router is in `src/app`). Config files (`package.json`, `next.config`, `tsconfig.json`, ESLint config, `.storybook/`) stay at the repo root. Never create a nested project folder.
- **Components:** one lowercase folder per component, containing:
  - `index.tsx`
  - `styles.module.css`
  - `index.stories.tsx`
  - `spec.test.tsx` (added later, when testing starts)
- Use Server Components by default. Add `"use client"` only when a component needs state, effects, or browser APIs.
- Use design tokens (CSS variables) for all colors, spacing, radius, fonts, and shadows. No hard-coded values in component CSS.
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
| 0b | Design system (branch `feature/phase-0-design-system`): logo, tokens, fonts, themes, base components, Storybook wiring, first Vercel deploy | Not started |
| 1 | App shell: sidebar (Top, New, Best, Ask, Show, Jobs), theme toggle, mobile layout, loading/error/not-found pages | Not started |
| 2 | Story lists: Zod schemas, story rows with type icons, load more on scroll | Not started |
| 3 | Story page and comments: Algolia comment tree, HTML sanitizing, collapse, deleted/dead handling, polls, virtualization | Not started |
| 4 | User profiles | Not started |
| 5 | Search | Not started |
| 6 | Saved stories and read tracking | Not started |
| 7 | Keyboard shortcuts | Not started |
| 8 | PWA and offline support | Not started |
| 9 | Tests | Not started |

## Project structure

```
orange/                     # repo root
├── .storybook/             # Storybook config (@storybook/nextjs-vite)
│   ├── main.ts             # stories: src/**/*.stories.tsx
│   └── preview.ts
├── src/
│   └── app/                # Next.js App Router
│       ├── globals.css     # empty; filled by the design system (Phase 0b)
│       ├── layout.tsx      # root layout
│       └── page.tsx        # home page
├── AGENTS.md               # generated and kept up to date by `next dev`
├── CLAUDE.md
├── LICENSE                 # PolyForm Noncommercial 1.0.0 + Required Notice lines
├── eslint.config.mjs       # flat config: next, storybook, prettier
├── next.config.ts
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── .prettierrc.json
├── .prettierignore
└── tsconfig.json           # strict, `@/*` → `src/*`
```

Planned folders inside `src/` (created when first needed):

- `src/components/`: one lowercase folder per component (Phase 0b+)
- `src/lib/`: API clients, Zod schemas, pure helpers (Phase 2+)
- `src/styles/`: design tokens and theme CSS (Phase 0b)

Tooling: pnpm, Turbopack (Next.js default), Prettier (default options) with `eslint-config-prettier`, React Compiler off.

Scripts: `dev`, `build`, `start`, `lint`, `typecheck`, `format`, `format:check`, `storybook`, `build-storybook`.
