import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path?: string[] }> }
) {
  try {
    const { path: pathArray } = await params
    const path = pathArray || []
    let filePath = path.length === 0 ? 'index.html' : path.join('/')
    
    // Handle /static/ paths - they're actually in /studio/static/
    if (filePath.startsWith('static/')) {
      filePath = filePath // Keep as is, it's already correct
    }
    
    // Security: prevent directory traversal
    if (filePath.includes('..') || filePath.startsWith('/')) {
      return new NextResponse('Not Found', { status: 404 })
    }
    
    const fullPath = join(process.cwd(), 'public', 'studio', filePath)
    
    // Check if file exists
    if (!existsSync(fullPath)) {
      // For SPA routing, serve index.html for any non-file path
      if (!filePath.includes('.')) {
        const indexPath = join(process.cwd(), 'public', 'studio', 'index.html')
        if (existsSync(indexPath)) {
          const indexFile = await readFile(indexPath)
          return new NextResponse(new Uint8Array(indexFile), {
            headers: { 'Content-Type': 'text/html' },
          })
        }
      }
      return new NextResponse('Not Found', { status: 404 })
    }
    
    const file = await readFile(fullPath)
    const ext = filePath.split('.').pop()?.toLowerCase()
    
    const contentType: Record<string, string> = {
      html: 'text/html',
      js: 'application/javascript',
      css: 'text/css',
      json: 'application/json',
      png: 'image/png',
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      svg: 'image/svg+xml',
      ico: 'image/x-icon',
      webmanifest: 'application/manifest+json',
      woff: 'font/woff',
      woff2: 'font/woff2',
      ttf: 'font/ttf',
    }
    
    return new NextResponse(new Uint8Array(file), {
      headers: {
        'Content-Type': contentType[ext || ''] || 'application/octet-stream',
        'Cache-Control': 'public, max-age=3600',
      },
    })
  } catch (error) {
    console.error('Studio route error:', error)
    return new NextResponse('Not Found', { status: 404 })
  }
}
