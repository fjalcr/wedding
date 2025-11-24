import { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenido')
    .items([
      // tus items ya existentes...

      // 👇 Agrega este bloque para Guests
      S.listItem()
        .title('Guests')
        .schemaType('guests')
        .child(
          S.documentTypeList('guests').title('Guests')
        ),
      S.listItem()
        .title('Content')
        .schemaType('content')
        .child(
          S.documentTypeList('content').title('Content')
        ),

      // y luego el resto de items...
    ])

