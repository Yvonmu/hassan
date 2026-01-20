import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import { resolve } from 'path'

// Load environment variables
dotenv.config({ path: resolve(process.cwd(), '.env.local') })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'db1likqs'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

// Test with NO token (public access)
const client = createClient({
  projectId,
  dataset,
  useCdn: false,
  apiVersion: '2024-01-01',
})

async function testSimpleQueries() {
  console.log('🧪 Testing simple queries WITHOUT token (public access)...\n')
  console.log(`Project: ${projectId}`)
  console.log(`Dataset: ${dataset}\n`)

  // Test 1: Get ALL documents
  try {
    console.log('📋 Test 1: Get ALL documents...')
    const allDocs = await client.fetch(`*[]{ _id, _type }`)
    console.log(`Found ${allDocs?.length || 0} total documents`)
    if (allDocs && allDocs.length > 0) {
      console.log('First 5 documents:')
      allDocs.slice(0, 5).forEach((doc: any) => {
        console.log(`  - ${doc._id} (${doc._type})`)
      })
    }
  } catch (error: any) {
    console.error(`❌ Error: ${error.message}`)
  }

  console.log('')

  // Test 2: Get by specific ID
  try {
    console.log('📋 Test 2: Get by specific ID...')
    const doc = await client.fetch(`*[_id == "heroSection.home"][0]{ _id, _type, title }`)
    if (doc) {
      console.log(`✅ Found: ${doc._id}`)
      console.log(`   Title: ${doc.title || 'N/A'}`)
    } else {
      console.log('❌ Not found')
    }
  } catch (error: any) {
    console.error(`❌ Error: ${error.message}`)
  }

  console.log('')

  // Test 3: Get by type
  try {
    console.log('📋 Test 3: Get by type...')
    const docs = await client.fetch(`*[_type == "heroSection"]{ _id, _type, title }`)
    console.log(`Found ${docs?.length || 0} heroSection documents`)
    if (docs && docs.length > 0) {
      docs.forEach((doc: any) => {
        console.log(`  - ${doc._id}: ${doc.title || 'N/A'}`)
      })
    }
  } catch (error: any) {
    console.error(`❌ Error: ${error.message}`)
  }

  console.log('')

  // Test 4: Try with CDN
  console.log('📋 Test 4: Try with CDN enabled...')
  const clientCdn = createClient({
    projectId,
    dataset,
    useCdn: true,
    apiVersion: '2024-01-01',
  })
  
  try {
    const doc = await clientCdn.fetch(`*[_id == "heroSection.home"][0]{ _id, _type, title }`)
    if (doc) {
      console.log(`✅ Found with CDN: ${doc._id}`)
    } else {
      console.log('❌ Not found with CDN')
    }
  } catch (error: any) {
    console.error(`❌ Error with CDN: ${error.message}`)
  }
}

testSimpleQueries().catch(console.error)
