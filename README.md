# Crusts & Daisies

Client-facing ordering platform and POS interface for Crusts & Daisies artisanal bakery. Features an interactive pastry catalog, dynamic cart management, multi-step order lifecycle tracking, and client-side thermal receipt rendering.

## Architecture & Project Structure

```text
crust-fe-nuxt/
├── app/
│   ├── assets/       # Custom typography (Livvic, Gloria Hallelujah, Merchant Copy) & Tailwind v4 styles
│   ├── components/   # Modular UI widgets (Carousel, Nota, Receipt, FileUpload, StatusCheck)
│   └── pages/        # Route views (Landing, Menu, Checkout, Order Status, Thermal Receipt)
└── public/           # Static assets, WebP illustrations, and branding metadata
```

### Core Modules & Features

1. **Pastry Catalog & Cart Engine (`app/pages/menu.vue`, `app/components/Carousel.vue`)**
   - Interactive bakery catalog with custom tray carousel and category filtering.
   - Reactive shopping cart with real-time subtotal calculation and local storage persistence (`cnd_cart`).
   - Optimized asset pipeline utilizing lightweight WebP illustrations with lossless alpha.
   - Stack: Nuxt 4, Vue 3, Tailwind CSS v4, Lucide Vue Next.

2. **Checkout & Order Intake (`app/pages/checkout.vue`, `app/components/CheckoutModal.vue`)**
   - Customer detail validation and order confirmation modal.
   - Dynamic price breakdown and unique order identifier generation (`cnd_order`).
   - Seamless handoff into payment and verification tracking.

3. **Order Status & Lifecycle Tracker (`app/pages/status.vue`, `app/components/FileUpload.vue`)**
   - Order lookup by Order ID query parameter (`?id=...`) or active session memory.
   - Bank transfer detail presentation with clipboard integration.
   - Payment proof upload intake with client-side image preview.
   - Automated 3-second verification progression (`belum_lunas` -> `diproses` -> `lunas`) designed for standalone frontend demonstrations.
   - Integrated developer debug switch (`?debug` or `?admin`) for manual state overrides.

4. **Thermal Receipt Generator (`app/pages/orders.vue`, `app/components/Receipt.vue`)**
   - Authentic thermal receipt rendering styled with retro monospace Merchant Copy fonts.
   - Real-time barcode generation via `jsbarcode`.
   - High-fidelity client-side canvas rasterization and PNG download powered by `html-to-image`.

## Companion Backend & Ecosystem

This repository houses the frontend client for Crusts & Daisies. The application is designed to pair with [CrustBE](https://github.com/schrundeng/crustBE), a companion REST API currently under active development.

- **Backend Repository**: [`schrundeng/crustBE`](https://github.com/schrundeng/crustBE)
- **Stack**: Laravel, PostgreSQL
- **Scope**: Centralized order pipelines, transaction verification, inventory tracking, and administrative dashboard operations.
- **Current Client Mode**: Runs in standalone demonstration mode with reactive local state and browser persistence (`localStorage`) until full API synchronization is finalized.

## Deployment & Environments

| Environment | Platform | URL |
| :--- | :--- | :--- |
| Production | Cloudflare Pages | [crust.kurnikov.my.id](https://crust.kurnikov.my.id/) |
| Local Dev | Node.js / Vite | `http://localhost:3000` |

## Quickstart

### Prerequisites

- Node.js (v18+)
- pnpm (v9+)

### Installation & Development

```bash
# Install dependencies
pnpm install

# Start local development server
pnpm dev

# Build for production
pnpm build

# Preview production build locally
pnpm preview
```
