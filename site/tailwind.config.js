/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      display: ["Open Sans", "sans-serif"],
      body: ["Open Sans", "sans-serif"],
    },
    extend: {
      backgroundImage: (theme) => ({
        'path': "url('https://img.freepik.com/free-vector/seamless-vector-luxury-floral-background-gray-dark_1284-47500.jpg?t=st=1656246527~exp=1656247127~hmac=a27bd1a3f1a71236e50d278852021f30825f45cb8d8431acca6c57ae4f59c669&w=740')",
      }),
      screens: {
        mf: "990px",
      },
      keyframes: {
        "slide-in": {
          "0%": {
            "-webkit-transform": "translateX(120%)",
            transform: "translateX(120%)",
          },
          "100%": {
            "-webkit-transform": "translateX(0%)",
            transform: "translateX(0%)",
          },
        },
        'ltr-linear-infinite': {
          'from': { 'background-position': '0 0' },
          'to': { 'background-position': '400% 0%' },
        },
      },
      animation: {
        "slide-in": "slide-in 0.5s ease-out",
        'ltr-linear-infinite': 'ltr-linear-infinite 100s linear infinite',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
