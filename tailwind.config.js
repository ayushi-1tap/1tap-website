/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    screens: {
      md: "768px",
      "md-lg": "992px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
      "3xl": "1600px",
      custom: { min: "1024px", max: "1327px" },

      "small-desktop": { raw: "(min-height: 500px) and (max-height: 684px)" },
      "h-sm": { raw: "(min-height: 500px)" },
      "h-sm-md": { raw: "(min-height: 595px)" },
      "h-md": { raw: "(min-height: 685px)" },
      "h-md-md": { raw: "(min-height: 730px)" },
      "h-md-lg": { raw: "(min-height: 768px)" },
      "h-lg": { raw: "(min-height: 900px)" },
      "h-xl": { raw: "(min-height: 1000px)" },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        white: "#FFFFFF",
        black: "#2A2626",
        blue: "#248FF2",
        "light-blue": "#F1F8FF",
        "secondary-bg": "#F2F2F7",
        "modal-bg": "rgba(16, 12, 12, 0.66)",
        "text-color": "#1C1818",
        "package-dashboard-text": "#504F4F",
        background: "#F8F8F8",
        headingcolor: "var(--heading-color)",

        // Primary Colors
        primary: {
          50: "var(--color-primary-50)",
          100: "var(--color-primary-100)",
          500: "var(--color-primary-500)",
          600: "var(--color-primary-600)",
          700: "var(--color-primary-700)",
          800: "var(--color-primary-800)",
          900: "var(--color-primary-900)",
        },
        // Action Colors
        action: "var(--color-action)",
        clicked: "var(--color-clicked)",
        // Text Colors
        "text-primary": "var(--color-text-primary)",
        "text-reverse": "var(--color-text-reverse)",
        // Neutral Colors
        neutral: {
          100: "var(--color-neutral-100)",
          500: "var(--color-neutral-500)",
          800: "var(--color-neutral-800)",
        },
        // Green
        green: {
          300: "var(--color-green-300)",
        },
        // Blue Variants
        "blue-alt": {
          100: "var(--color-blue-100)",
          600: "var(--color-blue-600)",
        },
      },
      dropShadow: {
        "navlink-shadow": "0 6px 6.8px rgba(0, 0, 0, 0.21)",
        "search-shadow": "0 0 8.2px rgba(0, 0, 0, 0.2)",
        "book-free": "0 4px 8px rgba(0, 0, 0, 0.16)",
        input: "0px 4px 4px rgba(0,0,0,0.25)",
      },
      backgroundImage: {
        tick: 'url("/src/assets/componets/Dashboard/tick.svg")',
      },
    },
  },
  plugins: [],
  variants: {
    extend: {
      backgroundColor: ["group-hover"],
      fontWeight: ["group-hover"],
    },
  },
};
