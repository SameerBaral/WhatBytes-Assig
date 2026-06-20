# Whatbytes Frontend Assignment - E-Commerce Mockup

A high-fidelity, responsive e-commerce web application built using **Next.js (App Router)** and **Tailwind CSS**. This project replicates the mockup layout, styling specifications, client-side cart logic, and filters required for the frontend assignment.

## Live Deployment
- **Deployment URL**: `[Insert Vercel Deployment Link Here]`

---

## Features Implemented

1. **Home Page (`/`) - Product Listing**:
   - **Persistent Header**: Fully responsive with logo, a search bar matching queries dynamically to the URL, and a shopping cart button containing real-time quantity badges.
   - **Sidebar Filters**:
     - *Blue Filters Panel*: Includes radio buttons for Category (`All`, `Electronics`, `Clothing`, `Home`) and a custom range slider for price limits (0 - 1000).
     - *White Filters Panel ("Cacyroy")*: Synced category radio selection and a numeric input box for higher price ceiling entries.
   - **Product Grid**: Responsive 3-column layout (Desktop: 3, Tablet: 2, Mobile: 1) featuring 8 custom-generated product card assets.
   - **Featured Smartphone Card**: Customized 2-column wide layout displaying pricing, a 5-star rating scale, category tags, and descriptive paragraphs.
   - **Footer**: Column links matching columns (Filters, About Us, Follow Us) and copyright details.

2. **Product Detail Page (`/product/[id]`)**:
   - Dynamic routing to individual items.
   - Thumbnail carousel selector.
   - Interactive quantity counter (+ / - controls).
   - Star ratings and customer review cards.

3. **Cart Page (`/cart`)**:
   - Complete itemized list of all products in the cart.
   - Micro-action modifiers to increment/decrement item counts or remove items from the cart.
   - Order summary card calculating subtotal, taxes (8%), shipping fees ($15 flat rate, or free for orders over $200), and final order totals.

4. **State & Logic**:
   - **URL Query Sync**: Adjusting sidebar filters automatically updates the URL search query parameters (e.g. `?category=electronics&price=250`), preserving filters on page reloads.
   - **Cart Context**: Global React Context client-side state synchronized and persisted inside `localStorage`.
   - **Empty States**: Customized "No products found" page rendering if active query combinations return empty grids.

---

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Language**: TypeScript

---

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

To verify a production-ready build, compile the static optimization:

```bash
npm run build
```
