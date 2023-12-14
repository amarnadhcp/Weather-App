/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'outfit': ['Outfit', 'sans'],
        'poppins': ['Poppins', 'sans'],
      },
      backgroundColor: {
        'black-overlay': 'rgba(0, 0, 0, 0.4)',
      },
    },
  },
  plugins: [],
}

