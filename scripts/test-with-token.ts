import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import { resolve } from 'path'

// Load environment variables
dotenv.config({ path: resolve(process.cwd(), '.env.local') })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'db1likqs'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const readToken = process.env.NEXT_PUBLIC_SANITY_READ_TOKEN || process.env.SANITY_READ_TOKEN

if (!readToken) {
  console.error('❌ NEXT_PUBLIC_SANITY_READ_TOKEN not found in .env.local')
  console.log('\n💡 Add it to .env.local:')
  console.log('   NEXT_PUBLIC_SANITY_READ_TOKEN=sk_your_token_here')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  useCdn: true,
  apiVersion: '2024-01-01',
  token: readToken,
})

async function testWithToken() {
  console.log('🧪 Testing Sanity queries WITH read-only token...\n')
  console.log(`Project: ${projectId}`)
  console.log(`Dataset: ${dataset}`)
  console.log(`Token: ${readToken!.substring(0, 10)}...${readToken!.substring(readToken!.length - 4)}\n`)

  const queries = {
    heroSection: `*[_type == "heroSection"][0]{
      _id,
      title,
      subtitle,
      description
    }`,
    globalSettings: `*[_type == "globalSettings"][0]{ _id, siteName }`,
    diplomaticExcellence: `*[_type == "diplomaticExcellence"][0]{ _id, title }`,
    jurisdictionSection: `*[_type == "jurisdictionSection"][0]{ _id, title }`,
    consularExcellence: `*[_type == "consularExcellence"][0]{ _id }`,
    socialFeedsSection: `*[_type == "socialFeedsSection"][0]{ _id, title }`,
  }

  let successCount = 0
  let failCount = 0

  for (const [name, query] of Object.entries(queries)) {
    try {
      const result = await client.fetch(query)
      if (result) {
        console.log(`✅ ${name}: Found`)
        console.log(`   _id: ${result._id}`)
        if (result.title) console.log(`   title: ${result.title}`)
        successCount++
      } else {
        console.log(`❌ ${name}: Not found (null)`)
        failCount++
      }
    } catch (error: any) {
      console.error(`❌ ${name}: Error - ${error.message}`)
      failCount++
    }
    console.log('')
  }

  console.log('📊 Summary:')
  console.log(`   ✅ Success: ${successCount}`)
  console.log(`   ❌ Failed: ${failCount}`)
  
  if (successCount > 0) {
    console.log('\n🎉 Token is working! Data should now be accessible on your website.')
    console.log('\n🔄 Next steps:')
    console.log('   1. Restart your dev server: npm run dev')
    console.log('   2. Visit: http://localhost:3000/test-sanity')
    console.log('   3. Data should show as ✅ Found')
  } else {
    console.log('\n⚠️  Token might be invalid or have wrong permissions.')
    console.log('   Check: https://sanity.io/manage → API → Tokens')
    console.log('   Token should have "Viewer" permissions')
  }
}

testWithToken().catch(console.error)
