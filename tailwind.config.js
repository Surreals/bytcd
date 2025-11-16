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
        sans: ['Hubot Sans', 'sans-serif'], // Set Hubot Sans as the default sans-serif font
      },
    },
  },
  plugins: [],
}