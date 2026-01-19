# Get Read-Only API Token for Sanity

## Problem
Document IDs with dots (like `heroSection.home`) are treated as **private** in Sanity and require a token to access, even if the dataset is public.

## Solution: Create a Read-Only Token

### Step 1: Create the Token

1. Go to [Sanity Manage](https://sanity.io/manage)
2. Select your project: **ik1g399m**
3. Go to **API** → **Tokens**
4. Click **"Add API token"**
5. Fill in:
   - **Name**: `Read-only Website Token`
   - **Permissions**: Select **"Viewer"** (read-only)
   - **Expires**: Never (or set a long expiration)
6. Click **"Save"**
7. **Copy the token** (starts with `sk...`)

### Step 2: Add to Environment Variables

Add the token to `.env.local`:

```bash
# Read-only token for accessing Sanity data (safe to expose in client)
NEXT_PUBLIC_SANITY_READ_TOKEN=sk_your_token_here
```

**Note**: Using `NEXT_PUBLIC_` prefix makes it available in the browser. This is safe because:
- The token has **read-only** permissions (Viewer)
- It can only read published documents
- It cannot modify or delete anything

### Step 3: Restart Dev Server

```bash
# Stop the server (Ctrl+C)
# Then restart
npm run dev
```

### Step 4: Test

Visit: `http://localhost:3000/test-sanity`

Data should now show as ✅ Found!

## Why This Happens

In Sanity:
- Document IDs with dots (e.g., `heroSection.home`) are treated as **private**
- Private documents require a token to access
- Even if the dataset is public, documents with dots in IDs need authentication

## Alternative: Change Document IDs

If you don't want to use a token, you could change document IDs to not use dots:
- `heroSection.home` → `heroSectionHome`
- `globalSettings.main` → `globalSettingsMain`

But this requires:
1. Updating all document IDs in Sanity
2. Updating all code references
3. Re-seeding all content

**Using a read-only token is the easier and safer solution.**
