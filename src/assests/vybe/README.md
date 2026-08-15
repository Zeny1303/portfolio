# VYBE ✨ — Real-Time Social Music Streaming Platform

> A full-stack, realtime music streaming and social platform featuring mood-based music discovery ("What's Your Vybe?"), Jamendo Creative Commons audio streaming, Spotify & MusicBrainz metadata discovery, Socket.IO live activity feeds & 1-on-1 chat, synchronized LRC lyrics, custom playlist management, and Clerk-protected role-based admin controls.

---

## 🌟 Overview

**VYBE** bridges the gap between independent open-source music discovery, mainstream music catalog exploration, and real-time social interaction. Built with React 18, Vite, TypeScript, Node.js, Express, MongoDB, Socket.IO, Clerk, and Cloudinary, **VYBE** offers a responsive, dark-mode audio web experience tailored for both casual listeners (guests) and registered users.

---

## 🎯 Problem Statement

Traditional music platforms either:
1. Lock music discovery completely behind strict paywalls.
2. Lack real-time social context (seeing what friends are listening to live or listening along).
3. Offer static search results without distinguishing between playable Creative Commons audio streams versus external catalog metadata.

---

## 🚀 Solution

**VYBE** provides:
* **Dual-Layer Catalog Engine**: Stream playable legal tracks directly (via Jamendo API and Cloudinary uploads) while enabling global metadata search for mainstream tracks (via Spotify Web API & MusicBrainz).
* **"What's Your Vybe?" Mood Engine**: Instant track feed aggregation based on real-time mood tags (*Energy Boost*, *Chill Mode*, *Focus Flow*, *Late Night*, etc.).
* **Real-time Social Activity & Chat**: WebSockets (Socket.IO) push live listening activities, online presence indicators, and instant 1-on-1 track-sharing messages.
* **Synchronized LRC Lyrics Engine**: Dual-provider lyrics fetcher (Jamendo API + LRCLIB) with millisecond-accurate synchronized karaoke text highlighting.
* **Auth-Aware Progressive UX**: Allows guest browsing & music playback while protecting personal features (*Library*, *Liked Songs*, *Playlists*, *Messages*, *Admin Panel*) behind clean Clerk auth gates.

---

## ✨ Key Features

* **🎵 Audio Playback Engine**: Persistent bottom player bar with Play/Pause, Seekbar, Volume control, Mute toggle, Shuffle, Repeat (One/All), and soundwave equalizer animation.
* **⚡ Mood Discovery**: Dynamic track recommendation feeds by mood tags with instant dynamic queue loading.
* **🌐 Jamendo Integration**: Direct streaming of millions of free, high-quality Creative Commons audio tracks.
* **🔍 Unified Multicategory Search**: Server-side ranked search across playable tracks, external songs, albums, and artists with relevance scoring.
* **💬 Real-Time Chat & Social Feed**: 1-on-1 direct messaging, song sharing via chat, and live "Now Playing" activity broadcasting.
* **📜 Synchronized LRC Lyrics**: Live line-by-line synced lyrics reader powered by LRCLIB and Jamendo.
* **📚 Personal Library**: Custom playlist creation, Liked Songs collection, Recently Played history, and saved albums.
* **🛡️ Protected Admin Dashboard**: Role-based route protection, direct Cloudinary file uploads (audio & cover art), and catalog stats dashboard.

---

## 🔄 User Workflow

```text
GUEST USER:
Enter VYBE → Browse Home / Search / Explore / Vibes → Play Jamendo Tracks → Click Like / Save / Chat → Auth Gate Prompt → Sign In / Sign Up via Clerk

AUTHENTICATED USER:
Log In → Personalized Home ("Good evening, Sneha ⚡") → Stream Tracks → Save to Playlists / Like → Broadcast Live Activity to Friends → Send Real-time Chat Messages → View Lyrics
```

---

## 🏗 System Architecture

```text
+-----------------------------------------------------------------------------------+
|                                  REACT 18 FRONTEND                                |
|  React Router v6 | Zustand State Stores | Tailwind CSS | Radix UI | Socket.IO Client |
+-----------------------------------------------------------------------------------+
                                   |           ^
                           HTTP / REST        WebSockets
                                   v           |
+-----------------------------------------------------------------------------------+
|                                 EXPRESS.JS BACKEND                                |
|   Clerk Middleware | FileUpload (tmp) | Admin Auth Guards | Node-Cron Temp Cleaner|
+-----------------------------------------------------------------------------------+
     |              |               |               |                |
     v              v               v               v                v
+----------+  +-----------+  +------------+  +--------------+  +---------------+
| MongoDB  |  | Cloudinary|  |Jamendo API |  | Spotify API  |  | LRCLIB Service|
| Mongoose |  | Media S3  |  | (Audio CC) |  | (Metadata)   |  | (Synced LRC)  |
+----------+  +-----------+  +------------+  +--------------+  +---------------+
```

---

## 🛠 Tech Stack

### **Frontend**
* **Framework & Build**: React 18, Vite 5, TypeScript 5.6
* **Styling & UI**: Tailwind CSS 3.4, Radix UI Primitives, Lucide React Icons
* **State Management**: Zustand 5
* **Routing**: React Router DOM v6
* **Authentication**: `@clerk/clerk-react` 5.14
* **Real-time Client**: `socket.io-client` 4.8
* **HTTP Client**: Axios 1.7
* **Notifications**: `react-hot-toast`

### **Backend**
* **Runtime & Framework**: Node.js, Express.js 4
* **Database & ORM**: MongoDB, Mongoose 8
* **Real-Time Server**: Socket.IO 4
* **Authentication Middleware**: `@clerk/express` 1.3
* **Media Storage**: Cloudinary SDK 2.5
* **File Upload Handling**: `express-fileupload` 1.5
* **Scheduled Tasks**: `node-cron` 3.0

---

## 📁 Project Structure

```
vybe/
├── backend/
│   ├── src/
│   │   ├── controller/      # Admin, Album, Auth, Jamendo, Library, Lyrics, Search, Song, Stat, User
│   │   ├── lib/             # Cloudinary client, MongoDB connection, Socket.IO server setup
│   │   ├── middleware/      # Auth protection & Admin email check middleware
│   │   ├── models/          # Mongoose Schemas (User, Song, Album, Playlist, Like, Recent, Message)
│   │   ├── routes/          # Express route definitions
│   │   ├── seeds/           # Database seed scripts (songs.js, albums.js)
│   │   ├── services/        # Catalog, Jamendo, Spotify, Lyrics, MusicBrainz services
│   │   └── index.js         # Express server & socket HTTP listener entry point
│   ├── .env.example
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── assets/          # Static images & app logo
    │   ├── components/      # UI components (Topbar, AuthModal, AuthGate, ProtectedRoute)
    │   ├── config/          # Vibe mood configurations
    │   ├── layout/          # App shell, Resizable panels, LeftSidebar, FriendsActivity, PlaybackControls
    │   ├── pages/           # App views (Home, Explore, Vibes, Search, Chat, Library, Admin, Lyrics)
    │   ├── providers/       # Auth & Socket initialization provider
    │   ├── stores/          # Zustand stores (Player, Music, Auth, Chat, Library, Search, Lyrics, AuthModal)
    │   ├── types/           # TypeScript interfaces
    │   ├── App.tsx          # Router layout & route definitions
    │   └── main.tsx         # React app DOM entry point
    ├── .env.example
    └── package.json
```

---

## 💾 Database Schemas

* **`User`**: `clerkId` (unique index), `fullName`, `imageUrl`, timestamps.
* **`Song`**: `title`, `artist`, `imageUrl`, `audioUrl`, `duration`, `albumId`, `album`, `source` (`"cloudinary" | "jamendo" | "local"`), `sourceId`, `licenseUrl`, timestamps.
* **`Album`**: `title`, `artist`, `imageUrl`, `releaseYear`, `songs` (Array of ObjectId refs to `Song`), timestamps.
* **`Playlist`**: `name`, `description`, `owner` (Clerk User ID), `imageUrl`, `songs` (embedded subdocuments array), timestamps.
* **`Like`**: `userId` (Clerk ID), `songId`, `song` (embedded Object), timestamps. Unique index on `{ userId: 1, songId: 1 }`.
* **`Recent`**: `userId` (Clerk ID), `songId`, `song` (embedded Object), `playedAt`, timestamps. Index on `{ userId: 1, songId: 1 }`.
* **`Message`**: `senderId`, `receiverId`, `content`, `type` (`"text" | "song"`), `song` (embedded Object), timestamps.

---

## 🔌 API Endpoints Summary

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/callback` | Syncs Clerk user data to MongoDB | Yes |
| `GET` | `/api/admin/check` | Checks if current user is admin | Yes |
| `POST` | `/api/admin/songs` | Uploads song (audio + image) to Cloudinary & saves to DB | Admin Only |
| `DELETE`| `/api/admin/songs/:id` | Deletes song from DB & album reference | Admin Only |
| `POST` | `/api/admin/albums` | Uploads album cover & creates album | Admin Only |
| `DELETE`| `/api/admin/albums/:id` | Deletes album and associated songs | Admin Only |
| `GET` | `/api/songs` | Gets all songs in catalog | No |
| `GET` | `/api/songs/featured` | Gets 6 random featured songs | No |
| `GET` | `/api/songs/made-for-you`| Gets 4 random made-for-you songs | No |
| `GET` | `/api/songs/trending` | Gets 4 random trending songs | No |
| `GET` | `/api/albums` | Gets all albums | No |
| `GET` | `/api/albums/:id` | Gets single album with populated songs | No |
| `GET` | `/api/jamendo/discover`| Fetches tracks from Jamendo API v3.0 | No |
| `GET` | `/api/search` | Unified multi-catalog search with ranking | No |
| `GET` | `/api/lyrics` | Resolves LRC/synced lyrics via Jamendo & LRCLIB | No |
| `GET` | `/api/library/playlists`| Gets current user's playlists | Yes |
| `POST` | `/api/library/playlists`| Creates a new playlist | Yes |
| `POST` | `/api/library/likes` | Likes a song for current user | Yes |
| `GET` | `/api/library/recent` | Gets user's recently played songs | Yes |

---

## 🔐 Authentication & Security

* **Authentication**: Handled via Clerk (`@clerk/express` on backend, `@clerk/clerk-react` on frontend). Bearer JWT token attached to Axios headers.
* **Role Verification**: Admin access verified on backend (`auth.middleware.js`) by comparing Clerk primary email against `ADMIN_EMAIL` env variable.
* **Protected Routes & Modals**: Frontend routes guarded via `<ProtectedRoute>` rendering `<AuthGate>`; protected actions (e.g. Liking a song) trigger `<AuthModal>`.
* **File Upload Limits**: `express-fileupload` limits file size to 10MB; uploaded files placed in `tmp/` and cleaned hourly via `node-cron`.

---

## ⚡ Performance Optimization

* **In-Memory Catalog Cache**: Backend `CatalogService` caches unified search queries in memory for 5 minutes (`CACHE_TTL_MS = 300000`).
* **Parallel API Requests**: `Promise.all` executes Jamendo and Spotify/MusicBrainz API queries simultaneously.
* **Vite Production Bundling**: Code splitting and minification via Vite 5 (`dist/` production build).

---

## 🚀 Environment Setup & Installation

### Prerequisites
* **Node.js** (v18.x or higher)
* **MongoDB** instance (Local or Atlas)
* **Clerk** account (for publishable & secret keys)
* **Cloudinary** account (for media storage)
* **Jamendo API** credentials (optional client ID for CC streaming)

---

### 1️⃣ Configure Environment Variables

#### Backend `.env` (`/backend/.env`)
```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/vybe
ADMIN_EMAIL=admin@example.com
NODE_ENV=development

CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name

CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

JAMENDO_CLIENT_ID=your_jamendo_client_id
JAMENDO_CLIENT_SECRET=your_jamendo_client_secret
```

#### Frontend `.env` (`/frontend/.env`)
```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

---

### 2️⃣ Installation & Local Running

```bash
# Terminal 1 - Backend
cd backend
npm install
npm run dev

# Terminal 2 - Frontend
cd frontend
npm install
npm run dev
```

* Backend: `http://localhost:4000`
* Frontend: `http://localhost:5173`

---

### 3️⃣ Seed Sample Data (Optional)

```bash
cd backend
npm run seed:songs
npm run seed:albums
```

---

## 📜 License

This project is open-source under the [ISC License](LICENSE).
