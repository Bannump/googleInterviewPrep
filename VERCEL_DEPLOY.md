# Deploy Google Interview Prep to Vercel

This app is a **Vite + React** SPA with **Firebase** (Auth + Firestore). Follow these steps to deploy on Vercel and wire up Firebase for production.

---

## 1. Push your code to Git

Vercel deploys from a Git repository (GitHub, GitLab, or Bitbucket).

1. Initialize Git if you haven’t (from the project root):
   ```bash
   git init
   git add .
   git commit -m "Prepare for Vercel deploy"
   ```
2. Create a repo on GitHub (or your provider), then:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git branch -M main
   git push -u origin main
   ```

---

## 2. Deploy on Vercel

1. Go to **[vercel.com](https://vercel.com)** and sign in (e.g. with GitHub).
2. Click **“Add New…”** → **“Project”**.
3. **Import** the repository that contains this app.
4. Vercel will detect **Vite** and use:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
5. **Do not click Deploy yet** — add environment variables first (Step 3).
6. After adding env vars, click **Deploy**.

Your first deployment will run; the site will not work correctly until Firebase env vars and authorized domains are set (Steps 3 and 4).

---

## 3. Add Firebase environment variables in Vercel

The app reads Firebase config from **environment variables** (see `.env.example`). Add the same variables in Vercel so the build and runtime get the correct config.

1. In your Vercel project, open **Settings** → **Environment Variables**.
2. Add each variable for **Production** (and optionally Preview/Development). Use the same names and values as in your local `.env`:

   | Name | Value (from your `.env`) |
   |------|--------------------------|
   | `VITE_FIREBASE_API_KEY` | Your Firebase API key |
   | `VITE_FIREBASE_AUTH_DOMAIN` | Your Firebase auth domain (e.g. `your-project.firebaseapp.com`) |
   | `VITE_FIREBASE_PROJECT_ID` | Your Firebase project ID |
   | `VITE_FIREBASE_STORAGE_BUCKET` | Your storage bucket (e.g. `your-project.appspot.com`) |
   | `VITE_FIREBASE_MESSAGING_SENDER_ID` | Your messaging sender ID |
   | `VITE_FIREBASE_APP_ID` | Your Firebase web app ID |

3. **Redeploy** after saving: **Deployments** → open the latest deployment → **⋯** → **Redeploy** (so the new env vars are used).

---

## 4. Allow your Vercel URL in Firebase

Google Sign-In only works on **authorized domains**. Add your Vercel URL so Firebase allows sign-in there.

1. In **[Firebase Console](https://console.firebase.google.com/)**, select your project.
2. Go to **Build** → **Authentication** → **Settings** (or **Sign-in method** and then the **Authorized domains** section).
3. Under **Authorized domains**, click **Add domain**.
4. Enter your Vercel domain, for example:
   - `your-project.vercel.app`
   - Or your custom domain if you added one (e.g. `interview-prep.yourdomain.com`).
5. Save.

After this, “Sign in with Google” will work on your Vercel deployment.

---

## 5. Optional: Custom domain

1. In Vercel: **Project** → **Settings** → **Domains**.
2. Add your domain and follow the DNS instructions.
3. Add the **same** domain in Firebase **Authorized domains** (Step 4) so Google Sign-In works on the custom domain.

---

## Summary checklist

- [ ] Code pushed to GitHub (or GitLab/Bitbucket).
- [ ] Vercel project created and linked to the repo.
- [ ] All six `VITE_FIREBASE_*` env vars set in Vercel.
- [ ] Redeployed after adding env vars.
- [ ] Vercel domain (and custom domain if used) added to Firebase **Authorized domains**.

Once these are done, the app on Vercel will load, and users can sign in with Google and use Firestore for their progress.
