module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: "350px",
        "3xl": "2000px",
        "4xl": "2500px",
      },
    },
  },
  plugins: [],
};
