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

async function fixImageRefs() {
  console.log('🔍 Finding documents with malformed image references...\n')

  // Query all documents that might have image fields
  const documents = await client.fetch(`
    *[_type in ["heroSection", "globalSettings", "diplomaticExcellence", "naturalWonders", "naturalWondersRwanda"]] {
      _id,
      _type,
      _rev,
      ...
    }
  `)

  console.log(`Found ${documents.length} documents to check\n`)

  for (const doc of documents) {
    let needsUpdate = false
    const updates: any = {}

    // Check all fields for malformed image references
    const checkAndFixImageField = (obj: any, path: string = '') => {
      if (!obj || typeof obj !== 'object') return

      for (const [key, value] of Object.entries(obj)) {
        const currentPath = path ? `${path}.${key}` : key
        
        if (value && typeof value === 'object') {
          if ('_type' in value && value._type === 'image' && 'asset' in value && value.asset && typeof value.asset === 'object' && 'asset' in value && '_ref' in value.asset) {
            const ref = (value.asset as any)._ref
            if (typeof ref === 'string' && ref.startsWith('/images/')) {
              console.log(`❌ Found malformed image ref in ${doc._id} at ${currentPath}: ${ref}`)
              // Remove the malformed reference
              updates[currentPath] = null
              needsUpdate = true
            }
          } else if (Array.isArray(value)) {
            value.forEach((item, index) => {
              checkAndFixImageField(item, `${currentPath}[${index}]`)
            })
          } else {
            checkAndFixImageField(value, currentPath)
          }
        }
      }
    }

    checkAndFixImageField(doc)

    if (needsUpdate) {
      try {
        await client.patch(doc._id).unset(Object.keys(updates)).commit()
        console.log(`✅ Fixed malformed image refs in ${doc._id}`)
      } catch (error: any) {
        console.error(`❌ Failed to fix ${doc._id}: ${error.message}`)
      }
    }
  }

  console.log('\n✅ Image reference cleanup complete!')
  console.log('\n💡 Next steps:')
  console.log('   1. Upload proper images in Sanity Studio')
  console.log('   2. Restart your dev server: npm run dev')
}

fixImageRefs().catch(console.error)