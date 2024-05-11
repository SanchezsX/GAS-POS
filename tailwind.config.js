/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#EDB055',
        green: '#60BC94',
        blue: '#6492EC',
        sideBg: 'rgba(251, 248, 241, .09)',
      },
    },
  },
  plugins: [],
}
