import { Rouge_Script } from "next/font/google";

export const rougeScript = Rouge_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-rouge-script",
});
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Adriana & Eduardo — Boda",
  description: "Landing de boda con contador, historia, itinerario, vestimenta, ubicación y confirmación.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`scroll-smooth ${rougeScript.variable}`}>
     <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
