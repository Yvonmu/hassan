import { client, queries } from './sanity'
import type {
  HeroSection,
  GlobalSettings,
  SEOMetadata,
  DiplomaticExcellence,
  JurisdictionSection,
  NaturalWonders,
  NaturalWondersRwanda,
  StayConnected,
  SocialFeedsSection,
  ConsularExcellence,
  HeaderSettings,
} from './sanity.types'

// Helper function to fetch with retry logic
async function fetchWithRetry<T>(
  query: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: Record<string, any> = {},
  options: { revalidate: number; tags: string[] },
  maxRetries = 2
): Promise<T | null> {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const data = await client.fetch<T>(query, params, {
        next: options,
      })
      return data
    } catch (error: unknown) {
      const err = error as { isNetworkError?: boolean; code?: string; message?: string }
      const isNetworkError = err.isNetworkError || 
                            err.code === 'ECONNRESET' || 
                            err.code === 'UNKNOWN_CERTIFICATE_VERIFICATION_ERROR'
      
      if (isNetworkError && attempt < maxRetries) {
        const delay = 1000 * (attempt + 1) // Exponential backoff: 1s, 2s
        console.log(`Retrying fetch (attempt ${attempt + 1}/${maxRetries}) after ${delay}ms...`)
        await new Promise(resolve => setTimeout(resolve, delay))
        continue
      }
      
      console.error(`Error fetching (attempt ${attempt + 1}):`, err.message || String(error))
      return null
    }
  }
  return null
}

// Server-side data fetching functions with retry logic and caching
export async function getHeroSection(): Promise<HeroSection | null> {
  return fetchWithRetry<HeroSection>(
    queries.heroSection,
    {},
    { revalidate: 60, tags: ['heroSection'] }
  )
}

export async function getGlobalSettings(): Promise<GlobalSettings | null> {
  return fetchWithRetry<GlobalSettings>(
    queries.globalSettings,
    {},
    { revalidate: 60, tags: ['globalSettings'] }
  )
}

export async function getSEOMetadata(page: string = 'home'): Promise<SEOMetadata | null> {
  return fetchWithRetry<SEOMetadata>(
    queries.seoMetadata(page),
    {},
    { revalidate: 60, tags: ['seoMetadata'] }
  )
}

export async function getServices() {
  return fetchWithRetry(
    queries.services,
    {},
    { revalidate: 60, tags: ['service'] }
  )
}

export async function getDiplomaticExcellence(): Promise<DiplomaticExcellence | null> {
  return fetchWithRetry<DiplomaticExcellence>(
    queries.diplomaticExcellence,
    {},
    { revalidate: 60, tags: ['diplomaticExcellence'] }
  )
}

export async function getJurisdictionSection(): Promise<JurisdictionSection | null> {
  return fetchWithRetry<JurisdictionSection>(
    queries.jurisdictionSection,
    {},
    { revalidate: 60, tags: ['jurisdictionSection'] }
  )
}

export async function getNaturalWonders(): Promise<NaturalWonders | null> {
  return fetchWithRetry<NaturalWonders>(
    queries.naturalWonders,
    {},
    { revalidate: 60, tags: ['naturalWonders'] }
  )
}

export async function getNaturalWondersRwanda(): Promise<NaturalWondersRwanda | null> {
  return fetchWithRetry<NaturalWondersRwanda>(
    queries.naturalWondersRwanda,
    {},
    { revalidate: 60, tags: ['naturalWondersRwanda'] }
  )
}

export async function getStayConnected(): Promise<StayConnected | null> {
  return fetchWithRetry<StayConnected>(
    queries.stayConnected,
    {},
    { revalidate: 60, tags: ['stayConnected'] }
  )
}

export async function getSocialFeedsSection(): Promise<SocialFeedsSection | null> {
  return fetchWithRetry<SocialFeedsSection>(
    queries.socialFeedsSection,
    {},
    { revalidate: 60, tags: ['socialFeedsSection'] }
  )
}

export async function getConsularExcellence(): Promise<ConsularExcellence | null> {
  return fetchWithRetry<ConsularExcellence>(
    queries.consularExcellence,
    {},
    { revalidate: 60, tags: ['consularExcellence'] }
  )
}

export async function getHeaderSettings(): Promise<HeaderSettings | null> {
  return fetchWithRetry<HeaderSettings>(
    queries.headerSettings,
    {},
    { revalidate: 60, tags: ['headerSettings'] }
  )
}
