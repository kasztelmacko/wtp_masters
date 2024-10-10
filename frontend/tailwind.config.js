// design/frontend/tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx}", // Include JSX files
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
}