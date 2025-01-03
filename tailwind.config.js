/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      padding: '2rem',
      center: true
    },
    extend: {
      FontFamily:{
        roboto: ["Roboto", 'sans-serif']
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}

