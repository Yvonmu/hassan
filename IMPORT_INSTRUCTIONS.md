# Import Content into Sanity Studio

## Quick Import (Easiest Method)

1. **Open Sanity Studio**: Go to http://localhost:3333

2. **Install Import Tool** (if not already installed):
   - Click the "Tools" menu (top right)
   - Look for "Import" or "Data Import" tool
   - If not available, install it: Go to Settings → Plugins → Search "import"

3. **Import the JSON file**:
   - Click "Import" tool
   - Select `sanity-data-import.json` from the project root
   - Click "Import"
   - Wait for import to complete

## Manual Creation (Alternative)

If import doesn't work, create each document manually:

### 1. Hero Section
- Click "Hero Section" → "Create new"
- Copy values from the JSON file above

### 2. Global Settings  
- Click "Global Settings" → "Create new"
- Copy values from the JSON file

### 3. SEO Metadata
- Click "SEO Metadata" → "Create new"
- Set page to "home"
- Copy values from the JSON file

### 4. Services (4 documents)
- Click "Service" → "Create new" (repeat 4 times)
- Copy values for each service from the JSON file

## After Import

1. **Upload Hero Image**:
   - Open the Hero Section document
   - Click "Hero Image" field
   - Upload `/public/images/hassan.png`

2. **Upload OG Image** (optional):
   - Open SEO Metadata document
   - Upload an image for Open Graph (1200x630px recommended)

3. **Publish All Documents**:
   - Make sure all documents are published (not drafts)
   - Click "Publish" on each document

## Verify

Visit http://localhost:3000 and check:
- SEO metadata appears in page source
- Content displays correctly
- Images load properly


