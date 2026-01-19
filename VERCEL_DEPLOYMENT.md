# Deploying Sanity Studio on Vercel

## ✅ Setup Complete!

Your Sanity Studio is now configured to be accessible on Vercel at `https://yourdomain.com/studio`.

## How It Works

1. **Build Process**: When you run `npm run build`, it automatically:
   - Builds Sanity Studio to `public/studio/` (static files)
   - Builds your Next.js app
   
2. **Deployment**: Vercel serves the Studio files from `public/studio/` at the `/studio` route

3. **Access**: After deployment, visit `https://yourdomain.com/studio` to access the CMS

## Deploying to Vercel

### Step 1: Push to Git
```bash
git add .
git commit -m "Add Sanity Studio for Vercel deployment"
git push
```

### Step 2: Connect to Vercel

1. Go to https://vercel.com
2. Click "Add New Project"
3. Import your repository
4. Vercel will auto-detect Next.js

### Step 3: Add Environment Variables

In Vercel dashboard → Settings → Environment Variables, add:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=ik1g399m
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_token_here (optional, for webhooks)
SANITY_REVALIDATE_SECRET=your_secret_here (optional, for webhooks)
```

### Step 4: Deploy!

Click "Deploy". The Studio will be available at:
- **Production**: `https://yourdomain.com/studio`
- **Preview**: `https://your-branch.vercel.app/studio`

## First-Time Access

1. Visit `https://yourdomain.com/studio`
2. You'll be prompted to create a Sanity account (or sign in)
3. Use your email to sign up
4. Verify your email
5. Start editing content!

## Important Notes

### ✅ What Works:
- Studio is accessible at `/studio` on your domain
- All content edits sync to production dataset
- Changes appear on website immediately (with webhook revalidation)
- Studio is protected by Sanity authentication

### ⚠️ When to Rebuild Studio:
- If you change schemas (`sanity/schemas/*.ts`), you need to rebuild:
  ```bash
  npm run build:studio
  git add public/studio/
  git commit -m "Update Studio build"
  git push
  ```
- The Studio is automatically rebuilt on every deployment (included in `npm run build`)

### 🔒 Security:
- Studio is protected by Sanity's built-in authentication
- Only users you invite can access it
- No custom auth needed
- API tokens are only for write operations (webhooks)

## Alternative: Sanity Hosted Studio

If you prefer, you can also use Sanity's free hosted Studio:

1. Go to https://www.sanity.io/manage
2. Select your project
3. Click "Open Studio"
4. Access at: `https://ik1g399m.sanity.studio`

This is always available and doesn't require deployment, but uses Sanity's domain instead of yours.

## Troubleshooting

### Studio Not Loading on Vercel
- Check that `public/studio/index.html` exists
- Verify environment variables are set in Vercel
- Check Vercel build logs for errors

### Content Not Updating
- Ensure webhook is configured (see `SANITY_WEBHOOK_SETUP.md`)
- Check that `SANITY_REVALIDATE_SECRET` matches in both places
- Verify the revalidation API route is working

### Build Fails
- Make sure `sanity` CLI is installed: `npm install`
- Check that schemas are valid: `npm run studio` (should start locally)
- Review build logs in Vercel dashboard
