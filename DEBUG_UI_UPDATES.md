# Debugging UI Updates from Sanity

## 🔍 Why Changes Aren't Showing in UI

### 1. Check Data is Published
- ✅ Go to Sanity Studio: http://localhost:3000/studio
- ✅ Open any document
- ✅ Check if it says **"Published"** (green badge) or **"Draft"**
- ✅ If Draft: Click **"Publish"** button

### 2. Check Browser Console
Open browser DevTools (F12) and look for:
- `Hero data fetched: Found` or `Hero data fetched: Not found`
- Any error messages
- Network requests to Sanity API

### 3. Verify Data Fetching
The page uses `noStore()` and `revalidate: 0`, so it should fetch fresh data on every request.

Check server logs for:
```
Fetching hero section...
Hero data fetched: Found Hassan Adan Hassan
```

### 4. Hard Refresh Browser
- **Windows/Linux**: `Ctrl + Shift + R`
- **Mac**: `Cmd + Shift + R`

This clears the browser cache.

### 5. Check Component Fallbacks
Components use fallback translations if Sanity data is missing:
- If `heroData` is `null`, it uses `t("heroName")`
- Check if data is actually being fetched

### 6. Verify Environment Variables
```bash
# Check .env.local has:
NEXT_PUBLIC_SANITY_PROJECT_ID=db1likqs
NEXT_PUBLIC_SANITY_DATASET=production
```

### 7. Test Data Fetching Directly
Create a test page to see raw data:

```typescript
// app/test-sanity/page.tsx
import { getHeroSection, getGlobalSettings } from '@/lib/sanity.server'

export default async function TestSanity() {
  const hero = await getHeroSection()
  const settings = await getGlobalSettings()
  
  return (
    <div>
      <h1>Sanity Data Test</h1>
      <pre>{JSON.stringify({ hero, settings }, null, 2)}</pre>
    </div>
  )
}
```

Visit: http://localhost:3000/test-sanity

## 🐛 Common Issues

### Issue: Data is `null`
**Cause**: Document not published or doesn't exist
**Fix**: 
1. Go to Sanity Studio
2. Create/publish the document
3. Refresh page

### Issue: Changes not appearing
**Cause**: Browser cache or Next.js cache
**Fix**:
1. Hard refresh: `Ctrl+Shift+R`
2. Restart dev server: `bun run dev`
3. Check webhook is configured (for production)

### Issue: Component shows translations instead of Sanity data
**Cause**: Data is `null`, component using fallback
**Fix**:
1. Check data is published in Sanity
2. Verify GROQ query is correct
3. Check console logs for fetch errors

## ✅ Quick Checklist

- [ ] Content is **published** in Sanity (not draft)
- [ ] Environment variables are set correctly
- [ ] Dev server is running: `bun run dev`
- [ ] Browser console shows no errors
- [ ] Server logs show data being fetched
- [ ] Hard refresh browser (Ctrl+Shift+R)
- [ ] Check `/test-sanity` page to see raw data

## 🎯 Expected Behavior

When you:
1. Edit content in Sanity Studio
2. Click **"Publish"**
3. Refresh website

You should see:
- ✅ Changes appear immediately
- ✅ No deployment needed
- ✅ Data fetched fresh on every request

If this doesn't work, check the items above!
