const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'hubot-sans': ['Hubot Sans', ...defaultTheme.fontFamily.sans],
        'archivo-black': ['Archivo Black', ...defaultTheme.fontFamily.sans], // Додано Archivo Black
      },
    },
  },
  plugins: [],
}