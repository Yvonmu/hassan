# Fix: Data Returning Null from Sanity

## 🔍 Problem
All data from Sanity is returning `null` on `/test-sanity` page.

## ✅ What I Fixed

### 1. Updated GROQ Queries
- Added `!(_id in path("drafts.**"))` to all queries
- This excludes draft documents (only fetches published)

### 2. Updated Seed Script
- Changed from `createIfNotExists` to `create` (creates published documents)
- Added checks to update existing documents instead of creating duplicates
- Documents are now created as **published** (not drafts)

### 3. Seed Script Ran
- All documents were created/updated
- They should be published now

## 🔄 If Data Still Shows as Null

### Option 1: Check Sanity Studio
1. Go to http://localhost:3000/studio
2. Open each document type
3. Check if documents show **"Published"** (green badge)
4. If they show **"Draft"**, click **"Publish"** button

### Option 2: Manually Publish in Studio
1. Open Sanity Studio
2. For each document:
   - Click on it
   - Look for "Publish" button (top right)
   - Click "Publish"
   - Wait for confirmation

### Option 3: Re-run Seed with Force Publish
The seed script should have published them, but if not:
1. Go to Studio
2. Manually publish each document
3. Or run seed again (it will update existing)

## 🧪 Test Data Fetching

Visit: http://localhost:3000/test-sanity

You should see:
- ✅ Hero Section: Found (with data)
- ✅ Global Settings: Found (with data)
- etc.

If still null:
1. Check Studio - are documents published?
2. Check browser console for errors
3. Check server logs for fetch errors

## 📝 Quick Fix Commands

```bash
# Re-run seed (updates existing documents)
npm run seed

# Check if documents exist in Sanity
# Go to Studio and verify they're published
```

## 🎯 Expected Result

After fixing:
- `/test-sanity` shows ✅ Found for all sections
- Main page displays Sanity data (not translations)
- Changes in Studio appear immediately on website
