/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        main: "url(../../public/bg/bg.png)",
      },
      boxShadow: {
        main: "0 0 3px 2px #20A1FF",
        green: "0 0 3px 2px #05AD0C",
        red: "0 0 3px 2px #AD0505",
        yellow: "0 0 3px 2px #f0ff20",
      },
      colors: {
        primary: "#20A1FF",
        base: {
          100: "#08070F",
          200: "#00021D",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
