import {defineConfig} from 'vite';
import {resolve} from 'path';

export default defineConfig({
    root: './src', // Définit la racine à 'src'
    base: './', // Utilise un chemin relatif pour les ressources
    build: {
        outDir: '../dist', // Répertoire de sortie
        emptyOutDir: true, // Vide le répertoire dist avant le build
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/index.html'), // Point d'entrée
            },
        },
    },
    server: {
        port: 3000, // Port du serveur de développement
        open: true, // Ouvre automatiquement dans le navigateur
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'), // Simplifie les importations
        },
    },
});
