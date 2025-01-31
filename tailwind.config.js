module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
            amber: require('tailwindcss/colors').amber,
            rose: require('tailwindcss/colors').rose,
            orange:require('tailwindcss/colors').orange
          },
      },
    },
    plugins: [],
  };
  