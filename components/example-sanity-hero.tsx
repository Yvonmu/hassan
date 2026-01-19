/**
 * Example Component: Hero Section with Sanity CMS
 * 
 * This is an example of how to fetch and display content from Sanity CMS.
 * You can use this as a reference when updating other components.
 */

import { getHeroSection } from '@/lib/sanity.server'
import { urlFor } from '@/lib/sanity'
import Image from 'next/image'

export default async function ExampleSanityHero() {
  // Fetch data from Sanity (server component)
  const heroData = await getHeroSection()

  // If no data, return null or fallback
  if (!heroData) {
    return null
  }

  // Build image URL using Sanity's image URL builder
  const heroImageUrl = heroData.heroImage 
    ? urlFor(heroData.heroImage).width(600).height(400).url()
    : '/images/hassan.png'

  return (
    <section className="relative min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content from Sanity */}
          <div className="space-y-6">
            <h1 className="text-5xl lg:text-6xl font-bold">
              {heroData.title || 'Hassan Adan Hassan'}
              <br />
              <span className="text-rwanda-blue">
                {heroData.subtitle || 'Diplomatic Representative'}
              </span>
            </h1>
            <p className="text-xl text-foreground/90">
              {heroData.description || 'Default description'}
            </p>
            
            <div className="flex gap-4">
              <div>
                <h2 className="text-3xl font-bold">{heroData.officialTitle || 'Official'}</h2>
                <p>Diplomatic Status</p>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-[#E8B364]">
                  {heroData.location || 'Kigali'}
                </h2>
                <p>Consulate Location</p>
              </div>
              <div>
                <h2 className="text-3xl font-bold">{heroData.year || '2024'}</h2>
                <p>Appointed Since</p>
              </div>
            </div>
          </div>

          {/* Image from Sanity */}
          <div>
            <Image
              src={heroImageUrl}
              alt={heroData.heroImage?.alt || heroData.consulName || 'Hassan Adan Hassan'}
              width={600}
              height={400}
              className="rounded-lg"
              priority
            />
            <div className="mt-4 text-center">
              <h3 className="text-2xl font-bold">{heroData.consulName || 'Hassan Adan Hassan'}</h3>
              <p className="text-muted-foreground">{heroData.consulTitle || 'Honorary Consul'}</p>
              <p className="text-sm">{heroData.consulateFull || 'Republic of Djibouti in Rwanda'}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


