# CLAUDE.md - Breezi Shop

## Project Overview
Premium e-commerce shop for BREEZI Luftenergizer products. Built with Next.js 15 (App Router), Tailwind CSS v4, shadcn/ui, and MagicUI animations. Mobile-first design with German language interface.

## Tech Stack
- **Framework**: Next.js 15 (App Router, TypeScript)
- **Styling**: Tailwind CSS v4 + CSS Custom Properties
- **UI Components**: shadcn/ui + MagicUI (21st.dev)
- **Animations**: MagicUI (blur-fade, text-animate, shimmer-button, magic-card, marquee, number-ticker, particles, shine-border, border-beam, scroll-progress)
- **Payment**: Stripe Checkout Sessions (EUR, DE/AT/CH)
- **State**: React Context + LocalStorage (cart)
- **Container**: Docker multi-stage build (node:22-alpine)

## Key Architecture Decisions
- **Brand rebranding**: All branding comes from `data/brand.json`. Change one file = complete rebrand.
- **CSS Variables**: Brand colors mapped to `--brand-*` CSS custom properties in `globals.css`.
- **Product data as JSON**: Products in `data/products/*.json`, no database needed.
- **Prices in cents**: All prices stored as integers (cents) to avoid floating-point issues.
- **Standalone output**: `next.config.ts` has `output: "standalone"` for Docker deployment.

## Project Structure
```
app/                    # Next.js App Router pages + API routes
components/layout/      # Navbar, Footer, CartPanel
components/sections/    # Hero, Features, ProductShowcase, Testimonials, etc.
components/ui/          # shadcn/ui + MagicUI components (auto-generated, do not edit)
data/                   # JSON data files (brand, products, testimonials, features)
lib/                    # Utilities (brand.ts, products.ts, cart-context.tsx, stripe.ts)
public/images/          # Product images
```

## Commands
```bash
npm run dev          # Development server (localhost:3000)
npm run build        # Production build
npm run lint         # ESLint
docker compose up    # Production container
docker compose --profile dev up  # Dev container with hot-reload
```

## Important Files
- `data/brand.json` - Central brand identity (name, colors, fonts, tagline)
- `data/products/breezy-original.json` - Main product data
- `app/globals.css` - Tailwind config + CSS custom properties
- `lib/cart-context.tsx` - Cart state management
- `app/api/checkout/route.ts` - Stripe checkout session creation

## Environment Variables
See `.env.example` for required variables. Copy to `.env.local` for development.

## Conventions
- German language for all user-facing text
- Mobile-first responsive design
- `prefers-reduced-motion` respected for all animations
- Particles disabled on viewports < 768px
- Hover effects only on `@media (hover: hover)` devices
- Minimum 44x44px touch targets
