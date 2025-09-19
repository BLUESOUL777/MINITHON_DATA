# 🚨 Quick Fix for 401 Error

## The Problem
You're getting a 401 "User not found" error because your OpenRouter API key is not properly configured in Vercel.

## Step-by-Step Solution

### 1. Get Your OpenRouter API Key
1. Go to [OpenRouter.ai](https://openrouter.ai/)
2. Sign up or log in
3. Go to Dashboard → Keys
4. Create a new API key
5. Copy the key (starts with `sk-or-v1-`)

### 2. Set Environment Variables in Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your project
3. Go to **Settings** → **Environment Variables**
4. Add these variables:

   **Variable 1:**
   - Name: `VITE_OPENROUTER_API_KEY`
   - Value: `sk-or-v1-your-actual-key-here`
   - Environment: ✅ Production ✅ Preview ✅ Development

   **Variable 2:**
   - Name: `VITE_OPENROUTER_BASE_URL`
   - Value: `https://openrouter.ai/api/v1`
   - Environment: ✅ Production ✅ Preview ✅ Development

5. Click **Save**

### 3. Redeploy (CRITICAL!)
1. Go to **Deployments** tab
2. Click the three dots on your latest deployment
3. Click **Redeploy**
4. Wait for deployment to complete

### 4. Test
1. Go to your deployed app
2. Visit `/debug` to check environment variables
3. Try the chatbot at `/chat`

## Debug Information
After deploying, check the browser console for:
- `🔍 OpenRouter Environment Variables:` - Shows if variables are loaded
- `🔑 API Key Issue:` - Shows specific problems if any

## Common Issues
- ❌ **Variable name wrong**: Must be `VITE_OPENROUTER_API_KEY` (not `OPENROUTER_API_KEY`)
- ❌ **Not redeployed**: Must redeploy after setting environment variables
- ❌ **Wrong environment**: Must select all environments (Production, Preview, Development)
- ❌ **Invalid API key**: Must start with `sk-or-v1-`

The chatbot will work once you complete these steps! 🎉
