import { defineType, defineField } from "sanity";

export default defineType({
  name: "content",
  title: "Site content",
  type: "document",
  fields: [
    // ======================
    // Datos base
    // ======================
    defineField({
      name: "couple",
      title: "Pareja",
      type: "object",
      fields: [
        { name: "bride", title: "Nombre de la novia", type: "string" },
        { name: "groom", title: "Nombre del novio", type: "string" },
      ],
    }),
    defineField({
      name: "dateISO",
      title: "Fecha (ISO)",
      type: "datetime",
      description: "Fecha/hora de la boda para el contador",
    }),
    defineField({
      name: "dateLabel",
      title: "Etiqueta de fecha",
      type: "string",
      description: "Ej: 14 de febrero de 2026",
    }),
    defineField({
      name: "city",
      title: "Ciudad",
      type: "string",
    }),
    defineField({
      name: "venue",
      title: "Lugar",
      type: "object",
      fields: [
        { name: "name", title: "Nombre del evento", type: "string" },
        { name: "address", title: "Dirección", type: "string" },
        { name: "mapsQuery", title: "URL Google Maps", type: "url" },
      ],
    }),

    // ======================
    // Imágenes
    // ======================
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        {
          name: "image",
          title: "Imagen de fondo Hero",
          type: "image",
          options: { hotspot: true },
        },
        { name: "hashtag", title: "Hashtag", type: "string" },
        { name: "curvedText", title: "Texto curvo", type: "string" },
      ],
    }),
    defineField({
      name: "images",
      title: "Imágenes adicionales",
      type: "object",
      fields: [
        {
          name: "story",
          title: "Imagen sección “Nuestra historia”",
          type: "image",
          options: { hotspot: true },
        },
        {
          name: "honeymoonBox",
          title: "Imagen caja de los deseos / luna de miel",
          type: "image",
          options: { hotspot: true },
        },
        {
          name: "thanks",
          title: "Imagen thank you",
          type: "image",
          options: { hotspot: true },
        },
      ],
    }),

    // ======================
    // Paletas de color
    // ======================
    defineField({
      name: "colors",
      title: "Colores Dress Code",
      type: "object",
      fields: [
        {
          name: "womenPalette",
          title: "Paleta mujeres (hex)",
          type: "array",
          of: [{ type: "string" }],
        },
        {
          name: "menPalette",
          title: "Paleta hombres (hex)",
          type: "array",
          of: [{ type: "string" }],
        },
      ],
    }),

    // ======================
    // Itinerario
    // ======================
    defineField({
      name: "schedule",
      title: "Itinerario",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "time", title: "Hora", type: "string" },
            { name: "title", title: "Título", type: "string" },
            { name: "note", title: "Nota / descripción", type: "string" },
          ],
        },
      ],
    }),

    // ======================
    // Copys
    // ======================
    defineField({
      name: "copy",
      title: "Textos (copy)",
      type: "object",
      fields: [
        // Hero
        defineField({
          name: "hero",
          title: "Hero",
          type: "object",
          fields: [
            {
              name: "cityVenueSeparator",
              title: "Separador ciudad / venue",
              type: "string",
              initialValue: " • ",
            },
          ],
        }),

        defineField({
          name: "ceremony",
          title: "Ceremonia",
          type: "object",
          fields: [
            { name: "title", title: "Título", type: "string" },
            {
              name: "paragraphs",
              title: "Párrafos",
              type: "array",
              of: [{ type: "text" }],
            },
            {
              name: "image",
              title: "Hacienda",
              type: "image",
              options: { hotspot: true },
            }
          ],
        }),

        // Nuestra historia
        defineField({
          name: "story",
          title: "Nuestra historia",
          type: "object",
          fields: [
            { name: "title", title: "Título", type: "string" },
            { name: "subtitle", title: "Subtítulo", type: "string" },
            {
              name: "paragraphs",
              title: "Párrafos",
              type: "array",
              of: [{ type: "text" }],
            },
          ],
        }),

        // Itinerario + dress code
        defineField({
          name: "itinerary",
          title: "Itinerario / Dress code",
          type: "object",
          fields: [
            { name: "title", title: "Título sección", type: "string" },
            { name: "subtitle", title: "Subtítulo sección", type: "string" },
            {
              name: "dateLabel",
              title: "Etiqueta de fecha",
              type: "string",
              initialValue: "Fecha",
            },

            // Dress code titles / body
            {
              name: "dressCodeTitle",
              title: "Título Dress code (ej: DRESS CODE)",
              type: "string",
            },
            {
              name: "dressCodeSubtitle",
              title: "Subtítulo Dress code",
              type: "text",
            },
            {
              name: "codeImage",
              title: "Imagen código vestimenta",
              type: "image",
              options: { hotspot: true },
            },

            // Mujeres
            { name: "womenTitle", title: "Título Mujeres", type: "string" },
            { name: "womenDescription", title: "Descripción Mujeres", type: "text" },
            { name: "womenForbidden", title: "Colores no permitidos (Mujeres)", type: "text" },

            // Hombres
            { name: "menTitle", title: "Título Hombres", type: "string" },
            { name: "menDescription", title: "Descripción Hombres", type: "text" },
            { name: "menForbidden", title: "Colores no permitidos (Hombres)", type: "text" },
          ],
        }),

        // Nuestra historia
        defineField({
          name: "hotel",
          title: "Sugerencia de hospedaje",
          type: "object",
          fields: [
            { name: "title", title: "Título", type: "string" },
            { name: "subtitle", title: "Subtítulo", type: "string" },
            { name: "price", title: "Precio", type: "string" },
            { name: "number", title: "Número", type: "string" },
            { name: "whatsapp", title: "Whatsapp", type: "string" },
            { name: "linkTitle", title: "Link", type: "string" },
            { name: "link", title: "sitio", type: "url" },
            {
              name: "image",
              title: "Imagen Hotel",
              type: "image",
              options: { hotspot: true },
            }
          ],
        }),

        // Ubicación
        defineField({
          name: "location",
          title: "Ubicación",
          type: "object",
          fields: [
            { name: "title", title: "Título", type: "string" },
            {
              name: "mapsButton",
              title: "Texto del botón de Maps",
              type: "string",
              initialValue: "Abrir en Google Maps",
            },
          ],
        }),

        // Luna de miel / Caja de los deseos
        defineField({
          name: "honeymoon",
          title: "Luna de miel / Caja de los deseos",
          type: "object",
          fields: [
            { name: "title", title: "Título", type: "string" },
            { name: "subtitle", title: "Subtítulo", type: "string" },
            { name: "paragraph1", title: "Párrafo 1", type: "text" },
            { name: "paragraph2", title: "Párrafo 2", type: "text" },
            { name: "textAmazon", title: "Amazon", type: "string" },
            { name: "linkAmazon", title: "Link Amazon", type: "string" },
            { name: "textLiverpool", title: "Liverpool", type: "string" },
            { name: "linkLiverpool", title: "Link Liverpool", type: "string" },
            {
              name: "signature",
              title: "Firma",
              type: "text",
              description: "Puedes usar saltos de línea con \\n",
            },
          ],
        }),


        // Fotos
        defineField({
          name: "photoapp",
          title: "Fotos",
          type: "object",
          fields: [
            { name: "title", title: "Título", type: "string" },
            { name: "link", title: "Link", type: "url" },
            {
              name: "image",
              title: "Qr",
              type: "image",
              options: { hotspot: true },
            }
          ],
        }),

        // Confirmación (RSVP)
        defineField({
          name: "rsvp",
          title: "Confirma tu asistencia",
          type: "object",
          fields: [
            { name: "title", title: "Título", type: "string" },
            { name: "subtitle", title: "Subtítulo", type: "string" },
            {
              name: "buttonLabel",
              title: "Texto del botón",
              type: "string",
            },
            {
              name: "missingCode",
              title: "Mensaje: falta ?code",
              type: "string",
            },
            {
              name: "invalidCode",
              title: "Mensaje: código inválido",
              type: "string",
            },
            {
              name: "defaultMessage",
              title: "Mensaje por defecto",
              type: "string",
            },
            {
              name: "greetingPrefix",
              title: "Prefijo saludo",
              type: "string",
            },
            {
              name: "greetingSuffix",
              title: "Sufijo saludo",
              type: "string",
            },
            {
              name: "statusPrefix",
              title: "Prefijo mensaje confirmación",
              type: "string",
            },
            {
              name: "statusSuffix",
              title: "Sufijo mensaje confirmación",
              type: "string",
            },
          ],
        }),
      ],
    }),
  ],
});

