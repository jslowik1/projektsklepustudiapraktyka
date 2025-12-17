This is a Next.js 15 (App Router) TypeScript storefront. It uses Firebase (client + admin), React Query for data fetching/caching and SCSS for styling.

Quick start

1. Install dependencies:

```bash
npm install
```

2. Run development server (Turbopack enabled):

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

Build / lint

```bash
npm run build        # build for production
npm run start        # start production server
npm run lint         # run eslint
```

Where to look (key files)

- Routing & pages: `src/app/` (App Router; layouts are Server Components by default).
- Client vs Server note: Client components include a top-line `'use client'` — move interactive UI into dedicated client components.
- Firebase client init: `src/lib/firebase.ts` — uses NEXT_PUBLIC_* env vars listed below.
- Firebase admin (server): `src/lib/firebase-admin.ts` — uses `FIREBASE_*` server env vars (service account values).
- API route handlers: `src/app/api/*/route.ts` (export `GET`/`POST`). See `src/app/api/users/route.ts` for examples.
- Auth & state: `src/context/AuthProvider.tsx`, `src/context/CartProvider.tsx`.
- Data fetching / hooks: `src/hooks/` and `src/query/` (React Query hooks such as `useGetProducts.ts`).
- Styles: SCSS files live under `src/app/assets/styles/` and alongside components for component-scoped styles.

Environment variables

Client-side (required by `src/lib/firebase.ts`):

- NEXT_PUBLIC_FIREBASE_API_KEY
- NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
- NEXT_PUBLIC_FIREBASE_PROJECT_ID
- NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
- NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
- NEXT_PUBLIC_FIREBASE_APP_ID

Server-side (required by `src/lib/firebase-admin.ts`):

- FIREBASE_PROJECT_ID
- FIREBASE_CLIENT_EMAIL
- FIREBASE_PRIVATE_KEY    (note: newlines are handled by the code via `.replace(/\\n/g, "\n")`)

Check `src/lib/firebase.ts` and `src/lib/firebase-admin.ts` for exact usage.

Conventions & gotchas

- The repo targets Next 15 App Router. Avoid `next/dynamic({ ssr: false })` inside Server Components.
- Use React Query hooks under `src/hooks/` / `src/query/` as canonical data layer.
- Put client-only UI in a single client component per area (e.g., navbar dropdowns inside one `'use client'` component).
- Do not commit secrets — use `.env.local` and CI secrets for deployment.

Private / project owner note

- This repository is a private college project and is not open for external contributions. Do not fork, clone publicly, or submit pull requests for this repository without explicit permission from the project owner.
- If you need to collaborate, contact the project owner for access and instructions. Keep all Firebase service account credentials and other secrets out of source control; use `.env.local` locally and CI secrets when deploying.
