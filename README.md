# ClicknGo — Frontend

> **Book Local. Live Better.**  
> A modern, multi-service local booking platform built for Indian cities.

![ClicknGo Hero](./screenshots/hero.png)

---

## 📌 Project Objective

ClicknGo is a full-featured local services marketplace that enables users to **discover, browse, and book trusted service providers** in their city — all in one unified platform. The goal is to bridge the gap between local service providers (barbers, salons, real estate agents, healthcare professionals, gaming hubs) and everyday consumers through a clean, fast, and intuitive web experience.

The platform is designed around three core principles:
- **Simplicity** — Book any service in just a few taps
- **Trust** — Real-time availability, secure payments, and instant confirmations
- **Locality** — Hyper-local discovery based on the user's current city

---

## 🖼️ Screenshots

### Hero — Landing Page
![Landing Page](./screenshots/hero.png)

### Service Categories
![Categories](./screenshots/categories.png)

### How it Works & Why Choose Us
![How It Works](./screenshots/how-it-works.png)

### User Profile & Bookings Dashboard
![Profile](./screenshots/profile.png)

---

## ✨ Key Features

### 🔍 Service Discovery
- Location-aware service browsing (city displayed in navbar)
- Global search bar for quick service lookup
- Category cards with subcategory tags (e.g., Grooming → Hair & Styling, Spa Services, Nail Care)

### 📂 Service Categories
| Category | Subcategories |
|---|---|
| Grooming | Hair & Styling, Spa Services, Nail Care |
| Real Estate | Residential, Commercial, Rental |
| HealthCare | Dental Care, Physical Therapy, Medicines |
| Sports & Gaming | Gaming Hubs, Turfs, Arcade Parlour |

### 📅 Real-Time Booking
- Live provider availability calendar
- Time slot selection with instant locking
- Booking confirmation with zero wait time

### 💳 Secure Payments
- Integrated with **Razorpay** and **Stripe**
- Fully encrypted transactions
- Instant booking confirmation post-payment

### 🔔 Notifications
- SMS and email alerts at every step of the booking lifecycle

### 👤 User Profile Dashboard
- Booking stats: Total, Completed, Cancelled, Pending Reviews
- Recent bookings history
- Edit profile functionality
- Avatar with initials fallback

### 🧭 Navigation
- Persistent top navbar with category quick-links
- Location indicator with city name
- Auth-aware UI (shows user initials + name when logged in)

---

## 🗂️ Project Structure

```
ClickNGo-frontend/
├── public/
│   └── assets/              # Static images, icons
├── src/
│   ├── components/
│   │   ├── Navbar/          # Top navigation bar with search & auth state
│   │   ├── HeroSection/     # Landing page hero with CTA
│   │   ├── CategoryCards/   # Service category grid with subcategories
│   │   ├── HowItWorks/      # 3-step explainer section
│   │   ├── WhyChooseUs/     # Feature highlights (RT, SP, IN cards)
│   │   └── Profile/         # User dashboard with booking stats
│   ├── pages/
│   │   ├── Home.jsx         # Landing page (Hero + Categories + How It Works)
│   │   ├── Profile.jsx      # User profile & recent bookings
│   │   └── [Category].jsx   # Dynamic category/service pages
│   ├── context/
│   │   └── AuthContext.jsx  # Authentication state management
│   ├── hooks/               # Custom React hooks
│   ├── utils/               # Helper functions, API calls
│   ├── styles/              # Global styles, theme tokens
│   └── App.jsx              # Root component with routing
├── .env                     # Environment variables (API keys, base URL)
├── package.json
└── README.md
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React.js |
| Styling | Tailwind CSS / CSS Modules |
| Routing | React Router DOM |
| Auth | JWT-based authentication |
| Payments | Razorpay / Stripe |
| Icons | Lucide React / Custom SVGs |
| State Management | React Context API |
| Build Tool | Vite |

---

## 🚧 Challenges Faced & Optimizations

### 1. Location-Aware UI Without Performance Overhead
**Challenge:** Displaying the user's city dynamically in the navbar without blocking page render or causing layout shifts.  
**Optimization:** Used the browser's Geolocation API with a reverse geocoding call on first load, caching the result in `localStorage`. Subsequent visits skip the API call entirely, making the navbar render instantly.

---

### 2. Category System Scalability
**Challenge:** The initial category design hardcoded service types into components, making it painful to add new categories or subcategories.  
**Optimization:** Refactored to a **data-driven** approach — all categories and their subcategories are defined in a single config object. The `CategoryCards` component maps over this config, so adding a new service category requires a one-line change in the config, not a new component.

---

### 3. Auth State Across Routes
**Challenge:** Keeping the navbar in sync with login/logout state across page navigations without excessive prop drilling.  
**Optimization:** Implemented a global `AuthContext` using React Context API. The navbar and profile components subscribe to this context, ensuring the UI always reflects the true auth state (user initials, name, logout button) without any prop-passing overhead.

---

### 4. Profile Dashboard with Empty States
**Challenge:** The booking stats widgets showed broken or misleading UI when a new user had zero bookings.  
**Optimization:** Added intentional empty-state handling — the stats cards gracefully display `0` with the correct label, and the bookings section renders a friendly "No bookings found yet." message instead of a blank container.

---

### 5. Responsive Layout for Service Cards
**Challenge:** The 3-column category grid broke on mid-size screens (tablets), causing overlapping cards.  
**Optimization:** Switched to a CSS Grid layout with `auto-fit` and `minmax` breakpoints, combined with Tailwind's responsive prefixes (`md:`, `lg:`), ensuring the grid adapts cleanly from mobile (1 column) → tablet (2 columns) → desktop (3 columns).

---

### 6. Search UX
**Challenge:** A full-page search felt heavyweight for quick lookups.  
**Optimization:** Implemented an inline search bar in the navbar with debounced input (300ms delay) to reduce unnecessary API calls while keeping the experience snappy.

---

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 18
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/HEYDEV001/ClickNGo-frontend.git
cd ClickNGo-frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your API base URL, Razorpay key, etc.

# Start the development server
npm run dev
```

The app will be running at `http://localhost:5173`

---

## 🌐 Deployment

```bash
# Build for production
npm run build

# Preview the production build
npm run preview
```

Deploy the `dist/` folder to Vercel, Netlify, or any static hosting provider.

---

## 🔮 Roadmap

- [ ] Provider-side dashboard (vendor onboarding)
- [ ] In-app messaging between users and providers
- [ ] Reviews & ratings system
- [ ] Push notifications (PWA)
- [ ] Mobile app (React Native)
- [ ] Multi-city expansion beyond Indore

---

## 👨‍💻 Author

**Dev Pathak**  
[GitHub](https://github.com/HEYDEV001) · devpathak9685@gmail.com

---

## 📄 License

This project is licensed under the MIT License. See [LICENSE](./LICENSE) for details.
