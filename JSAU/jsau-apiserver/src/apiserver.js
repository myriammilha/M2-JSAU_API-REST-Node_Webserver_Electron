'use strict'
const express = require('express')
const app = express()
app.use(express.json())
const port = 8081
const fs = require('fs').promises
const path = require('path')
const {env} = require('node:process')
const morgan = require('morgan')
app.use(morgan('dev'))
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store')
    next()
})
const repositoryPath = env.JSAU_REPOSITORY_FILE_PATH
if (!repositoryPath) {
    throw new Error('fichier invalid')
}

const fileHtml = path.join(repositoryPath, 'html')
const fileJson = path.join(repositoryPath, 'json')
const jsonPath = path.join(fileJson, 'data.json')
app.get('/', (req, res) => {
    res.send('Bienvenue dans cette application')
})
/* la fonction callBack */
app.use('/info', (req, res) => {
    const handleInfo = (callback) => {
        const appInfo = 'jsau-apiserver-1.0.0'
        callback(null, appInfo)
    }
    handleInfo((err, data) => {
        if (err) {
            res.sendStatus(500)
        } else {
            res.send(data)
        }
    })
})
// async-promise-then
app.get('/search', (req, res) => {
    const query = req.query.text
    if (!query) {
        return res.sendStatus(400)
    } else {
        const filepath = path.join(fileHtml, '/', query + '.html')
        fs.access(filepath)
            .then(()=> {
                return res.sendFile(filepath)
            })
            .catch((err)=> {
                if (err.code == 'ENOENT') {
                    return res.sendStatus(404)
                } else {
                    return res.sendStatus(500)
                }
            })
    }
})
/*test
app.get('/search', async(req, res) => {
    const query = req.query.text // Le mot-clé tapé par l'utilisateur

    if (!query) {
        return res.sendStatus(400) // Mauvaise requête si aucun mot-clé n'est fourni
    }

    try {
        const files = await fs.readdir(fileHtml) // Lire tous les fichiers dans le répertoire
        const matchingFiles = files.filter((file) => file.startsWith(query)) // Trouver les fichiers correspondant
        if (matchingFiles.length === 0) {
            return res.status(404).json({message: 'Aucun fichier trouvé.'})
        }
        return res.json({files: matchingFiles}) // Retourner les fichiers trouvés
    } catch (err) {
        console.error('Erreur lors de la recherche :', err)
        return res.sendStatus(500) // Erreur interne du serveur
    }
})*/

//async-promise-async-await
app.get('/documents/:filename', async(req, res) => {
    const filename = req.params.filename

    if (!filename.endsWith('.html')) {
        return res.sendStatus(400)
    }
    const filepath = path.join(fileHtml, filename)
    try {
        await fs.access(filepath)
        return res.download(filepath, filename, (err) => {
            if (err) {
                return res.sendStatus(500)
            }
        })
    } catch {
        return res.sendStatus(404)
    }

})

//async-promise-async-await
app.post('/favorites/:filename', async(req, res) => {
    const filename = req.params.filename
    if (!filename.endsWith('.html') || !filename) {
        return res.sendStatus(400)
    }
    try {
        const filePath = path.join(fileHtml, filename)
        try {
            await fs.access(filePath)
        } catch {
            return res.sendStatus(404)
        }
        let favorites = []
        try {
            const data = await fs.readFile(jsonPath, 'utf-8')
            favorites = JSON.parse(data)
        } catch {

            favorites = []
        }
        if (!favorites.includes(filename)) {
            const newFavorites = {
                filename,
                id:favorites.length + 1
            }
            favorites.push(newFavorites)
            await fs.writeFile(jsonPath, JSON.stringify(favorites, null, 2))
            return res.json({message: `File ${filename} added to favorites`, favorites})
        } else {
            return res.json({message: `File ${filename} is already in favorites`, favorites})
        }
    } catch (error) {
        return res.sendStatus(500)
    }
})
//async-promise-async-await
// Route pour afficher tous les fichiers favoris

app.get('/favorites', async(req, res) => {
    try {
    // Lire le fichier favorites.json
        let favorites = []
        try {
            const data = await fs.readFile(jsonPath, 'utf8')
            favorites = JSON.parse(data) // Parse les données JSON
        } catch (err) {
            if (err.code === 'ENOENT') {
                // Si le fichier n'existe pas, renvoyer un tableau vide
                favorites = []
            } else {
                throw err // Autres erreurs
            }
        }

        res.json(favorites) // Renvoyer les favoris au frontend
    } catch (error) {
        console.error('Erreur lors de la récupération des favoris :', error)
        res.sendStatus(500) // Erreur interne
    }
})
//async-promise-async-await
app.delete('/favorites/:id', async(req, res) => {
    const id = parseInt(req.params.id, 10)

    try {
        const data = await fs.readFile(jsonPath, 'utf-8')
        const favorites = JSON.parse(data)

        const favoriteIndex = favorites.findIndex(fav => fav.id === id)
        if (favoriteIndex !== -1) {
            favorites.splice(favoriteIndex, 1)
            await fs.writeFile(jsonPath, JSON.stringify(favorites, null, 2), 'utf-8')
            return res.status(200).send(`File with ID ${id} removed from favorites.\n`)
        } else {
            return res.sendStatus(404)
        }
    } catch (error) {
        return res.sendStatus(500)
    }
})

const server = app.listen(port, () => {
    console.log(`Example app listenting on port ${port}`)
})
module.exports = {app, server, repositoryPath}