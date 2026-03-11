import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: {
          50: "#FFF7E6",
          100: "#FFECC2",
          200: "#FFD98A",
          300: "#FFC552",
          400: "#FFB21F",
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
          800: "#92400E",
          900: "#78350F",
        },
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255,255,255,0.08), 0 18px 60px rgba(0,0,0,0.55), 0 0 60px rgba(245,158,11,0.10)",
      },
    },
  },
  plugins: [],
} satisfies Config;

