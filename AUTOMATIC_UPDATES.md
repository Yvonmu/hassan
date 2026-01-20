# Automatic Content Updates from Sanity CMS

## ✅ How It Works

When you publish content in Sanity Studio, it automatically updates on your website **immediately** without redeployment.

## 🔄 Update Flow

1. **Edit in Sanity Studio** → Make changes to content
2. **Publish** → Click "Publish" button in Studio
3. **Webhook Triggered** → Sanity sends a webhook to your Next.js app
4. **Revalidation** → Next.js clears cache and fetches fresh data
5. **Live Update** → Changes appear on the website instantly

## 📦 Components That Update Automatically

### ✅ Hero Section
- Title, subtitle, description
- Hero image
- Official title, year, location
- Consul information

### ✅ Footer
- Contact information (phone, email, address)
- Social media links (Twitter, LinkedIn, Facebook)
- Footer description
- Quick links
- Services list
- Copyright text

### ✅ Contact Section
- Contact email
- Phone number
- Office address
- Office hours

### ✅ SEO Metadata
- Page titles
- Meta descriptions
- Open Graph images
- Keywords

## ⚙️ Technical Implementation

### Data Fetching
- All Sanity queries use `revalidate: 0` (no cache)
- Data is fetched fresh on every request
- Uses `noStore()` to prevent static caching

### Revalidation Tags
Each content type has a revalidation tag:
- `heroSection` - Hero content
- `globalSettings` - Footer, contact info, social links
- `seoMetadata` - SEO data
- `service` - Services list

### Webhook Endpoint
- **URL**: `/api/revalidate`
- **Method**: POST
- **Trigger**: When content is published in Sanity
- **Action**: Revalidates all pages and tags

## 🔧 Setup Required

### 1. Sanity Webhook Configuration

In Sanity Manage → API → Webhooks, add:

- **Name**: Next.js Revalidation
- **URL**: `https://yourdomain.com/api/revalidate`
- **Dataset**: production
- **Trigger on**: Create, Update, Delete
- **Filter**: `_type == "heroSection" || _type == "globalSettings" || _type == "seoMetadata" || _type == "service"`
- **Secret** (optional): Set `SANITY_REVALIDATE_SECRET` in `.env.local`

### 2. Environment Variables

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=db1likqs
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_REVALIDATE_SECRET=your-secret-here (optional)
```

## 🧪 Testing

1. **Edit content in Sanity Studio**
2. **Publish the changes**
3. **Check the website** - changes should appear within seconds
4. **Verify webhook** - Check Vercel logs for revalidation requests

## 📝 Notes

- Changes appear **immediately** after publishing (no deployment needed)
- All data fetches are **uncached** (`revalidate: 0`)
- Webhook revalidates **all pages** and **all content types**
- Fallback to translations if Sanity data is missing
- Works in both development and production

## 🐛 Troubleshooting

### Changes Not Appearing

1. **Check webhook is configured** in Sanity Manage
2. **Verify webhook URL** is correct (production domain)
3. **Check Vercel logs** for revalidation errors
4. **Ensure content is published** (not draft)
5. **Verify environment variables** are set

### Webhook Not Firing

1. Check Sanity webhook status in Manage dashboard
2. Verify webhook URL is accessible
3. Check `SANITY_REVALIDATE_SECRET` matches (if set)
4. Review webhook delivery logs in Sanity

### Data Not Updating

1. Clear browser cache
2. Check `revalidate: 0` is set in `lib/sanity.server.ts`
3. Verify `noStore()` is called in page component
4. Check Sanity dataset is correct

## 🎯 Best Practices

- ✅ Always **publish** content (don't leave as draft)
- ✅ Test changes in **preview** before publishing
- ✅ Use **webhook secret** for production security
- ✅ Monitor **Vercel logs** for revalidation status
- ✅ Keep **fallback translations** for missing data
