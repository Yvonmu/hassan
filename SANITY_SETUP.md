# Sanity CMS Setup Instructions

This guide will help you set up Sanity CMS for the Djibouti Consulate website.

## Prerequisites

- Node.js installed
- A Sanity account (sign up at https://www.sanity.io)

## Step 1: Create a Sanity Project

1. Go to https://www.sanity.io/manage
2. Click "Create project"
3. Choose a project name (e.g., "Djibouti Consulate")
4. Choose a dataset name (default: "production")
5. Note your **Project ID** and **Dataset name**

## Step 2: Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Open `.env.local` and add your Sanity credentials:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
   NEXT_PUBLIC_SANITY_DATASET=production
   ```

## Step 3: Initialize Sanity Studio

Run the Sanity Studio locally:
```bash
npm run studio
```

This will start the Studio at `http://localhost:3333`

## Step 4: Access the CMS Admin Panel

### Local Development
- Visit `http://localhost:3333/studio` to access Sanity Studio locally

### Production
- Visit `https://djibouticonsul.rw/studio` to access Sanity Studio in production

### First-Time Login
1. When you first access the Studio, you'll be prompted to create an account
2. Use your email to sign up/login
3. You'll receive a verification email
4. Once verified, you can start editing content

## Step 5: Create Initial Content

After logging in, create the following documents:

### 1. Hero Section
- Go to "Hero Section" in the sidebar
- Click "Create new"
- Fill in:
  - Title: "Hassan Adan Hassan"
  - Subtitle: "Diplomatic Representative"
  - Description: Your hero description
  - Upload hero image
  - Fill in other fields as needed

### 2. Global Settings
- Go to "Global Settings"
- Create a new document
- Fill in:
  - Site Name
  - Contact Information (phone, email, address)
  - Footer content
  - Social media links

### 3. SEO Metadata
- Go to "SEO Metadata"
- Create documents for each page:
  - Home page (page: "home")
  - About page (page: "about")
  - Services page (page: "services")
  - Contact page (page: "contact")
- Fill in title, description, keywords, and Open Graph images

### 4. Services
- Go to "Service"
- Create service documents for:
  - Emergency Assistance
  - Document Services
  - Community Support
  - Business Development
- Set priority levels and features

## Step 6: Deploy Sanity Studio

The Studio is already integrated into your Next.js app at `/studio`. When you deploy your Next.js app, the Studio will be available at `https://yourdomain.com/studio`.

## Content Management

### Editing Content
1. Log in to the Studio at `/studio`
2. Select the document type you want to edit
3. Make your changes
4. Click "Publish" to make changes live
5. Changes appear on the website immediately (with ISR revalidation)

### Image Management
- All images are stored in Sanity's CDN
- Upload images directly in the Studio
- Images are automatically optimized
- Use the image URL builder in code: `urlFor(image).width(800).url()`

## GROQ Query Examples

### Fetch Hero Section
```groq
*[_type == "heroSection"][0]
```

### Fetch Global Settings
```groq
*[_type == "globalSettings"][0]
```

### Fetch SEO for a Page
```groq
*[_type == "seoMetadata" && page == "home"][0]
```

### Fetch All Services
```groq
*[_type == "service"] | order(order asc)
```

### Fetch Services with Images
```groq
*[_type == "service"] {
  _id,
  title,
  description,
  priority,
  features,
  "imageUrl": image.asset->url
} | order(order asc)
```

## Troubleshooting

### Studio Not Loading
- Check that environment variables are set correctly
- Ensure `NEXT_PUBLIC_SANITY_PROJECT_ID` is set
- Restart the dev server after adding env variables

### Content Not Appearing
- Verify the document is published (not draft)
- Check that the GROQ query matches the document type
- Ensure ISR revalidation time has passed (default: 1 hour)

### Image Issues
- Make sure images are uploaded to Sanity (not external URLs)
- Use the `urlFor()` helper function for image URLs
- Check image asset references in queries

## Security Notes

- The Studio is protected by Sanity's authentication
- Only authorized users can access `/studio`
- API tokens are only needed for write operations (not for reading)
- Public read access is enabled by default (safe for public content)

## Support

For more information:
- Sanity Documentation: https://www.sanity.io/docs
- Next.js + Sanity Guide: https://www.sanity.io/docs/js-client
- GROQ Query Language: https://www.sanity.io/docs/groq


