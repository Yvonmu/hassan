# Fix: Documents Not Publicly Accessible

## Problem
Documents exist in Sanity (verified with token) but return `null` when queried without a token. This means documents are not publicly accessible.

## Solution

### Step 1: Enable Public API Access

1. Go to [Sanity Manage](https://sanity.io/manage)
2. Select your project: **db1likqs**
3. Go to **API** → **CORS origins**
4. Ensure your domain is added (or add `http://localhost:3000` for development)
5. Go to **API** → **API settings**
6. Verify **"Public API"** is enabled for read access

### Step 2: Manually Publish Documents in Studio

Even though documents show as "published", they might need to be republished:

1. Visit: `http://localhost:3000/studio`
2. Log in to Sanity Studio
3. For each document type:
   - Open the document (e.g., "Hero Section")
   - Click the **"Publish"** button (even if it says "Published")
   - This ensures the document is truly publicly accessible

### Step 3: Verify Public Access

After publishing, test the API:

```bash
curl "https://db1likqs.api.sanity.io/v2024-01-01/data/query/production?query=*%5B_type%20%3D%3D%20%22heroSection%22%5D%5B0%5D"
```

Should return the document data, not `{"result":null}`.

### Step 4: Check Project Visibility

1. In Sanity Manage → Your Project → **Settings**
2. Check **"Visibility"** settings
3. Ensure the project allows public read access

## Alternative: Use API Token (Not Recommended for Public Site)

If public access can't be enabled, you could use a read-only API token, but this is **not recommended** for public websites as it exposes your token.

## Quick Fix Script

Run this to republish all documents:

```bash
npm run seed
```

Then manually publish each document in Studio.

## Still Not Working?

1. Check Sanity project billing/plan - some features require paid plans
2. Verify dataset name is correct: `production`
3. Check if there are any project-level restrictions
4. Contact Sanity support if the issue persists
