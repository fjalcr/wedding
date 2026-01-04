import React from "react";

const GOLD = "#C8A75E";

export const CeremoniaIcon = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <g transform="translate(12, 12) scale(1.4) translate(-12, -7)">
            <path
                d="M9 11C11.7614 11 14 8.76142 14 6C14 3.23858 11.7614 1 9 1C6.23858 1 4 3.23858 4 6C4 8.76142 6.23858 11 9 11Z"
                stroke={GOLD}
                strokeWidth="1.1"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M15 13C17.7614 13 20 10.7614 20 8C20 5.23858 17.7614 3 15 3C14.07 3 13.21 3.25 12.46 3.7C13.41 4.26 14 5.26 14 6C14 7.28 13 8.36 11.72 8.84C11.96 11.18 13.33 13 15 13Z"
                stroke={GOLD}
                strokeWidth="1.1"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M7.46997 9.38002C6.91997 10.3 5.95001 10.93 4.82001 10.99C4.94001 10.99 5.06 11 5.18 11H8.99999C9.12999 11 9.25001 10.99 9.36001 10.98C8.50001 10.63 7.82997 9.99002 7.46997 9.38002Z"
                fill={GOLD}
            />
            <path
                d="M9 11C11.7614 11 14 8.76142 14 6C14 5.26 13.41 4.26 12.46 3.7C11.71 3.25 10.85 3 9.92 3C7.16 3 4.92 5.24 4.92 8C4.92 9.17 5.32 10.24 6 11.1"
                stroke={GOLD}
                strokeWidth="1.1"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </g>
    </svg>
);

export const MemoriasIcon = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        stroke={GOLD}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M23 19C23 19.5304 22.7893 20.0391 22.4142 20.4142C22.0391 20.7893 21.5304 21 21 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V8C1 7.46957 1.21071 6.96086 1.58579 6.58579C1.96086 6.21071 2.46957 6 3 6H7L9 3H15L17 6H21C21.5304 6 22.0391 6.21071 22.4142 6.58579C22.7893 6.96086 23 7.46957 23 8V19Z" />
        <path d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z" />
    </svg>
);

export const ValsIcon = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        stroke={GOLD}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M9 18V5L21 3V16" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
    </svg>
);

export const BanqueteIcon = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        stroke={GOLD}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M3 2V22" />
        <path d="M21 2V22" />
        <path d="M15 2V8C15 9.657 13.657 11 12 11C10.343 11 9 9.657 9 8V2" />
        <path d="M12 11V22" />
        <path d="M21 16H3" />
    </svg>
);

export const BrindisIcon = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        stroke={GOLD}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M8 22H16" />
        <path d="M12 15V22" />
        <path d="M5.525 2L4 15H20L18.475 2" />
        <path d="M4 11H20" />
        <path d="M12 2V22" strokeOpacity="0" />
        <path d="M8 6H16" />
    </svg>
);

// Better icons for Toast (two glasses clinking)
export const BrindisIconAlt = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.3 11C6.3 13.8 8.1 14.5 9 15C9.9 14.5 11.7 13.8 11.7 11V3H6.3V11Z" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 15V21" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 21H13" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M17.7 11C17.7 13.8 15.9 14.5 15 15C14.1 14.5 12.3 13.8 12.3 11V3H17.7V11Z" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15 15V21" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M11 21H19" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 5H12" stroke={GOLD} strokeWidth="1" strokeLinecap="round" />
        <path d="M12 5H18" stroke={GOLD} strokeWidth="1" strokeLinecap="round" />
    </svg>
)


export const FiestaIcon = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        stroke={GOLD}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M12 2L14.2451 9.75486L22 12L14.2451 14.2451L12 22L9.75486 14.2451L2 12L9.75486 9.75486L12 2Z" />
        <circle cx="12" cy="12" r="3" strokeOpacity="1" />
    </svg>
);

export const DespedidaIcon = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        stroke={GOLD}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M19 14C20.49 14 21.72 13.11 22.44 11.69L23 10C23 10 23 10 23 10H1L1.56 11.69C2.28 13.11 3.51 14 5 14H19Z" />
        <path d="M5 14V17C5 17.55 5.45 18 6 18H7C7.55 18 8 17.55 8 17V15H16V17C16 17.55 16.45 18 17 18H18C18.55 18 19 17.55 19 17V14" />
        <path d="M21 10H3L4 5H20L21 10Z" />
        <path d="M12 7C14.2091 7 16 5.20914 16 3C16 0.790861 14.2091 -1 12 -1C9.79086 -1 8 0.790861 8 3C8 5.20914 9.79086 7 12 7Z" transform="translate(0 2)" stroke={GOLD} />
    </svg>
);
