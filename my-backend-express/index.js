// Importe le module express, une bibliothèque pour créer des serveurs HTTP en Node.js.
const express = require('express');

// Importe le module cors, qui permet au frontend (ex. : http://localhost:5173) d'envoyer des requêtes au backend.
const cors = require('cors');

// Importe les routes définies dans routes/auth.js, qui gèrent l'inscription (/auth/signup) et la connexion (/auth/login).
const authRoutes = require('./routes/auth');

// Importe les routes définies dans routes/user.js, qui gèrent le profil (/user/profil) et les cours précédents (/user/previous-courses).
const userRoutes = require('./routes/user');
const userAbonnementRoutes = require('./routes/abonnement');
const typeAbonnementRoutes = require('./routes/typeAbonnement');
const produitRoutes = require('./routes/produit');
const achatRoutes = require('./routes/achat');

// Charge les variables d'environnement depuis le fichier .env (ex. : DB_USER, JWT_SECRET).
require('dotenv').config();

// Crée une instance de l'application Express, qui représente le serveur.
const app = express();

// Utilise le middleware cors pour autoriser les requêtes du frontend.
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

// Définit le port sur lequel le serveur écoutera les requêtes (3000 par convention pour le développement).
const port = 3000;

// Utilise le middleware express.json() pour analyser automatiquement les corps de requêtes au format JSON.
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/user/abonnement', userAbonnementRoutes);
app.use('/type_abonnement', typeAbonnementRoutes);
app.use("/produit", produitRoutes);
app.use("/user/achat", achatRoutes);

// Définit une route GET pour l'URL racine (/).
app.get('/', (req, res) => {
    res.send('Bienvenue sur l\'API Express !');
});

// Lance le serveur sur le port spécifié (3000).
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});