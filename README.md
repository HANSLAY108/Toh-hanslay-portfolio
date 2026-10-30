# Toh Hanslay — Multidisciplinary Engineering, AI & Editorial Design Portfolio

An editorial minimalist portfolio and full-featured Studio CMS built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **Supabase**, **Cal.com**, and **Vercel Analytics**.

---

## Key Features

1. **Structured Case Studies with Quantified Outcomes**
   - Full narrative flow: **01 / The Problem**, **02 / Architecture & Process**, **03 / The Solution**, plus a prominent **Quantified Outcomes** metrics grid, interactive **Technology Stack** badges with auto-detected logos, role, timeline, live demo, and GitHub repository links.
   - Manageable end-to-end from `/admin/projects` (create, edit, reorder, publish/draft).

2. **Multi-Select Discipline Role Filter**
   - Projects support multi-select roles (`Software`, `AI`, `Design`).
   - Interactive filter tabs (`All`, `Software`, `AI`, `Design`) with project counts and smooth transitions on both the **Home** featured section and the **Projects** archive page.

3. **Cal.com Booking Integration**
   - **"Book a call"** modal trigger in the **Navbar**, **Home Hero**, **Home Bottom CTA**, and **Contact Sidebar**.
   - **Embedded Cal.com Inline Scheduler** on the **Contact** page.
   - Editable Cal.com link directly inside **Studio CMS -> Site Settings** (`/admin/settings`).

4. **Bilingual Internationalization (`/en` & `/fr`)**
   - Full `/en` and `/fr` localized routes with automatic locale detection (`src/middleware.ts`) and an `EN | FR` switcher in the navbar.
   - Complete static UI translation dictionary (`src/lib/i18n/dictionaries.ts`).
   - Bilingual CMS fields (`_fr` columns) across Projects, Blog Posts, Profile, Skills, Services, and Site Settings with automatic fallback to English whenever a French field is empty.
   - Localized SEO metadata and `hreflang` (`alternates.languages`) tags on all public pages.

5. **Vercel Analytics & Custom Event Tracking**
   - Integrated `@vercel/analytics` in the root layout.
   - Custom event tracking for:
     - `cta_click` (Hero CTAs, Case study live demo / GitHub clicks, bottom CTA)
     - `booking_click` (Navbar, Home, and Contact Cal.com triggers)
     - `contact_form_submit` (Contact form submissions)

---

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env.local` and fill in your credentials:

```bash
cp .env.example .env.local
```

| Variable | Description |
| :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL (optional locally; falls back to local JSON CMS store `.cms-data.json`) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anonymous public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Your Supabase service role key for server-side admin mutations |
| `NEXT_PUBLIC_SITE_URL` | Canonical production URL (e.g. `https://hanslay.atelier.dev`) |
| `NEXT_PUBLIC_CAL_COM_URL` | Default Cal.com scheduling link (e.g. `https://cal.com/hanslay/30min`) |
| `ADMIN_OWNER_EMAIL` | Owner email permitted to access `/admin` when Supabase Auth is active |
| `REVALIDATION_SECRET` | Secret token for on-demand ISR revalidation |

### 3. Run Database Migrations (Supabase)

If using Supabase in production, run the SQL schemas in your Supabase SQL Editor:
1. Initial schema (if setting up from scratch): `supabase/schema.sql`
2. Non-destructive portfolio upgrades migration (adds case study outcomes, multi-select roles, Cal.com URL, and French `_fr` columns while preserving existing data and RLS policies):
   - `supabase/migrations/20261030_portfolio_upgrades.sql`

### 4. Run the Development Server

```bash
npm run dev
```

- **Public Portfolio**: `http://localhost:3000/en` (English) or `http://localhost:3000/fr` (French)
- **Studio CMS Admin**: `http://localhost:3000/admin`

### 5. Production Build

```bash
npm run build
npm start
```

