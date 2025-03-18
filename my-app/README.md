# Todo App

A simple Todo app built using **Next.js (App Router)** for the frontend and **Node.js, Express, and MongoDB** for the backend.

## 🚀 Features
- ✅ Add, edit, and delete todos
- 📅 Store todos with `title`, `description`, and `date`
- 🔄 Real-time updates to the database
- 📜 Paginated todo list fetching
- 🎨 Minimal client-side rendering (CSR) for better performance

## 🛠️ Tech Stack
- **Frontend:** Next.js, React, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB
- **Deployment:** Vercel (Frontend), Render/Atlas (Backend)

## 📂 Project Structure
📦 Todo-App
├── 📂 backend        # Node.js & Express backend
│   ├── server.js     # Main server file
│   ├── routes/       # API routes
│   ├── models/       # MongoDB models
│   └── config/       # Database connection setup
│
├── 📂 my-app         # Next.js frontend
│   ├── app/          # App Router components
│   ├── components/   # Reusable UI components
│   ├── hooks/        # Custom hooks
│   └── styles/       # Tailwind CSS styles
│
└── .gitignore        # Ignore node_modules & env files

## 🚀 Getting Started

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/Danish0111/Todo-App.git
cd Todo-App

### 2️⃣ Backend Setup
```sh
cd backend
npm install
npm start

### 2️⃣ Frontend  Setup
```sh
cd ../my-app
npm install
npm run dev
