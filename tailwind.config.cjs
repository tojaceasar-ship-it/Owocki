/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--color-border)", // gray-900
        input: "var(--color-input)", // gray-900
        ring: "var(--color-ring)", // yellow-400
        background: "var(--color-background)", // black
        foreground: "var(--color-foreground)", // white
        primary: {
          DEFAULT: "var(--color-primary)", // yellow-400
          foreground: "var(--color-primary-foreground)", // black
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", // cyan-400
          foreground: "var(--color-secondary-foreground)", // black
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", // red-400
          foreground: "var(--color-destructive-foreground)", // white
        },
        muted: {
          DEFAULT: "var(--color-muted)", // gray-800
          foreground: "var(--color-muted-foreground)", // gray-400
        },
        accent: {
          DEFAULT: "var(--color-accent)", // orange-600
          foreground: "var(--color-accent-foreground)", // white
        },
        popover: {
          DEFAULT: "var(--color-popover)", // gray-900
          foreground: "var(--color-popover-foreground)", // white
        },
        card: {
          DEFAULT: "var(--color-card)", // gray-900
          foreground: "var(--color-card-foreground)", // white
        },
        success: {
          DEFAULT: "var(--color-success)", // green-500
          foreground: "var(--color-success-foreground)", // black
        },
        warning: {
          DEFAULT: "var(--color-warning)", // orange-400
          foreground: "var(--color-warning-foreground)", // black
        },
        error: {
          DEFAULT: "var(--color-error)", // red-400
          foreground: "var(--color-error-foreground)", // white
        },
        surface: {
          DEFAULT: "var(--color-surface)", // gray-900
          foreground: "var(--color-surface-foreground)", // white
        },
        "text-primary": "var(--color-text-primary)", // white
        "text-secondary": "var(--color-text-secondary)", // gray-400
      },
      fontFamily: {
        headline: ['Orbitron', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        cta: ['Rajdhani', 'sans-serif'],
        accent: ['Bungee', 'cursive'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        'neon-sm': '0 0 10px rgba(255, 215, 0, 0.3)',
        'neon': '0 0 20px rgba(255, 215, 0, 0.3)',
        'neon-lg': '0 0 40px rgba(255, 215, 0, 0.3)',
        'neon-secondary': '0 0 20px rgba(0, 206, 209, 0.3)',
        'neon-accent': '0 0 20px rgba(255, 69, 0, 0.3)',
        'street-light': '0 0 60px rgba(255, 215, 0, 0.1)',
      },
      animation: {
        'neon-pulse': 'neon-pulse 2s ease-in-out infinite',
        'glitch': 'glitch 0.1s ease-in-out',
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      keyframes: {
        'neon-pulse': {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(255, 215, 0, 0.3), 0 0 40px rgba(255, 215, 0, 0.2), 0 0 60px rgba(255, 215, 0, 0.1)'
          },
          '50%': {
            boxShadow: '0 0 20px rgba(255, 215, 0, 0.6), 0 0 40px rgba(255, 215, 0, 0.4), 0 0 60px rgba(255, 215, 0, 0.2)'
          }
        },
        glitch: {
          '0%': { transform: 'skew(0deg)', filter: 'hue-rotate(0deg)' },
          '10%': { transform: 'skew(-2deg)', filter: 'hue-rotate(90deg)' },
          '20%': { transform: 'skew(2deg)', filter: 'hue-rotate(180deg)' },
          '30%': { transform: 'skew(-1deg)', filter: 'hue-rotate(270deg)' },
          '40%': { transform: 'skew(1deg)', filter: 'hue-rotate(360deg)' },
          '50%': { transform: 'skew(0deg)', filter: 'hue-rotate(0deg)' },
          '100%': { transform: 'skew(0deg)', filter: 'hue-rotate(0deg)' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        }
      },
      backdropBlur: {
        xs: '2px',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      }
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}