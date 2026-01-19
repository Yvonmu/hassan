# Sanity CMS Setup Checklist

Use this checklist to ensure everything is set up correctly.

## Initial Setup

- [ ] Create Sanity account at https://www.sanity.io
- [ ] Create new Sanity project
- [ ] Note Project ID from project settings
- [ ] Note Dataset name (usually "production")
- [ ] Create `.env.local` file from `env.template`
- [ ] Add `NEXT_PUBLIC_SANITY_PROJECT_ID` to `.env.local`
- [ ] Add `NEXT_PUBLIC_SANITY_DATASET` to `.env.local`
- [ ] Restart development server after adding env variables

## Sanity Studio Setup

- [ ] Run `npm run studio`
- [ ] Access Studio at `http://localhost:3333`
- [ ] Create Sanity account/login
- [ ] Verify email address
- [ ] Successfully log in to Studio

## Create Initial Content

### Hero Section
- [ ] Create "Hero Section" document
- [ ] Add title (e.g., "Hassan Adan Hassan")
- [ ] Add subtitle (e.g., "Diplomatic Representative")
- [ ] Add description
- [ ] Upload hero image
- [ ] Add consul information
- [ ] Publish document

### Global Settings
- [ ] Create "Global Settings" document
- [ ] Add site name
- [ ] Add contact information (phone, email, address)
- [ ] Add office hours
- [ ] Add footer content
- [ ] Add social media links
- [ ] Publish document

### SEO Metadata
- [ ] Create "SEO Metadata" for home page
- [ ] Set page field to "home"
- [ ] Add page title
- [ ] Add meta description
- [ ] Add keywords
- [ ] Upload Open Graph image
- [ ] Add OG title and description
- [ ] Add canonical URL
- [ ] Publish document

### Services (Optional)
- [ ] Create "Emergency Assistance" service
- [ ] Create "Document Services" service
- [ ] Create "Community Support" service
- [ ] Create "Business Development" service
- [ ] Set priorities for each service
- [ ] Add features to each service
- [ ] Publish all services

## Testing

- [ ] Verify website loads at `http://localhost:3000`
- [ ] Check that SEO metadata appears in page source
- [ ] Verify Studio accessible at `http://localhost:3000/studio`
- [ ] Test editing content in Studio
- [ ] Verify changes appear on website after publishing
- [ ] Test image uploads in Studio
- [ ] Verify images display correctly on website

## Production Deployment

- [ ] Add environment variables to hosting platform
- [ ] Deploy Next.js application
- [ ] Verify Studio accessible at production URL (`/studio`)
- [ ] Test content editing in production Studio
- [ ] Verify content changes appear on live site
- [ ] Set up user access/permissions in Sanity

## Optional: Component Migration

- [ ] Review `components/example-sanity-hero.tsx` for reference
- [ ] Update `components/hero-section.tsx` to use Sanity data
- [ ] Update `components/footer.tsx` to use Sanity data
- [ ] Update `components/header.tsx` to use Sanity data
- [ ] Update `components/consular-excellence.tsx` to use Sanity services
- [ ] Test all updated components
- [ ] Verify fallbacks work when Sanity data is missing

## Documentation Review

- [ ] Read `SANITY_SETUP.md` for detailed instructions
- [ ] Review `GROQ_QUERIES.md` for query examples
- [ ] Check `CMS_QUICK_START.md` for quick reference
- [ ] Review `IMPLEMENTATION_SUMMARY.md` for overview

## Troubleshooting

If something doesn't work:

- [ ] Check `.env.local` has correct values
- [ ] Verify environment variables are loaded (restart server)
- [ ] Check browser console for errors
- [ ] Verify documents are published (not drafts)
- [ ] Check Sanity project settings
- [ ] Review Sanity logs in Studio
- [ ] Verify network connectivity

## Completion

Once all items are checked:
- ✅ CMS is fully set up and ready to use
- ✅ Content editors can log in and edit content
- ✅ Changes publish instantly without code changes
- ✅ SEO is fully manageable from CMS

---

**Need Help?**
- See `SANITY_SETUP.md` for detailed setup
- See `GROQ_QUERIES.md` for query help
- Check Sanity docs: https://www.sanity.io/docs


