# UIForge.dev — Production-Ready SaaS UI Engine

UIForge.dev is a high-performance, full-stack SaaS platform designed for senior developers and agencies to prototype, preview, and deploy high-quality UI patterns. Built with **Next.js 14**, **Prisma**, **Stripe**, and **Framer Motion**, it provides a battle-tested foundation for selling UI components or building a component-driven ecosystem.

---

## 🚀 Key Features (Full-Stack Integrated)

### 🔐 Advanced Authentication (Custom OTP)

- **Custom 6-Digit OTP Flow**: Moved beyond generic magic links to a branded, high-conversion verification experience.
- **Google OAuth Integration**: One-click social login via NextAuth.
- **Session-Based Protection**: Secure middleware and API route protection.
- **Persistent User Profiles**: Managed via Prisma with Role-Based Access Control (RBAC).

### 💳 Commercial Billing Engine (Stripe PRO)

- **Automated Paywall**: Premium components are dynamically locked for FREE users.
- **Stripe Checkout**: Seamless conversion flow for the PRO plan.
- **Stripe Webhooks**: Real-time subscription management (upgrades, downgrades, and cancellations) synced to your database.

### 📊 Live Analytics Dashboard

- **Database-Backed Stats**: Real-time counts for library size, community growth, and user-specific bookmarks.
- **Recent Activity Feed**: Automatic tracking of new additions to the repository.
- **Plan Status**: Deep-linked subscription management and plan visibility.

### 🎨 High-End UI Playground

- **Live Props Preview**: Interactive testing environment for production-grade React components.
- **Paywalled Code Access**: Restricts sensitive component source code to authorized PRO subscribers.
- **Search & Filter**: Debounced search and category filtering powered by PostgreSQL.

### 📱 Modern PWA & SEO

- **Installable App**: Full PWA manifest support for a native-like mobile experience.
- **SEO Optimized**: Pre-configured JSON-LD, OpenGraph tags, and meta-descriptions for maximum indexability.
- **Performance First**: 95+ Lighthouse scores via React.memo, useCallback, and dynamic imports.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL (Neon/Railway) with Prisma ORM
- **Styling**: Tailwind CSS & Shadcn/UI
- **Animations**: Framer Motion
- **Auth**: NextAuth.js (Google + Custom Credentials OTP)
- **Payments**: Stripe (Checkout + Webhooks)
- **State/Data**: Zustand & TanStack Query
- **PWA**: next-pwa

---

## 🏁 Getting Started

### 1. Installation

```bash
git clone <your-repo-url>
cd UIforge.dev
npm install
```

### 2. Environment Setup

Copy `.env.example` to `.env` and fill in:

- `DATABASE_URL`: Your PostgreSQL connection string.
- `NEXTAUTH_SECRET`: Random string for JWT encryption.
- `GOOGLE_CLIENT_ID/SECRET`: Credentials from Google Cloud Console.
- `STRIPE_SECRET_KEY/WEBHOOK_SECRET`: API keys from Stripe Dashboard.
- `SMTP_*`: Credentials for the OTP email system.

### 3. Database Initialization

```bash
# Sync schema and generate client
npx prisma generate
npx prisma db push

# Seed the database with high-end components
npx prisma db seed
```

### 4. Run Development

```bash
npm run dev
```

---

## 📁 Architecture Overview

```text
/app
  /(auth)         # Login, Verification, and Signup flows
  /(dashboard)    # Main product area (Stats, Playground, Library)
  /(marketing)    # SEO-optimized Landing and Pricing pages
  /api            # Full-stack route handlers (Stripe, OTP, Components)
/components
  /ui             # Shadcn primitives
  /layout         # Shared Navbar, Footer, and Sidebars
  /playground     # Interactive component components
/prisma           # Schema and Database seeding
/types            # Custom TypeScript and NextAuth definitions
```

---

## 🌍 Deployment

UIForge is optimized for **Vercel**.

1. Push to GitHub.
2. Link project to Vercel.
3. Add Environment Variables in the Vercel Dashboard.
4. Ensure the `postinstall` script runs `prisma generate`.

---

## 📊 Business Logic Summary

| Feature       | Implementation  | Business Value                         |
| :------------ | :-------------- | :------------------------------------- |
| **Auth**      | Custom OTP      | High-conversion, branded entry         |
| **Growth**    | SEO Pages       | Zero-cost organic traffic              |
| **Revenue**   | Stripe Webhooks | Low-maintenance subscription revenue   |
| **Retention** | Saved Items     | User "Stickiness" and workflow lock-in |

---

## 📄 License

MIT © 2026 UIForge.dev
