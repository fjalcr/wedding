"use client";

import React, { useEffect, useMemo, useState } from "react";

/**
 * Next 15 + Tailwind — Página completa con fixes de hidratación
 * - Hero con contador (placeholders en SSR para evitar mismatch)
 * - Fecha estática (dateLabel) para no depender de timezone/locale
 * - Secciones: Historia, Itinerario + Vestimenta, Ubicación, Confirmación (?code=)
 * - Confirmación por botón: lee ?code= y confirma en LocalStorage (puede apuntar a API luego)
 *
 * NOTA TIPOGRAFÍAS: Carga Google Fonts en app/layout.tsx con <link> para evitar errores de loaders.
 * Ejemplo:
 * <link rel="preconnect" href="https://fonts.googleapis.com" />
 * <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
 * <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:wght@400;600;700&display=swap" rel="stylesheet" />
 */

// =============================
// Configuración de la boda
// =============================
const wedding = {
  couple: { bride: "Adriana", groom: "Eduardo" },
  dateISO: "2026-02-14T17:00:00-05:00",
  dateLabel: "14 de febrero de 2026", // etiqueta estática para evitar desajustes SSR/CSR
  city: "Mérida, Yucatán",
  venue: {
    name: "Hacienda San Ángel",
    address: "Carretera Mérida – Progreso Km 12, Mérida, Yuc.",
    mapsQuery: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29860.818377025855!2d-88.22506422195146!3d20.68575302018809!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f510ada7bbef3f7%3A0xed7a1f8fe539aa31!2sValladolid%2C%20Yucatan!5e0!3m2!1sen!2smx!4v1762526039518!5m2!1sen!2smx",
    mapsLink: "https://www.google.com/maps/place/Valladolid,+Yucatan/@20.685753,-88.2250642,14z/data=!3m1!4b1!4m6!3m5!1s0x8f510ada7bbef3f7:0xed7a1f8fe539aa31!8m2!3d20.68964!4d-88.2022488!16zL20vMDFzcG5r?entry=ttu&g_ep=EgoyMDI1MTEwNC4xIKXMDSoASAFQAw%3D%3D"
  },
  hero: {
    image:
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1920&auto=format&fit=crop",
    hashtag: "#AdrianaYEduardo",
    curvedText: "Reserva la fecha de nuestra boda",
  },
  dressCode: ["Formal de verano", "Tonos tierra / neutros", "Evitar blanco 🕊️"],
  schedule: [
    { time: "5:00 pm", title: "Ceremonia", note: "Capilla de la hacienda" },
    { time: "6:30 pm", title: "Coctel", note: "Jardín principal" },
    { time: "8:00 pm", title: "Cena", note: "Salón colonial" },
    { time: "10:00 pm", title: "Fiesta", note: "Terraza" },
  ],
} as const;

// =============================
// Utilidades de tiempo / hooks
// =============================
function getCountdown(targetISO: string, nowMs: number = Date.now()) {
  const target = new Date(targetISO).getTime();
  const total = Math.max(0, target - nowMs);
  return {
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor((total / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((total / (1000 * 60)) % 60),
    seconds: Math.floor((total / 1000) % 60),
  } as const;
}

function useCountdown(targetISO: string) {
  useMemo(() => new Date(targetISO).getTime(), [targetISO]); // estabiliza dependencia
  const [now, setNow] = useState<number>(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  return getCountdown(targetISO, now);
}

function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
}

// =============================
// Secciones y componentes
// =============================
const Section = ({
  id,
  title,
  subtitle,
  children,
}: {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) => (
  <section id={id} className="scroll-mt-24 py-16 md:py-24">
    <div className="max-w-6xl mx-auto px-6">
      <h2 className="text-3xl md:text-4xl tracking-tight font-serif-elegant">{title}</h2>
      {subtitle && (
        <p className="text-neutral-600 mt-2 max-w-2xl">{subtitle}</p>
      )}
      <div className="mt-8">{children}</div>
    </div>
  </section>
);

function Hero() {
  const { bride, groom } = wedding.couple;
  const mounted = useMounted();
  const countdown = useCountdown(wedding.dateISO);

  return (
    <header className="relative min-h-[100svh] overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={wedding.hero.image}
        alt="Hero"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 flex flex-col items-center justify-center text-center text-white min-h-[100svh] px-6">
        {/* Texto curvo estilo save-the-date */}
        <svg
          className="w-[90vw] max-w-3xl mb-2 opacity-90"
          viewBox="0 0 800 200"
          fill="none"
        >
          <path
            id="curve"
            d="M50,150 C250,-50 550,-50 750,150"
            stroke="transparent"
            fill="transparent"
          />
          <text className="tracking-wider" style={{ fontSize: 18, letterSpacing: 2 }}>
            <textPath href="#curve" startOffset="50%" textAnchor="middle">
              {wedding.hero.curvedText.toUpperCase()}
            </textPath>
          </text>
        </svg>

        {/* Nombres */}
        <h1 className="font-script text-white text-[56px] md:text-[96px] leading-none drop-shadow-md">
          {bride} <span className="mx-3">&</span> {groom}
        </h1>

        {/* Lugar (estático) */}
        <p className="mt-2 text-base md:text-lg opacity-95" suppressHydrationWarning>
          {wedding.city} • {wedding.venue.name}
        </p>

        {/* Contador con placeholders hasta montar (evita hydration mismatch) */}
        <div className="mt-6 grid grid-flow-col gap-3 text-center" suppressHydrationWarning>
          {["Días", "Horas", "Min", "Seg"].map((label, i) => {
            const vals = [
              countdown.days,
              countdown.hours,
              countdown.minutes,
              countdown.seconds,
            ] as const;
            const value = mounted ? vals[i] : "--";
            return (
              <div
                key={label}
                className="bg-white/15 backdrop-blur-sm rounded-xl px-4 py-2"
              >
                <div className="text-2xl md:text-3xl font-semibold tabular-nums">
                  {value as any}
                </div>
                <div className="text-[10px] md:text-xs opacity-90">{label}</div>
              </div>
            );
          })}
        </div>

        {/* Fecha: usar etiqueta estable */}
        <div className="mt-4 text-sm opacity-90" suppressHydrationWarning>
          {wedding.dateLabel} • {wedding.hero.hashtag}
        </div>
      </div>

      {/* Divisor papel rasgado */}
      <svg
        className="absolute bottom-[-1px] left-0 w-full"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
      >
        <path
          fill="#fff"
          d="M0,64L60,74.7C120,85,240,107,360,106.7C480,107,600,85,720,80C840,75,960,85,1080,80C1200,75,1320,53,1380,42.7L1440,32L1440,120L0,120Z"
        />
      </svg>
    </header>
  );
}

// =============================
// Confirmación por botón (?code=)
// =============================

async function updateGuest(id: string, data: any) {
  const res = await fetch(`/api/guests/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    throw new Error('Error actualizando invitado')
  }

  return res.json()
}


function ConfirmButton() {
  const [codeParam, setCodeParam] = useState<string | null>(null);
  const [guest, setGuest] = useState<any>(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");

    if (!code) return;

    setCodeParam(code);

    const fetchGuest = async () => {
      try {
        const res = await fetch(`/api/guests/${code}`);
        const data = await res.json();

        if (res.ok) {
          setGuest(data);
        } else {
          setStatus("Invitado no encontrado");
        }
      } catch (e) {
        console.error(e);
        setStatus("Error obteniendo invitado");
      }
    };

    fetchGuest();
  }, []);

  async function confirm() {
    if (!guest?._id) return;

    try {
      const res = await fetch(`/api/guests/${guest._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ confirm: true }),
      });

      if (res.ok) {
        setStatus("Asistencia confirmada 🎉");
      } else {
        setStatus("Error al confirmar");
      }
    } catch (e) {
      console.error(e);
      setStatus("Error al confirmar");
    }
  }

  return (
    <div className="space-y-4" suppressHydrationWarning>
      <p>
        {guest
          ? `Hola, ${guest.nombre}. Usa el botón para confirmar tu asistencia.`
          : codeParam
          ? "Cargando datos del invitado..."
          : "Agrega ?code= en el URL para confirmar."}
      </p>

      <button
        onClick={confirm}
        className="rounded-xl bg-neutral-900 text-white px-5 py-3 font-medium hover:bg-neutral-800"
      >
        Confirmar asistencia
      </button>

      {status && <div className="text-sm text-neutral-600">{status}</div>}
    </div>
  );
}


// =============================
// Página
// =============================
export default function Page() {
  return (
    <main className="font-sans text-neutral-900 bg-white scroll-smooth">
      {/* Héroe */}
      <Hero />

      {/* Nuestra historia */}
      <Section
        id="historia"
        title="Nuestra historia"
        subtitle="Cómo Adriana y Eduardo llegaron hasta aquí 💫"
      >
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4 text-neutral-700">
            <p>
              Adriana y Eduardo se conocieron en 2018 en un café del centro. Desde entonces han compartido viajes,
              risas y muchos tacos al pastor. Hoy comienza un nuevo capítulo y quieren celebrarlo con ustedes.
            </p>
            <p>
              La celebración será en {wedding.venue.name}, {wedding.city}. Una tarde‑noche llena de música y buenos momentos.
            </p>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={wedding.hero.image}
            alt="couple"
            className="rounded-3xl w-full h-72 object-cover shadow-sm border border-neutral-200"
          />
        </div>
      </Section>

      {/* Itinerario + Código de vestimenta */}
      <Section id="itinerario" title="Itinerario" subtitle="Todo lo que necesitas para no perderte nada">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="rounded-3xl border border-neutral-200 p-2">
            <div className="rounded-2xl bg-neutral-50 p-2">
              {wedding.schedule.map((item) => (
                <div key={item.time} className="relative pl-8 py-4">
                  <div className="absolute left-0 top-5 w-3 h-3 rounded-full bg-neutral-900" />
                  <div className="absolute left-1.5 top-0 bottom-0 w-px bg-neutral-200" />
                  <div className="text-sm text-neutral-500">{item.time}</div>
                  <div className="font-medium">{item.title}</div>
                  {item.note && (
                    <div className="text-neutral-600 text-sm">{item.note}</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-neutral-200 p-6 flex flex-col justify-center gap-3 bg-gradient-to-br from-neutral-50 to-white">
            <div className="text-sm text-neutral-600">Fecha</div>
            <div className="text-xl font-medium" suppressHydrationWarning>
              {wedding.dateLabel}
            </div>
            <div className="mt-6 text-sm text-neutral-600">Código de vestimenta</div>
            <div className="flex flex-wrap gap-2">
              {wedding.dressCode.map((d) => (
                <span
                  key={d}
                  className="rounded-full border border-neutral-300 px-3 py-1 text-sm"
                >
                  {d}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Ubicación */}
      <Section
        id="ubicacion"
        title="Ubicación"
        subtitle={`${wedding.venue.name} • ${wedding.venue.address}`}
      >
        <div className="rounded-3xl overflow-hidden border border-neutral-200">
          <iframe
            title="Mapa"
            src={wedding.venue.mapsQuery}
            className="w-full h-[420px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href={wedding.venue.mapsLink}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl bg-neutral-900 text-white px-4 py-2"
          >
          Abrir en Google Maps
          </a>
        </div>
      </Section>

      {/* Confirmación */}
      <Section
        id="rsvp"
        title="Confirma tu asistencia"
        subtitle="Da clic al botón para registrar tu asistencia."
      >
        <ConfirmButton />
      </Section>
    </main>
  );
}

