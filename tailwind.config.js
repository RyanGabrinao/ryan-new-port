/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        "main-bg": "#0e1216",
        "rg-white": "#f1ede9",
      },
      fontFamily: {
        neuehaas: ["Neue Haas Display Pro"],
        gambetta: ["Gambetta"],
        migra: ["Migra"],
      },
      fontSize: {
        heroName: "clamp(2.20rem, calc(-0.04rem + 11.20vw), 13.40rem)",
        heroSub: "clamp(1.60rem, calc(0.68rem + 4.60vw), 6.20rem)",
        step6: "clamp(0.70rem, calc(0.56rem + 0.71vw), 1.42rem)",
        step5: "clamp(0.84rem, calc(0.66rem + 0.93vw), 1.77rem)",
        step4: "clamp(1.01rem, calc(0.77rem + 1.20vw), 2.21rem)",
        step3: "clamp(1.22rem, calc(0.90rem + 1.55vw), 2.77rem)",
        step2: "clamp(1.46rem, calc(1.06rem + 2.00vw), 3.46rem)",
        step1: "clamp(1.75rem, calc(1.24rem + 2.58vw), 4.33rem)",
        step0: "clamp(2.10rem, calc(1.44rem + 3.31vw), 5.41rem)",
        step_1: "clamp(2.52rem, calc(1.67rem + 4.24vw), 6.76rem)",
        step_2: "clamp(3.02rem, calc(1.94rem + 5.42vw), 8.45rem)",
        step_3: "clamp(3.63rem, calc(2.24rem + 6.93vw), 10.56rem)",
        step_4: "clamp(4.35rem, calc(2.59rem + 8.84vw), 13.20rem)",
        step_5: "clamp(5.23rem, calc(2.97rem + 11.27vw), 16.50rem)",
        step_6: "clamp(6.27rem, calc(3.40rem + 14.35vw), 20.62rem)",
      },
      maxWidth: {
        section: "1600px",
      },
    },
  },
  plugins: [],
};
