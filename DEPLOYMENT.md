# Deployment Guide

## Prerequisites

1. **GitHub Account** - Push your code to a GitHub repository
2. **Vercel Account** - Sign up at [vercel.com](https://vercel.com)
3. **Database** - Set up PostgreSQL on Railway, Neon, or Supabase
4. **Stripe Account** - For payment processing (optional)

## Step-by-Step Deployment

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo-url>
git push -u origin main
```

### 2. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure the project:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: `.next`

### 3. Environment Variables

Add these environment variables in Vercel:

```
DATABASE_URL=postgresql://...
NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=your-secret-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

### 4. Database Setup

1. Create a PostgreSQL database on Railway, Neon, or Supabase
2. Copy the connection string to `DATABASE_URL`
3. Run migrations:
   ```bash
   npx prisma db push
   ```

### 5. Generate PWA Icons

Create PWA icons and place them in `/public`:
- `icon-192x192.png` (192x192 pixels)
- `icon-512x512.png` (512x512 pixels)

You can use tools like [PWA Asset Generator](https://github.com/onderceylan/pwa-asset-generator) or [RealFaviconGenerator](https://realfavicongenerator.net/).

### 6. Deploy

Click "Deploy" in Vercel. Your app will be live in minutes!

## Post-Deployment

1. Update `NEXTAUTH_URL` to your production URL
2. Configure Google OAuth redirect URIs
3. Set up Stripe webhooks (if using payments)
4. Test all features in production

## Troubleshooting

### Build Errors
- Check Node.js version (should be 18+)
- Verify all environment variables are set
- Check build logs in Vercel dashboard

### Database Connection Issues
- Verify `DATABASE_URL` is correct
- Check database allows connections from Vercel IPs
- Ensure SSL is enabled if required

### Authentication Issues
- Verify `NEXTAUTH_SECRET` is set
- Check OAuth redirect URIs match your domain
- Review NextAuth logs in Vercel
