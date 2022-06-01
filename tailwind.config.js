module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: { 
    
    extend: {
      colors:{
        'primary':'#d62828',
        'secondary':'#f77f00'
      },
      screens: {
        '2xl': '3839px',
      },
      fontFamily: {
        'poppins': ['Poppins']
      },

    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
