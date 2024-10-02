/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        surface: "#F8FBFD",
        container: "#F0F4F7",
        secondary: "#9DAAB0",
        main: "#0D6680",
        dark: "#171C1F",
        warning: "#824E4E",
        success: "#78B577",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
