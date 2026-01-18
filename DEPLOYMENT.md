# Vercel Deployment Guide

## Prerequisites
- Vercel account (sign up at https://vercel.com)
- MongoDB Atlas account (for production database)
- Google OAuth credentials configured

## Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

## Step 2: Deploy Backend

1. Navigate to the backend directory:
```bash
cd C:/Users/jayru/OneDrive/Desktop/E_Learning/RATING
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy backend:
```bash
vercel
```

4. Follow the prompts:
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N**
   - Project name? **image-rating-backend** (or your choice)
   - Which directory? **./** (current directory)
   - Override settings? **N**

5. After deployment, set environment variables in Vercel dashboard:
   - Go to your project settings
   - Click "Environment Variables"
   - Add these variables:

```
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=https://your-backend-url.vercel.app/api/auth/google/callback
FRONTEND_URL=https://your-frontend-url.vercel.app
SESSION_SECRET=your_session_secret
```

6. Redeploy after adding env variables:
```bash
vercel --prod
```

7. Note your backend URL (e.g., https://image-rating-backend.vercel.app)

## Step 3: Deploy Frontend

1. Navigate to the frontend directory:
```bash
cd client
```

2. Update the build script in package.json (already configured):
```json
"scripts": {
  "build": "react-scripts build"
}
```

3. Deploy frontend:
```bash
vercel
```

4. Follow the prompts:
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N**
   - Project name? **image-rating-frontend** (or your choice)
   - Which directory? **./** (current directory)
   - Override settings? **N**

5. Set environment variable in Vercel dashboard:
   - Go to project settings
   - Click "Environment Variables"
   - Add:

```
REACT_APP_API_URL=https://your-backend-url.vercel.app/api
```

6. Redeploy:
```bash
vercel --prod
```

## Step 4: Update Google OAuth Settings

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to your OAuth credentials
3. Add these to **Authorized redirect URIs**:
   - `https://your-backend-url.vercel.app/api/auth/google/callback`
4. Add to **Authorized JavaScript origins**:
   - `https://your-frontend-url.vercel.app`

## Step 5: Setup MongoDB Atlas (Production Database)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster (if you haven't already)
3. Create a database user
4. Get your connection string
5. Whitelist Vercel IPs or use `0.0.0.0/0` (allow from anywhere)
6. Update `MONGODB_URI` in backend environment variables

## Step 6: Test Your Deployment

1. Visit your frontend URL
2. Test login with email/password
3. Test Google OAuth login
4. Submit a rating and comment
5. Verify statistics update

## Useful Vercel Commands

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod

# View deployment logs
vercel logs

# Remove deployment
vercel remove [deployment-url]

# List all deployments
vercel ls
```

## Troubleshooting

### CORS Errors
- Ensure `FRONTEND_URL` in backend env matches your frontend URL exactly
- Check that CORS is configured in server.js

### Database Connection Failed
- Verify MongoDB Atlas connection string
- Check IP whitelist in MongoDB Atlas
- Ensure database user has correct permissions

### Google OAuth Not Working
- Verify redirect URIs in Google Cloud Console
- Check `GOOGLE_CALLBACK_URL` matches exactly
- Ensure client ID and secret are correct

### Build Failures
- Check logs with `vercel logs`
- Verify all dependencies are in package.json
- Ensure node version compatibility

## Environment Variables Summary

### Backend (.env)
```
PORT=5001
MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=https://your-backend.vercel.app/api/auth/google/callback
FRONTEND_URL=https://your-frontend.vercel.app
SESSION_SECRET=your_session_secret
```

### Frontend (.env)
```
REACT_APP_API_URL=https://your-backend.vercel.app/api
```

## Post-Deployment

After successful deployment:
1. Update README.md with live URLs
2. Test all features thoroughly
3. Monitor Vercel analytics
4. Set up custom domain (optional)

Your application should now be live and accessible worldwide! 🚀
