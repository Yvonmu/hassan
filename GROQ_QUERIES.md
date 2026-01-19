# GROQ Query Examples

This document contains sample GROQ queries for fetching content from Sanity CMS.

## Basic Queries

### Fetch Single Document by Type
```groq
*[_type == "heroSection"][0]
```

### Fetch All Documents of a Type
```groq
*[_type == "service"]
```

### Fetch with Ordering
```groq
*[_type == "service"] | order(order asc)
```

## Hero Section Queries

### Complete Hero Section
```groq
*[_type == "heroSection"][0] {
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
  "heroImageUrl": heroImage.asset->url,
  "heroImageAlt": heroImage.alt
}
```

## Global Settings Queries

### Complete Global Settings
```groq
*[_type == "globalSettings"][0] {
  _id,
  siteName,
  contactInfo {
    phone,
    email,
    address,
    officeHours
  },
  footer {
    brandDescription,
    quickLinks[] {
      name,
      href
    },
    services,
    copyright
  },
  socialMedia {
    twitter,
    linkedin,
    facebook
  }
}
```

## SEO Metadata Queries

### SEO for Specific Page
```groq
*[_type == "seoMetadata" && page == "home"][0] {
  _id,
  page,
  title,
  description,
  keywords,
  "ogImageUrl": ogImage.asset->url,
  ogTitle,
  ogDescription,
  canonicalUrl
}
```

### All SEO Metadata
```groq
*[_type == "seoMetadata"] {
  page,
  title,
  description
}
```

## Service Queries

### All Services with Images
```groq
*[_type == "service"] {
  _id,
  title,
  description,
  priority,
  features,
  icon,
  order,
  "imageUrl": image.asset->url,
  "imageAlt": image.alt
} | order(order asc)
```

### Single Service by Title
```groq
*[_type == "service" && title == "Emergency Assistance"][0] {
  _id,
  title,
  description,
  priority,
  features,
  "imageUrl": image.asset->url
}
```

### Services by Priority
```groq
*[_type == "service" && priority == "critical"] {
  _id,
  title,
  description,
  features
} | order(order asc)
```

## Page Queries

### All Pages
```groq
*[_type == "page"] {
  _id,
  title,
  "slug": slug.current,
  content
}
```

### Page by Slug
```groq
*[_type == "page" && slug.current == "about"][0] {
  _id,
  title,
  "slug": slug.current,
  content,
  sections[] {
    title,
    content,
    "imageUrl": image.asset->url
  }
}
```

## Advanced Queries

### Fetch Multiple Types
```groq
{
  "hero": *[_type == "heroSection"][0],
  "settings": *[_type == "globalSettings"][0],
  "seo": *[_type == "seoMetadata" && page == "home"][0]
}
```

### Fetch with Projections (Select Specific Fields)
```groq
*[_type == "service"] {
  title,
  description,
  priority
}
```

### Fetch with Filters
```groq
*[_type == "service" && priority in ["critical", "high"]] {
  title,
  description,
  priority
} | order(order asc)
```

### Fetch with Date Filtering (if you add dates)
```groq
*[_type == "service" && _createdAt > "2024-01-01T00:00:00Z"] {
  title,
  _createdAt
}
```

## Image URL Building

In your code, use the `urlFor()` helper:

```typescript
import { urlFor } from '@/lib/sanity'

// Basic URL
const imageUrl = urlFor(image).url()

// With dimensions
const thumbnail = urlFor(image).width(300).height(200).url()

// With quality
const highQuality = urlFor(image).width(1200).quality(90).url()

// With format
const webp = urlFor(image).width(800).format('webp').url()
```

## Using Queries in Server Components

```typescript
import { client, queries } from '@/lib/sanity'

export default async function Page() {
  const hero = await client.fetch(queries.heroSection, {}, {
    next: { revalidate: 3600 } // ISR: revalidate every hour
  })
  
  return <div>{hero.title}</div>
}
```

## Using Queries in Client Components

```typescript
'use client'
import { useEffect, useState } from 'react'
import { client } from '@/lib/sanity'

export default function Component() {
  const [data, setData] = useState(null)
  
  useEffect(() => {
    client.fetch('*[_type == "heroSection"][0]')
      .then(setData)
  }, [])
  
  return data ? <div>{data.title}</div> : <div>Loading...</div>
}
```

## Query Performance Tips

1. **Use projections** - Only fetch fields you need
2. **Use indexes** - Add indexes for frequently filtered fields
3. **Use ISR** - Cache queries in Next.js with `next: { revalidate }`
4. **Limit results** - Use `[0..10]` to limit array results
5. **Use references** - Use `->` to dereference references efficiently

## Common Patterns

### Fetch with References
```groq
*[_type == "page"] {
  title,
  "author": author->name,
  "category": category->title
}
```

### Count Documents
```groq
count(*[_type == "service"])
```

### Fetch Latest
```groq
*[_type == "service"] | order(_createdAt desc) [0..4]
```


