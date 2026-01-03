import { defineField, defineType } from "sanity";

export default defineType({
    name: "guests",        
    title: "Guests",      
    type: "document",
    fields: [
        defineField({
            name: "nombre",
            title: "Nombre",
            type: "string",
        }),
        defineField({
            name: "companions",
            title: "Acompaniante",
            type: "number",
        }),
        defineField({
            name: "companionsConfirmed",
            title: "Acompaniantes confirmados",
            type: "number",
        }),
        defineField({
            name: "confirm",
            title: "Asiste",
            type: "boolean",
        }),
        defineField({
            name: "confirmAt",
            title: "fecha de confirmacion",
            type: "datetime",
            options: {
                dateFormat: "YYYY-MM-DD",
                timeFormat: "HH:mm",
            },
        }),
    ],
});

