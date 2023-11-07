/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#265bff',
        'secondary': '#002087',
        'error': '#d64545',
        'success': '#84cc16'
      },
      fontSize: {
        xs: ['0.63rem', '0.60rem'],
        ss: '0.8rem'
      },
      margin: {
        '10px': '10px',
        '20px': '20px',
        '30px': '30px',
      },
      translate: {
        '-50%': '-50%',
      },
      keyframes: {
        shake: {
          '0%, 100%': { marginLeft: '0rem' },
          '25%': { marginLeft: '0.3rem' },
          '75%': { marginLeft: '-0.3rem' },
        },
        beat: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(.8)' },
        },
        active: {
          '75%, 100%': {
              transform: 'scale(1.2)',
          }
      }
      },
      animation: {
        shake: 'shake 0.2s ease-in-out 0s 2',
        beat: 'beat 1s linear infinite',
        active: 'active 1s linear infinite',
      },
      minHeight: {
        '10': '40px',
      },
      zIndex: {
        '-5': '-5',
      },
    },
  },
  darkMode: "class",
  plugins: []
}