/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      // screenMedium: { min: '700px', max: '950px' },
      screen1500: { max: "1500px" },
      screen1360: { max: "1300px" },
      screen1000: { max: "1000px" },
      screen950: { max: "950px" },
      screen900: { max: "900px" },
      screen800: { max: "800px" },
      screen700: { max: "700px" },
      screen600: { max: "600px" },
      screen550: { max: "550px" },
      screen500: { max: "500px" },
      screen470: { max: "480px" },
      screen430: { max: "430px" },
      screen400: { max: "400px" },
      screen340: { max: "360px" },
    },
    extend: {},
  },
  plugins: [],
};
