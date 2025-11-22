import { createClient } from 'next-sanity'

export const prodClient = createClient({
  projectId: 'oi5cpb04',        // o process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  dataset: 'production',        // o process.env.NEXT_PUBLIC_SANITY_DATASET
  apiVersion: '2025-11-22',     // la misma que usas en Vision
  token: process.env.SANITY_API_WRITE_TOKEN, // asegúrate que esté en .env.local
  useCdn: false,                // datos frescos
  // 👇 sin token, sin drafts, sólo published
})


