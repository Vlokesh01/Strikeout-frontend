/** @type {import('tailwindcss').Config} */



module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        loveYa: ['Love Ya Like A Sister', 'cursive'],
        delius: ['Delius', 'cursive'],
      },
    },
  },
  plugins: [],
}