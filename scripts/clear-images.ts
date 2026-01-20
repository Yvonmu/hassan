import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import { resolve } from 'path'

dotenv.config({ path: resolve(process.cwd(), '.env.local') })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'db1likqs'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN

if (!token) {
  console.error('❌ SANITY_API_TOKEN not found in .env.local')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  useCdn: false,
  apiVersion: '2024-01-01',
  token,
})

async function clearAllImages() {
  console.log('🧹 Clearing all image fields to prevent malformed references...\n')

  const documents = [
    'heroSection.home',
    'globalSettings.main',
    'diplomaticExcellence.main',
    'naturalWonders.main',
    'naturalWondersRwanda.main',
    'stayConnected.main'
  ]

  for (const docId of documents) {
    try {
      const doc = await client.fetch(`*[_id == "${docId}"][0]`)
      if (!doc) {
        console.log(`⚠️  Document ${docId} not found`)
        continue
      }

      // Clear common image fields
      const imagesToClear = [
        'image',
        'heroImage', 
        'backgroundImage',
        'profileImage',
        'avatar',
        'photo',
        'banner',
        'thumbnail'
      ]

      let hasImages = false
      const patch = client.patch(docId)

      for (const field of imagesToClear) {
        if (doc[field]) {
          patch.unset([field])
          hasImages = true
        }
      }

      // Also clear images in arrays
      if (doc.wonders && Array.isArray(doc.wonders)) {
        doc.wonders.forEach((wonder: any, index: number) => {
          if (wonder.image) {
            patch.unset([`wonders[${index}].image`])
            hasImages = true
          }
        })
      }

      if (hasImages) {
        await patch.commit()
        console.log(`✅ Cleared image fields in ${docId}`)
      } else {
        console.log(`✅ No image fields found in ${docId}`)
      }

    } catch (error: any) {
      console.error(`❌ Error processing ${docId}: ${error.message}`)
    }
  }

  console.log('\n✅ Image cleanup complete!')
  console.log('\n🔄 Clear your browser cache and restart dev server:')
  console.log('   1. Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)')
  console.log('   2. npm run dev')
  console.log('   3. Upload new images in Sanity Studio if needed')
}

clearAllImages().catch(console.error)