import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { SiteHeader, NavPanel } from '../Navbar'
import { projects } from '../../data/projectsData'

import img1 from '../../assests/Nexora/img1.png'
import img2 from '../../assests/Nexora/img2.png'
import img3 from '../../assests/Nexora/img3.png'
import img4 from '../../assests/Nexora/img4.png'
import img5 from '../../assests/Nexora/img5.png'
import img6 from '../../assests/Nexora/img6.png'

import './NexoraProjectDetailPage.css'

export default function NexoraProjectDetailPage() {
  const navigate = useNavigate()
  const [navOpen, setNavOpen] = useState(false)
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const carouselItems = [
    {
      title: 'Event Discovery Feed & Search Gallery',
      desc: 'Paginated campus event feed with real-time keyword search and category filtering.',
      img: img1,
    },
    {
      title: '3D Mapbox GL Geospatial Discovery Engine',
      desc: 'Interactive 3D dark-v11 map displaying event pins, device GPS geolocation, Haversine radius slider, and driving routes.',
      img: img2,
    },
    {
      title: 'Event Showcase & Ticket Checkout Gateway',
      desc: 'Detailed event overview page integrating organizer contact channels and direct Stripe checkout session triggers.',
      img: img3,
    },
    {
      title: 'Event Creation & UploadThing Publishing Form',
      desc: 'Form validated via Zod schemas, uploading poster graphics to UploadThing cloud storage & geocoding location addresses.',
      img: img4,
    },
    {
      title: 'Student Profile & Purchased Tickets Dashboard',
      desc: 'Personalized user dashboard displaying registered events and purchased ticket receipts synced via Webhooks.',
      img: img5,
    },
    {
      title: 'Organizer Orders Aggregation & Attendee Table',
      desc: 'Organizer management table executing MongoDB aggregation pipelines to track real-time ticket sales & buyer info.',
      img: img6,
    },
  ]

  const project = projects.find((p) => p.id === 'nexora') || projects[3]
  const currentIndex = projects.findIndex((p) => p.id === 'nexora')
  const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length]
  const nextProject = projects[(currentIndex + 1) % projects.length]

  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % carouselItems.length)
  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + carouselItems.length) % carouselItems.length)

  return (
    <div className="nexora-project-page">
      <SiteHeader onOpen={() => setNavOpen(true)} />
      <NavPanel isOpen={navOpen} onClose={() => setNavOpen(false)} />

      {/* ═══════════════════════════════════════════
          1. HERO SECTION
      ═══════════════════════════════════════════ */}
      <section className="nexora-hero-section">
        <nav className="nexora-hero-breadcrumb">
          <Link to="/work" className="nexora-breadcrumb-btn">
            Work
          </Link>
          <span className="nexora-breadcrumb-sep">/</span>
          <span className="nexora-breadcrumb-text">NexoraV2</span>
        </nav>

        <div className="nexora-hero-content">
          <div className="nexora-hero-left">
            <span className="nexora-eyebrow">Full-Stack Campus Event & 3D Geospatial Platform</span>
            <h1 className="nexora-hero-title">
              NEXORA
              <span className="nexora-title-underline" />
            </h1>
            <p className="nexora-hero-description">
              Nexora is a full-stack campus event discovery and hosting platform built for university students using Next.js 14 (App Router), TypeScript, Mapbox GL 3D, MongoDB, UploadThing, Stripe, and Svix-verified Clerk webhooks.
            </p>

            <div className="nexora-hero-actions">
              <a
                href="https://nexora-v2-taupe.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="nexora-btn nexora-btn-primary"
              >
                Launch Live App ↗
              </a>
              <a
                href="https://github.com/Zeny1303/NexoraV2"
                target="_blank"
                rel="noopener noreferrer"
                className="nexora-btn nexora-btn-secondary"
              >
                GitHub Repository ↗
              </a>
            </div>
          </div>

          {/* Screenshot Carousel */}
          <div className="nexora-carousel">
            <div className="nexora-carousel-container">
              <img
                src={carouselItems[activeSlide].img}
                alt={carouselItems[activeSlide].title}
                className="nexora-carousel-image"
              />
              <div className="nexora-carousel-counter">
                {activeSlide + 1} / {carouselItems.length}
              </div>
            </div>

            <div className="nexora-carousel-controls">
              <button onClick={prevSlide} className="nexora-carousel-btn" aria-label="Previous image">
                ‹
              </button>
              <div className="nexora-carousel-indicators">
                {carouselItems.map((_, idx) => (
                  <button
                    key={idx}
                    className={`nexora-carousel-dot ${activeSlide === idx ? 'active' : ''}`}
                    onClick={() => setActiveSlide(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
              <button onClick={nextSlide} className="nexora-carousel-btn" aria-label="Next image">
                ›
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          2. METRICS HIGHLIGHTS
      ═══════════════════════════════════════════ */}
      <section className="nexora-section">
        <h2 className="nexora-section-title">Key Performance Specifications</h2>
        <p className="nexora-section-subtitle">
          Engineered for high-concurrency event publishing, sub-second 3D geospatial rendering, and secure asynchronous webhook verification.
        </p>

        <div className="nexora-metrics-grid">
          <div className="nexora-metric-card">
            <span className="nexora-metric-value">Mapbox 3D</span>
            <span className="nexora-metric-label">Geospatial Mapping Engine</span>
            <span className="nexora-metric-desc">Dark-v11 aerial 3D terrain tilt with GPS geolocation & route drawing.</span>
          </div>
          <div className="nexora-metric-card">
            <span className="nexora-metric-value">&lt; 200ms</span>
            <span className="nexora-metric-label">Mapbox Geocoding Latency</span>
            <span className="nexora-metric-desc">Server action address-to-coordinate transformation via Places API.</span>
          </div>
          <div className="nexora-metric-card">
            <span className="nexora-metric-value">Svix Signed</span>
            <span className="nexora-metric-label">Clerk Identity Sync Webhook</span>
            <span className="nexora-metric-desc">Cryptographically verified user creation & deletion event sync to MongoDB.</span>
          </div>
          <div className="nexora-metric-card">
            <span className="nexora-metric-value">Stripe API</span>
            <span className="nexora-metric-label">Ticket Checkout & Webhooks</span>
            <span className="nexora-metric-desc">Automated Stripe session checkout with signature verified webhook orders.</span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          3. USER WORKFLOW PIPELINES
      ═══════════════════════════════════════════ */}
      <section className="nexora-section">
        <h2 className="nexora-section-title">Platform Workflows & Execution Pipelines</h2>
        <p className="nexora-section-subtitle">
          Step-by-step technical workflows connecting frontend user interactions with serverless backend APIs.
        </p>

        <div className="nexora-workflow-container">
          {/* Workflow 1: Discovery & Map Navigation */}
          <div className="nexora-workflow-card">
            <span className="nexora-workflow-badge discovery">Discovery & 3D Map Flow</span>
            <h3 className="nexora-workflow-title">Event Browsing & Geospatial Navigation</h3>
            <div className="nexora-workflow-steps">
              <div className="nexora-step">
                <span className="nexora-step-num">1</span>
                <div className="nexora-step-content">
                  <h4>Category Filter & Keyword Search</h4>
                  <p>Client sends query params to GET <code>/api/events</code>; Server executes paginated MongoDB queries.</p>
                </div>
              </div>
              <div className="nexora-step">
                <span className="nexora-step-num">2</span>
                <div className="nexora-step-content">
                  <h4>3D Mapbox GL Viewport Initialization</h4>
                  <p>Map component renders dark-v11 3D terrain style; fetches user GPS via <code>navigator.geolocation</code>.</p>
                </div>
              </div>
              <div className="nexora-step">
                <span className="nexora-step-num">3</span>
                <div className="nexora-step-content">
                  <h4>Haversine Radius & Route Directions</h4>
                  <p>Slider adjusts radius filter; clicking event pins calls Mapbox Directions API to draw turn-by-turn route lines.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Workflow 2: Event Publishing & Checkout */}
          <div className="nexora-workflow-card">
            <span className="nexora-workflow-badge checkout">Publishing & Payment Flow</span>
            <h3 className="nexora-workflow-title">Event Creation & Stripe Order Webhook</h3>
            <div className="nexora-workflow-steps">
              <div className="nexora-step">
                <span className="nexora-step-num">1</span>
                <div className="nexora-step-content">
                  <h4>React Hook Form & UploadThing Storage</h4>
                  <p>Validates parameters via Zod; uploads poster file up to 4MB directly to UploadThing cloud bucket.</p>
                </div>
              </div>
              <div className="nexora-step">
                <span className="nexora-step-num">2</span>
                <div className="nexora-step-content">
                  <h4>Mapbox Geocoding & MongoDB Save</h4>
                  <p>Server Action <code>createEvent()</code> transforms address string to lat/lng coordinates and inserts document.</p>
                </div>
              </div>
              <div className="nexora-step">
                <span className="nexora-step-num">3</span>
                <div className="nexora-step-content">
                  <h4>Stripe Checkout & Webhook Fulfillment</h4>
                  <p>Stripe Checkout Session redirects user; <code>POST /api/webhook/stripe</code> verifies signature & creates Order.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          4. CORE FEATURES PANEL
      ═══════════════════════════════════════════ */}
      <section className="nexora-section">
        <h2 className="nexora-section-title">Core Technical Features</h2>
        <p className="nexora-section-subtitle">
          Architectural solutions engineered to solve information fragmentation across university campuses.
        </p>

        <div className="nexora-features-grid">
          <div className="nexora-feature-card">
            <span className="nexora-feature-icon">🗺️</span>
            <h3>3D Mapbox GL Geospatial Discovery</h3>
            <p>Full-screen 3D aerial mapping engine using Mapbox GL v3.2 dark terrain style with device GPS markers and route lines.</p>
            <ul className="nexora-feature-list">
              <li>Browser GPS Geolocation integration</li>
              <li>Haversine distance calculation formula</li>
              <li>Mapbox Directions API route drawing</li>
              <li>Custom category pins & emoji popups</li>
            </ul>
          </div>

          <div className="nexora-feature-card">
            <span className="nexora-feature-icon">🚀</span>
            <h3>Automated Address Geocoding</h3>
            <p>Instant server-side conversion of physical venue strings into exact latitude and longitude coordinates.</p>
            <ul className="nexora-feature-list">
              <li>Mapbox Places API integration</li>
              <li>Geospatial Mongoose index optimization</li>
              <li>Fallback coordinate detection</li>
              <li>Zero manual coordinate input needed</li>
            </ul>
          </div>

          <div className="nexora-feature-card">
            <span className="nexora-feature-icon">🔒</span>
            <h3>Svix-Verified Identity Synchronization</h3>
            <p>Clerk authentication middleware paired with cryptographic Svix signature verification for MongoDB sync.</p>
            <ul className="nexora-feature-list">
              <li>Clerk Auth JWT & Session cookies</li>
              <li>Svix header signature verification</li>
              <li>Automatic user creation/deletion hooks</li>
              <li>Public metadata MongoDB ID updates</li>
            </ul>
          </div>

          <div className="nexora-feature-card">
            <span className="nexora-feature-icon">💳</span>
            <h3>Stripe Checkout & Webhook Orders</h3>
            <p>Paid event ticket registration integrated with hosted Stripe Checkout Gateway and payment webhooks.</p>
            <ul className="nexora-feature-list">
              <li>Stripe Checkout Sessions API</li>
              <li>Raw Stripe signature verification</li>
              <li>Asynchronous order collection insertion</li>
              <li>User profile ticket history dashboard</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          5. SYSTEM ARCHITECTURE DIAGRAM
      ═══════════════════════════════════════════ */}
      <section className="nexora-section">
        <h2 className="nexora-section-title">System Architecture</h2>
        <p className="nexora-section-subtitle">
          Next.js 14 App Router combining React Server Components, Server Actions, and webhook event routing.
        </p>

        <div className="nexora-arch-box">
          <div className="nexora-arch-header">
            <h3>System Architecture Diagram</h3>
            <span className="nexora-arch-tag">Next.js 14 + MongoDB + Webhooks</span>
          </div>

          <div className="nexora-arch-nodes">
            <div className="nexora-arch-node">
              <div className="nexora-arch-node-title">💻 Client Layer</div>
              <div className="nexora-arch-node-pills">
                <span className="nexora-arch-pill">Next.js 14 App Router</span>
                <span className="nexora-arch-pill">Tailwind CSS</span>
                <span className="nexora-arch-pill">Mapbox GL v3.2</span>
                <span className="nexora-arch-pill">Framer Motion</span>
              </div>
            </div>

            <div className="nexora-arch-node">
              <div className="nexora-arch-node-title">⚙️ Server Core</div>
              <div className="nexora-arch-node-pills">
                <span className="nexora-arch-pill">Server Actions ('use server')</span>
                <span className="nexora-arch-pill">Clerk Svix Webhook</span>
                <span className="nexora-arch-pill">Stripe Webhook</span>
                <span className="nexora-arch-pill">UploadThing Router</span>
              </div>
            </div>

            <div className="nexora-arch-node">
              <div className="nexora-arch-node-title">🗄️ Database & APIs</div>
              <div className="nexora-arch-node-pills">
                <span className="nexora-arch-pill">MongoDB Atlas</span>
                <span className="nexora-arch-pill">Mongoose ODM 8.0</span>
                <span className="nexora-arch-pill">Mapbox Places API</span>
                <span className="nexora-arch-pill">Stripe Checkout API</span>
              </div>
            </div>
          </div>

          <div className="nexora-arch-flow">
{`+-----------------------------------------------------------------------------------+
|                                CLIENT / BROWSER                                   |
|   Next.js 14 App Router (RSC Feed Pages & Client Component 3D Mapbox GL Map)       |
+----------------------------------------+------------------------------------------+
                                         |
               ┌─────────────────────────┴──────────────────────────┐
               │ Server Actions / HTTP Requests                     │ Webhook Signatures
               ▼                                                    ▼
+----------------────────────────────────+    +-------------------------------------+
|          NEXT.JS SERVER CORE           |    |           WEBHOOK ROUTING           |
|  • lib/actions/event.actions.ts        |    |  • /api/webhook/clerk (Svix Verified)|
|  • lib/actions/order.actions.ts        |    |  • /api/webhook/stripe (Verified)   |
+----------------──┬─────────────────────+    +----------------──┬------------------+
                   │                                             │
                   └──────────────────────┬──────────────────────┘
                                          ▼
+-----------------------------------------------------------------------------------+
|                            BACKEND SERVICES & DATABASE                            |
|   • MongoDB Atlas (Mongoose ODM 8.0, Cached Global Connection Pool)               |
|   • Clerk Authentication (JWT, Session Cookies, Svix Sync)                        |
|   • UploadThing Cloud Poster Bucket (4MB Max File Size)                           |
|   • Stripe API (Checkout Sessions Gateway)                                        |
+-----------------------------------------------------------------------------------+`}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          6. TECH STACK
      ═══════════════════════════════════════════ */}
      <section className="nexora-section">
        <h2 className="nexora-section-title">Technology Stack Breakdown</h2>
        <p className="nexora-section-subtitle">
          Core frameworks, libraries, database systems, and cloud services powering NexoraV2.
        </p>

        <div className="nexora-tech-grid">
          <div className="nexora-tech-card">
            <h3>Frontend Core</h3>
            <div className="nexora-tech-pills">
              <span className="nexora-tech-pill">Next.js 14</span>
              <span className="nexora-tech-pill">TypeScript</span>
              <span className="nexora-tech-pill">React 18</span>
              <span className="nexora-tech-pill">Tailwind CSS</span>
              <span className="nexora-tech-pill">Framer Motion</span>
            </div>
          </div>

          <div className="nexora-tech-card">
            <h3>Mapping & Storage</h3>
            <div className="nexora-tech-pills">
              <span className="nexora-tech-pill">Mapbox GL v3.2</span>
              <span className="nexora-tech-pill">React Map GL</span>
              <span className="nexora-tech-pill">Mapbox Geocoding API</span>
              <span className="nexora-tech-pill">UploadThing Storage</span>
            </div>
          </div>

          <div className="nexora-tech-card">
            <h3>Backend & Database</h3>
            <div className="nexora-tech-pills">
              <span className="nexora-tech-pill">Next.js Server Actions</span>
              <span className="nexora-tech-pill">MongoDB Atlas</span>
              <span className="nexora-tech-pill">Mongoose ODM</span>
              <span className="nexora-tech-pill">Zod Validation</span>
            </div>
          </div>

          <div className="nexora-tech-card">
            <h3>Auth & Payments</h3>
            <div className="nexora-tech-pills">
              <span className="nexora-tech-pill">Clerk Authentication</span>
              <span className="nexora-tech-pill">Svix Webhooks</span>
              <span className="nexora-tech-pill">Stripe API</span>
              <span className="nexora-tech-pill">Stripe Webhooks</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          7. DATA MODELS
      ═══════════════════════════════════════════ */}
      <section className="nexora-section">
        <h2 className="nexora-section-title">Database Models & Schemas</h2>
        <p className="nexora-section-subtitle">
          MongoDB collections defined via Mongoose schemas in <code>lib/database/models/</code>.
        </p>

        <div className="nexora-models-grid">
          {/* Event Model */}
          <div className="nexora-model-card">
            <div className="nexora-model-header">
              <span className="nexora-model-name">Event</span>
              <span className="nexora-model-collection">events</span>
            </div>
            <div className="nexora-model-fields">
              <div className="nexora-field-row"><span className="nexora-field-name">title</span><span className="nexora-field-type">String (Req)</span></div>
              <div className="nexora-field-row"><span className="nexora-field-name">location</span><span className="nexora-field-type">String</span></div>
              <div className="nexora-field-row"><span className="nexora-field-name">coordinates</span><span className="nexora-field-type">&#123; lat, lng &#125;</span></div>
              <div className="nexora-field-row"><span className="nexora-field-name">imageUrl</span><span className="nexora-field-type">String (UploadThing)</span></div>
              <div className="nexora-field-row"><span className="nexora-field-name">isFree / price</span><span className="nexora-field-type">Boolean / String</span></div>
              <div className="nexora-field-row"><span className="nexora-field-name">category</span><span className="nexora-field-type">ObjectId (Ref Category)</span></div>
              <div className="nexora-field-row"><span className="nexora-field-name">organizer</span><span className="nexora-field-type">ObjectId (Ref User)</span></div>
            </div>
          </div>

          {/* User Model */}
          <div className="nexora-model-card">
            <div className="nexora-model-header">
              <span className="nexora-model-name">User</span>
              <span className="nexora-model-collection">users</span>
            </div>
            <div className="nexora-model-fields">
              <div className="nexora-field-row"><span className="nexora-field-name">clerkId</span><span className="nexora-field-type">String (Unique)</span></div>
              <div className="nexora-field-row"><span className="nexora-field-name">email</span><span className="nexora-field-type">String (Unique)</span></div>
              <div className="nexora-field-row"><span className="nexora-field-name">username</span><span className="nexora-field-type">String (Unique)</span></div>
              <div className="nexora-field-row"><span className="nexora-field-name">firstName</span><span className="nexora-field-type">String</span></div>
              <div className="nexora-field-row"><span className="nexora-field-name">lastName</span><span className="nexora-field-type">String</span></div>
              <div className="nexora-field-row"><span className="nexora-field-name">photo</span><span className="nexora-field-type">String</span></div>
            </div>
          </div>

          {/* Order Model */}
          <div className="nexora-model-card">
            <div className="nexora-model-header">
              <span className="nexora-model-name">Order</span>
              <span className="nexora-model-collection">orders</span>
            </div>
            <div className="nexora-model-fields">
              <div className="nexora-field-row"><span className="nexora-field-name">stripeId</span><span className="nexora-field-type">String (Unique)</span></div>
              <div className="nexora-field-row"><span className="nexora-field-name">totalAmount</span><span className="nexora-field-type">String</span></div>
              <div className="nexora-field-row"><span className="nexora-field-name">event</span><span className="nexora-field-type">ObjectId (Ref Event)</span></div>
              <div className="nexora-field-row"><span className="nexora-field-name">buyer</span><span className="nexora-field-type">ObjectId (Ref User)</span></div>
              <div className="nexora-field-row"><span className="nexora-field-name">createdAt</span><span className="nexora-field-type">Date</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          8. API ENDPOINTS TABLE
      ═══════════════════════════════════════════ */}
      <section className="nexora-section">
        <h2 className="nexora-section-title">API Routes & Server Actions</h2>
        <p className="nexora-section-subtitle">
          Summary of REST endpoints and serverless functions handling data mutations and webhooks.
        </p>

        <div className="nexora-table-wrapper">
          <table className="nexora-api-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Endpoint / Action</th>
                <th>Description</th>
                <th>Auth / Signature</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><span className="nexora-method-badge get">GET</span></td>
                <td><code className="nexora-endpoint-code">/api/events</code></td>
                <td>Fetch paginated event list matching search keywords and category</td>
                <td>Public</td>
              </tr>
              <tr>
                <td><span className="nexora-method-badge post">ACTION</span></td>
                <td><code className="nexora-endpoint-code">createEvent()</code></td>
                <td>Invokes Mapbox geocoding, uploads poster, & saves Event document</td>
                <td>Clerk Session</td>
              </tr>
              <tr>
                <td><span className="nexora-method-badge post">ACTION</span></td>
                <td><code className="nexora-endpoint-code">checkoutOrder()</code></td>
                <td>Instantiates Stripe Checkout Session & redirects user to gateway</td>
                <td>Clerk Session</td>
              </tr>
              <tr>
                <td><span className="nexora-method-badge post">POST</span></td>
                <td><code className="nexora-endpoint-code">/api/webhook/clerk</code></td>
                <td>Svix-verified webhook handler syncing Clerk user events to MongoDB</td>
                <td>Svix Signature</td>
              </tr>
              <tr>
                <td><span className="nexora-method-badge post">POST</span></td>
                <td><code className="nexora-endpoint-code">/api/webhook/stripe</code></td>
                <td>Stripe-signed webhook handler creating Order documents upon checkout</td>
                <td>Stripe Signature</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          9. ENGINEERING DECISIONS
      ═══════════════════════════════════════════ */}
      <section className="nexora-section">
        <h2 className="nexora-section-title">Key Engineering Decisions</h2>
        <p className="nexora-section-subtitle">
          Architectural choices driving performance, security, and developer ergonomics.
        </p>

        <div className="nexora-decisions-grid">
          <div className="nexora-decision-card">
            <span className="nexora-decision-num">01</span>
            <h3>Server Actions over REST Boilerplate</h3>
            <p>
              By leveraging Next.js 14 Server Actions (<code>'use server'</code>), form submissions invoke server code directly with end-to-end TypeScript safety and automatic path revalidation (<code>revalidatePath</code>).
            </p>
          </div>

          <div className="nexora-decision-card">
            <span className="nexora-decision-num">02</span>
            <h3>Client-Side 3D Mapbox GL Integration</h3>
            <p>
              Isolated the 1000+ line Mapbox GL engine inside Client Components (<code>"use client"</code>) while using React Server Components for feed rendering, optimizing initial page load speed.
            </p>
          </div>

          <div className="nexora-decision-card">
            <span className="nexora-decision-num">03</span>
            <h3>Cached Database Connection Pooling</h3>
            <p>
              Implemented global connection caching (<code>global.mongoose</code>) to prevent MongoDB connection exhaustion during serverless function cold starts and high concurrency bursts.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          10. FINAL CTA & PROJECT NAV
      ═══════════════════════════════════════════ */}
      <section className="nexora-cta-section">
        <h2>Interested in full-stack geospatial or SaaS platforms?</h2>
        <p>Let's discuss full-stack software development and backend engineering roles.</p>
        <button onClick={() => navigate('/contact')} className="nexora-cta-btn">
          Get In Touch →
        </button>
      </section>

      <nav className="nexora-nav-footer">
        <Link to={`/work/${prevProject.id}`} className="nexora-nav-link prev">
          <span className="nav-dir">← Previous Project</span>
          <span className="nav-title">{prevProject.title}</span>
        </Link>
        <Link to={`/work/${nextProject.id}`} className="nexora-nav-link next">
          <span className="nav-dir">Next Project →</span>
          <span className="nav-title">{nextProject.title}</span>
        </Link>
      </nav>
    </div>
  )
}
