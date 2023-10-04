/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors:{
      'cinza': '#E4E4E4',
      'branco': '#FFF'
    },
    fontFamily:{
      'poppins': ['Poppins', 'sans-serif']
    }
  },
  plugins: [],
}

