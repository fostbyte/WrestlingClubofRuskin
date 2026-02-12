/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'wcr-purple': {
          DEFAULT: '#4A1D96', // Deep purple
          light: '#6B46C1',   // Lighter purple
          dark: '#3A166F',    // Darker purple
        },
        'wcr-gold': {
          DEFAULT: '#FFD700', // Gold
          light: '#FFED4E',   // Light gold
          dark: '#DAA520',    // Dark gold
        },
        'wcr-black': {
          DEFAULT: '#1A1A1A', // Soft black
          light: '#2D2D2D',   // Lighter black
        },
        primary: {
          DEFAULT: '#4A1D96', // Dark purple (legacy)
          light: '#6B46C1',  // Lighter purple (legacy)
        },
        secondary: {
          DEFAULT: '#FFFFFF', // White (legacy)
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
