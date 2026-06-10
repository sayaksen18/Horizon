<p align="center">
  <img src="client/src/assets/img1.png" alt="Horizon Logo" width="120" />
</p>

<h1 align="center">Horizon — AI-Powered Mock Interview Platform</h1>

<p align="center">
  <strong>Practice smarter. Interview better. Land the job.</strong>
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#%EF%B8%8F-architecture">Architecture</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-api-reference">API Reference</a> •
  <a href="#-project-structure">Project Structure</a> •
  <a href="#-deployment">Deployment</a> •
  <a href="#-contributing">Contributing</a> •
  <a href="#-license">License</a>
</p>

---

## 📖 Overview

**Horizon** is a full-stack AI mock interview platform that simulates realistic job interviews using AI-generated questions, real-time voice interaction, and instant performance analytics. Users can upload their resume for tailored questioning, choose between Technical and HR interview modes, receive granular scoring across multiple dimensions, and download detailed PDF reports.

### How It Works

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   1. Setup       │────▶│  2. Interview     │────▶│  3. Report       │
│                 │     │                  │     │                 │
│ • Select role   │     │ • AI asks Qs     │     │ • Overall score │
│ • Upload resume │     │ • Voice / text   │     │ • Skill breakdown│
│ • Choose mode   │     │ • Timed answers  │     │ • PDF download  │
│ • AI analysis   │     │ • Live feedback  │     │ • Trend charts  │
└─────────────────┘     └──────────────────┘     └─────────────────┘
```

---

## ✨ Features

### 🎯 Core Interview Experience
- **AI-Generated Questions** — Contextual questions generated via GPT-4o-mini based on role, experience, mode, and resume content
- **Voice-Powered Interviews** — Text-to-Speech AI interviewer with Speech Recognition for hands-free answering
- **Resume Analysis** — Upload a PDF resume; AI extracts role, experience, projects, and skills to personalize questions
- **Dual Interview Modes** — Technical interviews (role-specific, coding-focused) and HR interviews (behavioral, situational)
- **Timed Responses** — Progressive time limits per difficulty (Easy: 60s, Medium: 90s, Hard: 120s)

### 📊 Analytics & Reporting
- **Multi-Dimensional Scoring** — Each answer scored on Confidence (0–10), Communication (0–10), and Correctness (0–10)
- **Performance Trend Charts** — Recharts-powered area charts showing score progression across questions
- **Downloadable PDF Reports** — Comprehensive reports generated with jsPDF including score breakdowns and AI advice
- **Interview History** — Full history of past interviews with scores, status, and dates

### 💳 Credit System & Payments
- **100 Free Credits** — New users start with 100 credits to get started immediately
- **50 Credits Per Interview** — Each interview generation costs 50 credits
- **Razorpay Integration** — Secure payment gateway for purchasing additional credits
- **Multiple Plans** — Free (100 credits), Starter (₹100 / 150 credits), Pro (₹500 / 650 credits)

### 🔐 Authentication
- **Google OAuth** — One-click sign-in via Firebase Authentication
- **Session Management** — Secure HTTP-only JWT cookies with 7-day expiry

---

## 🛠 Tech Stack

### Client

| Technology | Purpose |
|---|---|
| **React 19** | UI framework |
| **Vite 8** | Build tooling & dev server |
| **Tailwind CSS 4** | Utility-first styling |
| **Redux Toolkit** | Global state management |
| **React Router v7** | Client-side routing |
| **Firebase Auth** | Google OAuth provider |
| **Motion (Framer Motion)** | Animations & transitions |
| **Recharts** | Data visualization |
| **jsPDF** | PDF report generation |
| **Web Speech API** | Text-to-Speech & Speech Recognition |
| **Axios** | HTTP client |

### Server

| Technology | Purpose |
|---|---|
| **Express.js 5** | Web framework |
| **MongoDB + Mongoose 9** | Database & ODM |
| **JWT (jsonwebtoken)** | Session authentication |
| **OpenRouter (GPT-4o-mini)** | AI question generation & evaluation |
| **pdfjs-dist** | PDF text extraction from resumes |
| **Razorpay SDK** | Payment processing |
| **Multer** | File upload handling |
| **cookie-parser** | Cookie-based auth |

---

## 🏗️ Architecture

```
┌──────────────────────────────────────────────────────────┐
│                        CLIENT                            │
│                                                          │
│  React 19 + Vite 8 + Tailwind CSS 4                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐               │
│  │  Pages   │  │Components│  │  Redux   │               │
│  │          │  │          │  │  Store   │               │
│  │ • Home   │  │ • Navbar │  │          │               │
│  │ • Auth   │  │ • Steps  │  │ userSlice│               │
│  │ • Inter. │  │ • Timer  │  │          │               │
│  │ • History│  │ • Footer │  └──────────┘               │
│  │ • Report │  │ • Auth   │                             │
│  │ • Pricing│  │   Modal  │                             │
│  └──────────┘  └──────────┘                             │
│         │              │                                 │
│         └──────┬───────┘                                 │
│                │ Axios (withCredentials)                  │
└────────────────┼─────────────────────────────────────────┘
                 │ HTTP + JWT Cookie
┌────────────────┼─────────────────────────────────────────┐
│                ▼         SERVER                          │
│                                                          │
│  Express.js 5 + Node.js (ES Modules)                     │
│  ┌───────────────────────────────────────────────────┐   │
│  │                   Routes                          │   │
│  │  /api/auth  /api/user  /api/interview  /api/pay   │   │
│  └───────────────────┬───────────────────────────────┘   │
│                      │                                   │
│  ┌───────────────────▼───────────────────────────────┐   │
│  │                Controllers                        │   │
│  │  auth · user · interview · payment                │   │
│  └───────────────────┬───────────────────────────────┘   │
│                      │                                   │
│  ┌──────────┐  ┌─────▼─────┐  ┌────────────┐            │
│  │Middleware │  │  Services │  │   Models   │            │
│  │          │  │           │  │            │            │
│  │ • isAuth │  │ • OpenAI  │  │ • User     │            │
│  │ • multer │  │ • Razorpay│  │ • Interview│            │
│  └──────────┘  └───────────┘  │ • Payment  │            │
│                               └──────┬─────┘            │
│                                      │                   │
└──────────────────────────────────────┼───────────────────┘
                                       │
                              ┌────────▼────────┐
                              │   MongoDB Atlas  │
                              └─────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

| Requirement | Version |
|---|---|
| **Node.js** | ≥ 18.x |
| **npm** | ≥ 9.x |
| **MongoDB** | Atlas (cloud) or local instance |
| **Firebase Project** | With Google Auth enabled |
| **OpenRouter API Key** | For GPT-4o-mini access |
| **Razorpay Account** | Test or live keys |

### 1. Clone the Repository

```bash
git clone https://github.com/sayaksen18/Horizon.git
cd Horizon
```

### 2. Server Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server/` directory:

```env
PORT=8000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>
JWT_SECRET=<your-jwt-secret>
OPENROUTER_API_KEY=<your-openrouter-api-key>
RAZORPAY_KEY_ID=<your-razorpay-key-id>
RAZORPAY_KEY_SECRET=<your-razorpay-secret>
```

Start the development server:

```bash
npm run dev
```

The server will start on `http://localhost:8000`.

### 3. Client Setup

```bash
cd client
npm install
```

Create a `.env` file in the `client/` directory:

```env
VITE_FIREBASE_APIKEY=<your-firebase-api-key>
VITE_RAZORPAY_KEY_ID=<your-razorpay-key-id>
```

Start the development server:

```bash
npm run dev
```

The client will start on `http://localhost:5173`.

### 4. Verify Setup

1. Open `http://localhost:5173` in your browser
2. Sign in with Google
3. Navigate to the Interview page
4. Upload a resume and start a mock interview

---

## 📡 API Reference

### Authentication

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/auth/google` | ❌ | Google OAuth login — accepts `{name, email}`, returns user data and sets JWT cookie |
| `GET` | `/api/auth/logout` | ❌ | Clears session cookie |

### User

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/user/current-user` | ✅ | Returns authenticated user's profile and credits |

### Interview

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/interview/resume` | ✅ | Upload PDF resume → AI extracts structured data (role, experience, projects, skills) |
| `POST` | `/api/interview/generate-questions` | ✅ | Generate 5 AI questions (costs 50 credits) — `{role, experience, mode, resumeText, projects, skills}` |
| `POST` | `/api/interview/submit-answer` | ✅ | Submit answer for evaluation — `{interviewId, questionIndex, answer, timeTaken}` |
| `POST` | `/api/interview/finish` | ✅ | Complete interview and compute final scores — `{interviewId}` |
| `GET` | `/api/interview/get-interview` | ✅ | List all user's interviews |
| `GET` | `/api/interview/report/:id` | ✅ | Get detailed report for a specific interview |

### Payments

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/payment/order` | ✅ | Create Razorpay order — `{planId, amount, credits}` |
| `POST` | `/api/payment/verify` | ✅ | Verify Razorpay payment signature and credit user account |

> **Authentication**: All protected routes require a valid JWT token sent as an HTTP-only cookie. The token is automatically set by the server during Google OAuth login.

---

## 📁 Project Structure

```
Horizon/
├── client/                          # React frontend
│   ├── public/                      # Static assets
│   ├── src/
│   │   ├── assets/                  # Images & AI avatar videos
│   │   │   └── Videos/              # AI interviewer video avatars
│   │   ├── components/
│   │   │   ├── AuthModel.jsx        # Authentication modal overlay
│   │   │   ├── Footer.jsx           # Site footer
│   │   │   ├── Navbar.jsx           # Navigation with credits & user menu
│   │   │   ├── Step1SetUp.jsx       # Interview setup (role, resume, mode)
│   │   │   ├── Step2Interview.jsx   # Live AI interview with voice
│   │   │   ├── Step3Report.jsx      # Performance report & PDF export
│   │   │   └── Timer.jsx            # Circular countdown timer
│   │   ├── pages/
│   │   │   ├── Auth.jsx             # Google sign-in page
│   │   │   ├── Home.jsx             # Landing page
│   │   │   ├── InterviewHistory.jsx # Past interviews listing
│   │   │   ├── InterviewPage.jsx    # 3-step interview orchestrator
│   │   │   ├── InterviewReport.jsx  # Historical report viewer
│   │   │   └── Pricing.jsx          # Credit plans & Razorpay checkout
│   │   ├── redux/
│   │   │   ├── store.js             # Redux store configuration
│   │   │   └── userSlice.js         # User state (userData, credits)
│   │   ├── utils/
│   │   │   └── firebase.js          # Firebase config & Google Auth provider
│   │   ├── App.jsx                  # Root component with routing
│   │   ├── main.jsx                 # Entry point (React root + providers)
│   │   └── index.css                # Tailwind CSS entry
│   ├── .env                         # Client environment variables
│   ├── vite.config.js               # Vite build configuration
│   └── package.json
│
├── server/                          # Express.js backend
│   ├── config/
│   │   ├── connectDB.js             # MongoDB connection
│   │   └── token.js                 # JWT token generation
│   ├── controllers/
│   │   ├── auth.controller.js       # Google OAuth (find/create user + set cookie)
│   │   ├── interview.controller.js  # Resume analysis, question gen, scoring
│   │   ├── payment.controller.js    # Razorpay order creation & verification
│   │   └── user.controller.js       # Current user retrieval
│   ├── middlewares/
│   │   ├── isAuth.js                # JWT verification middleware
│   │   └── multer.js                # File upload config (5MB limit)
│   ├── models/
│   │   ├── Interview.model.js       # Interview + Question schemas
│   │   ├── Payment.model.js         # Payment transaction schema
│   │   └── User.model.js            # User schema (name, email, credits)
│   ├── routes/
│   │   ├── auth.route.js            # /api/auth routes
│   │   ├── interview.route.js       # /api/interview routes
│   │   ├── payment.route.js         # /api/payment routes
│   │   └── user.route.js            # /api/user routes
│   ├── services/
│   │   ├── openRouter.service.js    # OpenRouter AI API integration
│   │   └── razorpay.service.js      # Razorpay SDK instance
│   ├── public/                      # Temporary upload directory (auto-cleaned)
│   ├── index.js                     # Server entry point
│   ├── .env                         # Server environment variables
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 🔄 Interview Flow (Detailed)

### Step 1 — Setup
1. User selects a **role** (e.g., "Frontend Developer"), **experience level**, and **interview mode** (Technical / HR)
2. *(Optional)* User uploads a **PDF resume** → server extracts text via `pdfjs-dist` → AI analyzes it for structured data (projects, skills)
3. Client sends setup data to **`POST /api/interview/generate-questions`**
4. Server verifies user has **≥ 50 credits**, deducts them, and uses AI to generate **5 questions** with progressive difficulty:
   - 2 × Easy (60s time limit)
   - 2 × Medium (90s time limit)  
   - 1 × Hard (120s time limit)

### Step 2 — Live Interview
1. AI interviewer **speaks the question aloud** via Web Speech API (TTS)
2. A **video avatar** (female or male) plays during speech
3. A **countdown timer** starts based on question difficulty
4. User answers via **speech recognition** or **text input**
5. On submit (or auto-submit at timeout), the answer is sent to **`POST /api/interview/submit-answer`**
6. AI evaluates the answer on three dimensions and provides **instant feedback** (also spoken aloud):
   - **Confidence** (0–10)
   - **Communication** (0–10)
   - **Correctness** (0–10)
7. Process repeats for all 5 questions
8. **`POST /api/interview/finish`** computes final aggregated scores

### Step 3 — Report
- **Overall score** displayed as a circular progress indicator
- **Skill breakdown** with individual bars for Confidence, Communication, Correctness
- **Performance trend** chart (Recharts AreaChart)
- **Per-question breakdown** with individual scores and AI feedback
- **One-click PDF download** with full report

---

## 📊 Data Models

### User
```javascript
{
  name:    String,       // required
  email:   String,       // required, unique
  credits: Number,       // default: 100
}
```

### Interview
```javascript
{
  userId:     ObjectId,           // ref: User
  role:       String,             // e.g., "Frontend Developer"
  experience: String,             // e.g., "3 years"
  mode:       "Technical" | "HR",
  resumeText: String,             // extracted from PDF
  questions:  [Question],         // 5 embedded sub-documents
  finalScore: Number,             // aggregated score (0–10)
  status:     "incompleted" | "completed",
}
```

### Question (embedded in Interview)
```javascript
{
  question:      String,
  difficulty:    "easy" | "medium" | "hard",
  timeLimit:     Number,      // seconds (60 / 90 / 120)
  answer:        String,      // user's response
  feedback:      String,      // AI-generated feedback
  score:         Number,      // overall question score
  confidence:    Number,      // 0–10
  communication: Number,      // 0–10
  correctness:   Number,      // 0–10
}
```

### Payment
```javascript
{
  userId:            ObjectId,
  planId:            String,
  amount:            Number,       // INR
  credits:           Number,       // credits purchased
  razorpayOrderId:   String,
  razorpayPaymentId: String,
  status:            "created" | "paid" | "failed",
}
```

---

## 🌐 Deployment

### Client (Vercel / Netlify)

```bash
cd client
npm run build
```

The `dist/` directory can be deployed to any static hosting platform. Update the server URL in `App.jsx`:

```javascript
// Change from:
export const ServerUrl = "http://localhost:8000"
// To:
export const ServerUrl = "https://your-api-domain.com"
```

> **Tip**: Move `ServerUrl` to an environment variable (`VITE_SERVER_URL`) for cleaner configuration.

### Server (Render / Railway / VPS)

Ensure all environment variables are configured in your hosting provider's dashboard. Key production considerations:

| Setting | Development | Production |
|---|---|---|
| **CORS origin** | `http://localhost:5173` | Your deployed frontend URL |
| **Cookie `secure`** | `false` | `true` |
| **Cookie `sameSite`** | `strict` | `none` (for cross-origin cookies) |
| **JWT_SECRET** | Any string | Strong, randomly generated secret |

---

## 🔒 Security Considerations

- **JWT Cookies**: Tokens are stored as HTTP-only cookies, mitigating XSS attacks
- **CORS**: Configured with explicit origin and credentials support
- **Razorpay Signature Verification**: HMAC SHA256 verification ensures payment integrity
- **File Cleanup**: Uploaded resume PDFs are immediately deleted after text extraction
- **File Size Limit**: Multer enforces a 5MB upload limit
- **No Password Storage**: Authentication is delegated entirely to Google OAuth via Firebase

---

## 🧪 Development Scripts

### Client

| Script | Command | Description |
|---|---|---|
| Dev Server | `npm run dev` | Start Vite dev server with HMR |
| Build | `npm run build` | Create production build |
| Preview | `npm run preview` | Preview production build locally |
| Lint | `npm run lint` | Run ESLint |

### Server

| Script | Command | Description |
|---|---|---|
| Dev Server | `npm run dev` | Start with Nodemon (auto-restart on changes) |

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'feat: add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Commit Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix | Usage |
|---|---|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `docs:` | Documentation changes |
| `style:` | Code style / formatting |
| `refactor:` | Code refactoring |
| `test:` | Adding / modifying tests |
| `chore:` | Maintenance tasks |

---

## 📝 License

This project is licensed under the **ISC License**. See the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Sayak Sen**

- GitHub: [@sayaksen18](https://github.com/sayaksen18)

---

<p align="center">
  Built with ❤️ using React, Express, and AI
</p>
