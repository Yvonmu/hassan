# Djibouti Consulate Website

Official website for the Honorary Consulate of Djibouti in Rwanda, built with Next.js 15 and Sanity CMS.

## Features

- 🎨 Modern, responsive design
- 🌍 Multi-language support (English/French)
- 📱 Mobile-first approach
- 🖼️ Image optimization with Sanity CDN
- 🔍 SEO-friendly with editable metadata
- 📝 Content management via Sanity Studio
- ⚡ Fast performance with ISR (Incremental Static Regeneration)

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **CMS**: Sanity
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- A Sanity account (for CMS)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd hassan
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp env.template .env.local
```

4. Configure Sanity (see [SANITY_SETUP.md](./SANITY_SETUP.md)):
   - Create a Sanity project at https://www.sanity.io/manage
   - Add your Project ID and Dataset to `.env.local`

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) to view the website

7. Access the CMS admin panel at [http://localhost:3000/studio](http://localhost:3000/studio)

## CMS Setup

The website uses Sanity CMS for content management. Non-technical users can edit content without touching code.

### Quick Start

1. **Set up Sanity** (see [SANITY_SETUP.md](./SANITY_SETUP.md) for detailed instructions)
2. **Access the Studio**: Visit `/studio` route
3. **Create content**: Add Hero Section, Global Settings, SEO Metadata, and Services
4. **Publish**: Changes appear on the website immediately

### Available Content Types

- **Hero Section**: Main hero content and images
- **Global Settings**: Site-wide settings (contact info, footer, social media)
- **SEO Metadata**: Editable SEO for each page
- **Services**: Consular services with priorities and features
- **Pages**: Custom page content

### Documentation

- [SANITY_SETUP.md](./SANITY_SETUP.md) - Complete setup guide
- [GROQ_QUERIES.md](./GROQ_QUERIES.md) - Query examples and patterns

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── page.tsx           # Home page
│   ├── layout.tsx         # Root layout
│   └── studio/            # Sanity Studio route
├── components/            # React components
│   ├── header.tsx        # Site header
│   ├── footer.tsx        # Site footer
│   └── ...
├── lib/                   # Utilities
│   ├── sanity.ts         # Sanity client
│   ├── sanity.server.ts  # Server-side queries
│   └── translations.ts   # Translation data
├── sanity/                # Sanity configuration
│   └── schemas/          # Content schemas
└── public/                # Static assets
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run studio` - Start Sanity Studio (port 3333)

## Content Management

### Editing Content

1. Log in to `/studio`
2. Select a content type
3. Edit fields
4. Click "Publish" to make changes live

### Image Management

- Upload images directly in Sanity Studio
- Images are automatically optimized
- Use the `urlFor()` helper in code for image URLs

### SEO Management

- Edit SEO metadata for each page in Sanity
- Update titles, descriptions, keywords, and Open Graph images
- Changes reflect in search results after revalidation

## Deployment

### Environment Variables

Make sure to set these in your deployment platform:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

### Vercel Deployment

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

The CMS Studio will be available at `https://yourdomain.com/studio`

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Next.js + Sanity Guide](https://www.sanity.io/docs/js-client)

## Support

For CMS setup help, see [SANITY_SETUP.md](./SANITY_SETUP.md)
For query examples, see [GROQ_QUERIES.md](./GROQ_QUERIES.md)
