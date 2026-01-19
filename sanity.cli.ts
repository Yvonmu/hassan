import { defineCliConfig } from 'sanity/cli'

// Load environment variables from .env.local (optional - will use process.env if not found)
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { config } = require('dotenv')
  const { resolve } = require('path')
  config({ path: resolve(process.cwd(), '.env.local') })
} catch {
  // dotenv not available or .env.local doesn't exist - use process.env
}

export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  },
})

