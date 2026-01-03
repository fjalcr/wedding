import { NextResponse } from 'next/server'
import { prodClient } from '../../../sanity/client'

const CONTENT_QUERY = `
    *[
  _type == "content" &&
  !(_id in path("drafts.**"))
]{
  ...,
  hero{
    ...,
    "imageUrl": image.asset->url
  },
  images{
    ...,
    "storyUrl": story.asset->url,
    "honeymoonBoxUrl": honeymoonBox.asset->url,
    "thanksUrl": thanks.asset->url
  },
  copy{
    ...,
    hotel{
      ...,
      "imageUrl": image.asset->url
    },
    photoapp{
      ...,
      "imageUrl": image.asset->url
    },
    ceremony{
      ...,
      "imageUrl": image.asset->url
    },
    itinerary{
      ...,
      "imageUrl": codeImage.asset->url
    }
  }
}
`

// GET /api/guests -> lista solo documentos publicados
export async function GET() {
  try {
    const content = await prodClient.fetch(CONTENT_QUERY)
    return NextResponse.json(content)
  } catch (err) {
    console.error('GET /api/content error', err)
    return NextResponse.json({ error: 'Error fetching content' }, { status: 500 })
  }
}
