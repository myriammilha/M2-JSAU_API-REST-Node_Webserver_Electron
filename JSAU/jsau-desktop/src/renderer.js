// Rechercher un fichier
document.getElementById('search-btn').addEventListener('click', () => {
    const fileName = document.getElementById('search').value;
    window.api.searchFile(fileName)
        .then(() => {
            document.getElementById('search-result').textContent = `Le fichier "${fileName}" a été trouvé.`;
        })
        .catch((err) => {
            document.getElementById('search-result').textContent = err.message;
        });
});

// Télécharger un fichier
document.getElementById('download-btn').addEventListener('click', () => {
    const fileName = document.getElementById('download').value;
    window.api.downloadFile(fileName)
        .then((blob) => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            a.click();
            URL.revokeObjectURL(url);
        })
        .catch((err) => {
            alert(`Erreur : ${err.message}`);
        });
});

// Ajouter un fichier aux favoris
document.getElementById('add-favorite-btn').addEventListener('click', () => {
    const fileName = document.getElementById('favorite').value;
    window.api.addToFavorites(fileName)
        .then((response) => {
            document.getElementById('favorite-result').textContent = response.message;
            loadFavorites();
        })
        .catch((err) => {
            document.getElementById('favorite-result').textContent = `Erreur : ${err.message}`;
        });
});
const loadFavorites = () => {
    window.api.fetchFavorites()
        .then((favorites) => {
            const list = document.getElementById('favorites-list');
            list.innerHTML = '';
            favorites.forEach((fav) => {
                const li = document.createElement('li');
                li.className = 'favorites-item';

                const span = document.createElement('span');
                span.textContent = fav.filename;

                const button = document.createElement('button');
                button.textContent = 'Supprimer';
                button.addEventListener('click', () => {
                    deleteFavorite(fav.id);
                });

                li.appendChild(span);
                li.appendChild(button);
                list.appendChild(li);
            });
        })
        .catch((err) => {
            const list = document.getElementById('favorites-list');
            list.innerHTML = `<li>Erreur : ${err.message || 'Impossible de charger les favoris.'}</li>`;
        });
};

const deleteFavorite = (id) => {
    console.log(`Tentative de suppression du favori avec l'ID : ${id}`);
    window.api.deleteFavorite(id)
        .then(() => {
            console.log(`Favori avec l'ID ${id} supprimé avec succès.`);
            loadFavorites();
        })
        .catch((err) => {
            console.error(`Erreur lors de la suppression du favori : ${err.message}`);
            alert(`Erreur : ${err.message}`);
        });
};

// Charger les favoris au démarrage
loadFavorites();

