# AURELIA | Luxury Escapes & Curated Journeys

> **A Complete MERN (MongoDB, Express, React, Node.js) with TypeScript Travel Platform**  
> Designed with a serene, ultra-clean white & warm beige luxury aesthetic, editorial Cormorant Garamond typography, and high performance.

---

## 🗺️ Multipage Architecture & Routes

| Route | Page Name | Features |
| :--- | :--- | :--- |
| `/` | **Home Page** | Hero, search widget, why Aurelia pillars, featured tour packages, hotel & flight snippets, concierge CTA. |
| `/destinations` | **Destinations Catalog** | Full tour packages catalog with category pills, keyword search, price slider, and sorting. |
| `/packages/:id` | **Package Detail** | Dedicated page for any tour package with multi-photo gallery, day-by-day itinerary, inclusions/exclusions, live guest & price calculator, and direct reservation. |
| `/hotels` | **Luxury Stays** | Hotel catalog with city search, room categories (*Deluxe Suite*, *Ocean Villa*, etc.), live night calculator, and direct room reservation. |
| `/flights` | **Premier Flights** | Flight search across Emirates, Singapore Airlines, Qatar Airways, Lufthansa with cabin class filter, interactive seat preview (*Window Suite*, *Lie-flat bed*), and ticketing. |
| `/itinerary` | **Itinerary Planner** | Full interactive custom day-by-day itinerary architect with time slots (Morning, Afternoon, Evening), budget counter, and save/export. |
| `/gallery` | **Photo Gallery** | High-resolution photography archive with category filters (*Landscapes*, *Heritage*, *Stays*, *Coastal*) and fullscreen lightbox viewer. |
| `/reviews` | **Traveler Reviews** | Testimonials with 5-star distribution bars, "Write a Review" interactive submission form, and helpful voting. |
| `/contact` | **Private Concierge** | VIP concierge consultation page with Mayfair/Ginza/5th Ave salon details and inquiry submission form. |
| `/admin` | **Admin Portal** | Full-page admin dashboard: Overview KPIs (Revenue, Bookings, Users, Packages), Bookings management, Package creation & deletion, and User management. |
| `/my-bookings` | **My Reservations** | Traveler dashboard displaying confirmed escapes, luxury stays, and flight tickets with cancellation actions. |

---

1. **User Registration & Login**:
   - JWT-based authentication with bcrypt password hashing.
   - Built-in session state & user profile persistence.
   - **One-Click Demo Access**: Instant **Admin Demo** and **Traveler Demo** buttons in the authentication modal for frictionless evaluation.

2. **Destination Listings**:
   - Curated private journeys across Kyoto, Amalfi Coast & Capri, Swiss Alps, Serengeti Safari, Santorini, and Bali.
   - High-resolution imagery, category badges, ratings, and inclusions preview.

3. **Search & Filter**:
   - Search by destination or keyword.
   - Filter by Experience Category: *Luxury*, *Romantic*, *Nature*, *Cultural*, *Adventure*.
   - Dynamic Price Range Slider (up to $6,000+).
   - Sorting options: Featured first, highest rated, price ascending, and price descending.

4. **Tour Package Details**:
   - Interactive modal with multi-photo gallery preview.
   - Day-by-Day timeline itinerary with meal & guide indicators.
   - Inclusions vs. exclusions breakdown.
   - Dynamic guest counter and live investment calculation.
   - Instant reservation booking flow.

5. **Hotel Booking**:
   - Search handpicked luxury residences (The Ritz-Carlton Kyoto, Le Sirenuse Positano, The Chedi Andermatt, Canaves Oia Suites).
   - Multi-room type selector (*Deluxe River View Suite*, *Tatami Garden Pavilion*, *Penthouse Cliffside Suite*) with room size and capacity.
   - Live night calculator and immediate suite reservation.

6. **Flight Booking**:
   - Real-world carrier schedules (Emirates, Singapore Airlines, Qatar Airways, Lufthansa).
   - Cabin class filter (*Business Class*, *Economy Class*, *First Class*).
   - Interactive seat selection preview (*Window Suite*, *Lie-Flat Bed*, *Center Suite*).
   - Instant flight booking and ticket issuance.

7. **Interactive Bespoke Travel Itinerary Planner**:
   - Allows travelers to build customized daily itineraries.
   - Add/remove excursions, customize morning/afternoon/evening time slots, set estimated budgets, and track live total trip investment.
   - Save and export plan.

8. **Photo Gallery**:
   - Curated high-resolution imagery grid with category filters (*Landscapes*, *Heritage*, *Stays*, *Coastal*).
   - Fullscreen lightbox viewer with caption, location tags, and previous/next navigation.

9. **Reviews & Ratings**:
   - Verified traveler ratings with visual star distribution bars.
   - Interactive "Write a Review" drawer with 1-5 star picker and instant feedback.
   - Helpful vote counters.

10. **Contact & Bespoke Concierge Form**:
    - Luxury inquiry submission for custom private aviation, itineraries, and bespoke requests.
    - Full form validation and discreet concierge dispatch feedback.

11. **Responsive Design**:
    - Responsive on mobile, tablet, laptop, and ultra-wide screens.
    - Smooth mobile drawer navigation and refined desktop navigation bar.

12. **Complete Frontend Admin Panel**:
    - **KPI Metrics Dashboard**: Gross confirmed revenue, total bookings, active packages, registered members.
    - **Manage Bookings**: Filter by status, change reservation status (*Confirmed*, *Pending*, *Cancelled*), or delete bookings.
    - **Manage Packages**: Add new package form with custom itineraries, pricing, and cover images; delete packages.
    - **Manage Users**: List registered accounts, inspect roles, and manage users.

---

## 🎨 White & Beige Aesthetic Design System

- **Background Primary**: `#FAF8F5` (Alabaster Warm White)
- **Background Secondary**: `#F3EDE4` (Warm Linen Beige)
- **Surface**: `#FFFFFF` (Crisp Pure White)
- **Accent Gold**: `#A88B60` / `#8D7147` (Champagne Gold / Warm Sand)
- **Border**: `#EBE4DA` (Soft Taupe Border)
- **Text Main**: `#272320` (Warm Charcoal / Soft Noir)
- **Text Muted**: `#787067`
- **Headings**: `'Cormorant Garamond', Georgia, serif`
- **Body & Controls**: `'Plus Jakarta Sans', sans-serif`
- **Shimmer Title Effect**: CSS animated gradient text without heavy external animation physics.

---

## 🛠️ Architecture & Tech Stack

```
Traveling website/
├── client/                     # React + TypeScript + Vite + Vanilla CSS
│   ├── src/
│   │   ├── components/         # Navbar, Hero, Destinations, Hotels, Flights, Itinerary, Gallery, Reviews, Admin, Modals
│   │   ├── context/            # AuthContext (state, tokens, toasts)
│   │   ├── services/           # api.ts (backend client with offline resilience)
│   │   ├── types/              # Comprehensive TypeScript interfaces
│   │   ├── App.tsx             # Main orchestrator
│   │   ├── index.css           # Luxury design system
│   │   └── main.tsx            # React entry
├── server/                     # Node.js + Express + TypeScript + Mongoose
│   ├── src/
│   │   ├── config/             # db.ts (MongoDB connect with auto-resilient fallback)
│   │   ├── controllers/        # auth, package, booking, hotelFlight, review, admin controllers
│   │   ├── data/               # seedData.ts (rich luxury sample data)
│   │   ├── models/             # User, Package, Booking Mongoose schemas
│   │   ├── routes/             # api.ts (consolidated REST endpoints)
│   │   ├── store/              # repository.ts (in-memory + database unified store)
│   │   └── index.ts            # Express server
└── package.json                # Root scripts to run both client and server
```

---

## 🚀 Quick Start Guide

### 1. Run Backend Server
```bash
cd server
npm run dev
# Express API will run on http://localhost:5000
```

### 2. Run Frontend Client
```bash
cd client
npm run dev
# Vite client will run on http://localhost:5173
```

### 3. One-Click Demo Credentials
- **Administrator**: Click **"Sign In"** → **"Admin Demo"** (Email: `admin@oasis.com`, Password: `admin123`)
- **Traveler**: Click **"Sign In"** → **"Traveler Demo"** (Email: `traveler@oasis.com`, Password: `traveler123`)
- You can also register any new account directly in the registration tab!
