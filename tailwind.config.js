/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Ligth theme
        light: {
          primary: "#242933",
          secondary: "#3BBEF8",
          tertiary: "#20B2A6",
          hot: "#6519E6",
          yellow: "#FBBD22",

         
          "content-text": "#37392e",
        },

        dark: {
          primary: "#37392e",
          secondary: "#EAEEF3",
          tertiary: "#FBBF24",
          hot: "#f6d809",
          dark: "#37392e",

         
          "content-text": "#a4dad2",

        },
      },
    },
  },
  plugins: [require("daisyui")],
};