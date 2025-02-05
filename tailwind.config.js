/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
            DEFAULT: "#0A8537",
            foreground: "#FFFFFF"
        },
        secondary: {
            DEFAULT: "#F0F1F3",
            foreground: "#020817"
        },
        accent: {
            DEFAULT: "#6D7074",
            foreground: "#020817"
        },
        background: "#FAFAFB",
        foreground: "#020817",
        card: {
            DEFAULT: "#FFFFFF",
            foreground: "#020817"
        },
        popover: {
            DEFAULT: "#FFFFFF",
            foreground: "#020817"
        },
        muted: {
            DEFAULT: "#F0F1F3",
            foreground: "#6D7074"
        },
        destructive: {
            DEFAULT: "#FF4C4C",
            foreground: "#FFFFFF"
        },
        border: "#E0E0E0",
        input: "#E0E0E0",
        ring: "#0A8537",
        chart: {
            1: "#FF6F61",
            2: "#4CAF50",
            3: "#03A9F4",
            4: "#FFC107",
            5: "#8E44AD"
        }
    },
    borderRadius: {
        sm: "0.125rem"
    },
    boxShadow: {
        sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)"
    },
    fontFamily: {
        sans: ["Inter", "sans-serif"]
    },
    fontSize: {
        heading: "28px",
        body: "16px"
    },
    fontWeight: {
        heading: "600",
        body: "400"
    },
      fontFamily: {
        archivo: ['"Archivo Black"', 'serif'], // Font family configuration
      },
      container: {
        center: true, // Centers the container
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
