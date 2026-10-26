/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: "#0F172A",
        anthracite: "#475569",
        "ice-panel": "#F8FAFC",
        neon: {
          orange: "#FF5500",
          "orange-hover": "#FF6B1A",
          mint: "#10B981",
          volt: "#84CC16",
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'clean-card': '0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.04)',
        'clean-hover': '0 20px 30px -10px rgba(15, 23, 42, 0.08), 0 10px 15px -3px rgba(15, 23, 42, 0.04)',
        'neon-orange': '0 0 20px rgba(255, 85, 0, 0.28), 0 4px 12px rgba(255, 85, 0, 0.2)',
        'neon-orange-hover': '0 0 30px rgba(255, 85, 0, 0.45), 0 6px 18px rgba(255, 85, 0, 0.25)',
        'mint-glow': '0 0 15px rgba(16, 185, 129, 0.25)',
      },
      animation: {
        'pulse-slow': 'pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.2s ease-out forwards',
        'scale-up': 'scaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleUp: {
          '0%': { opacity: '0', transform: 'scale(0.97) translateY(8px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
