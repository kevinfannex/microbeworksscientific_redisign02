/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    // ...existing theme config
    // (no changes)
    // Add safelist for zoom-125 variant classes
    safelist: [
      'zoom-125:h-[700px]',
      'zoom-125:h-[550px]',
    ],
    extend: {},
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('zoom-125', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.zoom-125${separator}${className}`;
        });
      });
    },
  ],
};
