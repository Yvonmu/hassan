# Sanity Webhook Setup for Instant Updates

To enable instant updates when you publish content in Sanity Studio, you need to set up a webhook.

## Quick Setup (Optional - for instant updates)

1. **Go to Sanity Manage**: https://www.sanity.io/manage/project/db1likqs/api/webhooks
2. **Click "Create webhook"**
3. **Configure:**
   - **Name**: `Next.js Revalidation`
   - **URL**: `https://yourdomain.com/api/revalidate` (or `http://localhost:3000/api/revalidate` for dev)
   - **Dataset**: `production`
   - **Trigger on**: `Create`, `Update`, `Delete`
   - **Secret**: Generate a random string (save it!)
4. **Add secret to `.env.local`:**
   ```
   SANITY_REVALIDATE_SECRET=your_secret_here
   ```

## Current Setup (Already Working!)

With the current configuration, changes will appear immediately because:
- ✅ CDN disabled (`useCdn: false`)
- ✅ ISR cache disabled (`revalidate: 0`)
- ✅ Static caching disabled (`noStore()`)
- ✅ Fresh data on every page request

## Testing

1. **Edit content in Sanity Studio**: http://localhost:3333
2. **Publish** the changes
3. **Hard refresh** your website: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
4. **Changes appear immediately!**

The webhook is optional - it's only needed if you want automatic revalidation without refreshing. The current setup already fetches fresh data on every page load.
