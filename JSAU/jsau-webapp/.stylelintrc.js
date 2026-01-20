module.exports = {
    extends: 'stylelint-config-standard',
    rules: {
        'indentation': 2, // Indentation de 2 espaces
        'color-hex-length': 'short', // Utiliser des hex courts (#fff au lieu de #ffffff)
        'string-quotes': 'double', // Forcer l'utilisation des guillemets doubles
        'no-empty-source': null, // Permettre les fichiers CSS vides
      },
    ignoreFiles: ['node_modules/**/*.css', 'dist/**/*.css'], // Ignorer les fichiers dans ces répertoires
  };
  