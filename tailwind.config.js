/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  // darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ["SF Pro Display"],
      serif: ["Work Sans"],
    },
    fontSize: {
      tiny: "0.625rem",
      xs: ".75rem",
      sm: ".875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
      "7xl": "5rem",
      "10xl": "10rem",
    },
    colors: {
      button: "var(--color-button-text)",
      transparent: "transparent",
      primary: {
        100: "var(--color-primary-100)",
        200: "var(--color-primary-200)",
        300: "var(--color-primary-300)",
        400: "var(--color-primary-400)",
        500: "var(--color-primary-500)",
        600: "var(--color-primary-600)",
        700: "var(--color-primary-700)",
        800: "var(--color-primary-800)",
        900: "var(--color-primary-900)",
      },
      secondary: {
        100: "var(--color-secondary-100)",
        200: "var(--color-secondary-200)",
        300: "var(--color-secondary-300)",
        400: "var(--color-secondary-400)",
        500: "var(--color-secondary-500)",
        600: "var(--color-secondary-600)",
        700: "var(--color-secondary-700)",
        800: "var(--color-secondary-800)",
        900: "var(--color-secondary-900)",
      },
      accent: {
        DEFAULT: "var(--color-accent)",
        hover: "var(--color-accent-hover)",
        disabled: "var(--color-accent-disabled)",
      },
      black: "#000",
      white: "#fff",
      green: "var(--color-green)",
      red: "var(--color-red)",
    },
    boxShadow: {
      outlineLg: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      outlineMd: "0 0 0 2pt var(--color-primary-200)",
      outlineSm: "0 0 0 1pt var(--color-primary-200)",
    },
    borderWidth: {
      DEFAULT: "1px",
      0: "0px",
      4: "4px",
      2: "2px",
    },
    extend: {
      borderRadius: {
        5: "5px",
        8: "8px",
        20: "20px",
        40: "40px",
      },
      borderColor: {
        "color-800": "var(--color-primary-800)",
      },
    },
  },
  plugins: [],
}
