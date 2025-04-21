/**
 * Fichier : db.js
 * Description : Module Node.js pour configurer et exporter une instance Pool de connexion à une base de données
 * PostgreSQL en utilisant le module pg. Lit les paramètres de connexion depuis .env pour une configuration sécurisée.
 * L'instance Pool est utilisée dans d'autres fichiers pour exécuter des requêtes SQL.
 */

// Importe la classe Pool du module pg (node-postgres)
// Pool gère un ensemble de connexions réutilisables pour éviter d'ouvrir/fermer des connexions à chaque requête
const { Pool } = require('pg');

// Charge les variables d'environnement depuis le fichier .env
// Exemple : DB_USER, DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT
// dotenv lit .env et les stocke dans process.env
require('dotenv').config();

// Crée une nouvelle instance de Pool avec les paramètres de connexion
// Syntaxe : new Pool(config)
// config : Objet contenant les paramètres de connexion à PostgreSQL
const pool = new Pool({
    // Utilisateur de la base de données, récupéré depuis la variable d'environnement DB_USER
    // Exemple : process.env.DB_USER = 'postgres'
    user: process.env.DB_USER,
    
    // Hôte du serveur PostgreSQL, récupéré depuis DB_HOST
    // Exemple : process.env.DB_HOST = 'localhost'
    host: process.env.DB_HOST,
    
    // Nom de la base de données, récupéré depuis DB_NAME
    // Exemple : process.env.DB_NAME = 'fitness_dev'
    database: process.env.DB_NAME,
    
    // Mot de passe de l'utilisateur, récupéré depuis DB_PASSWORD
    // Exemple : process.env.DB_PASSWORD = 'monMotDePasse'
    password: process.env.DB_PASSWORD,
    
    // Port du serveur PostgreSQL, récupéré depuis DB_PORT
    // Exemple : process.env.DB_PORT = 5432 (port par défaut de PostgreSQL)
    port: process.env.DB_PORT,
});

// Exporte l'instance pool pour qu'elle soit utilisée dans d'autres fichiers
// module.exports permet à d'autres modules d'importer pool via require('./db')
module.exports = pool;