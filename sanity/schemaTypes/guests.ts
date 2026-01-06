import { defineField, defineType } from "sanity";
import { generateGuestCode } from "../lib/utils";

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
            name: "code",
            title: "Código de Referencia",
            type: "string",
            validation: (Rule) => Rule.max(5),
            initialValue: () => generateGuestCode(),
            description: "Código corto único para la URL personalizada (máx 5 caracteres)",
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

