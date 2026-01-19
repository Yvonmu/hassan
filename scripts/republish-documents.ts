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

async function republishDocuments() {
  console.log('🔄 Republishing all documents to ensure they are publicly accessible...\n')

  const documentIds = [
    'heroSection.home',
    'globalSettings.main',
    'seoMetadata.home',
    'diplomaticExcellence.main',
    'jurisdictionSection.main',
    'consularExcellence.main',
    'socialFeedsSection.main',
    'naturalWonders.main',
    'naturalWondersRwanda.main',
    'stayConnected.main',
    'headerSettings.main',
    'service.emergency-assistance',
    'service.document-services',
    'service.community-support',
    'service.business-development',
  ]

  for (const docId of documentIds) {
    try {
      // Check if document exists
      const doc = await client.fetch(`*[_id == "${docId}"][0]`)
      
      if (doc) {
        // Check if it's a draft
        if (docId.startsWith('drafts.')) {
          console.log(`⚠️  ${docId} is a draft, skipping...`)
          continue
        }
        
        // Republish by patching with current data (this ensures it's published)
        await client.patch(docId).set({}).commit()
        console.log(`✅ Republished: ${docId}`)
      } else {
        console.log(`❌ Not found: ${docId}`)
      }
    } catch (error: any) {
      console.error(`❌ Error republishing ${docId}:`, error.message)
    }
  }

  console.log('\n✅ Republishing complete!')
  console.log('\n💡 Now test the queries again.')
}

republishDocuments().catch(console.error)
