/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        "card-width-2": "calc((100% - 1.5rem) / 2)",
        "card-width-3": "calc((100% - 2rem) / 3)",
        "card-width-4": "calc((100% - 1.5rem) / 4)",
        "card-width-6": "calc((100% - 3rem) / 6)",
      },
    },
  },
  plugins: [],
};
