# Content Creation Guide for Sanity CMS

## 🎯 All Components Connected!

All website components are now connected to Sanity CMS and will update automatically when you publish content.

## 📋 Step-by-Step Content Creation

### Step 1: Access Sanity Studio

1. **Start Sanity Studio** (if not already running):
   ```bash
   npm run studio
   ```

2. **Open in browser**: http://localhost:3333

3. **Login** with your Sanity account (or create one)

### Step 2: Create Content for Each Section

#### 1. Hero Section
- **Document Type**: "Hero Section"
- **Fields to fill**:
  - Title (e.g., "Hassan Adan Hassan")
  - Subtitle (e.g., "Diplomatic Representative")
  - Description
  - Hero Image (upload)
  - Official Title, Year, Location
  - Consul Name, Title, Consulate Full Name

#### 2. Global Settings
- **Document Type**: "Global Settings"
- **Fields to fill**:
  - Site Name
  - Contact Info:
    - Phone Number
    - Email Address
    - Address
    - Office Hours
  - Footer:
    - Brand Description
    - Quick Links (array)
    - Services List (array)
    - Copyright Text
  - Social Media:
    - Twitter URL
    - LinkedIn URL
    - Facebook URL

#### 3. Header Settings
- **Document Type**: "Header Settings"
- **Fields to fill**:
  - Mission Text (e.g., "Diplomatic Mission")
  - Navigation Items:
    - Label (e.g., "Home", "Services")
    - Section ID (e.g., "home", "services")
    - Order (1, 2, 3, etc.)

#### 4. Diplomatic Excellence
- **Document Type**: "Diplomatic Excellence"
- **Fields to fill**:
  - Title
  - Description
  - Competencies (array):
    - Name
    - Value (percentage)
  - Activities (array):
    - Title
    - Description
    - Icon Name (Users, Globe, Award, Briefcase)
  - Responsibilities (array of strings)

#### 5. Consular Excellence
- **Document Type**: "Consular Excellence"
- **Fields to fill**:
  - Action Cards (array):
    - Title
    - Subtitle
    - Button Text
    - Type (Emergency, Schedule, Visa Portal)
    - Visa Portal URL (if type is Visa)

#### 6. Jurisdiction Section
- **Document Type**: "Jurisdiction Section"
- **Fields to fill**:
  - Label
  - Title
  - Description
  - Information Text
  - Visa/Passport Information

#### 7. Natural Wonders (Djibouti)
- **Document Type**: "Natural Wonders (Djibouti)"
- **Fields to fill**:
  - Wonders List (array):
    - Title
    - Location
    - Description
    - Image (upload)
    - Rating
    - Category
    - External Link

#### 8. Natural Wonders (Rwanda)
- **Document Type**: "Natural Wonders (Rwanda)"
- **Fields to fill**:
  - Wonders List (array):
    - Title
    - Location
    - Description
    - Image (upload)
    - Rating
    - Category
    - External Link

#### 9. Stay Connected
- **Document Type**: "Stay Connected"
- **Fields to fill**:
  - Title
  - Description
  - Content Items (array):
    - Title
    - Description
    - Image (upload)
    - Type
    - Date
    - Location
    - Button Link Text
    - External Link

#### 10. Social Feeds Section
- **Document Type**: "Social Feeds Section"
- **Fields to fill**:
  - Title
  - Description
  - Twitter/X URL
  - LinkedIn URL
  - Facebook URL
  - YouTube URL

#### 11. SEO Metadata
- **Document Type**: "SEO Metadata"
- **Create one for each page** (home, about, services, contact)
- **Fields to fill**:
  - Page (home, about, services, contact)
  - Title
  - Description
  - Keywords (array)
  - Open Graph Title
  - Open Graph Description
  - Open Graph Image (upload)
  - Canonical URL

#### 12. Services
- **Document Type**: "Service"
- **Create multiple service documents**
- **Fields to fill**:
  - Title
  - Description
  - Priority
  - Features (array)
  - Icon
  - Order

### Step 3: Publish Content

1. **Fill in all fields** for each document
2. **Click "Publish"** button (top right)
3. **Content appears on website immediately!**

### Step 4: Test Automatic Updates

1. **Edit any content** in Sanity Studio
2. **Click "Publish"**
3. **Check your website** - changes should appear within seconds
4. **No deployment needed!**

## 🔄 How Automatic Updates Work

- All data fetches with `revalidate: 0` (no cache)
- Webhook triggers on publish
- Next.js revalidates all pages and tags
- Changes appear instantly

## 📝 Tips

- **Start with Hero Section** - it's the most visible
- **Use Global Settings** for site-wide content (contact info, footer)
- **Upload images** directly in Sanity (they're optimized automatically)
- **Test each section** after publishing
- **Use fallback translations** if Sanity data is missing

## 🐛 Troubleshooting

### Content Not Appearing
- Check that document is **published** (not draft)
- Verify you're looking at the correct page
- Clear browser cache
- Check browser console for errors

### Images Not Loading
- Ensure images are uploaded to Sanity (not external URLs)
- Check image asset references in queries
- Verify image URLs are correct

### Changes Not Updating
- Ensure webhook is configured (see `SANITY_WEBHOOK_SETUP.md`)
- Check Vercel logs for revalidation errors
- Verify `SANITY_REVALIDATE_SECRET` matches (if set)

## ✅ Checklist

- [ ] Hero Section created and published
- [ ] Global Settings created and published
- [ ] Header Settings created and published
- [ ] Diplomatic Excellence created and published
- [ ] Consular Excellence created and published
- [ ] Jurisdiction Section created and published
- [ ] Natural Wonders (Djibouti) created and published
- [ ] Natural Wonders (Rwanda) created and published
- [ ] Stay Connected created and published
- [ ] Social Feeds Section created and published
- [ ] SEO Metadata created for all pages
- [ ] Services created and published
- [ ] Tested automatic updates

## 🎉 You're Done!

Once all content is created and published, your website will be fully managed through Sanity CMS. Any changes you make will appear immediately on the live site!
