/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,tsx}',
    './app/**/*.{js,ts,tsx}',
    './screens/**/*.{js,ts,tsx}',
  ],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        poppinsRegular: ['Poppins_400Regular'],
        poppinsSemiBold: ['Poppins_600SemiBold'],
        poppinsBold: ['Poppins_700Bold'],
      },
    },
  },
  plugins: [],
};
