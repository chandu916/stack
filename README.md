# StackOverflow-Clone

![StackOverflow-Clone](https://raw.githubusercontent.com/chandu916/stack/main/screenshot.png)

## 🔍 Overview

A full-stack clone of StackOverflow built with React/Redux + Node/Express + MongoDB. This project supports auth, question/answer flow, profile editing, votes, and custom theming.

## 🚀 Key Features

- Email/password authentication (JWT)
- Ask, answer, edit, delete questions
- Upvote/downvote and question tags
- User profile (bio, tags, login history, edit details)
- Light/dark theme toggle with persistence
- API error handling and client-side error boundary

## 🧩 Tech Stack

- Frontend: React, Redux, React Router, Axios, Moment.js
- Backend: Node.js, Express, MongoDB, Mongoose
- Auth: JSON Web Token (JWT)
- Dev tools: npm, create-react-app

## 📦 Repository Structure

```
client/           # React frontend
server/           # Express API server
  models/         # Mongoose models
  controllers/    # Route handlers
  routes/         # API endpoint definitions
  middlewares/    # auth middleware
```

## ⚙️ Local Setup

### 1. Clone

```bash
git clone https://github.com/chandu916/stack.git
cd stack
```

### 2. Server setup

```bash
cd server
npm install
```

Create `.env` file in `server/`:

```
PORT=5000
CONNECTION_URL=<your_mongo_connection_string>
JWT_SECRET=<your_secret_key>
```

Start server:

```bash
npm run dev
# or
npm start
```

### 3. Client setup

```bash
cd ../client
npm install
npm start
```

Open: `http://localhost:3000`

## 🧪 Testing Build

```bash
cd client
npm run build
```

## 🔒 API Behavior (500/400/404 handling)

- Server returns JSON `{ code, message }` for errors
- 404 for unknown endpoints
- Global server error middleware for uniform responses
- Client API interceptors log request/response lifecycle

## 📌 Usage

1. Sign up/login.
2. Visit Home to view questions.
3. Ask a question with title/body/tags.
4. Vote, answer, delete your contents.
5. Visit profile to edit details or view login history.
6. Toggle theme in user profile or app bar.

## 🌐 Live Demo

[Frontend](https://stackoverflow-frontend-85zb.onrender.com/)

## 🤝 Contributing

1. Fork repository
2. Create feature branch
3. Commit and push
4. Open PR with description

## 🛠️ Notes for Maintainers

- **API base URL**: `https://stack-overflow-o8mf.onrender.com/`
- **Redux actions** now include structured logging and error capture
- **`ErrorBoundary`** in `client/src/components/ErrorBoundary/ErrorBoundary.jsx`
- **`useSafeCallback`** in `client/src/utils/useSafeCallback.js`

## ✨ Author

Made with ❤️ by Chandu
