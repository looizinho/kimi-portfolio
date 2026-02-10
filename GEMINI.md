# Gemini Project Context: Kimi Portfolio

This document provides a comprehensive overview of the "Kimi Portfolio" project, designed to serve as instructional context for future interactions with the Gemini CLI.

## Project Overview

The Kimi Portfolio is a modern, interactive, and visually dynamic personal portfolio website. Its primary purpose is to showcase the developer's work and skills, highlighting projects and experiences in an engaging manner. The application features a responsive design, project showcases with detailed information, and a sophisticated user interface with animations and theming capabilities.

**Key Technologies:**

*   **Frontend Framework:** React (with Vite for fast development and bundling)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS, PostCSS, Autoprefixer
*   **UI Components:** Radix UI primitives, custom components (e.g., MagneticButton, GlitchText, TechOrbit)
*   **Animation Libraries:** GSAP (`gsap`, `@gsap/react`), React Three Fiber (`@react-three/fiber`, `@react-three/drei`), `tailwindcss-animate`
*   **Routing:** React Router DOM (`react-router-dom`)
*   **Form Management:** React Hook Form (`react-hook-form`) with Zod (`zod`) for validation
*   **Utility Libraries:** `clsx`, `tailwind-merge`, `date-fns`, `lenis`, `sonner`, `split-type`, `three`, `yaml`
*   **Markdown Rendering:** `react-markdown`, `remark-gfm`
*   **Development Tools:** ESLint, TypeScript compiler

**Architecture:**

The application follows a component-based architecture typical of React projects.
*   **Entry Point:** `src/main.tsx` renders the main `App` component.
*   **Routing:** `src/App.tsx` handles top-level routing using `react-router-dom` to navigate between `HomePage`, `WorksPage`, and `GalleryPage`.
*   **Pages:** Located in `src/pages/`.
*   **Components:** Reusable UI components are organized in `src/components/`, with primitive UI elements often leveraging Radix UI and located in `src/components/ui/`.
*   **Styling:** Global styles are defined in `src/index.css`, incorporating Tailwind CSS and custom CSS variables for a dynamic theming system (light/dark mode). Extensive custom animations contribute to a rich visual experience.
*   **Utilities & Hooks:** `src/lib/utils.ts` and `src/hooks/` contain reusable functions and custom React hooks.
*   **Content:** Static JSON data for portfolio items is found in `src/content/`.

## Building and Running

The project uses `Vite` for development and bundling.

**Prerequisites:**

*   Node.js (LTS recommended)
*   pnpm (as indicated by `pnpm-lock.yaml` in `app/`)

**Setup Instructions:**

1.  **Navigate to the `app` directory:**
    ```bash
    cd app
    ```
2.  **Install dependencies:**
    ```bash
    pnpm install
    ```
    *(Note: The `README.md` suggests `npm install`, but `pnpm-lock.yaml` indicates `pnpm` is likely the intended package manager.)*

**Available Scripts:**

*   **`pnpm run dev`**: Starts the development server.
*   **`pnpm run dev:open`**: Starts the development server and opens the application in your default browser, accessible on your network.
*   **`pnpm run build`**: Builds the application for production. This command first runs TypeScript compilation (`tsc -b`) and then uses Vite to build the project.
*   **`pnpm run lint`**: Runs ESLint to check for code style and quality issues.
*   **`pnpm run preview`**: Serves the production build locally for testing.

## Development Conventions

*   **Language:** TypeScript is strictly enforced with a comprehensive `tsconfig.app.json` configuration, promoting type safety and code quality.
*   **Styling:** Follows Tailwind CSS conventions, extended with custom CSS variables for theming. Dark mode is supported via a class-based toggle.
*   **Component Structure:** Components are organized logically within `src/components/` and `src/components/ui/`.
*   **Path Aliases:** The `@` alias maps to the `src` directory, simplifying imports (e.g., `import { HomePage } from '@/pages/HomePage';`).
*   **Linting:** ESLint is configured to maintain code consistency and identify potential issues.
*   **Animations:** Extensive use of GSAP, React Three Fiber, and CSS animations to create a dynamic and interactive user experience.
*   **Accessibility:** Includes considerations for reduced motion preferences.
*   **Content Management:** Static content like project details and gallery items are managed through JSON files in `src/content/`.
