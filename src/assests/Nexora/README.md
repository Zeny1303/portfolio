# NexoraV2 – Discover Events Around You

![TypeScript](https://img.shields.io/badge/TypeScript-93.8%25-3178c6?style=flat-square)
![Next.js](https://img.shields.io/badge/Next.js-14.0-000000?style=flat-square)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-Styling-38bdf8?style=flat-square)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-green?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

**Nexora** is a full-stack campus event discovery and hosting platform designed for college students. Discover hackathons, tech fests, cultural nights, workshops, and campus events—or host and manage your own event with interactive 3D map rendering, automated location geocoding, poster uploads, and Stripe ticket checkouts.

🌐 **Live Demo:** [https://nexora-v2-taupe.vercel.app/](https://nexora-v2-taupe.vercel.app/)

---

## 📋 Overview

Nexora addresses the fragmentation of campus event listings across Indian colleges. Instead of relying on disconnected social media handles and posters, Nexora centralizes campus events into a unified platform featuring search and category filtering, geospatial 3D mapping with driving directions, organizer contact verification, and ticket sales.

---

## 🎯 Problem & Solution

### The Problem
* **Fragmented Information:** College fests and hackathons are scattered across WhatsApp groups, Instagram stories, and local college notice boards.
* **Lack of Geospatial Context:** Students outside a host college often struggle to locate venues or estimate travel distance.
* **Organizing Overhead:** Student organizers lack accessible tools for event registration, poster uploads, ticket sales, and attendee listing.

### The Solution
* **Centralized Discovery Engine:** Real-time event search and filtering across categories (Hackathon, Tech Fest, Workshop, Cultural, etc.).
* **3D Map & Geolocation:** Mapbox-powered 3D tilt aerial maps featuring live browser GPS location, radius filtering, and driving directions.
* **Automated Host Pipeline:** Streamlined event hosting form with automatic Mapbox geocoding (address → latitude/longitude) and UploadThing poster hosting.
* **Integrated Checkouts & User Sync:** Clerk-authenticated user sync to MongoDB via Svix webhooks, paired with Stripe checkout flow for ticketed events.

---

## ✨ Key Features

- **Event Discovery Engine:** Instant client/server search by keywords (title, description, location) and category filter dropdown with paginated data fetching.
- **Interactive 3D Map (`/map`):** Mapbox GL dark-v11 3D tilt map with 3D buildings and terrain, live browser GPS geolocation, nearby events radius slider (Haversine formula distance computation), city search fly-to, and driving directions routing via Mapbox Directions API.
- **Event Creation & Editing (`/events/create`, `/events/[id]/update`):** Zod-validated form (`EventForm.tsx`) with UploadThing image poster upload (4MB size limit validation), automated location geocoding, posted-by role tagging (`admin`, `organizer`, `student`), and organizer contact details (Instagram, LinkedIn, Email).
- **Colleges Directory (`/colleges`):** Dynamic grouping and ranking of partner institutions based on institution keywords (`university`, `college`, `iit`, `nit`, `bits`, `campus`) parsed from event location fields.
- **User Authentication & Sync:** Clerk authentication with Svix-verified webhook handler (`/api/webhook/clerk`) synchronizing user profiles into MongoDB (`User` model).
- **Stripe Ticket Checkouts (`/profile`, `/orders`):** Server action checkout session creation redirecting to Stripe payment gateway, with webhook order creation (`/api/webhook/stripe`) and organizer order tables.
- **User Profile & Management (`/profile`):** Unified dashboard displaying "My Tickets" (purchased orders) and "Events Organized" (events authored by user).

---

## 🔄 Product Workflow

```
[ User Browses Homepage / Events Page / 3D Map ]
                   │
    ┌──────────────┴──────────────┐
    ▼                             ▼
[ Search & Filter ]       [ Create Event ]
    │                             │
    ▼                             ▼
[ View Event Details ]    [ Fill Event Form & Poster Upload ]
    │                             │
    ▼                             ▼
[ Click Buy Ticket ]      [ Mapbox Geocodes Address -> Coords ]
    │                             │
    ▼                             ▼
[ Stripe Checkout ]       [ Event Saved in MongoDB + Revalidated ]
    │
    ▼
[ Order Webhook -> Saved ]
    │
    ▼
[ View Ticket in Profile ]
```

---

## 🏗️ Architecture

NexoraV2 is a **Full-Stack Next.js 14 App Router application** leveraging Server Components for optimized data fetching, Client Components for dynamic interactivity, Server Actions for mutations, and webhook API routes for third-party service integration.

```
+-----------------------------------------------------------------------+
|                             CLIENT / BROWSER                          |
|  Next.js 14 App Router (React 18, Tailwind CSS, Framer Motion, GSAP)  |
+-----------------------------------+-----------------------------------+
                                    |
            ┌───────────────────────┼───────────────────────┐
            │ Server Actions        │ REST API Routes       │ Webhook Endpoints
            ▼                       ▼                       ▼
+-----------------------+ +-------------------+ +-----------------------+
|  lib/actions/         | |  app/api/events/  | |  /api/webhook/clerk   |
|  • event.actions.ts   | |  • GET search/    | |  • /api/webhook/stripe|
|  • user.actions.ts    | |    pagination     | |  • /api/uploadthing   |
|  • order.actions.ts   | +---------+---------+ +-----------+-----------+
|  • category.actions.ts|           │                       │
+-----------+-----------+           │                       │
            │                       │                       │
            └───────────────────────┼───────────────────────┘
                                    ▼
+-----------------------------------------------------------------------+
|                           SERVICES & DATABASE                         |
|  • MongoDB + Mongoose ORM (Models: User, Event, Order, Category)      |
|  • Clerk (User Auth & Session Management)                             |
|  • UploadThing (Cloud File / Poster Image Storage)                    |
|  • Stripe API (Checkout Sessions & Webhook Events)                    |
|  • Mapbox GL / Geocoding / Directions API (3D Maps & Routing)         |
+-----------------------------------------------------------------------+
```

---

## 🛠️ Tech Stack

### Frontend & UI
- **Framework:** Next.js 14.0.4 (App Router)
- **Language:** TypeScript 5 (Strict mode)
- **Styling:** Tailwind CSS 3.3, Vanilla CSS (`globals.css`, `events.css`), shadcn/ui (Radix UI primitives)
- **Animations:** Framer Motion 12.36, GSAP 3.14
- **Icons & UI Extras:** Lucide React, Sonner (toast notifications), React Datepicker

### Maps & Geolocation
- **Map Library:** Mapbox GL 3.20, React Map GL 8.1
- **APIs:** Mapbox Geocoding API (`v5/mapbox.places`), Mapbox Directions API (`v5/mapbox/driving`)

### Backend & Services
- **Database:** MongoDB with Mongoose ODM 8.0.3 (`evently` database)
- **Authentication:** Clerk (`@clerk/nextjs` 4.27.5)
- **Webhook Verification:** Svix 1.15.0
- **File Uploads:** UploadThing (`uploadthing` 7.7.4, `@uploadthing/react` 7.3.3)
- **Payment Gateway:** Stripe (`stripe` 14.8.0, `@stripe/stripe-js` 2.2.1)
- **Form Management & Validation:** React Hook Form 7.49, Zod 3.22

---

## 📁 Project Structure

```
NexoraV2/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Clerk Auth Routes (/sign-in, /sign-up)
│   ├── (root)/                   # Protected & Public Application Routes
│   │   ├── page.tsx              # Homepage (Video Hero, Stats, Event Feed)
│   │   ├── events/               # Events Gallery & Dynamic Routes
│   │   │   ├── page.tsx          # Client-rendered Event Gallery with Search
│   │   │   ├── create/           # Create Event Page
│   │   │   └── [id]/             # Event Details & Edit Sub-route
│   │   ├── map/                  # 3D Interactive Mapbox Page
│   │   ├── colleges/             # College Directory Page
│   │   ├── profile/              # User Profile (Tickets & Organized Events)
│   │   └── orders/               # Organizer Order Management Table
│   ├── api/                      # Next.js API Handlers
│   │   ├── events/               # GET /api/events (Search & Filter Endpoint)
│   │   ├── uploadthing/          # File Upload Route & Core Router Config
│   │   └── webhook/              # Webhook Handlers (Clerk & Stripe)
│   ├── layout.tsx                # App Root Layout (Clerk Provider)
│   └── globals.css               # Global CSS & Tailwind Directives
├── components/                   # React Components
│   ├── animations/               # Reusable Animation Wrappers (FadeIn, ParticleField)
│   ├── map/                      # MapComponent.tsx (3D Mapbox GL Engine)
│   ├── shared/                   # Business Components (EventForm, Header, Card, etc.)
│   └── ui/                       # shadcn/ui Base Primitives
├── lib/                          # Backend Logic & Utilities
│   ├── actions/                  # Next.js Server Actions (event, user, order, category)
│   ├── database/                 # Mongoose Connection & Database Models
│   │   ├── index.ts              # Global Mongoose Connection Caching
│   │   └── models/               # Schemas (user, event, order, category)
│   ├── utils/                    # Geocoding & Helper Functions
│   ├── validator.ts              # Zod Schemas for Event Form Validation
│   └── uploadthing.ts            # UploadThing Client Hooks
├── types/                        # TypeScript Interfaces & Definitions
├── constants/                    # Event Form Default Values
├── middleware.ts                 # Clerk Authentication Middleware
├── next.config.js                # Next.js Image Domains Configuration
└── package.json                  # Dependencies & Scripts
```

---

## ⚙️ Core Technical Implementation

### 1. Server Actions Data Pipeline (`lib/actions/event.actions.ts`)
Event CRUD operations are executed via Next.js Server Actions. Creating an event automatically triggers `geocodeLocation()` using Mapbox's places endpoint before saving coordinates to MongoDB and calling `revalidatePath()`.

### 2. Interactive 3D Geospatial Engine (`components/map/MapComponent.tsx`)
Initializes Mapbox GL with `mapbox://styles/mapbox/dark-v11`, enabling 3D terrain and buildings. Computes real-time distances between user coordinates (`navigator.geolocation`) and event markers using the Haversine formula, and fetches route geometries via Mapbox Directions API on demand.

### 3. Clerk to MongoDB User Sync (`app/api/webhook/clerk/route.ts`)
Listens to Clerk webhook events (`user.created`, `user.updated`, `user.deleted`), verifies request payloads using Svix headers, synchronizes records with the MongoDB `User` collection, and updates Clerk `publicMetadata` with internal `userId` references.

### 4. Stripe Payment Processing (`lib/actions/order.actions.ts` & `app/api/webhook/stripe/route.ts`)
`checkoutOrder` creates a Stripe Checkout Session containing `eventId` and `buyerId` in metadata. On payment completion, Stripe's webhook triggers order creation in MongoDB linked to both Buyer and Event models.

---

## 📡 API Routes & Server Actions

### API Routes
| Endpoint | Method | Purpose | Authentication |
|---|---|---|---|
| `/api/events` | `GET` | Paginated event search and category filtering | Public |
| `/api/webhook/clerk` | `POST` | Clerk user lifecycle webhook sync | Verified via Svix |
| `/api/webhook/stripe` | `POST` | Stripe checkout session completion webhook | Verified via Stripe Signature |
| `/api/uploadthing` | `GET / POST` | File upload routing via UploadThing | Middleware Ignored |

### Primary Server Actions (`lib/actions/`)
- `createEvent({ event, userId, path })`: Geocodes location, creates event in MongoDB, revalidates cache.
- `updateEvent({ userId, event, path })`: Updates event details for verified organizers.
- `getEventById(eventId)`: Fetches single event with populated organizer and category refs.
- `getAllEvents({ query, limit, page, category })`: Fetches paginated events matching search queries.
- `getMapEvents()`: Returns filtered events containing valid latitude and longitude coordinates.
- `checkoutOrder(order)`: Instantiates Stripe checkout session and redirects client.
- `getOrdersByEvent({ searchString, eventId })`: Aggregates order data using MongoDB `$lookup` pipelines.

---

## 🗄️ Data Model

### User Schema (`lib/database/models/user.model.ts`)
```typescript
{
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  photo: { type: String, required: true }
}
```

### Event Schema (`lib/database/models/event.model.ts`)
```typescript
{
  title: { type: String, required: true },
  description: { type: String },
  location: { type: String },
  coordinates: {
    lat: { type: Number },
    lng: { type: Number }
  },
  createdAt: { type: Date, default: Date.now },
  imageUrl: { type: String, required: true },
  startDateTime: { type: Date, default: Date.now },
  endDateTime: { type: Date, default: Date.now },
  url: { type: String },
  isFree: { type: Boolean, default: false },
  price: { type: String },
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  organizer: { type: Schema.Types.ObjectId, ref: 'User' },
  postedBy: { type: String, enum: ['admin', 'organizer', 'student'], default: 'organizer', required: true },
  organizerInfo: {
    name: { type: String },
    email: { type: String },
    instagram: { type: String },
    linkedin: { type: String }
  }
}
// Index: { "coordinates.lat": 1, "coordinates.lng": 1 }
```

### Order Schema (`lib/database/models/order.model.ts`)
```typescript
{
  stripeId: { type: String, required: true, unique: true },
  totalAmount: { type: String },
  event: { type: Schema.Types.ObjectId, ref: 'Event' },
  buyer: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
}
```

### Category Schema (`lib/database/models/category.model.ts`)
```typescript
{
  name: { type: String, required: true, unique: true }
}
```

---

## 🔒 Authentication & Security

### Implemented Security
- **Clerk Auth Middleware:** Protects restricted routes (`/events/create`, `/profile`, `/orders`).
- **Svix Webhook Verification:** Verifies signatures on incoming Clerk webhooks to prevent payload spoofing.
- **Stripe Signature Verification:** Validates raw request body against Stripe webhook secret.
- **Client/Server Validation:** Zod schema validation on forms (`eventFormSchema`) enforcing character limits, email structure, and URLs.
- **File Upload Limits:** UploadThing router enforces image MIME types and a 4MB maximum file size limit.

### Security Improvements Needed
- **API Rate Limiting:** No rate limiting middleware on `/api/events` or Server Actions.
- **CORS Policies:** Webhook and API endpoints rely on default CORS configurations.
- **Input Sanitization:** Rich text descriptions and input fields rely on standard React JSX escaping against XSS.

---

## 💡 Engineering Challenges & Solutions

### Challenge 1: Dynamic 3D Geospatial Geocoding Pipeline
* **Problem:** Event organizers enter human-readable address strings (e.g. "IIT BHU, Varanasi") which cannot be plotted on a 3D Mapbox instance without geographic coordinates.
* **Solution:** Integrated an automated geocoding step (`geocodeLocation`) directly into the `createEvent` server action, converting location strings via Mapbox Geocoding API into `{ lat, lng }` prior to database insertion.

### Challenge 2: Synchronizing Asynchronous Webhooks with Database State
* **Problem:** Ensuring user records in MongoDB remain strictly synchronized with Clerk authentication lifecycle events without race conditions.
* **Solution:** Implemented a Svix-verified webhook handler that catches `user.created`, creates the MongoDB document, and immediately writes back the internal MongoDB `_id` into Clerk's `publicMetadata`.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm / yarn
- MongoDB Instance (Atlas or Local)
- Accounts for Clerk, Stripe, UploadThing, and Mapbox

### Environment Variables
Create a `.env.local` file in the root directory:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
WEBHOOK_SECRET=your_clerk_svix_webhook_secret

# MongoDB
MONGODB_URI=your_mongodb_connection_string

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# UploadThing
UPLOADTHING_SECRET=your_uploadthing_secret
UPLOADTHING_APP_ID=your_uploadthing_app_id

# Mapbox
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_access_token

# Application Base URL
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

### Installation & Local Development

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Zeny1303/NexoraV2.git
   cd NexoraV2
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Start Development Server:**
   ```bash
   npm run dev
   ```

4. **Access the Application:**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Project Status & Maintainer

- **Project Status:** Active / Production Deployment on Vercel.
- **Maintainer:** Zeny ([@Zeny1303](https://github.com/Zeny1303))
- **License:** MIT License
