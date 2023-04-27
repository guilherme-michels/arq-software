/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx", "./index.html"],
  theme: {
    extend: {
      colors: {
        header: "#000",
        bglight: "#f8f8f8",
        green: "#32ba7c",
        red: "#a64444",
        yellow: "#f28426",
      },
      fontFamily: {},
    },
  },
  plugins: [],
};
