# CMS Quick Start Guide

## 🚀 Quick Setup (5 minutes)

### Step 1: Get Sanity Credentials
1. Go to https://www.sanity.io/manage
2. Create a new project (or use existing)
3. Copy your **Project ID** and **Dataset name**

### Step 2: Configure Environment
```bash
# Create .env.local file
cp env.template .env.local

# Edit .env.local and add:
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
```

### Step 3: Start the Studio
```bash
npm run studio
```

Visit `http://localhost:3333` and create your account.

### Step 4: Create Initial Content

#### 1. Hero Section
- Click "Hero Section" → "Create new"
- Fill in title, subtitle, description
- Upload hero image
- Publish

#### 2. Global Settings
- Click "Global Settings" → "Create new"
- Add contact info, footer content
- Publish

#### 3. SEO Metadata (Home Page)
- Click "SEO Metadata" → "Create new"
- Set page: "home"
- Add title, description, keywords
- Upload Open Graph image
- Publish

## 📍 Access Points

- **Local Studio**: `http://localhost:3333`
- **Production Studio**: `https://djibouticonsul.rw/studio`
- **Website**: `http://localhost:3000` (dev) or `https://djibouticonsul.rw` (prod)

## ✏️ Editing Content

1. Go to `/studio`
2. Click on any document type
3. Edit fields
4. Click **"Publish"** (changes go live immediately)

## 🖼️ Adding Images

1. Click the image field
2. Upload or select from existing
3. Add alt text
4. Images are auto-optimized

## 🔍 SEO Management

Edit SEO for each page:
- Home: `page == "home"`
- About: `page == "about"`
- Services: `page == "services"`
- Contact: `page == "contact"`

## ⚡ Common Tasks

### Update Hero Text
1. Go to Hero Section
2. Edit title/subtitle/description
3. Publish

### Change Contact Info
1. Go to Global Settings
2. Edit Contact Information
3. Publish

### Update Footer
1. Go to Global Settings
2. Edit Footer section
3. Publish

### Add/Edit Service
1. Go to Service
2. Create new or edit existing
3. Set priority, add features
4. Publish

## 🆘 Troubleshooting

**Studio won't load?**
- Check `.env.local` has correct Project ID
- Restart dev server: `npm run dev`

**Content not showing?**
- Make sure document is **Published** (not draft)
- Check browser console for errors
- Wait a few seconds for ISR revalidation

**Can't log in?**
- Check your email for verification
- Try password reset
- Contact Sanity support if needed

## 📚 More Help

- Full setup: [SANITY_SETUP.md](./SANITY_SETUP.md)
- Query examples: [GROQ_QUERIES.md](./GROQ_QUERIES.md)
- Sanity docs: https://www.sanity.io/docs


