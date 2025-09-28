/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1E3A8A",
        secondary: "#F59E0B",
        success: "#059669",
        error: "#DC2626",
        background: "#F3F4F6",
        surface: "#FFFFFF",
        textcolor: "#111827",
      },
      boxShadow: {
        card: "0 1px 2px rgba(0,0,0,0.05)",
      },
      transitionTimingFunction: {
        sidebar: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
};
