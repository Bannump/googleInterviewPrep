# Google Interview Prep Dashboard

A dark-themed dashboard to track **Data Structures & Algorithms** (LeetCode) practice and **Behavioral** (STAR) stories for Google-style interviews.

## Stack

- **React** + **Vite**
- **Tailwind CSS** (custom theme: `#000`, `#111`, `#222`, `#E5E7EB`, Google accent colors)
- **Lucide React** icons
- **Firebase** (Authentication + Firestore) for sign-in and per-user progress

## Features

- **Sign in with Google** — Each user’s progress is stored in Firestore and loaded when they sign in.
- **Two tabs:** Data Structures & Algorithms | Behavioral Stories
- **DSA:** 105 Google-tagged LeetCode questions; checkbox, title link, category/difficulty tags, per-question timer (Start → Pause / Finish). Finish marks complete and saves time taken.
- **Sticky progress bar:** Overall progress X/105 (Y%) at top of DSA tab
- **Process Overview:** Modal describing Screening and Onsite
- **Persistence:** When signed in, progress is saved to **Firebase Firestore**. When signed out, data is kept in `localStorage` only (no sync across devices).

## Firebase setup

1. Create a project in [Firebase Console](https://console.firebase.google.com/).
2. Enable **Authentication** → **Sign-in method** → **Google**.
3. Create a **Firestore Database** (start in test mode or production; you’ll deploy rules below).
4. Register a **Web app** in Project settings → Your apps. Copy the config object.
5. In this repo, copy `.env.example` to `.env` and fill in the values (use the `VITE_` prefix so Vite exposes them):

   ```
   VITE_FIREBASE_API_KEY=...
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=...
   VITE_FIREBASE_STORAGE_BUCKET=...
   VITE_FIREBASE_MESSAGING_SENDER_ID=...
   VITE_FIREBASE_APP_ID=...
   ```

6. Deploy Firestore rules so each user can only read/write their own document:

   ```bash
   firebase deploy --only firestore:rules
   ```

   (If you use Firebase CLI, add a `firebase.json` that points `firestore.rules` to the project’s `firestore.rules` file. The repo includes `firestore.rules` at the root.)

   Or in the Firebase Console → Firestore → Rules, paste the contents of `firestore.rules` (users can read/write only `users/{userId}` where `userId` is their own UID).

## Run

```bash
npm install
cp .env.example .env   # then edit .env with your Firebase config
npm run dev
```

Then open the URL shown (e.g. `http://localhost:5173`).

## Build

```bash
npm run build
npm run preview
```
