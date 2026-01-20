/**
 * Check what documents exist in Sanity
 * Run with: npx tsx scripts/check-sanity-data.ts
 */

import { readFileSync } from 'fs'
import { resolve } from 'path'
import { createClient } from '@sanity/client'

// Load environment variables
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
  // .env.local might not exist
}

const token = process.env.SANITY_API_TOKEN
if (!token) {
  console.error('❌ Missing SANITY_API_TOKEN')
  process.exit(1)
}

const client = createClient({
  projectId: 'db1likqs',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token,
})

async function checkData() {
  console.log('🔍 Checking Sanity documents...\n')

  // Check Hero Section
  const heroPublished = await client.fetch('*[_type == "heroSection" && !(_id in path("drafts.**"))][0]{_id, title}')
  const heroDraft = await client.fetch('*[_type == "heroSection" && _id match "drafts.*"][0]{_id, title}')
  const heroAll = await client.fetch('*[_type == "heroSection"]{_id, title}')
  
  console.log('📋 Hero Section:')
  console.log('  Published:', heroPublished ? JSON.stringify(heroPublished) : '❌ Not found')
  console.log('  Draft:', heroDraft ? JSON.stringify(heroDraft) : '✅ No draft')
  console.log('  All:', heroAll.length, 'documents')
  if (heroAll.length > 0) {
    heroAll.forEach((doc: any) => console.log('    -', doc._id, doc.title || ''))
  }

  // Check Global Settings
  const globalPublished = await client.fetch('*[_type == "globalSettings" && !(_id in path("drafts.**"))][0]{_id}')
  const globalDraft = await client.fetch('*[_type == "globalSettings" && _id match "drafts.*"][0]{_id}')
  const globalAll = await client.fetch('*[_type == "globalSettings"]{_id}')
  
  console.log('\n📋 Global Settings:')
  console.log('  Published:', globalPublished ? JSON.stringify(globalPublished) : '❌ Not found')
  console.log('  Draft:', globalDraft ? JSON.stringify(globalDraft) : '✅ No draft')
  console.log('  All:', globalAll.length, 'documents')
  if (globalAll.length > 0) {
    globalAll.forEach((doc: any) => console.log('    -', doc._id))
  }

  // Check all document types
  console.log('\n📋 All Document Types:')
  const allTypes = await client.fetch('*[_type match "heroSection|globalSettings|seoMetadata|service|headerSettings|consularExcellence|socialFeedsSection"]{_type, _id}')
  const grouped = allTypes.reduce((acc: any, doc: any) => {
    if (!acc[doc._type]) acc[doc._type] = []
    acc[doc._type].push(doc._id)
    return acc
  }, {})
  
  Object.entries(grouped).forEach(([type, ids]: [string, any]) => {
    console.log(`  ${type}: ${ids.length} document(s)`)
    ids.forEach((id: string) => {
      const isDraft = id.startsWith('drafts.')
      console.log(`    ${isDraft ? '⚠️ DRAFT' : '✅ Published'}: ${id}`)
    })
  })

  console.log('\n💡 If you see drafts, you need to publish them in Sanity Studio')
  console.log('   Visit: http://localhost:3000/studio')
}

checkData().catch(console.error)
