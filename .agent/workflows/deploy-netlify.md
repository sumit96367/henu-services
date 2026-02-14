---
description: How to deploy the Next.js application to Netlify
---

To deploy your Henu OS website to Netlify, follow these steps:

### 1. Preparation
Ensure all your changes are committed and pushed to your Git repository (GitHub, GitLab, or Bitbucket).

### 2. Connect to Netlify
1.  Log in to your [Netlify account](https://app.netlify.com/).
2.  Click on **"Add new site"** and select **"Import an existing project"**.
3.  Choose your Git provider and select the `henu-website` repository.

### 3. Build Settings
Netlify will automatically detect the Next.js framework. Use the following settings:
- **Base directory:** Leave this **BLANK** (The root of your repo is `henu-app`).
- **Build Command:** `npm run build`
- **Publish directory:** `.next`

### 4. Environment Variables
You MUST add the following environment variables in Netlify (**Site settings > Build & deploy > Environment variables**). These are critical for the build to succeed.

| Key | Example Value |
| :--- | :--- |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | `AIzaSy...` |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | `your-app.firebaseapp.com` |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | `your-app-id` |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | `your-app.appspot.com` |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | `123456789` |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | `1:12345:web:abcde` |
| `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` | `G-XXXXXX` |
| `RAZORPAY_KEY_ID` | `rzp_live_...` |
| `RAZORPAY_KEY_SECRET` | `(your secret key)` |
| `JWT_SECRET` | `(any long random string)` |
| `ADMIN_ID` | `admin@henuservices.com` |
| `ADMIN_PASSWORD` | `(your password)` |
| `SMTP_HOST` | `smtp.gmail.com` |
| `SMTP_PORT` | `587` |
| `SMTP_USER` | `your-email@gmail.com` |
| `SMTP_PASSWORD` | `(app password)` |

> **Note:** Ensure there are no spaces or hidden characters when pasting these values into Netlify.

### 5. Deploy
Click **"Deploy site"**. If it still fails, check the "Deploys" tab for logs and verify the variable names exactly match the table above.

### Optional: Netlify CLI
If you want to deploy from your terminal:
1.  Install the CLI: `npm install -g netlify-cli`
2.  Login: `netlify login`
3.  Deploy: `netlify deploy --build`
