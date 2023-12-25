/** @type {import('tailwindcss').Config} */
import typographyPlugin from '@tailwindcss/typography'
import typographyStyles from './typography'
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    fontSize: {
      xs: ['0.8125rem', { lineHeight: '1.5rem' }],
      sm: ['0.875rem', { lineHeight: '1.5rem' }],
      base: ['1rem', { lineHeight: '1.75rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '2rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2rem', { lineHeight: '2.5rem' }],
      '5xl': ['3rem', { lineHeight: '3.5rem' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
      '7xl': ['4.5rem', { lineHeight: '1' }],
      '8xl': ['6rem', { lineHeight: '1' }],
      '9xl': ['8rem', { lineHeight: '1' }],
    },
    typography: typographyStyles,
    extend: {
      keyframes: {
        boat: {
          '0%, 100%': { transform: 'rotate(-2deg) scale3d(1.09,1.09,1.09)' },
          '50%': { transform: 'rotate(2deg) scale3d(1,1,1)' },
        },
        "boat-translate": {
          "0%": {
            transform: 'translateX(0px) translateY(-10px) rotate(0deg)'
          },
          "60%": {
            transform: 'translateX(300px) translateY(0px) rotate(-30deg)'
          },
          "75%": {
            transform: 'translateX(-150px) translateY(0px) rotate(25deg)'
          },
          "100%": {
            transform: 'translateX(0px) translateY(0px) rotate(0deg)'
          }
        },
        "boat-float": {
          "0%": {
            transform: 'translateY(0px)'
          },
          "50%": {
            transform: 'translateY(-10px)'
          },
          "75%": {
            transform: 'translateY(10px)'
          },
          "100%": {
            transform: 'translateY(0px)'
          }
        }
      },
      animation: {
        boat: 'boat 5s ease-in-out infinite',
        "boat-translate": 'boat-translate 30s ease-in-out infinite',
        "boat-float": 'boat-float 2s ease-in-out infinite'
      }
    },
  },
  plugins: [typographyPlugin],
}

