import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

// Handle /static/ requests and redirect them to /studio/static/
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path?: string[] }> }
) {
  try {
    const { path: pathArray } = await params
    const path = pathArray || []
    const filePath = path.join('/')
    
    // Security: prevent directory traversal
    if (filePath.includes('..') || filePath.startsWith('/')) {
      return new NextResponse('Not Found', { status: 404 })
    }
    
    // Check in studio/static/ directory
    const fullPath = join(process.cwd(), 'public', 'studio', 'static', filePath)
    
    if (!existsSync(fullPath)) {
      return new NextResponse('Not Found', { status: 404 })
    }
    
    const file = await readFile(fullPath)
    const ext = filePath.split('.').pop()?.toLowerCase()
    
    const contentType: Record<string, string> = {
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
    
    return new NextResponse(file, {
      headers: {
        'Content-Type': contentType[ext || ''] || 'application/octet-stream',
        'Cache-Control': 'public, max-age=3600',
      },
    })
  } catch (error) {
    console.error('Static route error:', error)
    return new NextResponse('Not Found', { status: 404 })
  }
}
