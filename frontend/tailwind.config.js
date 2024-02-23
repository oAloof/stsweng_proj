/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js'
  ],
  theme: {
    colors: {
      'light-yellow': '#F0CE6E', 
      'ghost-white' : '#FCF8F4',
      'light-orange' : '#EAA44A',
      'maroon' : '#5A2D2A',
      'light-purple' : '#703C67',
      'dark-purple' : '#332232',
      'dark-blue' : '#150C21'

    },
    extend: {},
  },
  plugins: [
    require("daisyui")
  ],
}

