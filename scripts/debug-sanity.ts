import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import { resolve } from 'path'

// Load environment variables
dotenv.config({ path: resolve(process.cwd(), '.env.local') })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'db1likqs'
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

async function debug() {
  console.log(`🔍 Debugging Sanity dataset...\n`)
  console.log(`Project: ${projectId}`)
  console.log(`Dataset: ${dataset}\n`)

  try {
    // Get ALL documents
    const allDocs = await client.fetch(`*[]{ _id, _type }`)
    console.log(`📊 Total documents in dataset: ${allDocs?.length || 0}\n`)

    if (allDocs && allDocs.length > 0) {
      console.log('📋 All documents:')
      allDocs.forEach((doc: any) => {
        const isDraft = doc._id.startsWith('drafts.')
        console.log(`   ${isDraft ? '⚠️  DRAFT' : '✅ PUBLISHED'}: ${doc._id} (${doc._type})`)
      })
    } else {
      console.log('❌ No documents found in dataset!')
      console.log('\n💡 Possible issues:')
      console.log('   - Documents were created in a different dataset')
      console.log('   - Documents were created in a different project')
      console.log('   - API token doesn\'t have read permissions')
    }

    // Try to fetch a specific document
    console.log('\n🔍 Testing specific document fetch...')
    const heroDoc = await client.fetch(`*[_type == "heroSection"][0]{ _id, _type, title }`)
    if (heroDoc) {
      console.log('✅ Found heroSection:', heroDoc)
    } else {
      console.log('❌ heroSection not found')
    }

  } catch (error: any) {
    console.error('❌ Error:', error.message)
    console.error(error)
  }
}

debug().catch(console.error)
