# Projet :  REST API + Web Server + Desktop App (Electron) - M2 JSAU

## Présentation

Projet réalisé dans le cadre du cours **JSAU** (rattrapage).  
L’objectif est de mettre en place une architecture complète autour d’une **API REST Express**, avec :
- un **webserver** (pages rendues + endpoints),
- une **application desktop Electron**,
- une **structure de données locale** (`jsau-data`),
- des **tests**, du **lint**, du **build** et une **CI/CD GitLab**.

---

## Architecture

Le dépôt contient plusieurs sous-projets :

- `JSAU/jsau-apiserver` : **API REST** (Node.js + Express)
- `JSAU/jsau-webserver` : **Web server** (Express + vues + build Webpack)
- `JSAU/jsau-desktop` : **Application Desktop** (Electron + Vite)
- `JSAU/jsau-npmpackage` : package npm interne (si utilisé dans le projet)
- `JSAU/jsau-autoevaluation` : autoévaluation (JSON + README)
- `jsau-data/` : données locales (HTML + JSON)

### Données (`jsau-data`)
- `jsau-data/html/` : fichiers HTML consultables
- `jsau-data/json/data.json` : stockage des favoris (JSON)

---

## Prérequis

- Node.js + npm
- (Optionnel) `make`

---

## Installation

Depuis la racine du projet :

```bash
make install
````

---

## Lancement

> Les services se lancent **dans des terminaux séparés**.

### 1) Lancer l’API REST

```bash
make start-apiserver
```

### 2) Lancer le Web Server

```bash
make start-webserver
```

### 3) Lancer l’application Desktop (Electron)

```bash
make start-desktop
```

L'App desktop Electron apparait.
Rechercher ou télécharger ou ajouter aux favoris un fichier :
### Exemple
```bash
algerie.html
venezuela.html
example.html
```

---

## Tests / Lint / Build

### Tests

```bash
make test
```

### Lint

```bash
make lint
```

### Build (webserver + desktop)

```bash
make build
```

### Nettoyage

```bash
make clean
```

---

## Variables d’environnement

Le projet utilise un chemin de dépôt de fichiers (données locales).

Dans le **Makefile**, la variable est configurée automatiquement (portable) :

* `JSAU_REPOSITORY_FILE_PATH=$(CURDIR)/jsau-data`

Donc en général, **pas besoin de faire `export` à la main**.

---

## Endpoints (API REST)

Les routes exactes dépendent du module :

### `jsau-apiserver` (exemples)

* `GET /` : message de bienvenue
* `GET /info` : info application
* `GET /search?text=<name>` : recherche d’un fichier HTML
* `GET /documents/<filename>` : téléchargement
* `POST /favorites/<filename>` : ajout favori
* `DELETE /favorites/<id>` : suppression favori

Exemples curl :

```bash
curl http://localhost:8081/
curl http://localhost:8081/info
curl "http://localhost:8081/search?text=example"
curl http://localhost:8081/documents/example.html
```

---

## Technologies utilisées

* **Backend / API** : Node.js, Express.js, Morgan
* **Web Server** : Express, EJS (views), Webpack
* **Desktop** : Electron, Vite
* **Frontend** : HTML, CSS, JavaScript
* **HTTP / Data** : Fetch API, JSON
* **Tests** : Jest, Supertest
* **Qualité** : ESLint, Stylelint
* **CI/CD** : GitLab CI/CD
* **Outils** : npm, Makefile

---

## Notes

* Les messages `npm audit` / `deprecated` proviennent souvent de dépendances indirectes.
* Le projet est validé fonctionnellement via `make lint`, `make test`, `make build`.

---

## Auteure

Projet réalisé par **Soumia MEDDAS** et **Myriam MILHA** dans le cadre du projet JSAU.