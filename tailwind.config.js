/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mojo: {
          bg: '#F9F9F9',
          green: '#4CAF50',
          orange: '#FF5722',
          text: '#1A1A1A',
        }
      }
    },
  },
  plugins: [],
}
