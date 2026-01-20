const {contextBridge} = require('electron');

const API_BASE_URL = 'http://localhost:8081';
const exposeAPI = () => {
    contextBridge.exposeInMainWorld('api', {
        // Route pour obtenir les informations de l'application
        fetchInfo: async() => {
            const response = await fetch(`${API_BASE_URL}/info`);
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des informations.');
            }
            return response.text();
        },

        // Route pour rechercher un fichier
        searchFile: async(fileName) => {
            const response = await fetch(`${API_BASE_URL}/search?text=${fileName}`);
            if (response.status === 404) {
                throw new Error(`Le fichier "${fileName}" est introuvable.`);
            }
            if (!response.ok) {
                throw new Error('Erreur lors de la recherche du fichier.');
            }
            return response.text();
        },

        // Route pour télécharger un fichier
        downloadFile: async(fileName) => {
            const response = await fetch(`${API_BASE_URL}/documents/${fileName}`);
            if (response.status === 404) {
                throw new Error(`Le fichier "${fileName}" est introuvable.`);
            }
            if (!response.ok) {
                throw new Error('Erreur lors du téléchargement du fichier.');
            }
            return response.blob();
        },

        // Route pour ajouter un fichier aux favoris
        addToFavorites: async(fileName) => {
            const response = await fetch(`${API_BASE_URL}/favorites/${fileName}`, {
                method: 'POST',
            });
            if (response.status === 404) {
                throw new Error(`Le fichier "${fileName}" est introuvable.`);
            }
            if (!response.ok) {
                throw new Error('Erreur lors de l\'ajout du fichier aux favoris.');
            }
            return response.json();
        },

        // Route pour récupérer la liste des fichiers favoris
        fetchFavorites: async() => {
            const response = await fetch(`${API_BASE_URL}/favorites`);
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des favoris.');
            }
            return response.json();
        },

        deleteFavorite: async(id) => {
            console.log(`Envoi de la requête DELETE pour l'ID : ${id}`);
            const response = await fetch(`${API_BASE_URL}/favorites/${id}`, {
                method: 'DELETE',
            });
            if (response.status === 404) {
                throw new Error(`Le favori avec l'ID ${id} est introuvable.`);
            }
            if (!response.ok) {
                throw new Error('Erreur lors de la suppression du favori.');
            }
            return `Favori avec l'ID ${id} supprimé avec succès.`;
        },

    });
};

exposeAPI();

module.exports = {exposeAPI};
