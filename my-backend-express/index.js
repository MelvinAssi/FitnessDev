// Importe le module express, une bibliothèque pour créer des serveurs HTTP en Node.js.
// Express simplifie la gestion des requêtes et réponses.
const express = require('express');

// Importe le module cors, qui permet au frontend (ex. : http://localhost:5173) d'envoyer des requêtes au backend.
// Sans CORS, le navigateur bloquerait les requêtes pour des raisons de sécurité (politique de même origine).
const cors = require('cors');

// Importe les routes définies dans routes/auth.js, qui gèrent l'inscription (/auth/signup) et la connexion (/auth/login).
const authRoutes = require('./routes/auth');

// Importe les routes définies dans routes/user.js, qui gèrent le profil (/user/profil) et les cours précédents (/user/previous-courses).
const userRoutes = require('./routes/user');
<<<<<<< HEAD

// Charge les variables d'environnement depuis le fichier .env (ex. : DB_USER, JWT_SECRET).
// Le module dotenv lit .env et les rend accessibles via process.env.
=======
const userAbonnementRoutes = require('./routes/abonnement');
const typeAbonnementRoutes = require('./routes/typeAbonnement');
const produitRoutes = require('./routes/produit');
const achatRoutes = require('./routes/achat')

>>>>>>> melvin_dev
require('dotenv').config();

// Crée une instance de l'application Express, qui représente le serveur.
// Cette instance est utilisée pour configurer les routes et les middlewares.
const app = express();

// Utilise le middleware cors pour autoriser les requêtes du frontend.
// Arguments :
// - origin: 'http://localhost:5173' : Spécifie que seules les requêtes de ce domaine (le frontend React) sont autorisées.
// - credentials: true : Permet d'envoyer des cookies ou des headers comme Authorization (pour le token JWT).
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

// Définit le port sur lequel le serveur écoutera les requêtes (3000 par convention pour le développement).
const port = 3000;

// Utilise le middleware express.json() pour analyser automatiquement les corps de requêtes au format JSON.
// Exemple : Si le frontend envoie { "email": "test@example.com" }, Express le transforme en objet JavaScript accessible via req.body.
// Sans cela, req.body serait undefined pour les requêtes JSON.
app.use(express.json());

<<<<<<< HEAD
// Associe toutes les routes commençant par /auth (ex. : /auth/login, /auth/signup) au routeur authRoutes.
// Arguments :
// - '/auth' : Préfixe appliqué à toutes les routes définies dans authRoutes.
// - authRoutes : Le routeur importé depuis routes/auth.js contenant les endpoints.
app.use('/auth', authRoutes);

// Associe toutes les routes commençant par /user (ex. : /user/profil, /user/previous-courses) au routeur userRoutes.
// Arguments :
// - '/user' : Préfixe pour les routes de userRoutes.
// - userRoutes : Routeur importé depuis routes/user.js.
app.use('/user', userRoutes);

// Définit une route GET pour l'URL racine (/).
// Arguments :
// - '/' : Le chemin de la route (racine du serveur, ex. : http://localhost:3000/).
// - (req, res) => {...} : Fonction de gestion (callback) qui traite la requête.
//   - req : Objet requête, contient les données envoyées par le client (non utilisé ici).
//   - res : Objet réponse, utilisé pour envoyer une réponse au client.
=======
app.use('/auth', authRoutes); 
app.use('/user', userRoutes); 
app.use('/user/abonnement', userAbonnementRoutes);
app.use('/type_abonnement', typeAbonnementRoutes);
app.use("/produit",produitRoutes);
app.use("/user/achat",achatRoutes);
>>>>>>> melvin_dev
app.get('/', (req, res) => {
    // Envoie une réponse texte simple au client.
    // res.send() est une fonction Express qui définit le corps de la réponse et termine la requête.
    res.send('Bienvenue sur l\'API Express !');
});

// Lance le serveur sur le port spécifié (3000).
// Arguments :
// - port : Le numéro de port (3000).
// - () => {...} : Callback exécuté quand le serveur démarre.
app.listen(port, () => {
    // Affiche un message dans la console pour confirmer que le serveur fonctionne.
    // Utilise une template string (``) pour inclure la variable port.
    console.log(`Serveur démarré sur http://localhost:${port}`);
});