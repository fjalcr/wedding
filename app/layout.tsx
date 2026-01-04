import { Rouge_Script, Zain } from "next/font/google";

export const rougeScript = Rouge_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-rouge-script",
});

export const zain = Zain({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-zain",
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
    <html lang="es" className={`scroll-smooth ${rougeScript.variable} ${zain.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-zain font-light">{children}</body>
    </html>
  );
}
