"use client";

import React, { useEffect, useMemo, useState } from "react";

const wedding = {
  // Datos base
  couple: { bride: "Adriana", groom: "Eduardo" },
  dateISO: "2026-02-14T17:00:00-05:00",
  dateLabel: "14 de febrero de 2026",
  city: "Mérida, Yucatán",
  venue: {
    name: "Boda Adriana & Eduardo",
    address: "Hacienda San Ángel, Carretera Mérida – Progreso Km 12, Mérida, Yuc.",
    mapsQuery: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29860.8183759968!2d-88.22502137452723!3d20.685753025417412!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f510ada7bbef3f7%3A0xed7a1f8fe539aa31!2sValladolid%2C%20Yucatan!5e0!3m2!1sen!2smx!4v1763930663669!5m2!1sen!2smx",
  },

  // Imágenes (todas las rutas configurables aquí)
  hero: {
    image:
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1920&auto=format&fit=crop",
    hashtag: "#AdrianaYEduardo",
    curvedText: "Reserva la fecha de nuestra boda",
  },
  images: {
    story:
      "https://plus.unsplash.com/premium_photo-1665159098184-d43c2bf651f4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    honeymoonBox:
      "https://images.unsplash.com/photo-1520256862855-398228c41684?q=80&w=1200&auto=format&fit=crop",
  },

  // Paletas de color para Dress Code (copiadas de la referencia)
  colors: {
    womenPalette: [
      "#E2773E", // naranja
      "#E8633A", // coral
      "#E44F93", // rosa fuerte
      "#8E3A96", // morado
      "#B7C94A", // verde lima
      "#A9E3EA", // aqua claro
      "#51B5D6", // azul aqua
      "#486FA1", // azul medio
      "#353C85", // azul profundo
    ],
    menPalette: [
      "#A0A0A0", // gris
      "#B5C650", // verde lima suave
      "#A9E3EA", // aqua claro
      "#51B5D6", // azul aqua
      "#486FA1", // azul medio
      "#353C85", // azul profundo
    ],
  },

  // Estilo / opciones
  schedule: [
    { time: "5:00 pm", title: "Ceremonia", note: "Capilla de la hacienda" },
    { time: "6:30 pm", title: "Coctel", note: "Jardín principal" },
    { time: "8:00 pm", title: "Cena", note: "Salón colonial" },
    { time: "10:00 pm", title: "Fiesta", note: "Terraza" },
  ],

  // COPYS configurables
  copy: {
    hero: {
      cityVenueSeparator: " • ",
    },
    story: {
      title: "Nuestra historia",
      subtitle: "Cómo Adriana y Eduardo llegaron hasta aquí 💫",
      paragraphs: [
        "Adriana y Eduardo se conocieron en 2018 en un café del centro. Desde entonces han compartido viajes, risas y muchos tacos al pastor. Hoy comienza un nuevo capítulo y quieren celebrarlo con ustedes.",
        "La celebración será en Hacienda San Ángel, Mérida, Yucatán. Una tarde‑noche llena de música y buenos momentos.",
      ],
    },
    itinerary: {
      title: "Itinerario",
      subtitle: "Todo lo que necesitas para no perderte nada",
      dateLabel: "Fecha",
      // Dress code (según imagen proporcionada)
      dressCodeTitle: "DRESS CODE",
      dressCodeSubtitle:
        "Considera la elegancia y comodidad para disfrutar de una celebración en un entorno natural.",
      womenTitle: "Mujeres",
      womenDescription:
        "Vestido largo o midi, conjunto de dos piezas de siluetas simples. Zapatos de tacones gruesos para mayor comodidad.",
      womenForbidden:
        "No usar color blanco, plateado, negro, beige, rojo, dorado o colores que puedan parecer blanco.",
      menTitle: "Hombres",
      menDescription:
        "Camisa manga larga fresca, lisa o con textura sutil. Pantalón de vestir y zapatos formales, no tenis. Se considera el blazer opcional, no corbata.",
      menForbidden: "No usar color negro, blanco o beige.",
    },
    location: {
      title: "Ubicación",
      mapsButton: "Abrir en Google Maps",
    },
    honeymoon: {
      title: "Nuestra luna de miel",
      subtitle: "Un sueño que comienza con su cariño 💛",
      paragraph1:
        "Como toda gran aventura, nuestro próximo capítulo comienza con un sueño: vivir una luna de miel única, llena de momentos que recordemos para siempre.",
      paragraph2:
        "Hemos creado una pequeña caja de los deseos, un espacio simbólico donde pueden dejar su abrazo en forma de aportación para construir juntos este viaje. Cada detalle que ahí se deje será una pieza más de esta historia que estamos por vivir.",
      paragraph3:
        "Gracias por ser parte de nuestro inicio, por impulsarnos a volar un poquito más lejos y por acompañarnos en este proyecto tan especial.",
      signature: "Con cariño,\nNuestra futura versión recién casados",
    },
    rsvp: {
      title: "Confirma tu asistencia",
      subtitle:
        "Da clic al botón para registrar tu asistencia.",
      buttonLabel: "Confirmar asistencia",
      missingCode: "Falta el parámetro ?code=",
      invalidCode: "Código no válido",
      defaultMessage: "Comparte el enlace con ?code= para confirmar.",
      greetingPrefix: "Hola, ",
      greetingSuffix: ". Usa el botón para confirmar tu asistencia.",
      statusPrefix: "¡Gracias, ",
      statusSuffix: "! Tu asistencia quedó confirmada.",
    },
  },
} as const;


async function fetchWeddingContent() {
  try {
    const res = await fetch("/api/content", { cache: "no-store" });
    if (!res.ok) throw new Error("Error al cargar contenido");

    const json = await res.json();
    const raw = Array.isArray(json) ? json[0] : json;
    return raw;
  } catch (err) {
    console.error("Error cargando contenido de la boda:", err);
    return []; // fallback automático
  }
}


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
  useMemo(() => new Date(targetISO).getTime(), [targetISO]); 
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
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
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

// =============================
// Confirmación por botón (?guest=)
// =============================


function ConfirmButton() {
  const [codeParam, setCodeParam] = useState<string | null>(null);
  const [guest, setGuest] = useState<any>(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const url = new URL(window.location.href);
    const guest = url.searchParams.get("guest");

    if (!guest) return;

    setCodeParam(guest);

    const fetchGuest = async () => {
      try {
        const res = await fetch(`/api/guests/${guest}`);
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
    if (guest?.confirm) {
        setStatus(`Tu asistencia ya fue confirmada, te esperamos.`)
        return;
    }

    try {
      const res = await fetch(`/api/guests/${guest._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ confirm: true }),
      });

      if (res.ok) {
        setStatus("Asistencia confirmada.");
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
          : ""}
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

  const [wedding, setWeddingContent] = useState<WeddingContent | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const mounted = useMounted();
  const countdown = useCountdown('2026-02-28');

    useEffect(() => {
      fetchWeddingContent().then((data) => {
          console.log('data from api', data);
          setWeddingContent(data)
      });
    }, []);

  return (
      <>
        {wedding && (
    <main className="font-sans text-neutral-900 bg-white scroll-smooth">
      {/* Héroe */}
        <header className="relative min-h-[100svh] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={wedding.hero.imageUrl}
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
              {wedding.couple.bride} <span className="mx-3">&</span> {wedding.couple.groom}
            </h1>

            {/* Lugar (desde config) */}
            <p className="mt-2 text-base md:text-lg opacity-95" suppressHydrationWarning>
              {wedding.city}
              {wedding.copy.hero.cityVenueSeparator}
              {wedding.venue.name}
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

            {/* Fecha: etiqueta estable + hashtag */}
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

      {/* Nuestra historia */}
      <Section
        id="historia"
        title={wedding.copy.story.title}
        subtitle={wedding.copy.story.subtitle}
      >
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4 text-neutral-700">
            {wedding.copy.story.paragraphs.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={wedding.images.storyUrl}
            alt="couple"
            className="rounded-3xl w-full h-72 object-cover shadow-sm border border-neutral-200 transition-transform duration-500 hover:-translate-y-1 hover:shadow-lg"
          />
        </div>
      </Section>

      {/* Itinerario - estilo camino vertical */}
      <Section
        id="itinerario"
        title={wedding.copy.itinerary.title}
        subtitle={wedding.copy.itinerary.subtitle}
      >
        <div className="relative max-w-2xl mx-auto">
          {/* Camino vertical */}
          <div className="absolute left-6 top-0 bottom-0">
            <div className="h-full w-px bg-gradient-to-b from-gray-200 via-neutral-300 to-gray-400 rounded-full" />
          </div>

          <div className="space-y-8">
            {wedding.schedule.map((item) => (
              <div key={item.time} className="relative pl-14">
                {/* Nodo de tiempo */}
                <div className="absolute left-0 top-2 w-12 text-center  h-12 rounded-full bg-white border-2 border-natural-200 flex items-center justify-center shadow-sm">
                  <span className="text-[11px] font-semibold text-neutral-800">
                    {item.time}
                  </span>
                </div>

                {/* Tarjeta del evento */}
                <div className="rounded-2xl border border-neutral-200 bg-white/80 backdrop-blur-sm p-4 shadow-sm">
                  <div className="font-medium text-neutral-900">{item.title}</div>
                  {item.note && (
                    <div className="text-sm text-neutral-600 mt-1">{item.note}</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Fecha al final del camino */}
          <div className="mt-10 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/80 px-4 py-1 text-sm text-neutral-700">
              <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">
                {wedding.copy.itinerary.dateLabel}
              </span>
              <span className="font-medium" suppressHydrationWarning>
                {wedding.dateLabel}
              </span>
            </div>
          </div>
        </div>
      </Section>

      {/* Código de vestimenta */}
      <Section
        id="codigo-de-vestimenta"
        title={wedding.copy.itinerary.dressCodeTitle}
        subtitle={wedding.copy.itinerary.dressCodeSubtitle}
      >
        <div className="grid md:grid-cols-2 gap-10">
          {/* Mujeres */}
          <div className="space-y-3">
            <div className="font-medium text-neutral-800">
              {wedding.copy.itinerary.womenTitle}
            </div>
            <p className="text-sm text-neutral-700">
              {wedding.copy.itinerary.womenDescription}
            </p>
            <div className="flex flex-wrap gap-2 mt-1">
              {wedding.colors.womenPalette.map((c) => (
                <span
                  key={c}
                  className="w-6 h-6 rounded-full border border-white shadow-sm"
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
            <p className="text-xs text-neutral-500">
              {wedding.copy.itinerary.womenForbidden}
            </p>
          </div>

          {/* Hombres */}
          <div className="space-y-3">
            <div className="font-medium text-neutral-800">
              {wedding.copy.itinerary.menTitle}
            </div>
            <p className="text-sm text-neutral-700">
              {wedding.copy.itinerary.menDescription}
            </p>
            <div className="flex flex-wrap gap-2 mt-1">
              {wedding.colors.menPalette.map((c) => (
                <span
                  key={c}
                  className="w-6 h-6 rounded-full border border-white shadow-sm"
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
            <p className="text-xs text-neutral-500">
              {wedding.copy.itinerary.menForbidden}
            </p>
          </div>
        </div>
      </Section>

      {/* Ubicación */}
      <Section
        id="ubicacion"
        title={wedding.copy.location.title}
        subtitle={wedding.venue.address}
      >
        <div className="rounded-3xl overflow-hidden border border-neutral-200 transition-transform duration-500 hover:-translate-y-1 hover:shadow-md">
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
            href={wedding.venue.mapsQuery}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl bg-neutral-900 text-white px-4 py-2 transition-colors duration-300 hover:bg-neutral-800 hover:shadow-md"
          >
            {wedding.copy.location.mapsButton}
          </a>
        </div>
      </Section>

      {/* Luna de miel / Caja de los deseos */}
      <Section
        id="luna-de-miel"
        title={wedding.copy.honeymoon.title}
        subtitle={wedding.copy.honeymoon.subtitle}
      >
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="max-w-3xl text-neutral-700 space-y-4">
            <p>{wedding.copy.honeymoon.paragraph1}</p>
            <p>{wedding.copy.honeymoon.paragraph2}</p>
            <p>{wedding.copy.honeymoon.paragraph3}</p>
            <p className="italic text-neutral-600">
              {wedding.copy.honeymoon.signature.split("\n").map((line, idx) => (
                <React.Fragment key={idx}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </p>
          </div>

          <div className="w-full flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={wedding.images.honeymoonBoxUrl}
              alt="Caja de los deseos"
              className="rounded-3xl shadow-md border border-neutral-200 w-full max-w-md object-cover transition-transform duration-500 hover:-translate-y-1 hover:shadow-lg"
            />
          </div>
        </div>
      </Section>

      {/* Confirmación */}
      <Section
        id="rsvp"
        title={wedding.copy.rsvp.title}
        subtitle={wedding.copy.rsvp.subtitle}
      >
        <ConfirmButton />
      </Section>

      {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="relative max-w-sm w-full px-6">
              <div className="rounded-3xl overflow-hidden shadow-2xl bg-transparent">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/mnt/data/ChatGPT Image 23 nov 2025, 08_58_43 p.m..png"
                  alt="Gracias, te esperamos en nuestro día"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        )}
    </main>

        )}
      </>
  );
}
