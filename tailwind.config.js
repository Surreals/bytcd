/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'hubot-sans': ['Hubot Sans', 'sans-serif'], // Changed to Hubot Sans
      },
    },
  },
  plugins: [],
}