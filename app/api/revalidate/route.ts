import { revalidatePath, revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const secret = req.headers.get('x-sanity-secret')

    // Optional: verify secret if configured
    if (process.env.SANITY_REVALIDATE_SECRET && secret !== process.env.SANITY_REVALIDATE_SECRET) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
    }

    const contentType = body?._type

    if (!contentType) {
      return NextResponse.json({ message: 'Bad Request' }, { status: 400 })
    }

    // Revalidate the home page and all pages
    revalidatePath('/', 'page')
    revalidatePath('/about', 'page')
    revalidatePath('/services', 'page')
    revalidatePath('/contact', 'page')
    
    // Revalidate by content type tags
    revalidateTag(contentType)
    revalidateTag('heroSection')
    revalidateTag('globalSettings')
    revalidateTag('seoMetadata')
    revalidateTag('service')
    revalidateTag('diplomaticExcellence')
    revalidateTag('jurisdictionSection')
    revalidateTag('naturalWonders')
    revalidateTag('naturalWondersRwanda')
    revalidateTag('stayConnected')
    revalidateTag('socialFeedsSection')
    revalidateTag('consularExcellence')
    revalidateTag('headerSettings')

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      type: contentType,
    })
  } catch (err: any) {
    console.error('Revalidation error:', err)
    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}
