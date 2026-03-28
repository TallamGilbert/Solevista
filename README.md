# Sneaqr

A sneaker marketplace built with Next.js 14, TypeScript, Tailwind CSS, Prisma, and Stripe.

---

## Tech Stack

| Layer         | Technology                              |
|---------------|-----------------------------------------|
| Framework     | Next.js 14 (App Router)                 |
| Language      | TypeScript                              |
| Styling       | Tailwind CSS                            |
| Database ORM  | Prisma + PostgreSQL                     |
| Auth          | NextAuth.js v4                          |
| Payments      | Stripe                                  |
| Images        | Cloudinary                              |
| Validation    | Zod                                     |
| Data fetching | TanStack React Query                    |
| Notifications | react-hot-toast                         |
| Icons         | lucide-react                            |

---

## Project Structure

```
sneaqr/
├── app/                  # Next.js App Router pages & API routes
├── components/
│   ├── ui/               # Reusable primitive UI components
│   └── layout/           # Layout components (header, footer, etc.)
├── hooks/                # Custom React hooks
├── lib/                  # Utility libraries (prisma client, stripe, etc.)
├── prisma/
│   └── schema.prisma     # Database schema
├── public/               # Static assets
├── types/                # Global TypeScript type definitions
├── .env.local.example    # Environment variable template
└── tailwind.config.ts    # Tailwind config with custom design tokens
```

---

## Getting Started

### 1. Prerequisites

- Node.js 18.17+
- npm 9+
- PostgreSQL database (local or hosted — Supabase, Neon, Railway all work)

### 2. Clone & install

```bash
git clone <repo-url>
cd sneaqr
npm install
```

### 3. Configure environment variables

```bash
cp .env.local.example .env.local
```

Open `.env.local` and fill in all required values (see [Environment Variables](#environment-variables) below).

### 4. Set up the database

```bash
# Push the Prisma schema to your database
npx prisma db push

# (Optional) Open Prisma Studio to inspect data
npx prisma studio
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

Copy `.env.local.example` to `.env.local` and fill in the values.

### Database

| Variable       | Description                  |
|----------------|------------------------------|
| `DATABASE_URL` | PostgreSQL connection string |

### NextAuth

| Variable                                    | Description                                           |
|---------------------------------------------|-------------------------------------------------------|
| `NEXTAUTH_SECRET`                           | Random secret — run `openssl rand -base64 32`         |
| `NEXTAUTH_URL`                              | Base URL of your app (e.g. `http://localhost:3000`)   |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Google OAuth credentials                              |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | GitHub OAuth credentials                              |

### Stripe

| Variable                             | Description                             |
|--------------------------------------|-----------------------------------------|
| `STRIPE_SECRET_KEY`                  | Stripe secret key (`sk_test_...`)       |
| `STRIPE_PUBLISHABLE_KEY`             | Stripe publishable key (`pk_test_...`)  |
| `STRIPE_WEBHOOK_SECRET`              | Webhook signing secret (`whsec_...`)    |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Client-side publishable key             |

### Cloudinary

| Variable                | Description                    |
|-------------------------|--------------------------------|
| `CLOUDINARY_URL`        | Full Cloudinary URL            |
| `CLOUDINARY_CLOUD_NAME` | Your Cloudinary cloud name     |
| `CLOUDINARY_API_KEY`    | Cloudinary API key             |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret          |

### App

| Variable              | Description               |
|-----------------------|---------------------------|
| `NEXT_PUBLIC_APP_URL` | Public base URL of the app |

---

## Available Scripts

| Command               | Description                              |
|-----------------------|------------------------------------------|
| `npm run dev`         | Start development server on port 3000    |
| `npm run build`       | Build for production                     |
| `npm run start`       | Start production server                  |
| `npm run lint`        | Run ESLint                               |
| `npx prisma studio`   | Open Prisma Studio GUI                   |
| `npx prisma db push`  | Push schema changes to the database      |
| `npx prisma generate` | Regenerate Prisma Client                 |

---

## Design Tokens

Custom Tailwind colors defined in `tailwind.config.ts`:

| Token        | Hex       | Usage                       |
|--------------|-----------|-----------------------------|
| `accent`     | `#EAB308` | Primary yellow accent       |
| `soft-black` | `#111111` | Background / dark text      |
| `light-gray` | `#F5F5F5` | Surface / light background  |

Usage in classes: `bg-accent`, `text-soft-black`, `bg-light-gray`

---

## Setting Up OAuth Providers

### Google

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a project → APIs & Services → Credentials → OAuth 2.0 Client ID
3. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`

### GitHub

1. Go to GitHub → Settings → Developer settings → OAuth Apps → New OAuth App
2. Set Authorization callback URL: `http://localhost:3000/api/auth/callback/github`

---

## Setting Up Stripe Webhooks (local dev)

```bash
# Install Stripe CLI, then:
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Copy the webhook signing secret printed in the terminal into `STRIPE_WEBHOOK_SECRET`.
