import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          red: "#E50914",
          gold: "#F5C518",
          dark: "#0F0F0F",
          darker: "#080808",
          card: "#1A1A1A",
          muted: "#8B8B8B",
        },
        tomato: {
          fresh: "#FA320A",
          rotten: "#6B7280",
        },
      },
      fontFamily: {
        sans: ['"Noto Sans SC"', "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
