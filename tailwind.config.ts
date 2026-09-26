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
        polar: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#031a2e',
        },
        navy: {
          800: '#0b132b',
          900: '#070b19',
          950: '#03050d',
        },
        aurora: {
          cyan: '#00f2fe',
          teal: '#4facfe',
          green: '#00ffb3',
          purple: '#7f00ff',
        }
      },
      backgroundImage: {
        'polar-grid': "radial-gradient(circle at center, rgba(14, 165, 233, 0.08) 1px, transparent 1px)",
        'glass-gradient': "linear-gradient(135deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.02) 100%)",
        'aurora-glow': "radial-gradient(ellipse at top, rgba(0, 242, 254, 0.15), rgba(7, 11, 25, 0))",
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -5px rgba(0, 242, 254, 0.4)',
        'glow-ice': '0 0 35px -5px rgba(56, 189, 248, 0.3)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 3s infinite ease-in-out',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.03)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
