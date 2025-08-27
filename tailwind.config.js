/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "pulse-light": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.1" },
        },
      },
      animation: {
        "pulse-light": "pulse-light 0.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
