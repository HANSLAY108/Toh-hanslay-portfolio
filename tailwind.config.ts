import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#ffffff",
        foreground: "#201a16",
        linen: "#faf8f5",
        parchment: "#f6f3ee",
        sand: {
          50: "#faf8f5",
          100: "#f4f0e8",
          200: "#eae2d5",
          300: "#ded2c0",
          400: "#c7b49e",
          500: "#a9937c",
        },
        brown: {
          50: "#f7f5f2",
          100: "#ede7e1",
          200: "#dbd0c4",
          300: "#bfada0",
          400: "#9e8677",
          500: "#7d6657",
          600: "#634f43",
          700: "#4e3e35",
          800: "#362b25",
          900: "#201a16",
          950: "#14100e",
        },
        accent: {
          light: "#f2ede4",
          DEFAULT: "#8c786a",
          dark: "#201a16",
        },
        border: {
          light: "#f0ece4",
          DEFAULT: "#e8e2d9",
          dark: "#d5cbbe",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "Inter", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      borderRadius: {
        arch: "160px 160px 24px 24px",
      },
      boxShadow: {
        subtle: "0 1px 3px rgba(32, 26, 22, 0.05), 0 10px 25px -5px rgba(32, 26, 22, 0.03)",
        card: "0 4px 20px -2px rgba(32, 26, 22, 0.06)",
        hover: "0 12px 30px -4px rgba(32, 26, 22, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
