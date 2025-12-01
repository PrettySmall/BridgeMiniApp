import { nextui } from '@nextui-org/react'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Montserrat', 'sans-serif'],
    },
    extend: {
      keyframes: {
        upDown1: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        upDown2: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        upDown3: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        upDown4: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-7px)' },
        },
        upDown5: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        upDown1: 'upDown1 1s ease-in-out infinite',
        upDown2: 'upDown2 2s ease-in-out infinite',
        upDown3: 'upDown3 3s ease-in-out infinite',
        upDown4: 'upDown4 4s ease-in-out infinite',
        upDown5: 'upDown5 5s ease-in-out infinite',
      },
      colors: {
        primary: {
          DEFAULT: '#008fe9'
        },
        background: {
          DEFAULT: '#000000',
        },
        warning: {
          DEFAULT: '#FFFFFF',
        },
        active: {
          DEFAULT: '#1F1F1F'
        }
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
}
