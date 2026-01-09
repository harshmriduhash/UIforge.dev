# UIForge.dev — BUILD TODAY Cursor Super‑Prompt (Single MD)

> **Instruction**: Copy EVERYTHING below and paste directly into Cursor (or any AI IDE).  
> Do NOT ask questions. Generate code step‑by‑step. Prioritize correctness over perfection.

---

## ROLE & GOAL
You are a **Senior Frontend Architect + Product Engineer**.

Your goal is to build **UIForge.dev**, a **standalone PWA SaaS** that demonstrates **advanced React.js architecture, performance optimization, and real-world frontend systems**.

This is **NOT a toy project**. It must look, feel, and behave like a real product.

Target: **Deployed MVP today on Vercel**.

---

## PRODUCT DEFINITION

**UIForge.dev** is a frontend-focused SaaS that helps developers **prototype, preview, and reuse high-quality UI patterns** with production-grade React architecture.

Core positioning:
- Frontend architecture mastery
- Performance-first React
- Real SaaS UX (auth, billing, dashboards)

---

## TECH STACK (FIXED — DO NOT CHANGE)

### Frontend
- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion (animations)
- Zustand (state management)
- TanStack Query (async data)
- React Hook Form + Zod
- Shadcn/UI

### Backend (Lightweight but Real)
- Next.js Route Handlers
- Prisma ORM
- PostgreSQL (Railway/Neon)
- NextAuth.js

### Auth
- Google OAuth
- OTP (Email)

### Infra
- Vercel (deployment)
- Dummy payments (Stripe test mode)

### PWA
- next-pwa
- Offline cache
- Installable

---

## SYSTEM ARCHITECTURE

- **Frontend-heavy** application
- Stateless APIs
- CDN + Edge handled by Vercel
- No manual load balancer
- Scalable by design

---

## FOLDER STRUCTURE (STRICT)

```
/app
  /(marketing)
    page.tsx
    pricing/page.tsx
  /(auth)
    login/page.tsx
    signup/page.tsx
  /(dashboard)
    layout.tsx
    page.tsx
    playground/page.tsx
    library/page.tsx
/components
  ui/
  layout/
  animations/
  forms/
/store
/lib
  api.ts
  auth.ts
  performance.ts
/prisma
  schema.prisma
/public
/styles
```

---

## CORE FEATURES (MVP — MUST BUILD)

### 1. Landing Page
- Hero section with animation
- Feature sections (cards + carousel)
- Testimonials slider
- CTA buttons
- Responsive

### 2. Auth System
- Google login
- Email OTP login
- Protected routes
- Session persistence

### 3. Dashboard
- Sidebar navigation
- User profile dropdown
- Stats cards
- Toast notifications

### 4. UI Playground
- Component preview cards
- Live props editor (controlled inputs)
- Infinite scroll
- Search + filter
- Performance-optimized rendering

### 5. UI Library
- Paginated UI components
- Accordion + Tabs
- Copy-to-clipboard

### 6. Payments (Dummy)
- Pricing page
- Stripe test checkout
- Upgrade state handling

### 7. PWA
- Offline access to UI library
- Install prompt

---

## ADVANCED REACT REQUIREMENTS (MANDATORY)

You MUST implement:
- React.memo
- useCallback / useMemo
- Code splitting via dynamic imports
- Suspense + skeleton loaders
- Virtualized lists (react-window or similar)
- Optimistic UI updates
- Debounced search

---

## PERFORMANCE REQUIREMENTS

- Lighthouse score > 90
- No unnecessary re-renders
- Bundle splitting
- Image optimization

---

## DATABASE SCHEMA (PRISMA)

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  image     String?
  createdAt DateTime @default(now())
}
```

---

## API CONTRACTS

- GET /api/components
- POST /api/auth/otp
- POST /api/checkout

---

## UI COMPONENTS TO INCLUDE

- Navbar
- Footer
- Sidebar
- Dropdown
- Modal
- Toast
- Accordion
- Carousel
- Progress bar
- Multi-step form

---

## ANIMATIONS

- Page transitions
- Hover micro-interactions
- Loading states

---

## BUILD ORDER (IMPORTANT)

1. Setup Next.js + Tailwind + Shadcn
2. Auth (Google + OTP)
3. Dashboard layout
4. Playground
5. Library
6. Payments
7. PWA
8. Deploy

---

## DEPLOYMENT

- Push to GitHub
- Deploy on Vercel
- Use environment variables

---

## FINAL OUTPUT

The result must:
- Feel like a real SaaS
- Be deployable today
- Be explainable in interviews
- Showcase frontend seniority

---

**START BUILDING NOW. DO NOT ASK QUESTIONS.**

