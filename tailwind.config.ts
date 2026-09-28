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
        'polar-grid': "radial-gradient(circle at center, rgba(99, 102, 241, 0.08) 1px, transparent 1px)",
        'glass-gradient': "linear-gradient(135deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.02) 100%)",
        'aurora-glow': "radial-gradient(ellipse at top, rgba(6, 182, 212, 0.15), rgba(11, 16, 32, 0))",
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -5px rgba(6, 182, 212, 0.4)',
        'glow-indigo': '0 0 25px -5px rgba(99, 102, 241, 0.4)',
        'glow-ice': '0 0 35px -5px rgba(99, 102, 241, 0.3)',
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
