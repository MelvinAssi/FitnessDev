/**
 * Fichier : index.js
 * Description : Point d'entrée principal du serveur backend Node.js avec Express. Configure le serveur HTTP,
 * définit les middlewares (CORS, JSON), monte les routes pour différentes fonctionnalités (authentification,
 * utilisateur, abonnements, produits, achats, réservations), et lance le serveur sur le port 3000.
 */

// Importe le module express, une bibliothèque pour créer des serveurs HTTP en Node.js
// Express simplifie la gestion des routes, des requêtes, et des réponses
const express = require('express');

// Importe le module cors, qui permet de gérer les requêtes cross-origin
// Autorise le frontend (ex. : http://localhost:5173) à communiquer avec le backend
const cors = require('cors');

// Importe les routes définies dans routes/auth.js
// Contient les endpoints pour l'inscription (/auth/signup) et la connexion (/auth/login)
const authRoutes = require('./routes/auth');

// Importe les routes définies dans routes/user.js
// Contient les endpoints pour le profil (/user/profil) et les cours précédents (/user/previous-courses)
const userRoutes = require('./routes/user');

// Importe les routes pour la gestion des abonnements utilisateur (ex. : /user/abonnement/check)
const userAbonnementRoutes = require('./routes/abonnement');

// Importe les routes pour les types d'abonnements (ex. : /type_abonnement)
const typeAbonnementRoutes = require('./routes/typeAbonnement');

// Importe les routes pour les produits (ex. : /produit)
const produitRoutes = require('./routes/produit');

// Importe les routes pour les achats (ex. : /user/achat)
const achatRoutes = require('./routes/achat');

// Importe les routes pour les réservations de cours (ex. : /bookings)
const bookingsRoutes = require('./routes/bookings');

// Charge les variables d'environnement depuis le fichier .env
// Exemple : DB_USER, JWT_SECRET, RECAPTCHA_SECRET_KEY
// dotenv.parse lit .env et les stocke dans process.env
require('dotenv').config();

// Crée une instance de l'application Express
// app est l'objet principal qui représente le serveur
const app = express();

// Configure le middleware CORS pour autoriser les requêtes du frontend
// Syntaxe : cors(options)
// - origin : Spécifie le domaine autorisé (http://localhost:5173)
// - credentials : Autorise l'envoi de cookies ou d'en-têtes comme Authorization
app.use(cors({
    origin: 'http://localhost:5173', // Frontend Vite
    credentials: true // Nécessaire pour les tokens JWT dans les en-têtes
}));

// Définit le port sur lequel le serveur écoutera les requêtes
// 3000 est une convention pour les serveurs de développement
const port = 3000;

// Configure le middleware express.json pour analyser les corps de requêtes JSON
// Convertit automatiquement les données JSON en objets JavaScript dans req.body
app.use(express.json());

// Monte les routes d'authentification sous le préfixe /auth
// Exemple : /auth/signup, /auth/login
// authRoutes est un routeur Express défini dans routes/auth.js
app.use('/auth', authRoutes);

// Monte les routes utilisateur sous /user
// Exemple : /user/profil, /user/previous-courses
app.use('/user', userRoutes);

// Monte les routes des abonnements utilisateur sous /user/abonnement
// Exemple : /user/abonnement/check
app.use('/user/abonnement', userAbonnementRoutes);

// Monte les routes des types d'abonnements sous /type_abonnement
// Exemple : /type_abonnement
app.use('/type_abonnement', typeAbonnementRoutes);

// Monte les routes des produits sous /produit
// Exemple : /produit/:id
app.use("/produit", produitRoutes);

// Monte les routes des achats sous /user/achat
// Exemple : /user/achat
app.use("/user/achat", achatRoutes);

// Monte les routes des réservations sous /bookings
// Exemple : /bookings
app.use('/bookings', bookingsRoutes);

// Définit une route GET pour l'URL racine (/)
// req : Objet requête, contient les données envoyées par le client
// res : Objet réponse, utilisé pour envoyer une réponse
app.get('/', (req, res) => {
    // Envoie une réponse texte simple
    // res.send envoie une chaîne directement au client
    res.send('Bienvenue sur l\'API Express !');
});

// Lance le serveur sur le port spécifié
// Syntaxe : app.listen(port, callback)
// - port : Numéro du port (3000)
// - callback : Fonction exécutée lorsque le serveur démarre
app.listen(port, () => {
    // Affiche un message dans la console pour confirmer le démarrage
    console.log(`Serveur démarré sur http://localhost:${port}`);
});