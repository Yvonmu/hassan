import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import { resolve } from 'path'

// Load environment variables
dotenv.config({ path: resolve(process.cwd(), '.env.local') })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ik1g399m'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN

if (!token) {
  console.error('❌ SANITY_API_TOKEN not found')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  useCdn: false,
  apiVersion: '2024-01-01',
  token,
})

async function checkDocumentStatus() {
  console.log('🔍 Checking document status...\n')
  console.log(`Project: ${projectId}`)
  console.log(`Dataset: ${dataset}\n`)

  const documentIds = [
    'heroSection.home',
    'globalSettings.main',
    'diplomaticExcellence.main',
    'jurisdictionSection.main',
    'consularExcellence.main',
    'socialFeedsSection.main',
  ]

  for (const docId of documentIds) {
    try {
      // Check published version
      const published = await client.fetch(`*[_id == "${docId}"][0]{ _id, _type, _rev }`)
      
      // Check draft version
      const draft = await client.fetch(`*[_id == "drafts.${docId}"][0]{ _id, _type, _rev }`)
      
      if (published) {
        console.log(`✅ ${docId}: Published`)
        console.log(`   _id: ${published._id}`)
        console.log(`   _type: ${published._type}`)
      } else if (draft) {
        console.log(`⚠️  ${docId}: EXISTS AS DRAFT ONLY (not published!)`)
        console.log(`   _id: ${draft._id}`)
        console.log(`   _type: ${draft._type}`)
        console.log(`   💡 Need to publish this document!`)
      } else {
        console.log(`❌ ${docId}: Not found`)
      }
    } catch (error: any) {
      console.error(`❌ ${docId}: Error - ${error.message}`)
    }
    console.log('')
  }

  // Check all heroSection documents
  console.log('\n📋 All heroSection documents (including drafts):')
  const allHero = await client.fetch(`*[_type == "heroSection"]{ _id, _type }`)
  allHero.forEach((doc: any) => {
    const isDraft = doc._id.startsWith('drafts.')
    console.log(`   ${isDraft ? '⚠️  DRAFT' : '✅ PUBLISHED'}: ${doc._id}`)
  })
}

checkDocumentStatus().catch(console.error)
