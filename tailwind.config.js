// tailwind.config.js
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        body: ['Open Sans', 'sans-serif'],
        heading: ['Nunito', 'sans-serif'],
        contrast: ['Righteous', 'sans-serif']
      }
    },
    animation: {
      highlight: 'highlight 0.5s ease-in-out',
    },
    keyframes: {
      highlight: {
        '0%': { transform: 'scaleX(1)' },
        '50%': { transform: 'scaleX(1.05)' },
        '100%': { transform: 'scaleX(1)' },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}