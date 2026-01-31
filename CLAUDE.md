# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Nex is a UCSC-specific web application with a Next.js 16 frontend and a MariaDB database. The project is in early development on the `feature/init` branch.

## Commands

All commands run from the `frontend/` directory:

```bash
npm run dev          # Dev server at localhost:3000
npm run build        # Production build
npm run lint         # ESLint + Prettier
npm run test         # Jest with coverage
npm run test:watch   # Jest watch mode with coverage
```

Database:
```bash
docker-compose up    # MariaDB on localhost:3306 (root/mysql, database: nexdb)
```

## Architecture

- **Framework:** Next.js 16 App Router with TypeScript, React 19
- **Styling:** MUI 7 + Tailwind CSS 4 + Emotion (CSS-in-JS)
- **Auth:** better-auth with Google OAuth; restricted to @ucsc.edu emails
- **Database:** MariaDB via mysql2 connection pool (`frontend/app/lib/db.ts`)
- **State:** Redux (partial setup in `frontend/app/redux/`)
- **Testing:** Jest 30 + React Testing Library; tests in `frontend/__tests__/`

### Key paths

- `frontend/app/lib/auth.ts` — better-auth server config with custom user fields (preferredName, major, pronouns, bio, etc.)
- `frontend/app/lib/auth-client.ts` — Client-side auth helpers
- `frontend/app/lib/db.ts` — MySQL2 connection pool (global caching in dev)
- `frontend/proxy.ts` — Middleware for route protection (redirects unauthenticated users, checks onboarding status)
- `frontend/app/providers/AppThemeProvider.tsx` — MUI theme with light/dark mode
- `backend/database.sql` — DB init script mounted by docker-compose
- `backend/tables.sql` — Table definitions (incomplete)

### Route structure

- `/` — Public home
- `/login` — Google OAuth login
- `/forbidden` — UCSC email validation error
- `/onboarding` — 5-step onboarding form (Personal, Academic, Professional, Social, Goals)
- `/dashboard` — Protected; requires auth + completed onboarding

### API routes

- `app/api/auth/[...all]/` — better-auth handler
- `app/api/users/` — User list endpoint
- `app/api/users/[id]/` — Single user endpoint
- `app/api/projects/` — Project CRUD (partially stubbed)

### TypeScript path alias

`@/*` maps to `frontend/*` (configured in tsconfig.json).