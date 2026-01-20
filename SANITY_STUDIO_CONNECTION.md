# Sanity Studio Connection Guide

## 🔗 Connecting Your Studio

When you see the "Connect this studio to your project" message, you have two options:

### Option 1: Add Development Host (Recommended for Local Development)

This is the easiest option for local development:

1. **In Sanity Studio** (http://localhost:3333 or http://localhost:3000/studio):
   - Click **"Add development host"**
   - Enter: `http://localhost:3333` (for standalone studio)
   - Or: `http://localhost:3000` (for Next.js integrated studio)
   - Click **"Add"**

2. **Or via Sanity Manage**:
   - Go to https://www.sanity.io/manage
   - Select your project (db1likqs)
   - Go to **API** → **CORS origins** or **Studio** → **Development hosts**
   - Add: `http://localhost:3333` and `http://localhost:3000`

### Option 2: Register Studio (For Production)

For production deployments:

1. **In Sanity Studio**:
   - Click **"Register studio"**
   - Follow the prompts
   - This enables schema syncing and Content Agent features

2. **Or via Sanity Manage**:
   - Go to https://www.sanity.io/manage
   - Select your project
   - Go to **Studio** → **Register Studio**
   - Enter your studio URL (e.g., `https://yourdomain.com/studio`)

## 🚀 Quick Fix for Local Development

The easiest way to get started:

1. **Open Sanity Studio**: http://localhost:3333 (or http://localhost:3000/studio)
2. **Click "Add development host"**
3. **Enter**: `http://localhost:3333`
4. **Click "Add"**

That's it! Your studio will now connect to your project.

## 📝 Notes

- **Development hosts** are for localhost and preview URLs
- **Registered studios** are for production deployments
- You can add multiple development hosts
- Development hosts don't require registration
- Registered studios enable advanced features like schema syncing

## 🔧 Troubleshooting

### Still seeing the connection message?

1. **Check your project ID**:
   - Verify `NEXT_PUBLIC_SANITY_PROJECT_ID=db1likqs` in `.env.local`
   - Restart the dev server after changing env vars

2. **Check your dataset**:
   - Verify `NEXT_PUBLIC_SANITY_DATASET=production` in `.env.local`

3. **Clear browser cache**:
   - Hard refresh: `Ctrl+Shift+R` (or `Cmd+Shift+R` on Mac)

4. **Check Sanity Manage**:
   - Go to https://www.sanity.io/manage
   - Verify your project exists and is accessible

## ✅ After Connection

Once connected, you'll be able to:
- ✅ View and edit content
- ✅ Create new documents
- ✅ Upload images
- ✅ Manage your content

The connection is one-time setup. After that, your studio will remember the connection.
