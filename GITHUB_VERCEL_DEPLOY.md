# GitHub & Vercel Deployment Guide

## Part 1: Push Project to GitHub

### Step 1: Create GitHub Repository

1. Go to https://github.com
2. Click the **"+"** icon (top right) → **"New repository"**
3. Repository name: `image-rating-app` (or your choice)
4. Description: "Full-stack image rating platform with authentication"
5. Choose **Public** or **Private**
6. **DO NOT** check "Initialize with README" (we already have files)
7. Click **"Create repository"**

### Step 2: Initialize Git (if not already done)

```bash
cd C:/Users/jayru/OneDrive/Desktop/E_Learning/RATING
git init
```

### Step 3: Add .gitignore (Important!)

Make sure `.gitignore` includes:
```
node_modules/
.env
client/node_modules/
client/build/
client/.env
npm-debug.log*
.DS_Store
```

### Step 4: Add Files to Git

```bash
git add .
git commit -m "Initial commit - Image Rating Platform"
```

### Step 5: Connect to GitHub & Push

Replace `YOUR-USERNAME` with your GitHub username:

```bash
git remote add origin https://github.com/YOUR-USERNAME/image-rating-app.git
git branch -M main
git push -u origin main
```

### Alternative: If you get authentication error

Use GitHub token or SSH:

**Using Personal Access Token:**
```bash
git remote set-url origin https://YOUR-TOKEN@github.com/YOUR-USERNAME/image-rating-app.git
git push -u origin main
```

---

## Part 2: Deploy from GitHub to Vercel

### Step 1: Sign Up/Login to Vercel

1. Go to https://vercel.com
2. Click **"Sign Up"** or **"Login"**
3. Choose **"Continue with GitHub"**
4. Authorize Vercel to access your GitHub repositories

### Step 2: Deploy Backend

1. Click **"Add New"** → **"Project"**
2. Click **"Import"** next to your `image-rating-app` repository
3. Configure the project:

   **Framework Preset:** Other  
   **Root Directory:** `./` (leave as is - this is the backend)  
   **Build Command:** (leave empty)  
   **Output Directory:** (leave empty)  
   **Install Command:** `npm install`

4. Click **"Environment Variables"** dropdown
5. Add these variables (click "Add" for each):

   ```
   MONGODB_URI = your_mongodb_atlas_connection_string
   JWT_SECRET = your_jwt_secret_key
   GOOGLE_CLIENT_ID = your_google_client_id
   GOOGLE_CLIENT_SECRET = your_google_client_secret
   SESSION_SECRET = your_session_secret
   ```
   
   **Note:** Don't set `GOOGLE_CALLBACK_URL` and `FRONTEND_URL` yet - we'll add them after getting the URLs

6. Click **"Deploy"**
7. Wait for deployment to complete
8. **Copy your backend URL** (e.g., `https://image-rating-app.vercel.app`)

### Step 3: Update Backend Environment Variables

1. Go to your backend project settings
2. Click **"Settings"** → **"Environment Variables"**
3. Add/Update these:

   ```
   GOOGLE_CALLBACK_URL = https://YOUR-BACKEND-URL.vercel.app/api/auth/google/callback
   FRONTEND_URL = https://YOUR-FRONTEND-URL.vercel.app
   ```
   (We'll update `FRONTEND_URL` after deploying frontend)

4. Click **"Redeploy"** from the Deployments tab

### Step 4: Deploy Frontend

1. Go back to Vercel Dashboard
2. Click **"Add New"** → **"Project"**
3. Click **"Import"** next to the same `image-rating-app` repository
4. This time, configure differently:

   **Framework Preset:** Create React App  
   **Root Directory:** Click "Edit" → Enter `client`  
   **Build Command:** `npm run build`  
   **Output Directory:** `build`  
   **Install Command:** `npm install`

5. Click **"Environment Variables"** dropdown
6. Add this variable:

   ```
   REACT_APP_API_URL = https://YOUR-BACKEND-URL.vercel.app/api
   ```
   
   Replace `YOUR-BACKEND-URL` with the backend URL you copied earlier

7. Click **"Deploy"**
8. Wait for deployment to complete
9. **Copy your frontend URL** (e.g., `https://image-rating-app-frontend.vercel.app`)

### Step 5: Update Backend with Frontend URL

1. Go to backend project settings
2. Click **"Settings"** → **"Environment Variables"**
3. Edit `FRONTEND_URL`:
   ```
   FRONTEND_URL = https://YOUR-FRONTEND-URL.vercel.app
   ```
4. Click **"Save"**
5. Go to **"Deployments"** tab → Click the three dots on latest deployment → **"Redeploy"**

### Step 6: Update Google OAuth Settings

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Click on your OAuth 2.0 Client ID
3. Under **"Authorized JavaScript origins"**, add:
   ```
   https://YOUR-FRONTEND-URL.vercel.app
   ```

4. Under **"Authorized redirect URIs"**, add:
   ```
   https://YOUR-BACKEND-URL.vercel.app/api/auth/google/callback
   ```

5. Click **"Save"**

### Step 7: Setup MongoDB Atlas (if not already done)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster (M0 Sandbox)
3. Create database user (Database Access)
4. Whitelist IP: `0.0.0.0/0` (Network Access) - allows all IPs
5. Get connection string from **"Connect"** → **"Connect your application"**
6. Replace `<password>` with your database user password
7. Update `MONGODB_URI` in Vercel backend environment variables

### Step 8: Test Your Live Application

1. Visit your frontend URL: `https://YOUR-FRONTEND-URL.vercel.app`
2. Test registration with email/password
3. Test Google OAuth login
4. Submit a rating and comment
5. Verify statistics display correctly

---

## Quick Reference: Environment Variables

### Backend (Main Project Root)
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/image-rating
JWT_SECRET=your_random_secret_key_here_make_it_long
GOOGLE_CLIENT_ID=your_google_client_id_from_google_cloud_console
GOOGLE_CLIENT_SECRET=your_google_client_secret_from_google_cloud_console
GOOGLE_CALLBACK_URL=https://your-backend.vercel.app/api/auth/google/callback
FRONTEND_URL=https://your-frontend.vercel.app
SESSION_SECRET=your_session_secret_random_string
```

### Frontend (client folder)
```
REACT_APP_API_URL=https://your-backend.vercel.app/api
```

---

## Automatic Deployments

Once connected to GitHub, Vercel automatically deploys:
- **Production:** Every push to `main` branch
- **Preview:** Every pull request

To update your live site:
```bash
git add .
git commit -m "Your update message"
git push origin main
```

Vercel will automatically build and deploy! 🚀

---

## Troubleshooting

### Build Failed
- Check Vercel logs in deployment details
- Verify all dependencies are in package.json
- Ensure environment variables are set correctly

### CORS Errors
- Verify `FRONTEND_URL` in backend matches exactly
- Check CORS configuration in server.js

### Google OAuth Not Working
- Confirm redirect URIs in Google Console match exactly
- Check `GOOGLE_CALLBACK_URL` is correct
- Wait 5 minutes after updating Google Console settings

### Database Connection Failed
- Verify MongoDB Atlas connection string
- Check IP whitelist (use 0.0.0.0/0 for all IPs)
- Ensure database user has read/write permissions

---

## Custom Domain (Optional)

After deployment, you can add a custom domain:

1. Go to project **"Settings"** → **"Domains"**
2. Add your domain
3. Update DNS records as instructed
4. Update environment variables with new domain
5. Update Google OAuth with new domain

Your application is now live! 🎉
