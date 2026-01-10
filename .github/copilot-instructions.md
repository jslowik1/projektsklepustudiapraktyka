- PRIVATE — college project (private repository)

This repository is a Next.js (App Router) TypeScript storefront using Firebase (client + admin) and React Query.

Important: private project

- This repository is a private college project. Do not create public forks, pull requests, or share repository contents without the owner's explicit permission.
- When making edits locally for development or debugging, do not commit or leak sensitive values (Firebase service account, API keys). Use `.env.local` and treat server env vars (FIREBASE_PRIVATE_KEY, etc.) as secrets.

Quick context
- App Router lives under `src/app/` (server components by default). Client components include a top-line `'use client'`.
- Client Firebase SDK: `lib/firebase.ts`. Server/admin Firebase: `lib/firebase-admin.ts` (used by API route handlers).
- API route handlers live in `src/app/api/*/route.ts` (export `GET`/`POST` functions). See `src/app/api/users/route.ts` and `src/app/api/set-token/route.ts` for examples.
- State & auth: `src/context/AuthProvider.tsx`, `src/context/CartProvider.tsx`. Put auth UI logic in client components only.
- Data fetching hooks use React Query (`@tanstack/react-query`) and are under `src/hooks/` and `src/query/` (e.g., `useGetProducts.ts`, `useGetUsers.ts`).

Key patterns to follow
- Server vs Client: Prefer Server Components for pages; move interactive parts to a single Client Component (add `'use client'` at top). Example: layouts in `src/app/*/layout.tsx` are server components by default.
- API contracts: Route handlers return Web `Response` objects or JSON directly. Reuse `lib/firebase-admin.ts` for server-side operations to avoid exposing secrets.
- Auth token flow: frontend sets tokens via `app/api/set-token/route.ts` and checks via `app/api/isAdmin/route.ts`. Look at `AuthProvider.tsx` and `app/login/page.tsx` to see how tokens and cookies are wired.
- Styling: SCSS is used. Global styles at `src/app/assets/styles/*.scss`. Component-specific styles live alongside components (e.g., `app/account/admin/products/table.scss`). Import SCSS from the component or layout that needs it.

Developer workflows
- Run development server (uses Turbopack):
  npm run dev
- Build for production:
  npm run build && npm run start
- Linting:
  npm run lint

Files worth reading first
- `src/app/layout.tsx` and `src/app/page.tsx` — app-level layout and global UI.
- `src/middleware.ts` — examine routing/auth middleware behavior (guards, redirects).
- `lib/firebase.ts` & `lib/firebase-admin.ts` — Firebase initialization split (client vs server).
- `src/context/AuthProvider.tsx` — auth state, token management and how components check admin status.
- `src/app/api/*/route.ts` — examples of server-side handlers used by the app.

Conventions & gotchas
- Next version: project uses Next 15; rely on App Router conventions (route handlers, layouts). Avoid using `next/dynamic({ ssr: false })` inside Server Components.
- Put all client-only logic in a single client component per area (e.g., Navbar dropdowns inside a single `use client` component).
- Environment secrets: Firebase keys and admin credentials are expected in env vars. Check and update `.env.local` when needed. Do not hardcode secrets.
- React Query is the canonical caching layer. Use existing hooks under `src/hooks/` and `src/query/` to keep behavior consistent.

When adding features
- Add server logic in `src/app/api/.../route.ts` and use `lib/firebase-admin.ts` for privileged operations.
- Keep UI components in `src/app/components/` and co-locate SCSS when practical.

If anything is unclear or you want instructions on CI, deployment, or env var names used by Firebase, tell me and I will extend this file with those specifics.

Examples referenced above:
- `src/app/api/users/route.ts`
- `lib/firebase.ts`
- `lib/firebase-admin.ts`
- `src/context/AuthProvider.tsx`
- `src/app/assets/styles/index.scss`
