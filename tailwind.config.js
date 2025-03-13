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
  },
  variants: {
    extend: {},
  },
  plugins: [],
}