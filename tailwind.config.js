/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: 'var(--color-border)', // gray-200
        input: 'var(--color-input)', // white
        ring: 'var(--color-ring)', // teal-500
        background: 'var(--color-background)', // gray-50
        foreground: 'var(--color-foreground)', // gray-900
        primary: {
          DEFAULT: 'var(--color-primary)', // teal-500
          foreground: 'var(--color-primary-foreground)' // white
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)', // blue-500
          foreground: 'var(--color-secondary-foreground)' // white
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', // red-500
          foreground: 'var(--color-destructive-foreground)' // white
        },
        muted: {
          DEFAULT: 'var(--color-muted)', // gray-100
          foreground: 'var(--color-muted-foreground)' // gray-600
        },
        accent: {
          DEFAULT: 'var(--color-accent)', // emerald-400
          foreground: 'var(--color-accent-foreground)' // gray-900
        },
        popover: {
          DEFAULT: 'var(--color-popover)', // white
          foreground: 'var(--color-popover-foreground)' // gray-900
        },
        card: {
          DEFAULT: 'var(--color-card)', // white
          foreground: 'var(--color-card-foreground)' // gray-900
        },
        success: {
          DEFAULT: 'var(--color-success)', // green-400
          foreground: 'var(--color-success-foreground)' // white
        },
        warning: {
          DEFAULT: 'var(--color-warning)', // orange-400
          foreground: 'var(--color-warning-foreground)' // white
        },
        error: {
          DEFAULT: 'var(--color-error)', // red-500
          foreground: 'var(--color-error-foreground)' // white
        },
        // Brand-specific colors
        'medical-trust': 'var(--color-medical-trust)', // teal-500
        'ai-intelligence': 'var(--color-ai-intelligence)', // blue-500
        'health-success': 'var(--color-health-success)', // emerald-400
        'conversion-accent': 'var(--color-conversion-accent)', // orange-500
        'text-primary': 'var(--color-text-primary)', // gray-900
        'text-secondary': 'var(--color-text-secondary)', // gray-600
        'surface': 'var(--color-surface)' // white
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        inter: ['Inter', 'sans-serif']
      },
      fontSize: {
        'hero': ['3rem', { lineHeight: '1.1', fontWeight: '700' }], // 48px
        'value-prop': ['2.25rem', { lineHeight: '1.2', fontWeight: '600' }], // 36px
        'section-title': ['1.875rem', { lineHeight: '1.3', fontWeight: '600' }], // 30px
        'card-title': ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }], // 20px
        'body-large': ['1.125rem', { lineHeight: '1.6', fontWeight: '400' }], // 18px
        'body': ['1rem', { lineHeight: '1.6', fontWeight: '400' }], // 16px
        'body-small': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }], // 14px
        'caption': ['0.75rem', { lineHeight: '1.4', fontWeight: '400' }] // 12px
      },
      spacing: {
        '18': '4.5rem', // 72px
        '88': '22rem', // 352px
        '128': '32rem', // 512px
        '144': '36rem', // 576px
      },
      borderRadius: {
        'medical': '12px',
        'organic': '40% 60% 70% 30%'
      },
      boxShadow: {
        'medical': '0 8px 32px rgba(32, 178, 170, 0.15)',
        'trust': '0 20px 40px rgba(0, 0, 0, 0.1)',
        'conversion': '0 8px 32px rgba(32, 178, 170, 0.3)',
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      },
      animation: {
        'health-pulse': 'healthPulse 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite',
        'predictive-flow': 'predictiveFlow 3s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out'
      },
      keyframes: {
        healthPulse: {
          '0%, 100%': {
            opacity: '1',
            transform: 'scale(1)'
          },
          '50%': {
            opacity: '0.8',
            transform: 'scale(1.02)'
          }
        },
        predictiveFlow: {
          '0%': {
            'stroke-dasharray': '0 100',
            'stroke-dashoffset': '0'
          },
          '50%': {
            'stroke-dasharray': '50 50',
            'stroke-dashoffset': '-25'
          },
          '100%': {
            'stroke-dasharray': '100 0',
            'stroke-dashoffset': '-100'
          }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { 
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        scaleIn: {
          '0%': { 
            opacity: '0',
            transform: 'scale(0.95)'
          },
          '100%': { 
            opacity: '1',
            transform: 'scale(1)'
          }
        }
      },
      backdropBlur: {
        'medical': '10px'
      },
      transitionTimingFunction: {
        'medical': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      },
      screens: {
        'xs': '475px',
        '3xl': '1920px'
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('tailwindcss-animate')
  ],
}