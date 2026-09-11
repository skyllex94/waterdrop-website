import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        deep: "#050B1E",
        abyss: "#0A1430",
        aqua: "#22D3EE",
        drop: "#0EA5E9",
        foam: "#E0F2FE",
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Inter", "Roboto", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 60px -10px rgba(34,211,238,.55)",
        card: "0 20px 60px -20px rgba(2,132,199,.45)",
      },
    },
  },
  plugins: [],
};

export default config;
