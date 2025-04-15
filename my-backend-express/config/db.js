// Importe la classe Pool du module pg (node-postgres), utilisée pour gérer les connexions à PostgreSQL.
// Pool permet de réutiliser des connexions pour éviter d'en ouvrir/fermer constamment, ce qui améliore les performances.
const { Pool } = require('pg');

// Charge les variables d'environnement depuis .env (ex. : DB_USER, DB_NAME).
// Le module dotenv lit .env et les stocke dans process.env pour un accès sécurisé.
require('dotenv').config();

// Crée une instance de Pool avec les paramètres de connexion à PostgreSQL.
// Pool est une classe qui accepte un objet de configuration avec les clés suivantes :
const pool = new Pool({
    // Utilisateur de la base (ex. : postgres), lu depuis .env.
    // process.env.DB_USER récupère la valeur de DB_USER dans .env.
    user: process.env.DB_USER,
    // Hôte de la base (ex. : localhost), où PostgreSQL est exécuté.
    host: process.env.DB_HOST,
    // Nom de la base (ex. : fitness_dev).
    database: process.env.DB_NAME,
    // Mot de passe de l'utilisateur PostgreSQL.
    password: process.env.DB_PASSWORD,
    // Port de PostgreSQL (par défaut 5432).
    port: process.env.DB_PORT,
});

// Exporte l'instance pool pour qu'elle soit utilisée dans d'autres fichiers (ex. : user.js, auth.js).
// module.exports est la syntaxe Node.js pour rendre une valeur accessible à d'autres modules.
module.exports = pool;