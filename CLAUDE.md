# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A personal portfolio website with an integrated blog system. Built with Next.js (Pages Router), React 19, Tailwind CSS, and multiple animation libraries (Framer Motion, GSAP, React Spring). Live at https://slowey.dev.

## Commands

- **Dev server:** `npm run dev` (port 3000)
- **Build:** `npm run build`
- **Lint:** `eslint .`
- **Run all Playwright tests:** `npx playwright test`
- **Run a single test file:** `npx playwright test tests/playwright/ux-wcag.spec.js`
- **Run tests for one project:** `npx playwright test --project=desktop` or `--project=mobile`

Playwright auto-starts the dev server if not already running.

## Architecture

### Routing & Pages

Uses **Next.js Pages Router** (not App Router). Pages live in `pages/`, API routes in `pages/api/`. Dynamic blog routes via `pages/blog/[slug].js`.

### Data Flow

- **Portfolio content:** All data is in `data/portfolio.json` — projects, resume, services, social links, etc. No database.
- **Blog posts:** Markdown files with YAML frontmatter in `_posts/en/`. File I/O utilities in `utils/api.js`. Rendered with remark + react-markdown.
- **Translations:** English strings in `data/locales/en.json`.

### Dev-Only Features

Several features are gated to `NODE_ENV === "development"` only:
- Blog create/edit/delete APIs (`pages/api/blog/`)
- Portfolio data editor (`pages/edit.js`, accessible via `Ctrl+Alt+E` / `Cmd+E`)
- Contact form API (`pages/api/contact.js`)

### Styling

Tailwind with custom design tokens in `tailwind.config.js`:
- **Breakpoints:** `mob`, `tablet`, `laptop`, `laptopl`, `desktop`
- **Colors:** `neo-*` palette using CSS custom properties
- **Shadows:** `neo`, `neo-sm`, `neo-lg` (neobrutalist box shadows)
- Global animations and theme variables in `styles/globals.css`

### Animation Strategy

Three animation libraries coexist:
- **Framer Motion:** Component-level animations and page transitions (`components/PageTransition/`)
- **GSAP:** Timeline-based animations (eye blink on homepage, ticker scroll)
- **React Spring:** Spring physics interactions

### Contact Form

Uses Nodemailer with Gmail. Sends email and optionally logs to Google Sheets. Requires env vars: `EMAIL_USER`, `EMAIL_APP_PASSWORD`, `EMAIL_FROM_NAME`.

### Environment Variables

Required in `.env.local`:
```
EMAIL_USER, EMAIL_APP_PASSWORD, EMAIL_FROM_NAME
GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO
```
