 /** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1E3A8A",   // Corporate Navy primary
        secondary: "#F59E0B", // Gold accent
        success: "#059669",
        error: "#DC2626",
        background: "#F3F4F6",
        surface: "#FFFFFF",
        text: "#111827",
      },
    },
  },
  plugins: [],
};
