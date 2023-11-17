/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      minWidth: {
        'iconButton': "3rem",
      },
      backgroundImage: {
        'air-pollution': "linear-gradient(90deg, #2ec92e, #c7bf26, #c76e26, #e2122a, #a7075c 95%)",
      },
      gridTemplateColumns: {
        header: "1fr auto"
      }
    },
  },
  plugins: [],
}

