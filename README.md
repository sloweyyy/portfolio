# SloWey Portfolio Website

[![Live](https://img.shields.io/badge/live-slowey.dev-EBD22F?style=flat-square&labelColor=000)](https://slowey.dev)
[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-149ECA?style=flat-square&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38BDF8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deployed-Vercel-000?style=flat-square&logo=vercel)](https://vercel.com)

Personal portfolio + blog for **Truong Le Vinh Phuc (sloweyyy)** — Technical Product Manager & Software Engineer. Built with Next.js (Pages Router), React 19, Tailwind CSS, and a neobrutalist "Byooooob" design system. Live at [slowey.dev](https://slowey.dev).

![Portfolio Demo](public/images/demo.png)

## What's inside

### Homepage

- **Hero** with animated taglines, custom Byooooob eye SVGs, and an Oswald + Sharp Grotesk type pairing.
- **"Damn! I did this?" project section** — 12 projects, each rendered as a real **1600×900 banner canvas** in the project card (six neobrutalist templates: Big Type, Gradient Headline, Sticker Collage, Terminal/Code, Stats, Split/Evolution). Banners auto-scale via `ResizeObserver` and zoom into a full-size modal on click.
- **Hall of Fame, services, work timeline** — all driven by a single `data/portfolio.json`.

### Blog

- Markdown-based posts in `_posts/en/` with YAML frontmatter, rendered via `react-markdown` + `remark`.
- **Reading-time estimate** computed from stripped markdown in `getStaticProps`.
- **Neobrutalist quote callouts** — yellow fill, 6px black left border, drop shadow.
- **"Get in touch" CTA** at the post foot, opens the contact modal.
- **"Keep reading" section** — 3 related posts as neobrutalist cards with deterministic accent colors.
- **Custom hero banner** for the [Claude Code Insights post](https://slowey.dev/blog/9c25e36f-0811-4d6d-803c-0fb3818d75f0): a full info-graphic (impact card, metrics strip, usage list, response-time chart, friction/satisfaction breakdown, bottom callout) replaces the standard image hero. Slug-keyed via `components/BlogBanner` so adding more is a one-liner.
- Code blocks syntax-highlighted with Dracula via `react-syntax-highlighter`.

### Resume

- Standalone `/resume` page driven by the same `portfolio.json`.

### Local-only authoring

- `/edit` page (gated to `NODE_ENV === "development"`) for editing portfolio + resume in-app.
- Blog create / edit / delete via `pages/api/blog/*` (also dev-only).
- **Keyboard shortcut:** `Ctrl + Alt + E` (or `Cmd + E`) anywhere to open the editor.

### Contact

- Modal-based form opened from the header (and the blog post CTA).
- Sends email via **Nodemailer + Gmail**, optionally logs to **Google Sheets** if creds are present.

### Misc

- Custom mouse cursor on hoverable elements (toggle via `data.showCursor`).
- Vercel Analytics + Speed Insights wired up.
- Playwright UX / WCAG accessibility tests in `tests/playwright/`.

## Tech stack

| Layer | Tech |
| --- | --- |
| Framework | Next.js 16 (Pages Router), React 19, TypeScript 5 |
| Styling | Tailwind CSS 3, scoped CSS files for banner systems, custom Byooooob design tokens |
| Animation | Framer Motion + GSAP + React Spring (page transitions, eye blink, ticker, springs) |
| Markdown | gray-matter + remark + react-markdown + react-syntax-highlighter |
| Forms | Nodemailer (Gmail), googleapis (Sheets, optional) |
| Editor (dev only) | react-textarea-autosize, react-datepicker, custom CRUD APIs |
| Tooling | yarn 1.22, ESLint 9, Playwright |
| Hosting | Vercel (static + serverless functions) |

## Project structure

```
pages/
  index.js              # Homepage (hero + projects + services + hall + work)
  resume.js             # Resume page
  edit.js               # Dev-only portfolio editor
  blog/
    index.js            # Blog listing
    [slug].js           # Blog post (banner-aware)
  api/
    contact.js          # Nodemailer + Sheets handler
    blog/               # Dev-only blog CRUD
    portfolio.js        # Dev-only portfolio CRUD
components/
  ProjectBanner/        # 12-project banner system (6 templates, slug-keyed)
  BlogBanner/           # Slug-keyed blog hero banners (e.g. Claude Code Insights)
  ProjectSection/       # Homepage projects with banner-driven cards
  ContentSection/       # Markdown renderer with custom code/img/link/blockquote
  BlogEditor/           # Dev-only blog editor modal
  ContactForm/          # Modal contact form
  ...                   # Header, Footer, Cursor, ServiceCard, Toaster, etc.
data/
  portfolio.json        # All non-blog content
  locales/en.json       # English UI strings
_posts/en/              # Markdown blog posts
styles/
  globals.css           # Byooooob design tokens, typography, base
  banners.css           # Project-banner design system (b1–b6, scoped to .project-banner-root)
  blog-banners.css      # Blog hero banners (scoped to .blog-banner-root)
  markdown.css          # Markdown content styles (incl. neobrutalist blockquote)
tests/playwright/       # UX / WCAG specs
```

## Getting started

This project uses **yarn** (`packageManager: "yarn@1.22.19"` is pinned). Vercel auto-detects yarn from `yarn.lock`.

```bash
git clone https://github.com/sloweyyy/portfolio.git
cd portfolio
yarn install
yarn dev
```

App runs at `http://localhost:3000`.

### Environment variables

Create `.env.local`:

```env
# Email (required for contact form)
EMAIL_USER=<gmail-address>
EMAIL_APP_PASSWORD=<gmail-app-password>
EMAIL_FROM_NAME=<your-name>

# GitHub (required for the dev blog editor's API routes)
GITHUB_TOKEN=<personal-access-token>
GITHUB_OWNER=<github-username>
GITHUB_REPO=<repo-name>
```

| Var | Purpose |
| --- | --- |
| `EMAIL_USER` / `EMAIL_APP_PASSWORD` | Gmail account + [App Password](https://myaccount.google.com/apppasswords) for outbound mail. |
| `EMAIL_FROM_NAME` | Display name on outgoing emails. |
| `GITHUB_TOKEN` / `GITHUB_OWNER` / `GITHUB_REPO` | Used by `/api/blog` to round-trip markdown changes back to the repo (dev only). |

### Scripts

| Command | What it does |
| --- | --- |
| `yarn dev` | Start the Next.js dev server on port 3000. |
| `yarn build` | Production build. |
| `yarn start` | Run the built app. |
| `yarn lint` | ESLint over the project. |
| `npx playwright test` | Run the full UX / WCAG suite. |
| `npx playwright test --project=desktop` | Desktop viewport only. |
| `npx playwright test --project=mobile` | Mobile viewport only. |

Playwright auto-starts the dev server if it isn't running.

## Customizing

- **Portfolio data** — edit `data/portfolio.json`. The `/edit` page (dev only, `Cmd + E`) writes back to it through `/api/portfolio`.
- **Add a blog post** — drop a markdown file with YAML frontmatter into `_posts/en/`. The `/edit` page can scaffold one via `/api/blog`.
- **Add a project banner** — pre-bake the JSX in `components/ProjectBanner/index.js` keyed by the project's `id`. Six templates (`b1`–`b6`) live in `styles/banners.css`.
- **Add a blog hero banner** — add an entry to `components/BlogBanner/index.js` keyed by the post's slug; styles go in `styles/blog-banners.css`.
- **Design tokens** — `--neo-pink`, `--neo-yellow`, `--neo-purple`, etc. are defined in `styles/globals.css` and referenced from `tailwind.config.js`.
- **Theme** — the app currently runs `forcedTheme="light"` in `pages/_app.js`. Flip it to enable dark-mode toggling via `next-themes`.

## Deployment

Deployed on Vercel. The `vercel build` step runs `yarn install` followed by `yarn build`. No special configuration needed — `yarn.lock` is the source of truth, `package-lock.json` is gitignored to prevent accidental npm contamination.

```bash
vercel
```

…or use the [import flow](https://vercel.com/new) for first-time setup. Make sure `EMAIL_USER`, `EMAIL_APP_PASSWORD`, and `EMAIL_FROM_NAME` are set in the Vercel project's environment variables for the contact form to work in production.

## License

MIT — see [LICENSE](LICENSE).
