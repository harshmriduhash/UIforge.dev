# Glint — Production-Ready SaaS UI Engine

Glint is a high-performance, full-stack SaaS platform designed for senior developers and agencies to prototype, preview, and deploy high-quality UI patterns. Built with **Next.js 14**, **Prisma**, **Stripe**, and **Framer Motion**, it provides a battle-tested foundation for selling UI components or building a component-driven ecosystem.

---

## 🚀 Key Features (Full-Stack Integrated)

### 🔐 Advanced Authentication (Custom OTP)

- **Custom 6-Digit OTP Flow**: Branded, high-conversion verification experience.
- **GitHub OAuth Integration**: One-click social login via NextAuth for developers.
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

### 📱 Modern PWA & Premium Aesthetics

- **Glassmorphism Design System**: High-end translucent interfaces with mesh-gradient backgrounds.
- **Micro-Animations**: Shimmer effects, float animations, and smooth Framer Motion transitions.
- **Installable App**: Full PWA manifest support for a native-like mobile experience.
- **SEO Optimized**: Pre-configured JSON-LD, OpenGraph tags, and meta-descriptions.
- **Performance First**: 95+ Lighthouse scores via React.memo and dynamic imports.

### 🤖 AI-Powered Exploration & Generation

- **AI Component Generator**: Forge production-ready React/Tailwind components from simple text descriptions.
- **In-App AI Editor**: Production-grade Monaco editor with real-time AI code refinement and suggestions.
- **Smart AI Search**: Natural language filtering to find components based on intent, not just keywords.
- **AI Assistant Chat**: Integrated platform expert to help users master UI patterns and framework features.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL (Neon/Railway) or SQLite (Local) with Prisma ORM
- **Styling**: Tailwind CSS & Shadcn/UI
- **Animations**: Framer Motion
- **Auth**: NextAuth.js (GitHub + Custom Credentials OTP)
- **Payments**: Stripe (Checkout + Webhooks)
- **State/Data**: Zustand & TanStack Query
- **PWA**: next-pwa
- **AI Engine**: Vercel AI SDK & OpenAI (GPT-4o)
- **Code Editor**: Monaco Editor (@monaco-editor/react)

---

## 🏁 Getting Started

### 1. Installation

```bash
git clone <your-repo-url>
cd Glint
npm install
```

### 2. Environment Setup

Copy `.env.example` to `.env` and fill in:

- `DATABASE_URL`: Your PostgreSQL or SQLite connection string.
- `NEXTAUTH_SECRET`: Random string for JWT encryption.
- `GITHUB_CLIENT_ID/SECRET`: Credentials from GitHub Developer Settings.
- `STRIPE_SECRET_KEY/WEBHOOK_SECRET`: API keys from Stripe Dashboard.
- `SMTP_*`: Credentials for the OTP email system.
- `OPENAI_API_KEY`: Your OpenAI API key for AI-powered features.

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

Glint is optimized for **Vercel**.

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
| **Expansion** | AI Generation   | Unlimited content variety and utility  |

---

## 📄 License

MIT © 2026 Glint
