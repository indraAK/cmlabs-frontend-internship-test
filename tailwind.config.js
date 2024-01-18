/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./main.js", "./foods/**/*.{html,js}", "./food/**/*.{html,js}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    extend: {},
  },
  plugins: [],
};
