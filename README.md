<div align="center">

# 📝 Notes App

### A full-stack note-taking app built with the **MERN stack** — featuring **JWT authentication**, **per-user data isolation**, and **serverless rate limiting**.

![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

</div>

---

## ✨ Features

- 🔐 **Full authentication system** — register, login, logout, and session restore via a JWT (7-day expiry, hashed with **bcrypt**)
- 👤 **Per-user data isolation** — every note belongs to its owner; users only ever see, edit, or delete their *own* notes (ownership is enforced server-side)
- 🚦 **Serverless rate limiting** — request throttling powered by **Upstash Redis** (sliding window, 100 req / 60s) to protect the API
- 🌙 **Dark neon UI** — crafted with Tailwind CSS + daisyUI, featuring a sleek black-and-neon-green theme with a responsive card grid
- 🔔 **Instant feedback** — `react-hot-toast` notifications for every action
- 🧭 **SPA routing** — protected routes redirect unauthenticated users to the login page
- 🧪 **Production-ready deployment** — the Express server serves the built React app in production (single-origin, works on Render out of the box)

---

## 🖼️ Screenshots

<!--
  Drop your screenshots into a /screenshots folder and uncomment:
  ![Home](screenshots/home.png)
  ![Login](screenshots/login.png)
  ![Note detail](screenshots/note-detail.png)
-->

| Home | Login |
|:---:|:---:|
| *add `screenshots/home.png`* | *add `screenshots/login.png`* |

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, Vite, React Router, Tailwind CSS, daisyUI, react-hot-toast, lucide-react, Axios |
| **Backend** | Node.js, Express, Mongoose (ODM) |
| **Database** | MongoDB (Atlas or local) |
| **Auth** | JSON Web Tokens (jsonwebtoken) + bcryptjs |
| **Rate limiting** | Upstash Ratelimit + Upstash Redis (serverless) |
| **Deployment** | Render |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) **18+**
- A MongoDB database — [MongoDB Atlas](https://www.mongodb.com/atlas) (free tier) or a local instance
- An [Upstash](https://upstash.com/) account for the Redis-backed rate limiter

### 1. Clone & install

```bash
git clone <your-repo-url>
cd <your-repo>
npm install --prefix backend
npm install --prefix frontend
```

### 2. Environment variables

Create a `backend/.env` file (copy `backend/.env.example` if present):

```env
# MongoDB connection string (Atlas or local)
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/notes_db

# Secret used to sign JWTs — use a long random string
JWT_SECRET=change-me-to-a-long-random-string

# Upstash REST credentials (from your Upstash dashboard)
UPSTASH_REDIS_REST_URL=https://your-upstash-url.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-upstash-token
```

> 💡 Generate a strong `JWT_SECRET` with:
> `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

### 3. Run in development

```bash
npm run dev --prefix backend   # API on http://localhost:5001
npm run dev --prefix frontend  # App on  http://localhost:5173
```

…or from the repo root: `npm run dev` (runs both with `concurrently`).

Open **http://localhost:5173**, create an account, and start taking notes! ✍️

---

## 📁 Project Structure

```
├── backend/                  # Express API
│   └── src/
│       ├── config/           # DB connection & Upstash setup
│       ├── Controller/       # authController, notesController
│       ├── middleware/       # JWT auth guard, rate limiter
│       ├── models/           # User, Note (Mongoose schemas)
│       ├── routes/           # /api/auth, /api/notes
│       └── server.js         # Entry point
└── frontend/                 # React + Vite SPA
    └── src/
        ├── components/       # NavBar, NoteCard, ProtectedRoute…
        ├── context/          # AuthContext (global auth state)
        ├── lib/              # Axios instance w/ JWT interceptor
        └── pages/            # Home, Create, Detail, Login, Register
```

---

## 🔌 API Reference

Base URL: `http://localhost:5001/api` (in production: same-origin `/api`)

### Auth

| Method | Endpoint | Body | Description |
|---|---|---|---|
| `POST` | `/auth/register` | `{ name, email, password }` | Create an account → returns `{ _id, name, email, token }` |
| `POST` | `/auth/login` | `{ email, password }` | Log in → returns `{ _id, name, email, token }` |
| `POST` | `/auth/logout` | — | Log out (client clears its token) |
| `GET` | `/auth/me` | — 🔒 | Returns the current logged-in user |

### Notes — *all endpoints require a Bearer token* 🔒

| Method | Endpoint | Body | Description |
|---|---|---|---|
| `GET` | `/notes` | — | List **your** notes |
| `GET` | `/notes/:id` | — | Get one of **your** notes (404 if it isn't yours) |
| `POST` | `/notes` | `{ title, content }` | Create a note (rate-limited) |
| `PUT` | `/notes/:id` | `{ title, content }` | Update **your** note |
| `DELETE` | `/notes/:id` | — | Delete **your** note |

**Authentication header** for protected routes:

```
Authorization: Bearer <your-jwt-token>
```

### Example — register

```bash
curl -X POST http://localhost:5001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@example.com","password":"secret123"}'
```

```json
{
  "_id": "64f1c2a0d3a1b2c3d4e5f6a7",
  "name": "Alice",
  "email": "alice@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Example — create a note

```bash
curl -X POST http://localhost:5001/api/notes \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"title":"My first note","content":"Hello, world!"}'
```

---

## ☁️ Deploying to Render

This repo is already wired for a one-service deployment on [Render](https://render.com):

1. Push your code to GitHub and create a **New Web Service** in Render, connected to your repo.
2. Set the build command (root `package.json` already has it):
   - **Build:** `npm install --prefix backend && npm install --prefix frontend && npm run build --prefix frontend`
   - **Start:** `npm run start --prefix backend`
3. Add the environment variables from step 2 of *Getting Started* — plus:
   - `NODE_MODULE=prod` — tells Express to serve the built frontend (`frontend/dist`) so the whole app runs on a single origin.
4. Deploy 🎉 — the API and the UI are served from the same URL.

---

## 🔒 Security Notes

- Passwords are never stored in plain text — they're hashed with **bcrypt** (10 salt rounds).
- JWTs expire after **7 days**; the token is sent as a `Bearer` token and verified on every protected request.
- Note queries are always filtered by the authenticated user's ID — a user cannot read or mutate another user's notes.
- The API is protected against request flooding by a serverless sliding-window rate limiter.

---

## 📄 License

Distributed under the ISC License.
