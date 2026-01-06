# StreamWatt's - Public Live TV Streaming Platform

A modern, fast, **public** IPTV streaming web application providing instant access to thousands of live TV channels from around the world.

## 🚀 Features

- **Instant Access**: No login, no accounts - just open and watch
- **1000+ Live Channels**: From countries worldwide via IPTV-org API
- **Real-Time Search**: Search channels by name, country, or category
- **Modern UI**: Glassmorphism design with dark mode and GSAP animations
- **HLS Video Player**: Powered by HLS.js with auto-retry on errors
- **Category Filters**: Browse by country, language, and category
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Public Recommendations**: Discover popular channels

## 📦 Tech Stack

- **Frontend**: React 18 (Vite)
- **Styling**: Vanilla CSS (Glassmorphism)
- **UI Icons**: Material UI Icons
- **Animations**: GSAP
- **Routing**: React Router DOM v6
- **Video Player**: HLS.js
- **HTTP Client**: Axios

## 🎯 Platform Type

**Public Streaming Platform** - No user accounts, profiles, or personal data storage. Everyone has the same instant access to all channels.

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Sidebar.jsx
│   ├── SearchBar.jsx
│   ├── ChannelCard.jsx
│   ├── VideoPlayer.jsx
│   ├── Loader.jsx
│   ├── SkeletonCard.jsx
│   ├── EmptyState.jsx
│   ├── FeaturedCarousel.jsx
│   ├── Pagination.jsx
│   ├── CountryCard.jsx
│   ├── RecommendationRow.jsx
│   ├── PlayerErrorFallback.jsx
│   └── EnhancedErrorBoundary.jsx
├── pages/              # Page components
│   ├── Dashboard.jsx
│   ├── ChannelsPage.jsx
│   ├── PlayerPage.jsx
│   ├── CategoriesPage.jsx
│   └── CountriesPage.jsx
├── hooks/              # Custom React hooks
│   ├── useIPTV.js
│   ├── useDebounce.js
│   └── useRouteCleanup.js
├── services/           # API services
│   └── iptvService.js
├── utils/              # Helper functions
│   ├── helpers.js
│   └── filterChannelsByCountry.js
├── layout/
│   └── AppLayout.jsx
├── App.jsx
├── main.jsx
└── index.css
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation Steps

1. **Navigate to project directory**
   ```bash
   cd "d:/An/Streaming App"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## 🎯 Usage

1. **Dashboard**: Start watching instantly - no setup required
2. **Search**: Use the search bar to find channels by name, country, or category
3. **Browse**: Filter channels by country and category
4. **Watch**: Click any channel to start streaming
5. **Navigate**: Use sidebar to explore different sections

## 📱 Pages Overview

### 1. Dashboard (`/dashboard`)
- Search bar with real-time filtering
- Statistics (total channels, categories, countries)
- Featured channels carousel
- Popular channels recommendations

### 2. All Channels (`/channels`)
- Complete channel list
- Search and pagination
- 20 channels per page

### 3. Player (`/player/:id`)
- HLS video player
- Stream error handling with auto-retry
- Channel information
- Share button
- Related channels from same country

### 4. Categories (`/categories`)
- Filter by category
- Filter by country
- Multi-select filters

### 5. View All Countries (`/categories/countries`)
- Complete country list with flags
- Channel count per country
- A-Z alphabetical grouping
- Search functionality

## 🎨 Design Features

- **Glassmorphism UI**: Modern frosted glass effect
- **Dark Theme**: Easy on the eyes
- **GSAP Animations**: Smooth transitions
- **Responsive Grid**: Adapts to all screen sizes
- **Purple-Blue Gradient**: Consistent brand accent

## 🔧 Build for Production

```bash
npm run build
```

Production files will be in the `dist/` folder.

## 🌐 API

Uses the public IPTV-org API:
- Base URL: `https://iptv-org.github.io/api`
- Endpoints:
  - `/channels.json` - Channel metadata
  - `/streams.json` - Stream URLs
  - `/categories.json` - Categories
  - `/countries.json` - Countries
  - `/languages.json` - Languages

## ✨ Key Features

### Public Platform
- ✅ No user accounts required
- ✅ No login or authentication
- ✅ No personal data storage
- ✅ Instant access for everyone

### Streaming
- ✅ HLS video playback
- ✅ Auto-retry on stream errors
- ✅ Multiple stream quality options
- ✅ Error fallback UI

### Discovery
- ✅ Real-time search
- ✅ Country-based filtering
- ✅ Category filtering
- ✅ Popular channel recommendations

### UI/UX
- ✅ Responsive design
- ✅ Glassmorphic components
- ✅ GSAP animations
- ✅ Loading states
- ✅ Empty states
- ✅ Error handling

## 🚀 Performance

- Fast initial load (no authentication checks)
- Client-side filtering (no API calls)
- Efficient rendering with React
- Optimized images with lazy loading

## 📄 License

MIT License - Free for personal and commercial use.

---

**StreamWatt's** - Public Live TV Streaming Platform
Built with ❤️ using React, GSAP, and the IPTV-org API
