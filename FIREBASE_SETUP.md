# Step-by-Step Firebase Setup for Google Interview Prep

Follow these steps to enable **Google Sign-In** and **Firestore** so each user can load and save their own progress.

---

## Step 1: Create a Firebase project

1. Go to **[Firebase Console](https://console.firebase.google.com/)** and sign in with your Google account.
2. Click **“Add project”** (or **“Create a project”**).
3. Enter a **project name** (e.g. `google-interview-prep`) and click **Continue**.
4. Turn **Google Analytics** on or off (optional for this app), then click **Create project**.
5. When it’s ready, click **Continue**.

---

## Step 2: Enable Google Sign-In

1. In the left sidebar, go to **Build** → **Authentication**.
2. Click **“Get started”** if you see it.
3. Open the **“Sign-in method”** tab.
4. Click **“Google”** in the list of providers.
5. Turn the **Enable** switch **On**.
6. Choose a **Project support email** (your email is fine).
7. Click **Save**.

---

## Step 3: Create a Firestore database

1. In the left sidebar, go to **Build** → **Firestore Database**.
2. Click **“Create database”**.
3. Choose **“Start in test mode”** (we’ll lock it down with rules next). Click **Next**.
4. Pick a **Firestore location** (e.g. `us-central1`). Click **Enable**.
5. Wait until the database is created.

---

## Step 4: Register your web app and get config

1. In the left sidebar, click the **gear icon** next to “Project Overview” → **Project settings**.
2. Scroll to **“Your apps”**. Click the **Web** icon (`</>`).
3. Enter an **App nickname** (e.g. `Google Interview Prep`) and leave **“Firebase Hosting”** unchecked. Click **Register app**.
4. You’ll see a code snippet with something like:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIza...",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123456789:web:abc..."
   };
   ```
5. **Copy these values** — you’ll put them in `.env` in the next step. You can click **Continue** through the rest of the wizard (e.g. “Add Firebase SDK”) and then **Continue to console**.

---

## Step 5: Add your config to the project (`.env`)

1. In your project folder, copy the example env file:
   - **Windows (PowerShell):** `Copy-Item .env.example .env`
   - **Mac/Linux:** `cp .env.example .env`
2. Open **`.env`** in your editor.
3. Fill in each value from the Firebase config you copied:

   ```env
   VITE_FIREBASE_API_KEY=your_api_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=1:123456789:web:abc...
   ```

4. Save the file. **Do not commit `.env`** — it should stay in `.gitignore` (Vite/React projects usually ignore it by default).

---

## Step 6: Deploy Firestore security rules

Rules ensure each user can only read and write their own progress document.

### Option A: Using Firebase Console (no CLI)

1. In Firebase Console, go to **Build** → **Firestore Database**.
2. Open the **“Rules”** tab.
3. Replace the existing rules with the contents of the **`firestore.rules`** file in this repo. It should look like:

   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /users/{userId} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }
     }
   }
   ```

4. Click **Publish**.

### Option B: Using Firebase CLI

1. Install the CLI: `npm install -g firebase-tools`
2. Log in: `firebase login`
3. In your project folder, run: `firebase init firestore`
   - When asked for a rules file, choose **firestore.rules** (or the default).
   - When asked for a indexes file, you can use the default or skip.
4. Ensure **`firestore.rules`** in the project root matches the rules above (it already does in this repo).
5. Deploy: `firebase deploy --only firestore:rules`

---

## Step 7: Run the app and test

1. From the project root, run:
   ```bash
   npm install
   npm run dev
   ```
2. Open the URL shown (e.g. `http://localhost:5173`).
3. You should see **“Sign in with Google”**. Click it and complete the Google sign-in.
4. After signing in, you should see the dashboard. Check off a problem or add a behavioral note — it will be saved to Firestore for your user.
5. Sign out and sign in again (or open the app in another browser/incognito) to confirm your progress loads correctly.

---

## Troubleshooting

| Issue | What to check |
|--------|----------------|
| **“Firebase: Error (auth/configuration-not-found)”** or blank config | `.env` exists, all `VITE_` variables are set, and you restarted `npm run dev` after changing `.env`. |
| **Popup blocked or “auth/popup-closed-by-user”** | Allow popups for localhost, or try again without closing the sign-in window. |
| **“Missing or insufficient permissions” in Firestore** | Rules are deployed (Step 6). Rules must allow `read, write` for `users/{userId}` when `request.auth.uid == userId`. |
| **Google sign-in not showing** | In Firebase Console → Authentication → Sign-in method, ensure **Google** is **Enabled**. |

---

## Summary checklist

- [ ] Firebase project created  
- [ ] Google sign-in enabled in Authentication  
- [ ] Firestore database created  
- [ ] Web app registered and config copied  
- [ ] `.env` created and all `VITE_FIREBASE_*` values filled  
- [ ] Firestore rules deployed (Console or CLI)  
- [ ] App runs with `npm run dev` and sign-in works  

Once all steps are done, each user’s DSA progress and behavioral notes are stored in Firestore under `users/{their-uid}` and load when they sign in with Google.
