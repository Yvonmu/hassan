import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import { resolve } from 'path'

// Load environment variables
dotenv.config({ path: resolve(process.cwd(), '.env.local') })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'db1likqs'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

// Test with CDN disabled first
const clientNoCdn = createClient({
  projectId,
  dataset,
  useCdn: false, // Disable CDN
  apiVersion: '2024-01-01',
  requestTagPrefix: 'sanity',
  timeout: 10000,
})

// Test with CDN enabled
const clientCdn = createClient({
  projectId,
  dataset,
  useCdn: true, // Enable CDN
  apiVersion: '2024-01-01',
  requestTagPrefix: 'sanity',
  timeout: 10000,
})

async function testQueries() {
  console.log('🧪 Testing Sanity queries...\n')
  console.log(`Project: ${projectId}`)
  console.log(`Dataset: ${dataset}\n`)

  const queries = {
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
    globalSettings: `*[_type == "globalSettings"][0]`,
    diplomaticExcellence: `*[_type == "diplomaticExcellence"][0]`,
    jurisdictionSection: `*[_type == "jurisdictionSection"][0]`,
    consularExcellence: `*[_type == "consularExcellence"][0]`,
    socialFeedsSection: `*[_type == "socialFeedsSection"][0]`,
  }

  // Test with CDN disabled
  console.log('📡 Testing WITHOUT CDN (direct API)...\n')
  for (const [name, query] of Object.entries(queries)) {
    try {
      const result = await clientNoCdn.fetch(query)
      if (result) {
        console.log(`✅ ${name}: Found (no CDN)`)
        console.log(`   _id: ${result._id}`)
      } else {
        console.log(`❌ ${name}: Not found (no CDN)`)
      }
    } catch (error: any) {
      console.error(`❌ ${name}: Error (no CDN) - ${error.message}`)
    }
  }

  console.log('\n📡 Testing WITH CDN...\n')
  for (const [name, query] of Object.entries(queries)) {
    try {
      const result = await clientCdn.fetch(query)
      if (result) {
        console.log(`✅ ${name}: Found (CDN)`)
        console.log(`   _id: ${result._id}`)
      } else {
        console.log(`❌ ${name}: Not found (CDN)`)
      }
    } catch (error: any) {
      console.error(`❌ ${name}: Error (CDN) - ${error.message}`)
    }
  }

  // Test a simple query to see if ANY documents are returned
  console.log('\n🔍 Testing simple query to see if ANY documents are returned...\n')
  try {
    const allHeroSections = await clientNoCdn.fetch(`*[_type == "heroSection"]`)
    console.log(`Found ${allHeroSections?.length || 0} heroSection documents`)
    if (allHeroSections && allHeroSections.length > 0) {
      console.log('First document:', JSON.stringify(allHeroSections[0], null, 2))
    }
  } catch (error: any) {
    console.error(`Error: ${error.message}`)
  }
}

testQueries().catch(console.error)
