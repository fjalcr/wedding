import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#778c43",
          dark: "#667839",
        },
      },
      fontFamily: {
        script: ["var(--font-rouge-script)", "cursive"],
        zain: ["var(--font-zain)", "sans-serif"],
        serif: ["'Playfair Display'", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;

