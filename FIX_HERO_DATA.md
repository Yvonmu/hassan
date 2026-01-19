# Fix for Hero Data Returning Null

## Issue
Hero data is returning `null` even though the document exists in Sanity.

## Solution
The document exists, but it might not be published. Here's what to do:

### Option 1: Publish in Sanity Studio (Recommended)
1. Go to **http://localhost:3333**
2. Open **Hero Section** document
3. Click **Publish** button (top right)
4. Refresh your website

### Option 2: Verify Document Exists
The document exists with ID: `heroSection.home`

### Debug Steps
1. Check server logs - look for "Hero data fetched:" messages
2. Verify environment variables are set:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID=ik1g399m`
   - `NEXT_PUBLIC_SANITY_DATASET=production`
3. The query is: `*[_type == "heroSection"][0]`

## Quick Test
Run this to verify the document exists:
```bash
node -e "const {createClient} = require('@sanity/client'); const client = createClient({projectId: 'ik1g399m', dataset: 'production', useCdn: false, apiVersion: '2024-01-01', token: 'YOUR_TOKEN'}); client.fetch('*[_type == \"heroSection\"][0]').then(data => console.log('Found:', data ? data.title : 'null')).catch(err => console.error('Error:', err.message));"
```
