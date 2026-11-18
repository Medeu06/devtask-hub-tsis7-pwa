# DevTask Hub — Progressive Web App (PWA)

**Student:** Medeu Seidali  

## What I Built in This Homework

In this assignment, I took my existing **DevTask Hub** React application (with React Router, search/filtering, pagination, API caching, and Firebase Authentication) and converted it into an installable **Progressive Web App (PWA)** that works offline and adapts cleanly to mobile screens.

Here is a breakdown of what I added and how it works:

### 1. App Manifest & Installation (`public/manifest.json`)
- Created `manifest.json` with the app name, short name, `start_url`, `scope`, theme/background colors, and `display: "standalone"` so it opens in its own window like a native app.
- Added `192x192` and `512x512` PNG app icons (`icon-192.png` and `icon-512.png`) and linked the manifest in `index.html`.
- Added an install button (`+ App` / `Install App`) that listens to `beforeinstallprompt` so users can install the app in one click on supported browsers.

### 2. Service Worker & Updates (`public/sw.js` & `src/hooks/usePWA.js`)
- Implemented a custom Service Worker handling `install`, `activate`, and `fetch` events.
- On install, it pre-caches the core app shell (HTML, built JS/CSS bundles, icons, manifest, and the `/offline` route).
- Used versioned cache names (`devtask-static-v1`, `devtask-media-v1`, `devtask-api-v1`, `devtask-pages-v1`) and set up the `activate` event to automatically delete older cache versions.
- Added an update notification banner at the top of the screen: when a new Service Worker version is waiting, users see an **"Update now"** button that triggers `SKIP_WAITING` and reloads the app cleanly without needing to clear browser storage manually.

### 3. Two Runtime Caching Strategies
- **Cache-First (Images, Icons, Fonts & Static Assets):** Static assets and external images are served straight from the cache if available, and saved there on first load. I added a `trimCache` helper (`MAX_MEDIA_ENTRIES = 40`) so the cache doesn't grow infinitely.
- **Network-First (Public Tasks API):** Requests to `/api/tasks` and `/api/tasks/:id` try the network first to get fresh data and update the cache. If the user is offline, the app falls back to the cached response (`MAX_API_ENTRIES = 50`) and displays a badge on the page showing whether the data came from the server or from cache.
- **Security & Privacy:** Authentication requests (Firebase Auth, Google OAuth, tokens) and private user routes (`/profile`) are explicitly excluded from the Service Worker cache.

### 4. Offline Page & Connectivity Status (`/offline`)
- Built a dedicated `/offline` page with a clear message, a **"Retry Connection"** button that checks real network access, and a shortcut to view cached tasks.
- Added a live **Online / Offline** badge in the top navigation bar plus an offline warning banner when the connection drops.
- Previously visited pages and cached public tasks continue to work without internet. If the user tries to open an unvisited route while offline, the Service Worker redirects them to `/offline`.

### 5. Mobile Responsiveness (320px and up)
- Adapted the entire UI for mobile devices starting from `320px` width in both portrait and landscape orientations.
- Added a collapsible hamburger navigation menu for small screens with touch-friendly buttons and inputs.
- Updated task cards, filter bars, modals, dashboard metrics, and task detail grids to stack cleanly without overlapping elements or horizontal scrolling.

### 6. Previous Features Preserved
All functionality from earlier assignments still works:
- Client-side routing with React Router (`/` , `/tasks`, `/tasks/:id`, `/dashboard`, `/profile`, `/login`, `/signup`, `/about`, `/offline`).
- URL-synced search, category/status filtering, sorting, and pagination.
- Creating, editing, toggling status, and deleting tasks with automatic cache invalidation.
- Firebase Authentication (Email/Password and Google Sign-In) with protected routes.

