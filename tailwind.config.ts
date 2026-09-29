import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Architecture: Single source of truth mapped directly to CSS Design Tokens in globals.css
        bg: {
          main: 'rgb(var(--bg-main) / <alpha-value>)',
          secondary: 'rgb(var(--bg-secondary) / <alpha-value>)',
        },
        surface: {
          DEFAULT: 'rgb(var(--surface) / <alpha-value>)',
          hover: 'rgb(var(--surface-hover) / <alpha-value>)',
        },
        brand: {
          primary: 'rgb(var(--primary) / <alpha-value>)',
          'primary-hover': 'rgb(var(--primary-hover) / <alpha-value>)',
          accent: 'rgb(var(--accent) / <alpha-value>)',
          purple: 'rgb(var(--purple) / <alpha-value>)',
        },
        semantic: {
          success: 'rgb(var(--success) / <alpha-value>)',
          warning: 'rgb(var(--warning) / <alpha-value>)',
          danger: 'rgb(var(--danger) / <alpha-value>)',
        },
        content: {
          main: 'rgb(var(--text-main) / <alpha-value>)',
          muted: 'rgb(var(--text-muted) / <alpha-value>)',
        },
        stroke: {
          DEFAULT: 'rgb(var(--border) / <alpha-value>)',
        },
        // Legacy design tokens mapped to CSS Design Tokens for 100% component compatibility
        polar: {
          50: 'rgb(var(--bg-secondary) / <alpha-value>)',
          100: 'rgb(var(--bg-secondary) / <alpha-value>)',
          200: 'rgb(var(--text-muted) / <alpha-value>)',
          300: 'rgb(var(--text-muted) / <alpha-value>)',
          400: 'rgb(var(--accent) / <alpha-value>)',
          500: 'rgb(var(--primary) / <alpha-value>)',
          600: 'rgb(var(--primary) / <alpha-value>)',
          700: 'rgb(var(--primary-hover) / <alpha-value>)',
          800: 'rgb(var(--text-main) / <alpha-value>)',
          900: 'rgb(var(--surface) / <alpha-value>)',
          950: 'rgb(var(--bg-main) / <alpha-value>)',
        },
        navy: {
          800: 'rgb(var(--surface) / <alpha-value>)',
          900: 'rgb(var(--surface) / <alpha-value>)',
          950: 'rgb(var(--bg-main) / <alpha-value>)',
        },
        aurora: {
          cyan: 'rgb(var(--accent) / <alpha-value>)',
          teal: 'rgb(var(--accent) / <alpha-value>)',
          green: 'rgb(var(--success) / <alpha-value>)',
          purple: 'rgb(var(--purple) / <alpha-value>)',
        }
      },
      backgroundImage: {
        'polar-grid': "radial-gradient(circle at center, rgba(2, 132, 199, 0.08) 1px, transparent 1px)",
        'glacier-daylight': "linear-gradient(135deg, #2FA0C6 0%, #3FBBE5 50%, #58C9F3 100%)",
        'seaguard-deep': "linear-gradient(180deg, #1C4E75 0%, #0D3252 50%, #061826 100%)",
        'glass-gradient': "linear-gradient(135deg, rgba(255, 255, 255, 0.60) 0%, rgba(255, 255, 255, 0.20) 100%)",
        'aurora-glow': "radial-gradient(ellipse at top, rgba(88, 201, 243, 0.25), transparent)",
      },
      boxShadow: {
        'card-glass': '0 20px 45px -10px rgba(12, 74, 110, 0.16), 0 0 25px 0 rgba(255, 255, 255, 0.7), inset 0 2px 4px 0 rgba(255, 255, 255, 1)',
        'seaguard-deep': '0 30px 70px -15px rgba(0, 10, 30, 0.7), 0 0 30px 0 rgba(56, 189, 248, 0.15), inset 0 1px 2px 0 rgba(255, 255, 255, 0.25)',
        'glow-cyan': '0 0 20px rgba(56, 189, 248, 0.5), inset 0 1px 2px rgba(255, 255, 255, 0.8)',
        'glow-red': '0 0 15px rgba(239, 68, 68, 0.6)',
        'glow-indigo': '0 0 25px -5px rgba(2, 132, 199, 0.4)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 3s infinite ease-in-out',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.03)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      }
    },
  },
  plugins: [],
};
export default config;
