/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#f3cc6d', // Gold
          light: '#fae7b4',
          dark: '#d9b34d',
        },
        secondary: {
          DEFAULT: '#051c3b', // Navy blue
          light: '#0e2c4f',
          dark: '#021027',
        },
        neutral: {
          100: '#f7f8f9',
          200: '#e9ebee',
          300: '#d9dce2',
          800: '#353a45',
          900: '#1e2330',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      },
      backdropBlur: {
        'glass': '16px',
      },
    },
  },
  plugins: [],
};