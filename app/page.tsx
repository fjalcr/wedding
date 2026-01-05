"use client";

import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FaPhone } from "react-icons/fa";
import { FaLink } from "react-icons/fa";
import { FaDollarSign } from "react-icons/fa";
import {
    CeremoniaIcon,
    MemoriasIcon,
    ValsIcon,
    BanqueteIcon,
    BrindisIconAlt,
    FiestaIcon,
    DespedidaIcon,
} from "../components/ItineraryIcons";

async function fetchWeddingContent() {
    try {
        const res = await fetch("/api/content", { cache: "no-store" });
        if (!res.ok) throw new Error("Error al cargar contenido");

        const json = await res.json();
        const raw = Array.isArray(json) ? json[0] : json;
        return raw ?? null;
    } catch (err) {
        console.error("Error cargando contenido de la boda:", err);
        return null;
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

function LeafDivider({
    className = "",
    tone = "dark",
}: {
    className?: string;
    tone?: "dark" | "light";
}) {
    const stroke = tone === "light" ? "rgba(255,255,255,0.85)" : "rgba(23,23,23,0.55)";
    const fill = tone === "light" ? "rgba(255,255,255,0.35)" : "rgba(23,23,23,0.12)";

    return (
        <div className={`flex items-center justify-center ${className}`} aria-hidden="true">
            <div className="h-px w-16 md:w-24" style={{ backgroundColor: stroke }} />
            <svg
                className="mx-3"
                width="64"
                height="18"
                viewBox="0 0 64 18"
                fill="none"
            >
                {/* hoja izq */}
                <path
                    d="M23 9c-5.5-1.8-8.5-6.2-9-8 2.6.4 9.9 2.7 11 7.6"
                    stroke={stroke}
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M23 9c-3.7 1.6-7.3 1.3-10 .3 2.3 2.4 6.8 5.4 12.4 2.9"
                    fill={fill}
                />
                {/* centro */}
                <path
                    d="M32 2c1.1 2.1 1.1 10.1 0 14"
                    stroke={stroke}
                    strokeWidth="1.2"
                    strokeLinecap="round"
                />
                <circle cx="32" cy="9" r="2.2" fill={fill} stroke={stroke} strokeWidth="1.1" />
                {/* hoja der */}
                <path
                    d="M41 9c5.5-1.8 8.5-6.2 9-8-2.6.4-9.9 2.7-11 7.6"
                    stroke={stroke}
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M41 9c3.7 1.6 7.3 1.3 10 .3-2.3 2.4-6.8 5.4-12.4 2.9"
                    fill={fill}
                />
            </svg>
            <div className="h-px w-16 md:w-24" style={{ backgroundColor: stroke }} />
        </div>
    );
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
    <section id={id} className="scroll-mt-24 py-8 md:py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-6xl font-script">{title}</h2>

            <LeafDivider className="mt-4" tone="dark" />

            {subtitle &&
                (typeof subtitle === "string" ? (
                    <div
                        className="text-lg md:text-xl text-neutral-600 mt-4 mx-auto max-w-2xl"
                        dangerouslySetInnerHTML={{ __html: subtitle }}
                    />
                ) : (
                    <div className="text-lg md:text-xl text-neutral-600 mt-4 mx-auto max-w-2xl">
                        {subtitle}
                    </div>
                ))}

            <div className="mt-10 md:mt-12">{children}</div>
        </div>
    </section>
);

// =============================
// Confirmación por botón (?guest=) + companionsConfirmed
// =============================
function isoWithOffsetToICSLocal(iso: string) {
    const m = iso.match(
        /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?/
    );
    if (!m) throw new Error("Formato ISO inválido");

    const [, y, mo, d, h, mi, s] = m;
    return `${y}${mo}${d}T${h}${mi}${s ?? "00"}`;
}

function toICSDateUTC(date: Date) {
    const pad = (n: number) => String(n).padStart(2, "0");
    return (
        date.getUTCFullYear() +
        pad(date.getUTCMonth() + 1) +
        pad(date.getUTCDate()) +
        "T" +
        pad(date.getUTCHours()) +
        pad(date.getUTCMinutes()) +
        pad(date.getUTCSeconds()) +
        "Z"
    );
}

function downloadICS({
    title,
    description,
    location,
    startISO,
    endISO,
}: {
    title: string;
    description?: string;
    location?: string;
    startISO: string;
    endISO: string;
}) {
    const dtstart = isoWithOffsetToICSLocal(startISO);
    const dtend = isoWithOffsetToICSLocal(endISO);

    const uid =
        (crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`) + "@wedding";

    const esc = (s = "") =>
        s
            .replace(/\\/g, "\\\\")
            .replace(/\n/g, "\\n")
            .replace(/,/g, "\\,")
            .replace(/;/g, "\\;");

    const ics = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//Wedding Adriana y Eduardo//Calendar//ES",
        "CALSCALE:GREGORIAN",

        "BEGIN:VEVENT",
        `UID:${uid}`,
        `DTSTAMP:${toICSDateUTC(new Date())}`,

        `DTSTART;TZID=America/Merida:${dtstart}`,
        `DTEND;TZID=America/Merida:${dtend}`,

        `SUMMARY:${esc(title)}`,
        location ? `LOCATION:${esc(location)}` : "",
        description ? `DESCRIPTION:${esc(description)}` : "",

        "X-APPLE-DEFAULT-ALARM:FALSE",

        "BEGIN:VALARM",
        "TRIGGER:-P7D",
        "ACTION:DISPLAY",
        "DESCRIPTION:La boda es en 7 días 💍",
        "END:VALARM",

        "END:VEVENT",
        "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "boda-adriana-eduardo.ics";
    document.body.appendChild(a);
    a.click();
    a.remove();

    URL.revokeObjectURL(url);
}


function ConfirmButton({ wedding, onConfirmed }: { wedding: any, onConfirmed?: () => void }) {
    const [codeParam, setCodeParam] = useState<string | null>(null);
    const [guest, setGuest] = useState<any>(null);
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);
    const [companionsConfirmed, setCompanionsConfirmed] = useState<number>(0);

    const maxAllowed =
        Number.isFinite(Number(guest?.companions)) ? Number(guest.companions) : 0;

    const clamp = (value: number) => {
        const v = Number.isFinite(value) ? value : 0;
        return Math.min(Math.max(0, v), maxAllowed);
    };

    useEffect(() => {
        const url = new URL(window.location.href);
        const guestParam = url.searchParams.get("guest");
        if (!guestParam) return;

        setCodeParam(guestParam);

        const fetchGuest = async () => {
            try {
                const res = await fetch(`/api/guests/${guestParam}`, {
                    cache: "no-store",
                });
                const data = await res.json();

                if (res.ok) {
                    setGuest(data);
                    const max = Number(data?.companions ?? 0);
                    setCompanionsConfirmed(Number.isFinite(max) ? max : 0);
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
            setStatus("Tu asistencia ya fue confirmada, te esperamos.");
            onConfirmed?.();
            return;
        }

        setLoading(true);
        setStatus("");

        try {
            const companionsToSend = clamp(companionsConfirmed);

            const res = await fetch(`/api/guests/${guest._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    confirm: true,
                    companionsConfirmed: companionsToSend,
                }),
            });

            if (res.ok) {
                setStatus("Asistencia confirmada.");
                setGuest((g: any) => ({
                    ...g,
                    confirm: true,
                    companionsConfirmed: companionsToSend,
                }));
                onConfirmed?.();
            } else {
                setStatus("Error al confirmar");
            }
        } catch (e) {
            console.error(e);
            setStatus("Error al confirmar");
        } finally {
            setLoading(false);
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

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-3">
                <div className="flex items-center justify-center gap-2">
                    <label htmlFor="companions" className="text-base text-neutral-700">
                        Acompañantes
                    </label>

                    <input
                        id="companions"
                        type="number"
                        inputMode="numeric"
                        min={0}
                        max={maxAllowed}
                        value={companionsConfirmed}
                        onChange={(e) => {
                            const raw = e.target.value;
                            if (raw === "") {
                                setCompanionsConfirmed(0);
                                return;
                            }
                            setCompanionsConfirmed(clamp(Number(raw)));
                        }}
                        className="w-24 rounded-xl border border-neutral-300 bg-white px-3 py-3 text-base outline-none focus:ring-2 focus:ring-neutral-900/20"
                        disabled={loading || !guest?._id}
                    />

                    <span className="text-sm text-neutral-500">máx {maxAllowed}</span>
                </div>

                <button
                    onClick={confirm}
                    disabled={loading || !guest?._id}
                    className="rounded-xl bg-primary text-white px-5 py-3 font-medium hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "Confirmando..." : "Confirmar asistencia"}
                </button>

                <button
                    onClick={() =>
                        downloadICS({
                            title: "Boda de Adriana y Eduardo",
                            description: "Nos vemos para celebrar juntos 💒",
                            location: "Hacienda en Valladolid, Yucatán",
                            startISO: "2026-02-28T16:00:00-06:00",
                            endISO: "2026-02-28T23:50:00-06:00",
                        })
                    }
                    className="rounded-xl border border-neutral-300 px-5 py-3 text-base hover:bg-neutral-50"
                >
                    Agregar al calendario
                </button>


            </div>

            {status && <div className="text-base text-neutral-600">{status}</div>}
        </div>
    );
}

// =============================
// Página
// =============================

// =============================
// Helper: Icon mapping
// =============================
function getItineraryIcon(title: string) {
    const t = (title || "").toLowerCase();
    if (t.includes("ceremonia")) return CeremoniaIcon;
    if (t.includes("memoria") || t.includes("foto") || t.includes("eterna")) return MemoriasIcon;
    if (t.includes("baile") || t.includes("vals") || t.includes("primer")) return ValsIcon;
    if (t.includes("banquete") || t.includes("cena") || t.includes("comida")) return BanqueteIcon;
    if (t.includes("brindis")) return BrindisIconAlt;
    if (t.includes("fiesta")) return FiestaIcon;
    if (t.includes("hasta siempre") || t.includes("amor") || t.includes("despedida")) return DespedidaIcon;
    return null;
}

function CeremonyDateDisplay({ isoDate }: { isoDate: string }) {
    if (!isoDate) return null;
    const date = new Date(isoDate);

    // Mes en español corto mayúsculas (FEB, SEP, etc.)
    const month = date.toLocaleDateString("es-MX", { month: "short" }).toUpperCase().replace(".", "");
    const day = date.getDate();

    // Hora format 12h
    const time = date.toLocaleTimeString("es-MX", { hour: "numeric", minute: "2-digit", hour12: true }).toUpperCase();

    return (
        <div className="flex items-center justify-center gap-6 md:gap-8 font-sans text-neutral-800 mb-6">
            <div className="text-center">
                <div className="text-3xl md:text-5xl font-light leading-none">{day}</div>
                <div className="text-xl md:text-2xl font-light tracking-widest">{month}</div>
            </div>
            <div className="w-px h-16 bg-neutral-400/50"></div>
            <div className="text-center">
                <div className="text-3xl md:text-5xl font-light leading-none">{time.replace(/([AP]\.?M\.?)/gi, '')}</div>
                <div className="text-xl md:text-2xl font-light tracking-widest">{time.match(/([AP]\.?M\.?)/gi)?.[0] || ""}</div>
            </div>
        </div>
    );
}

export default function Page() {
    const [wedding, setWeddingContent] = useState<any>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const mounted = useMounted();

    const countdown = useCountdown("2026-02-28T00:00:00-05:00");

    useEffect(() => {
        fetchWeddingContent().then((data) => {
            setWeddingContent(data);
        });
    }, []);

    return (
        <>
            {wedding && (
                <main className="font-zain text-neutral-900 scroll-smooth bg-[#fbf8f2] relative overflow-hidden">
                    <div className="relative">
                        {/* HERO */}
                        <header className="relative min-h-[100svh] overflow-hidden">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={wedding.hero.imageUrl}
                                alt="Hero"
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40" />

                            <div className="relative z-10 flex flex-col items-center justify-center text-center text-white min-h-[100svh] px-6">


                                <h1 className="font-script text-white text-[48px] lg:text-[56px] xl:text-[86px] leading-none drop-shadow-md mb-6">
                                    {wedding.couple.bride} <span className="mx-3">&</span>{" "}
                                    {wedding.couple.groom}
                                </h1>

                                <p
                                    className="text-lg md:text-xl opacity-95"
                                    suppressHydrationWarning
                                >
                                    {wedding.city}
                                    {wedding.copy.hero.cityVenueSeparator}
                                    {wedding.venue.name}
                                </p>

                                <div
                                    className="mt-6 grid grid-flow-col gap-3 text-center"
                                    suppressHydrationWarning
                                >
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
                                                <div className="text-[10px] md:text-xs opacity-90">
                                                    {label}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="mt-4 text-lg opacity-90" suppressHydrationWarning>
                                    {wedding.dateLabel} • {wedding.hero.hashtag}
                                </div>
                            </div>

                            <svg
                                className="absolute bottom-[-1px] left-0 w-full"
                                viewBox="0 0 1440 120"
                                preserveAspectRatio="none"
                            >
                                <path
                                    fill="#fbf8f2"
                                    d="M0,64L60,74.7C120,85,240,107,360,106.7C480,107,600,85,720,80C840,75,960,85,1080,80C1200,75,1320,53,1380,42.7L1440,32L1440,120L0,120Z"
                                />
                            </svg>
                        </header>

                        {/* Historia (centrado + imagen con overlay, sin bordes) */}
                        <Section
                            id="historia"
                            title={wedding.copy.story.title}
                            subtitle={wedding.copy.story.subtitle}
                        >
                            <div className="max-w-5xl mx-auto">
                                <div className="grid lg:grid-cols-2 gap-10 items-center">
                                    <div className="order-2 lg:order-1 text-center lg:text-left">
                                        <div className="space-y-4 text-neutral-700 leading-relaxed">
                                            {wedding.copy.story.paragraphs.map((text: any, idx: number) => (
                                                <p key={`${idx}-${text}`} className="text-lg md:text-xl">
                                                    {text}
                                                </p>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="order-1 lg:order-2">
                                        <div className="relative overflow-hidden rounded-[28px] mx-auto max-w-xl">
                                            <div className="relative w-full aspect-[16/10]">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                    src={wedding.images.storyUrl}
                                                    alt="couple"
                                                    className="absolute inset-0 h-full w-full object-cover"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/5 to-transparent" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Section>




                        {/* Ceremonia */}
                        <Section id="ceremonia" title={wedding.copy.ceremony.title}>
                            <div className="max-w-5xl mx-auto">
                                <div className="grid gap-10 items-center">
                                    <div className="order-1">
                                        <div className="relative overflow-hidden rounded-[28px] mx-auto max-w-xl">
                                            <div className="relative w-full aspect-[16/10]">
                                                <img
                                                    src={wedding.copy.ceremony.imageUrl}
                                                    alt="Ceremonia"
                                                    className="absolute inset-0 h-full w-full object-cover"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/5 to-transparent" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="order-2 text-center">
                                        {/* Nueva fecha con diseño */}
                                        <div className="flex justify-center mb-6">
                                            <CeremonyDateDisplay isoDate={wedding.dateISO} />
                                        </div>

                                        <div className="space-y-4 text-neutral-700 leading-relaxed">
                                            {/* Primer párrafo solamente */}
                                            {Array.isArray(wedding.copy.ceremony.paragraphs) &&
                                                wedding.copy.ceremony.paragraphs.length > 0 && (
                                                    <p className="text-lg md:text-xl">
                                                        {wedding.copy.ceremony.paragraphs[0]}
                                                    </p>
                                                )}
                                        </div>

                                        {wedding.venue?.mapsQuery && (
                                            <div className="mt-8 flex justify-center">
                                                <a
                                                    href={wedding.venue.mapsQuery}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="inline-flex items-center justify-center rounded-2xl bg-primary text-white px-6 py-3 text-base font-medium hover:bg-primary-dark transition"
                                                >
                                                    Ver ubicación
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Section>

                        {/* Código de vestimenta (centrado) */}
                        <Section
                            id="codigo-de-vestimenta"
                            title={wedding.copy.itinerary.dressCodeTitle}
                            subtitle={wedding.copy.itinerary.dressCodeSubtitle}
                        >
                            <div className="max-w-5xl mx-auto">
                                <div className="grid md:grid-cols-2 gap-10 text-center">
                                    <div className="space-y-3">
                                        <div className="font-medium text-neutral-800">
                                            {wedding.copy.itinerary.womenTitle}
                                        </div>
                                        <p className="text-lg text-neutral-700">
                                            {wedding.copy.itinerary.womenDescription}
                                        </p>
                                        <div className="flex flex-wrap gap-2 mt-2 justify-center">
                                            {wedding.colors.womenPalette.map((c: any) => (
                                                <span
                                                    key={c}
                                                    className="w-6 h-6 rounded-full border border-white shadow-sm"
                                                    style={{ backgroundColor: c }}
                                                />
                                            ))}
                                        </div>
                                        <p className="text-sm text-neutral-500">
                                            {wedding.copy.itinerary.womenForbidden}
                                        </p>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="font-medium text-neutral-800">
                                            {wedding.copy.itinerary.menTitle}
                                        </div>
                                        <p className="text-lg text-neutral-700">
                                            {wedding.copy.itinerary.menDescription}
                                        </p>
                                        <div className="flex flex-wrap gap-2 mt-2 justify-center">
                                            {wedding.colors.menPalette.map((c: any) => (
                                                <span
                                                    key={c}
                                                    className="w-6 h-6 rounded-full border border-white shadow-sm"
                                                    style={{ backgroundColor: c }}
                                                />
                                            ))}
                                        </div>
                                        <p className="text-sm text-neutral-500">
                                            {wedding.copy.itinerary.menForbidden}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-10 mx-auto w-11/12 lg:w-2/3 flex justify-center">
                                    <img
                                        src={wedding.copy.itinerary.imageUrl}
                                        alt="dresscode"
                                        className="w-full h-auto"
                                    />
                                </div>
                            </div>
                        </Section>

                        {/* Itinerario (centrado) */}
                        <Section
                            id="itinerario"
                            title={wedding.copy.itinerary.title}
                            subtitle={wedding.copy.itinerary.subtitle}
                        >
                            <div className="max-w-3xl mx-auto">
                                <div className="">
                                    {wedding.schedule.map((item: any, idx: number) => {
                                        const Icon = getItineraryIcon(item.title);
                                        const isLast = idx === wedding.schedule.length - 1;

                                        return (
                                            <div key={`${item.time}-${idx}`} className="flex gap-6 relative">
                                                {/* Linea conectora (absolute centered on icon column) */}
                                                {!isLast && (
                                                    <div className="absolute left-[24px] top-[48px] bottom-0 w-px bg-neutral-800/80" />
                                                )}

                                                <div className="flex flex-col items-center flex-shrink-0 w-12">
                                                    {Icon ? (
                                                        <Icon className="w-8 h-8 text-[#5a6c32]" />
                                                    ) : (
                                                        <div className="w-12 h-12 rounded-full bg-neutral-200" />
                                                    )}
                                                </div>

                                                <div className="pb-6  text-left">
                                                    <div className=" font-bold text-lg text-[#5a6c32] uppercase">
                                                        {item.time}
                                                    </div>
                                                    <div className=" font-light text-lg tracking-wide text-[#c49a82]">
                                                        {item.title}
                                                    </div>
                                                    {item.note && (
                                                        <div className="text-lg text-neutral-600 leading-relaxed">
                                                            {item.note}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>


                            </div>
                        </Section>

                        {/* Hotel (centrado) */}
                        <Section id="hotel" title={wedding.copy.hotel.title}>
                            <div className="max-w-5xl mx-auto">
                                <div className="grid lg:grid-cols-2 gap-10 items-center">
                                    <div className="order-2 lg:order-1 text-center lg:text-left">
                                        <div className="space-y-4 text-lg md:text-xl text-neutral-700 leading-relaxed">
                                            <p>{wedding.copy.hotel.subtitle}</p>

                                            {wedding.copy.hotel.price && (
                                                <p className="flex items-center justify-center lg:justify-start">
                                                    <FaDollarSign />{" "}
                                                    <span className="ml-2">{wedding.copy.hotel.price}</span>
                                                </p>
                                            )}

                                            {wedding.copy.hotel.link && (
                                                <p className="flex items-center justify-center lg:justify-start">
                                                    <FaLink />{" "}
                                                    <a
                                                        className="ml-2 underline"
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        href={wedding.copy.hotel.link}
                                                    >
                                                        {wedding.copy.hotel.linkTitle}
                                                    </a>
                                                </p>
                                            )}

                                            {wedding.copy.hotel.number && (
                                                <p className="flex items-center justify-center lg:justify-start">
                                                    <FaPhone />{" "}
                                                    <a
                                                        className="ml-2 underline"
                                                        href={`tel:${String(wedding.copy.hotel.number).replace(
                                                            /\D/g,
                                                            ""
                                                        )}`}
                                                    >
                                                        {wedding.copy.hotel.number}
                                                    </a>
                                                </p>
                                            )}

                                            {wedding.copy.hotel.whatsapp && (
                                                <p className="flex items-center justify-center lg:justify-start">
                                                    <FaWhatsapp />{" "}
                                                    <a
                                                        className="ml-2 underline"
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        href={`https://wa.me/52${String(
                                                            wedding.copy.hotel.whatsapp
                                                        ).replace(/\D/g, "")}`}
                                                    >
                                                        {wedding.copy.hotel.whatsapp}
                                                    </a>
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="order-1 lg:order-2">
                                        <div className="relative overflow-hidden rounded-[28px] mx-auto max-w-xl">
                                            <div className="relative w-full aspect-[16/10]">
                                                <img
                                                    src={wedding.copy.hotel.imageUrl}
                                                    alt="Hotel"
                                                    className="absolute inset-0 h-full w-full object-cover"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/5 to-transparent" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Section>

                        {/* Luna de miel (centrado) */}
                        <Section
                            id="luna-de-miel"
                            title={wedding.copy.honeymoon.title}
                            subtitle={wedding.copy.honeymoon.subtitle}
                        >
                            <div className="max-w-5xl mx-auto">
                                <div className="grid lg:grid-cols-2 gap-10 items-center">
                                    <div className="order-1 ">
                                        <div className="relative overflow-hidden rounded-[28px] mx-auto max-w-xl">
                                            <div className="relative w-full aspect-[16/10]">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                    src={wedding.images.honeymoonBoxUrl}
                                                    alt="Caja de los deseos"
                                                    className="absolute inset-0 h-full w-full object-cover"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/5 to-transparent" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="order-2  text-center lg:text-left">
                                        <div className="space-y-4 text-lg md:text-xl text-neutral-700 leading-relaxed">
                                            <p>{wedding.copy.honeymoon.paragraph1}</p>

                                            <p>
                                                {wedding.copy.honeymoon.paragraph2
                                                    ?.split(/(\*[^*]+\*)/g)
                                                    .map((chunk: string, idx: number) => {
                                                        const isWrapped =
                                                            chunk.startsWith("*") && chunk.endsWith("*");
                                                        if (!isWrapped) {
                                                            return <React.Fragment key={idx}>{chunk}</React.Fragment>;
                                                        }
                                                        const text = chunk.slice(1, -1);
                                                        return (
                                                            <span key={idx} className="font-semibold text-neutral-900">
                                                                {text}
                                                            </span>
                                                        );
                                                    })}
                                            </p>

                                            <div className="flex flex-wrap gap-6 items-center lg:justify-start justify-center">
                                                <a
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="underline"
                                                    href={wedding.copy.honeymoon.linkAmazon}
                                                >
                                                    {wedding.copy.honeymoon.textAmazon}
                                                </a>

                                                <a
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="underline"
                                                    href={wedding.copy.honeymoon.linkLiverpool}
                                                >
                                                    {wedding.copy.honeymoon.textLiverpool}
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </Section>

                        {/* Galería / Photoapp (centrado) */}
                        <Section id="galeria" title={wedding.copy.photoapp.title} subtitle="Queremos que no te pierdas ningún detalle, por eso hemos creado un álbum en Dots Memories. Te pedimos un favor especial: <b>sube ahí todas las fotos y vídeos que tomes.</b> Nos hará mucha ilusión reunir esos recuerdos. <br> <br>Te recomendamos descargar la app y acceder al álbum antes del evento.">
                            <div className="max-w-3xl mx-auto">
                                <div className="flex flex-col items-center">
                                    <img
                                        src={wedding.copy.photoapp.imageUrl}
                                        alt="Hero"
                                        className="w-60"
                                    />
                                    <div className="mt-12">
                                        <a
                                            href={wedding.copy.photoapp.link}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="rounded-2xl bg-primary text-white px-6 py-3 text-base font-medium hover:bg-primary-dark transition"
                                        >
                                            Descargar
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </Section>

                        {/* RSVP */}
                        <Section
                            id="rsvp"
                            title={wedding.copy.rsvp.title}
                            subtitle={wedding.copy.rsvp.subtitle}
                        >
                            <ConfirmButton wedding={wedding} onConfirmed={() => setShowModal(true)} />

                            <div className="mt-8 mb-2 flex justify-center opacity-80">
                                <img
                                    src={wedding.images.thanksUrl}
                                    alt="Logo final"
                                    className="w-32 md:w-40 h-auto object-contain"
                                />
                            </div>
                            <p className="italic text-neutral-600 mb-8">
                                {wedding.copy.honeymoon.signature
                                    .split("\n")
                                    .map((line: any, idx: number) => (
                                        <React.Fragment key={idx}>
                                            {line}
                                            <br />
                                        </React.Fragment>
                                    ))}
                            </p>
                        </Section>

                        {/* Modal gracias */}
                        {showModal && (
                            <div
                                className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 px-6"
                                onClick={() => setShowModal(false)}
                                role="button"
                                aria-label="Cerrar"
                            >
                                <div
                                    className="relative w-full max-w-md"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <div className="rounded-[32px] bg-[#fbf8f2] px-8 py-10 text-center shadow-2xl">
                                        {/* Título */}
                                        <h3 className="font-script text-[42px] md:text-[48px] text-neutral-900 leading-none">
                                            Muchas gracias
                                        </h3>

                                        {/* Separador sutil */}
                                        <div className="mx-auto my-5 h-px w-20 bg-neutral-300/70" />

                                        {/* Mensaje */}
                                        <p className="text-neutral-700 text-lg md:text-xl leading-relaxed">
                                            Tu asistencia quedó confirmada,
                                            <br />
                                            nos vemos el <span className="font-medium">28 de febrero</span>.
                                        </p>

                                        {/* CTA cerrar */}
                                        <button
                                            type="button"
                                            onClick={() => setShowModal(false)}
                                            className="mt-8 inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-medium text-white hover:bg-primary-dark transition"
                                        >
                                            Cerrar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </main>
            )}
        </>
    );
}

