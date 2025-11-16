/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'hubot-sans': ['Hubot Sans', 'sans-serif'],
        'archivo-black': ['Archivo Black', 'sans-serif'], // Додано Archivo Black
      },
      letterSpacing: {
        'wides': '.2em', // Custom tracking-wides class
      }
    },
  },
  plugins: [],
}