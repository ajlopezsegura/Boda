# CLAUDE.md — Project Context for AI Sessions

## Project Overview

Luxury real estate web app for **Las Conchas** — a 24-unit beachfront residential development in Marbella, Spain. Built for **The Visuals Boutique Studio** as a presentation/sales tool.

**Stack:** React 18 + Vite + Tailwind CSS + Framer Motion + Supabase (PostgreSQL, JSONB)
**Routing:** HashRouter (deployed to GitHub Pages)
**Deploy:** GitHub Actions from branch `claude/check-progress-VPlBw`

## Key Architecture

- **Inline styles + Tailwind hybrid** — most components use inline styles for fine-grained control, Tailwind for layout utilities
- **CSS custom properties:** `--color-bg`, `--color-text`, `--color-accent` (#B89848 gold), `--color-text-muted`
- **`label-luxury` class:** `font-weight: 400`, `font-size: 0.75rem` mobile / `0.72rem` desktop, `letter-spacing: 0.16-0.18em`
- **`display-heading` class:** Montserrat uppercase tracking
- **`AnimatePresence mode="sync"`** in App.jsx (changed from "wait" to fix blank page bug)
- **FilterControls in AvailabilityPage** called as `{FilterControls({})}` not `<FilterControls />` — prevents unmount/remount that causes input focus loss

## Routing Structure

```
/                        → CoverPage
/proyecto                → ContextPage (project info, amenities, construction)
/availability            → AvailabilityPage (unit listing + filters)
/availability/:slug      → UnitDetailPage
/inmersion/:unitId       → ImmersionPage (3D configurator)
/decision                → DecisionPage
/compare                 → ComparePage
/contact                 → ContactPage (lead form)
/summary/:slug           → SummaryPage (PDF dossier)
/map                     → MapPage
/privacy                 → PrivacyPage
/admin                   → AdminPage (password-protected management panel)
```

## Key Files

| File | Purpose |
|------|---------|
| `src/App.jsx` | Root router, renders LuxuryCursor + AppFooter + Routes |
| `src/context/ProjectContext.jsx` | Supabase data fetch, provides project/units/amenities |
| `src/context/SessionContext.jsx` | Anonymous session tracking (page views, events → Supabase) |
| `src/context/CompareContext.jsx` | Compare bar state (selected unit IDs) |
| `src/context/LangContext.jsx` | ES/EN language toggle |
| `src/components/layout/AppFooter.jsx` | Fixed 48px footer with centered CONTACTAR button |
| `src/components/cursor/LuxuryCursor.jsx` | Custom gold dot+ring cursor (hidden on touch) |
| `src/data/project.json` | Local fallback data (Supabase is primary) |
| `src/styles/index.css` | CSS variables, custom classes, global styles |
| `supabase/schema.sql` | Full DB schema + seed data |

## Design System

- **Background:** Dark navy (`--color-bg`)
- **Text:** Off-white `rgba(244,241,234,x)` at various opacities (0.78-0.85 for body, 0.65 for secondary)
- **Accent:** Gold `#B89848` / `rgba(184,152,72,x)`
- **Borders:** Gold at low opacity `rgba(184,152,72,0.08-0.25)`
- **Font sizes:** Deliberately small for luxury feel — body `0.6-0.72rem`, labels `0.55-0.65rem`
- **Letter spacing:** Wide tracking on labels `0.1-0.2em`
- **Hover patterns:** Inline `onMouseEnter`/`onMouseLeave` changing style properties

## Session Tracking (SessionContext)

- `trailRef` is the authoritative source (updated synchronously)
- `trail` state is derived for React consumers
- `saveSession()` called on every page navigation + visibilitychange + beforeunload
- Events tracked: `page_view`, `section_view`, `amenity_open`, `nearby_view`, `compare_add`, `device_info`
- Data stored in `page_sessions` table (Supabase)
- On contact form submit, trail is copied to `leads.session_trail` and session marked converted

## AppFooter Behavior

- Fixed bottom, 48px height, `backgroundColor: var(--color-bg)`
- Hidden on: `/`, `/contact`, `/admin`, `/privacy`, `/summary/*`, `/inmersion/*`
- Hidden when compare bar is active (2+ units selected on `/availability`)
- All scrollable pages have `pb-14` to prevent content overlap

## Admin Panel (`/admin`)

- Password-protected (env var `VITE_ADMIN_PASSWORD`)
- Three tabs: DISPONIBILIDAD (unit status management), LEADS (contact submissions), ACTIVIDAD (anonymous sessions)
- StatusSelect dropdown to change unit status (available/reserved/sold)
- Refresh button on activity tab
- Fully responsive with `useIsMobile` hook — card layouts on mobile, stacked grids, compact headers

## Mobile Responsive Status

All pages have been audited and fixed for mobile (640px breakpoint):

| Page | Status | Notes |
|------|--------|-------|
| AdminPage | ✅ Done | `useIsMobile` hook, card layouts on mobile, 2x2 stats grid |
| ImmersionPage | ✅ Done | Room nav → horizontal bar, time controls → icon-only row, compact header |
| ComparePage | ✅ Done | Narrower label column, compact card headers, smaller fonts |
| UnitDetailPage | ✅ Done | Hero stacks vertically, CTA buttons stack, compare buttons stack |
| AvailabilityPage | ✅ Done | Compare hint bar, pb-14, compact compare button |
| ContextPage | ✅ Done | object-contain for vertical images, compass N removed |
| SummaryPage | ✅ Done | Specs grid 2-col on mobile, pb-14 |
| ContactPage | ✅ Already OK | max-w-xl, px-6, responsive grid |
| DecisionPage | ✅ Already OK | max-w-2xl, flex-wrap, clamp() sizes |
| SelectionPage | ✅ Already OK | Separate mobile/desktop layouts (hidden sm:grid) |
| LandingPage | ✅ Already OK | clamp(), responsive padding |
| CoverPage | ✅ Already OK | clamp(), centered flex |
| SpacePage | ✅ Already OK | Responsive padding, max-w-xl |
| MapPage | ✅ Already OK | object-contain, responsive padding |
| SplashPage | ✅ Already OK | clamp(), centered layout |

**Pattern used:** `useIsMobile(bp=640)` hook with `window.matchMedia` for JS-based responsive logic (required when using inline styles). The `mob` variable controls conditional styles and layout.

## Known Issues / Pending Work

1. **Supabase columns** — `tagline`/`tagline_en` columns don't exist yet in projects table (hardcoded fallback works)
2. **Real images** — Some amenity/entorno items use Unsplash placeholders
3. **AppShell component** — exists but not used in App.jsx (orphaned)
4. **ContactCTA component** — replaced by AppFooter (orphaned)
5. **Compare state persistence** — Compare selection lost on page reload (could use localStorage)
6. **Font size inconsistencies** — Minor variations between pages (global type scale would help)
7. **Progress indicators** — No breadcrumbs/step indicator across the buyer journey

## Commit Convention

Commits end with the Claude session URL. Messages describe the "why" not the "what".

## Commands

```bash
npm run dev          # Dev server (Vite)
npx vite build       # Production build
git push -u origin claude/check-progress-VPlBw  # Deploy branch
```
