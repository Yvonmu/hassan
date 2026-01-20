import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
import { resolve } from 'path'

// Load environment variables from .env.local manually
try {
  const envFile = readFileSync(resolve(process.cwd(), '.env.local'), 'utf-8')
  envFile.split('\n').forEach(line => {
    const match = line.match(/^([^#=]+)=(.*)$/)
    if (match) {
      const key = match[1].trim()
      const value = match[2].trim()
      if (!process.env[key]) {
        process.env[key] = value
      }
    }
  })
} catch (error) {
  // .env.local might not exist, that's okay
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ik1g399m'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN

if (!token) {
  console.error('❌ SANITY_API_TOKEN not found in .env.local')
  console.log('💡 Get your token from: https://sanity.io/manage')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  useCdn: false,
  apiVersion: '2024-01-01',
  token,
})

async function checkDocuments() {
  console.log('🔍 Checking all documents in Sanity...\n')
  console.log(`Project: ${projectId}`)
  console.log(`Dataset: ${dataset}\n`)

  const types = [
    'heroSection',
    'globalSettings',
    'seoMetadata',
    'service',
    'diplomaticExcellence',
    'jurisdictionSection',
    'naturalWonders',
    'naturalWondersRwanda',
    'stayConnected',
    'socialFeedsSection',
    'consularExcellence',
    'headerSettings',
  ]

  for (const type of types) {
    try {
      // Check published documents (exclude drafts explicitly)
      const published = await client.fetch(
        `*[_type == "${type}" && !(_id in path("drafts.**"))]{ _id, _type, _rev }`,
        {},
        { filterResponse: false }
      )

      // Check draft documents
      const drafts = await client.fetch(
        `*[_type == "${type}" && _id in path("drafts.**")]{ _id, _type, _rev }`,
        {},
        { filterResponse: false }
      )

      const publishedResult = published.result || []
      const draftsResult = drafts.result || []
      const publishedCount = publishedResult.length
      const draftCount = draftsResult.length

      if (publishedCount > 0) {
        console.log(`✅ ${type}: ${publishedCount} published document(s)`)
        publishedResult.forEach((doc: any) => {
          console.log(`   - ${doc._id}`)
        })
      } else if (draftCount > 0) {
        console.log(`⚠️  ${type}: ${draftCount} draft document(s) (NOT PUBLISHED!)`)
        draftsResult.forEach((doc: any) => {
          console.log(`   - ${doc._id}`)
        })
      } else {
        console.log(`❌ ${type}: No documents found`)
      }
    } catch (error: any) {
      console.error(`❌ ${type}: Error - ${error.message}`)
    }
  }

  console.log('\n📊 Summary:')
  console.log('✅ = Published (visible on website)')
  console.log('⚠️  = Draft (NOT visible - needs publishing)')
  console.log('❌ = Not found (needs to be created)')
}

checkDocuments().catch(console.error)
