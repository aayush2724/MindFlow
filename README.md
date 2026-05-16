# MindFlow: Next-Generation AI Mental Health Ecosystem

MindFlow is a high-fidelity, predictive mental health platform designed to shift support from reactive response to proactive prevention. Using advanced sentiment analysis and behavioral telemetry, MindFlow provides real-time emotional scoring for students and comprehensive institutional analytics for counselors.

## 🌌 Project Overview

MindFlow is built on the **"Midnight Aurora"** design system—a cinematic, glassmorphic UI designed to create a calm yet high-tech environment for mental wellness.

### Key Modules:
- **🧠 MoodMap Core**: Real-time emotional trajectory scoring for students.
- **📅 CalmCal**: A stress-aware calendar assistant that visualizes the week as a thermal stress map.
- **💓 WellPulse**: An institutional dashboard providing counselors with aggregate campus wellbeing KPIs and critical alerts.
- **⚡ Check-In**: A streamlined daily telemetry tool to track mood, sleep, and workload.

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 18 + Vite
- **Animations**: Framer Motion
- **Styling**: Vanilla CSS3 + TailwindCSS (v4)
- **Icons**: Material Symbols Outlined
- **API Client**: Axios (with Firebase Auth Interceptors)

### Backend
- **Runtime**: Node.js + Express
- **Authentication**: Firebase Admin SDK (Identity Platform)
- **Database**: Firestore (NoSQL)
- **Deployment**: Render / Docker

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Firebase Project with Service Account credentials

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-repo/MindFlow.git
   cd MindFlow
   ```

2. **Setup Backend**:
   ```bash
   cd backend
   npm install
   # Create .env based on .env.example with your Firebase credentials
   npm start
   ```

3. **Setup Frontend**:
   ```bash
   cd ../frontend
   npm install
   # Ensure VITE_API_URL points to your backend (default: http://localhost:5000/api)
   npm run dev
   ```

---

## 📂 Project Structure

```text
MindFlow/
├── frontend/           # Vite-powered React application
│   ├── src/
│   │   ├── components/ # Reusable UI components (Nav, Sidebar, etc.)
│   │   ├── pages/      # Core views (Landing, WellPulse, Dashboard, etc.)
│   │   ├── lib/        # API and utility functions
│   │   └── context/    # Auth and Global State
├── backend/            # Express.js API server
│   ├── routes/         # API Endpoints
│   ├── controllers/    # Business logic
│   └── middleware/     # Auth and validation
└── README.md           # This file
```

---

## 🎨 Design Philosophy: "Midnight Aurora"
MindFlow utilizes deep blacks (`#030305`), vibrant cyan glows (`#00dbe7`), and lime accents (`#D2FF00`) to create a futuristic "HUD" feel that remains accessible and soothing. Every interaction is designed with high-fidelity micro-animations and glassmorphic depth.

© 2024 MindFlow Ecosystem. Elevate your consciousness.
