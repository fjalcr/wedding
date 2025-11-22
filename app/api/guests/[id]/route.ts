import { NextResponse } from "next/server";
import { prodClient } from "../../../../sanity/client";

// GET /api/guests/:id -> solo published
export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const query = `
      *[
        _type == "guests" &&
        !(_id in path("drafts.**")) &&
        _id == $id
      ][0]{
        _id,
        nombre,
        correo,
        code,
        confirm
      }
    `;

    const guest = await prodClient.fetch(query, { id });

    if (!guest) {
      return NextResponse.json({ error: "Guest not found" }, { status: 404 });
    }

    return NextResponse.json(guest);
  } catch (err) {
    console.error("GET /api/guests/[id] error:", err);
    return NextResponse.json({ error: "Error fetching guest" }, { status: 500 });
  }
}

// PUT /api/guests/:id -> actualizar (confirm, nombre, etc.)
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await req.json();

    const updated = await prodClient
      .patch(id)
      .set({
        ...body,
        confirmAt: new Date().toISOString(),
      })
      .commit();

    return NextResponse.json(updated);
  } catch (err) {
    console.error("PUT /api/guests/[id] error:", err);
    return NextResponse.json({ error: "Error updating guest" }, { status: 500 });
  }
}

