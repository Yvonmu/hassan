import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'

// Sanity project configuration
// These values are safe to commit (project ID and dataset are public)
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ik1g399m'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export default defineConfig({
  name: 'default',
  title: 'Djibouti Consulate CMS',
  
  projectId,
  dataset,
  
  basePath: '/studio',
  
  plugins: [
    structureTool(),
    visionTool(),
  ],
  
  schema: {
    types: schemaTypes,
  },
  
  // Allow localhost development without registration
  // For production, you'll need to register the studio or add development hosts
  // See: https://www.sanity.io/docs/studio-development-hosts
})
