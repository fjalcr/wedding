import { NextResponse } from 'next/server'
import { prodClient } from '../../../sanity/client'

const GUESTS_QUERY = `
  *[
    _type == "guests" &&
    !(_id in path("drafts.**"))
  ]{
    _id,
    nombre,
    correo,
    code
  } | order(_createdAt desc)
`

// GET /api/guests -> lista solo documentos publicados
export async function GET() {
  try {
    const guests = await prodClient.fetch(GUESTS_QUERY)
    return NextResponse.json(guests)
  } catch (err) {
    console.error('GET /api/guests error', err)
    return NextResponse.json({ error: 'Error fetching guests' }, { status: 500 })
  }
}

// POST /api/guests -> crea un invitado en producción
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { nombre, correo, code } = body

    if (!nombre || !correo || !code) {
      return NextResponse.json(
        { error: 'nombre, correo y code son requeridos' },
        { status: 400 }
      )
    }

    const newGuest = await prodClient.create({
      _type: 'guests',
      nombre,
      correo,
      code,
    })

    return NextResponse.json(newGuest, { status: 201 })
  } catch (err) {
    console.error('POST /api/guests error', err)
    return NextResponse.json({ error: 'Error creating guest' }, { status: 500 })
  }
}

