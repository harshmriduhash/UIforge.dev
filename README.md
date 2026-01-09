# UIForge.dev

A production-ready SaaS platform for prototyping, previewing, and reusing high-quality UI components built with Next.js 14, React 18, and TypeScript.

## Features

- 🎨 **Beautiful UI Components** - Production-ready React components
- ⚡ **Performance Optimized** - React.memo, code splitting, virtualized lists
- 🔐 **Authentication** - Google OAuth and Email OTP
- 💳 **Stripe Integration** - Test mode payment processing
- 📱 **PWA Support** - Offline access and installable
- 🎭 **Animations** - Smooth transitions with Framer Motion
- 🎯 **Type Safe** - Full TypeScript support

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS, Shadcn/UI
- **State Management**: Zustand, TanStack Query
- **Animations**: Framer Motion
- **Database**: PostgreSQL with Prisma
- **Authentication**: NextAuth.js
- **Payments**: Stripe
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database (Railway, Neon, or local)
- Google OAuth credentials (optional)
- Stripe account (optional, for payments)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd UIforge.dev
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Fill in your environment variables in `.env`:

**Required APIs:**
- `DATABASE_URL` - PostgreSQL connection string (Railway, Neon, or Supabase)
- `NEXTAUTH_URL` - Your app URL (http://localhost:3000 for dev)
- `NEXTAUTH_SECRET` - Generate with `openssl rand -base64 32`

**Google OAuth API:**
- `GOOGLE_CLIENT_ID` - Get from [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
- `GOOGLE_CLIENT_SECRET` - Get from Google Cloud Console
- Add redirect URI: `http://localhost:3000/api/auth/callback/google`

**Stripe Payments API:**
- `STRIPE_SECRET_KEY` - Get from [Stripe Dashboard](https://dashboard.stripe.com/apikeys) (use test keys)
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Get from Stripe Dashboard
- `STRIPE_WEBHOOK_SECRET` - Optional, for webhook events

**Email/SMTP API:**
- `SMTP_HOST` - SMTP server (e.g., smtp.gmail.com)
- `SMTP_PORT` - SMTP port (usually 587)
- `SMTP_USER` - Your email address
- `SMTP_PASSWORD` - Your email app password (for Gmail, create an App Password)

**Optional APIs:**
- `NEXT_PUBLIC_GA_ID` - Google Analytics (optional)
- `SENTRY_DSN` - Sentry error tracking (optional)
- `RESEND_API_KEY` - Resend email service (optional)

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

5. Create PWA icons (optional):
   - Create `icon-192x192.png` and `icon-512x512.png` in `/public`
   - Use tools like [PWA Asset Generator](https://github.com/onderceylan/pwa-asset-generator)

6. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
/app
  /(marketing)      # Landing and pricing pages
  /(auth)          # Authentication pages
  /(dashboard)     # Protected dashboard pages
  /api             # API routes
/components
  /ui              # Shadcn UI components
  /layout          # Layout components
  /forms           # Form components
/lib               # Utilities and configurations
/prisma            # Database schema
/public            # Static assets
```

## Features Overview

### Landing Page
- Hero section with animations
- Feature showcase
- Testimonials carousel
- Call-to-action sections

### Authentication
- Google OAuth login
- Email OTP (magic link)
- Protected routes
- Session management

### Dashboard
- Stats overview
- Recent activity
- Sidebar navigation
- User profile dropdown

### UI Playground
- Component preview
- Live props editor
- Search and filter
- Infinite scroll
- Performance optimized

### UI Library
- Paginated components
- Accordion view
- Copy-to-clipboard
- Category tabs

### Payments
- Pricing page
- Stripe checkout integration
- Subscription management

## Performance Optimizations

- React.memo for component memoization
- useCallback and useMemo hooks
- Code splitting with dynamic imports
- Suspense boundaries with skeleton loaders
- Debounced search inputs
- Virtualized lists for large datasets

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

The project is optimized for Vercel's edge network and serverless functions.

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
