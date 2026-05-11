# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

- `pnpm dev` – start Vite dev server with HMR.
- `pnpm dev:open` – start dev server, open browser automatically, host publicly.
- `pnpm build` – run TypeScript build then Vite production build.
- `pnpm lint` – run ESLint across the project.
- `pnpm preview` – locally preview the production build.
- `pnpm test` – (no test script defined) – add a test runner if needed.

**Running a single test**: not applicable currently; add a test script (e.g., Jest) and use `pnpm test -- <test-file>`.

## Architecture Overview

The project is a React + TypeScript application built with Vite. It uses the following high‑level structure:

- **Entry point**: `src/main.tsx` mounts the `<App />` component.
- **Routing**: `react-router-dom` BrowserRouter defined in `src/App.tsx` with three routes (`/`, `/trabalhos`, `/galeria`).
- **Pages**: Each route renders a page component under `src/pages/*` (`HomePage`, `WorksPage`, `GalleryPage`). Pages compose reusable sections.
- **Sections**: UI sections (`Hero`, `About`, `Projects`, `TechStack`, `Contact`) live in `src/sections/*.tsx`.
- **Components**: Shared UI components under `src/components/*` and a UI library under `src/components/ui/*` (buttons, dialogs, etc.).
- **Styling**: Tailwind CSS with utilities (`cn` helper) and custom styles in `src/App.css` and Tailwind config.
- **Utilities**: `src/lib/utils.ts` provides the `cn` function for class merging.

## Development Tips

- Use the path alias `@/*` (configured in `tsconfig.app.json` and Vite) to import from `src`.
- The project relies on GSAP for scroll animations (registered in `HomePage`).
- Environment variables are managed by Vercel; local dev does not require any.

## Build / CI

CI workflow (`.github/workflows/vercel-deploy.yml`) builds on push to `main` and on PRs, using `pnpm dlx vercel@latest` to pull Vercel env, build, and deploy with `--prebuilt`.

## Cursor / Copilot Rules

No explicit `.cursor` or Copilot instruction files are present.
