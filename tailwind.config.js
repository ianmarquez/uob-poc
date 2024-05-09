
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      animation: {
        "fly-into": "fly-into 8s normal forwards linear",
        'fade-into': "fade-into 8s normal forwards linear"
      },
      keyframes: {
        'fly-into': {
          "0%": {
            opacity: 0,
            transform: 'scale(40%)',
          },
          "40%": {
            opacity: 100,
          },
          "90%": {
            opacity: 100,
            transform: 'scale(100%)',
          },
          "100%": {
            opacity: 0,
          }
        },
        'fade-into': {
          "0%": {
            opacity: 90,
          },
          "80%": {
            opacity: 0,
          },
          "100%": {
            opacity: 20,
          },
        }
      }
    },
  },
  plugins: [],
}

