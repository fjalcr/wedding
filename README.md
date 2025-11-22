# Wedding Landing — Next.js 15 + Tailwind

Landing de boda (Adriana & Eduardo) con estilo save-the-date:
- Héroe con imagen y contador
- Nuestra historia
- Itinerario + Código de vestimenta
- Ubicación (Google Maps)
- Confirmación de asistencia con botón (usa `?code=` y JSON en LocalStorage)

## Requisitos
- Node.js 18+
- pnpm, npm o yarn

## Instalación
```bash
pnpm install   # o npm install / yarn
```

## Desarrollo
```bash
pnpm dev   # http://localhost:3000
```

## Build
```bash
pnpm build
pnpm start
```

## Confirmación por URL
Comparte un enlace con el parámetro `?code=` (base64 del nombre). La app trae 20 invitados precargados en LocalStorage.
Ejemplo: `?code=amF2aWVyIGFsY29jZXI=` corresponde a `javier alcocer`.
