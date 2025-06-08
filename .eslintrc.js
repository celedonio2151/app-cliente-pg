module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    curly: ['error', 'multi-line'], // o directamente 'off'
    'react-native/no-inline-styles': 'off', // desactiva la advertencia
    // ...otras reglas si quieres
  },
};
