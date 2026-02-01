# Solea Socials (solea-social-v1)

Premium marketing agency website built with Next.js App Router. This README documents the current site, routes, data flows, and admin tooling based on the existing codebase.

## Tech stack
- Next.js 16 (App Router), React 18, TypeScript
- Tailwind CSS v4 + tw-animate-css
- Framer Motion for page/section animations
- Prisma + PostgreSQL
- Radix UI primitives, lucide-react icons
- Zod validation
- Vercel Analytics

## Project structure
- `app/` App Router routes, layouts, and API endpoints.
- `components/` UI building blocks, sections, admin UI, analytics helpers.
- `lib/` Auth helpers and Prisma client.
- `prisma/` Database schema, migrations, seed.
- `public/` Static assets (logos, images, work thumbnails).
- `styles/` Additional styles (if any).

## Public site map
- `/` Home page composed of section components. `app/page.tsx`
- `/services` Services landing page with cards and process. `app/services/page.tsx`
- `/work` Portfolio index with filters and featured case. `app/work/page.tsx`
- `/work/[slug]` Case study detail pages (hardcoded cases). `app/work/[slug]/page.tsx`
- `/about` Brand story page. `app/about/page.tsx`
- `/team` Founder profile page. `app/team/page.tsx`
- `/contact` Contact form + office info. `app/contact/page.tsx`

## Admin area (protected)
Admin routes use a signed cookie (`admin_session`) and server-side checks in `app/admin/(protected)/layout.tsx`.

- `/admin` Redirects to login or dashboard based on session. `app/admin/page.tsx`
- `/admin/login` Login form. `app/admin/login/page.tsx`
- `/admin/dashboard` KPI dashboard + charts. `app/admin/(protected)/dashboard/page.tsx`
- `/admin/messages` Contact inbox. `app/admin/(protected)/messages/page.tsx`
- `/admin/settings` Admin profile + logo upload. `app/admin/(protected)/settings/page.tsx`

## API endpoints
- `POST /api/contacts` Create a contact message (public).
- `GET /api/contacts` List latest contacts (admin only).
- `PATCH /api/contacts/[id]` Update contact status (admin only).
- `POST /api/track` Pageview tracking (public).
- `POST /api/admin/login` Authenticate and set admin cookie.
- `POST /api/admin/logout` Clear admin cookie.
- `GET /api/admin/settings` Fetch admin profile (admin only).
- `PATCH /api/admin/settings` Update profile/password (admin only).
- `POST /api/admin/logo` Upload and replace `public/logo.png` (admin only).

## Data model (Prisma)
Defined in `prisma/schema.prisma`.

- `AdminUser` Email/password for admin access.
- `Contact` Contact form submissions with status enum.
- `PageView` Analytics events collected by `/api/track`.
- Enums: `ContactStatus`, `TrafficSource`.

## SEO and analytics
- Global metadata, Open Graph, and Twitter cards in `app/layout.tsx`.
- JSON-LD for Organization and WebSite in `app/layout.tsx`.
- Services page adds Service JSON-LD. `app/services/page.tsx`
- `app/robots.ts` disallows `/admin` and `/api`.
- `app/sitemap.ts` includes core pages and case studies.
- Custom pageview tracker posts to `/api/track`. `components/analytics/pageview-tracker.tsx`
- Vercel Analytics via `@vercel/analytics/next`.

## Content and sections
Key content is in code (no CMS).

- Home sections: `components/sections/hero.tsx`, `components/sections/services-section.tsx`, `components/sections/projects-section.tsx`, `components/sections/about-founder-section.tsx`, `components/sections/client-showcase.tsx`, `components/sections/closing-cta.tsx`.
- Services content: `components/pages/services-view.tsx` (service cards + process).
- Work portfolio: `app/work/projects.ts` (projects list for `/work`).
- Case studies: `app/work/[slug]/page.tsx` (hardcoded cases).
- Header nav: `components/header.tsx`.
- Footer contact and social links: `components/footer.tsx`.

## UX/UI highlights
- Preloader animation: `components/preloader.tsx`.
- Page transitions: `components/page-transition.tsx`.
- Custom cursor: `components/custom-cursor.tsx`.
- Mobile CTA bar: `components/mobile-cta-bar.tsx`.
- Theme tokens in `app/globals.css` (custom palette + typography scale).

## Environment variables
See `.env.example`:
- `DATABASE_URL`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `ADMIN_SESSION_SECRET`

## Scripts
From `package.json`:
- `npm run dev` Start dev server.
- `npm run build` Production build.
- `npm run start` Serve production build.
- `npm run lint` Lint.
- Prisma: `prisma:generate`, `prisma:migrate:dev`, `prisma:migrate:deploy`, `db:push`, `db:seed`.

## Local setup
1. Install dependencies: `npm install`.
2. Create `.env` from `.env.example`.
3. Run Prisma migrations or `db:push`.
4. Start dev server: `npm run dev`.

## Audit notes (current state)
- Text encoding: several content strings show mojibake (accented characters appear garbled). Confirm files are UTF-8 and fix if needed.
- Case studies are hardcoded in `app/work/[slug]/page.tsx` and are not sourced from `app/work/projects.ts`. Keep in sync manually.
- Some links are placeholders (ex: LinkedIn `#` in footer/team). Replace with real URLs when available.
- Admin dashboard copy says "Donnees statiques" while it queries Prisma. Confirm intent.
