/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(180deg, rgba(240,240,240,1) 0%, rgba(255,255,255,1) 100%)',
        // 'custom-gradient': 'linear-gradient(0deg, rgba(247,247,249,1) 0%, rgba(239,239,255,1) 35%, rgba(229,229,255,1) 100%)',
        // 'custom-gradient': 'linear-gradient(0deg, rgba(255,255,248,1) 0%, rgba(255,255,229,1) 35%, rgba(255,254,210,1) 100%)',
      },
    },
  },
  plugins: [],
}