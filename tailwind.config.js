module.exports = {
  theme: {
    extend: {
      screens: {
        'print': { 'raw': 'print' },
      }
    },
  },
  variants: {
    backgroundColor: ['responsive', 'odd', 'hover', 'focus']
  },
  plugins: [],
};
