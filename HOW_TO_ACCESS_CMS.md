# How to Access Your CMS

## Quick Access

### Method 1: Standalone Studio (Recommended)
```bash
npm run studio
```
Then visit: **http://localhost:3333**

### Method 2: Via Next.js Route
When your Next.js app is running (`npm run dev`), visit:
**http://localhost:3000/studio**

This will redirect to the standalone Studio.

---

## Step-by-Step

1. **Open a terminal** in your project directory

2. **Start Sanity Studio:**
   ```bash
   npm run studio
   ```

3. **Wait for it to start** (you'll see):
   ```
   Sanity Studio using vite@7.3.1 ready in XXXXms and running at http://localhost:3333/
   ```

4. **Open your browser** and go to: **http://localhost:3333**

5. **Login/Create Account:**
   - First time: Create a Sanity account with your email
   - Check your email for verification
   - You're in!

---

## What You'll See

After logging in, you'll see these content types:

- **Hero Section** - Edit main hero content
- **Global Settings** - Edit site-wide settings, contact info, footer
- **SEO Metadata** - Edit SEO for each page
- **Service** - Manage consular services (4 services already created)

---

## First-Time Setup

If this is your first time accessing the Studio:

1. Visit **http://localhost:3333**
2. Click "Sign in" or "Create account"
3. Enter your email
4. Check email for verification link
5. Once verified, you can log in and start editing!

---

## Quick Start

After logging in:

1. Click **"Hero Section"** in the left sidebar
2. Click the document (or create new)
3. Edit the fields:
   - Title, Subtitle, Description
   - Upload hero image
   - Edit consul information
4. Click **"Publish"** at the top right
5. Refresh your website to see changes!

---

## Running Both Servers

**Terminal 1** - Next.js website:
```bash
npm run dev
```
Website: http://localhost:3000

**Terminal 2** - Sanity Studio (CMS):
```bash
npm run studio
```
CMS: http://localhost:3333

---

## Your Content is Already Created!

All initial content has been seeded:
- ✅ Hero Section
- ✅ Global Settings  
- ✅ SEO Metadata (Home)
- ✅ 4 Services

Just open the Studio and start editing!

---

## Troubleshooting

**Studio won't start?**
- Make sure you're in the project directory
- Check that `.env.local` has `NEXT_PUBLIC_SANITY_PROJECT_ID=db1likqs`
- Try: `npm install` then `npm run studio`

**Can't log in?**
- Check your email for verification
- Try password reset if needed
- Make sure you're using the correct Sanity account

**Port 3333 already in use?**
```bash
# Kill the process using port 3333
lsof -ti:3333 | xargs kill -9
# Then run npm run studio again
```
