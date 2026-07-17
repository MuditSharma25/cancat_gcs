/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        space: {
          950: "#050810",
          900: "#0a0e1a",
          850: "#0d1220",
          800: "#111827",
          700: "#1a2236",
          600: "#243049",
        },
        signal: {
          green: "#34d399",
          orange: "#fb923c",
          red: "#f87171",
          yellow: "#facc15",
        },
      },
      fontFamily: {
        display: ["'Orbitron'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
        body: ["'Inter'", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 20px rgba(34, 211, 238, 0.15)",
        "glow-green": "0 0 20px rgba(52, 211, 153, 0.2)",
        "glow-red": "0 0 25px rgba(248, 113, 113, 0.25)",
        "glow-orange": "0 0 20px rgba(251, 146, 60, 0.2)",
      },
      keyframes: {
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
      },
      animation: {
        scan: "scan 3s linear infinite",
      },
    },
  },
  plugins: [],
};
