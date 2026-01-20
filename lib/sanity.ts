import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any

// Use read-only token if available (for documents with dots in IDs which are private)
// If no token, try public access (won't work for IDs with dots)
const readToken = process.env.NEXT_PUBLIC_SANITY_READ_TOKEN || process.env.SANITY_READ_TOKEN

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ik1g399m',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: true, // Use CDN for better reliability (can enable revalidation via webhooks)
  apiVersion: '2024-01-01', // Use current date (YYYY-MM-DD) to target the latest API version
  requestTagPrefix: 'sanity',
  timeout: 10000, // 10 second timeout
  // Use read-only token if available (required for document IDs with dots like "heroSection.home")
  // Document IDs with dots are treated as private in Sanity
  token: readToken, // Optional: only needed if using IDs with dots or dataset is private
})

// Set up the image URL builder (using named export)
const builder = createImageUrlBuilder(client)

// Helper function to generate image URLs
export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// GROQ query helpers
export const queries = {
  // Hero Section - fetch with image asset
  // Note: Without token, only published documents are returned by default
  heroSection: `*[_type == "heroSection"][0]{
    _id,
    title,
    subtitle,
    description,
    officialTitle,
    year,
    location,
    consulName,
    consulTitle,
    consulateFull,
    heroImage
  }`,
  
  // Global Settings
  globalSettings: `*[_type == "globalSettings"][0]`,
  
  // SEO Metadata
  seoMetadata: (page: string) => `*[_type == "seoMetadata" && page == "${page}"][0]`,
  
  // Services
  services: `*[_type == "service"] | order(order asc)`,
  service: (slug: string) => `*[_type == "service" && slug.current == "${slug}"][0]`,
  
  // Pages
  pages: `*[_type == "page"]`,
  page: (slug: string) => `*[_type == "page" && slug.current == "${slug}"][0]`,
  
  // Diplomatic Excellence
  diplomaticExcellence: `*[_type == "diplomaticExcellence"][0]`,
  
  // Jurisdiction Section
  jurisdictionSection: `*[_type == "jurisdictionSection"][0]`,
  
  // Natural Wonders
  naturalWonders: `*[_type == "naturalWonders"][0]{
    _id,
    wonders[]{
      title,
      location,
      description,
      rating,
      category,
      link,
      imageUrl,
      image
    }
  }`,
  
  // Natural Wonders Rwanda
  naturalWondersRwanda: `*[_type == "naturalWondersRwanda"][0]{
    _id,
    wonders[]{
      title,
      location,
      description,
      rating,
      category,
      link,
      imageUrl,
      image
    }
  }`,
  
  // Stay Connected
  stayConnected: `*[_type == "stayConnected"][0]{
    _id,
    title,
    description,
    content[]{
      title,
      description,
      type,
      date,
      location,
      buttonLink,
      link,
      imageUrl,
      image
    }
  }`,
  
  // Social Feeds Section
  socialFeedsSection: `*[_type == "socialFeedsSection"][0]`,
  
  // Consular Excellence
  consularExcellence: `*[_type == "consularExcellence"][0]`,
  
  // Header Settings
  headerSettings: `*[_type == "headerSettings"][0]`,
}


