// Importe Express pour créer des routes HTTP.
const express = require('express');

// Crée un routeur Express pour organiser les routes de ce fichier.
const router = express.Router();

// Importe le middleware d'authentification pour sécuriser les routes.
// authMiddleware vérifie les tokens JWT avant de permettre l'accès.
const authMiddleware = require('../middleware/auth');

// Importe la connexion à la base de données pour exécuter des requêtes SQL.
const pool = require('../config/db');

// Route GET /user/profil : Récupère les informations du profil de l'utilisateur authentifié.
router.get('/profil', authMiddleware, async (req, res) => {
    try {
        // Récupère l'ID de l'utilisateur depuis req.user, ajouté par authMiddleware.
        // req.user.id provient du token JWT décodé (défini dans auth.js lors de la connexion).
        const userId = req.user.id;

        // Exécute une requête SQL pour sélectionner l'utilisateur par son ID.
        // pool.query est une fonction asynchrone du module pg.
        // Arguments :
        // - 'SELECT * FROM inscrit WHERE id_inscrit = $1' : Requête pour trouver l'utilisateur.
        // - [userId] : Tableau des paramètres, $1 est remplacé par userId.
        const result = await pool.query('SELECT * FROM inscrit WHERE id_inscrit = $1', [userId]);

        // Vérifie si des lignes sont retournées (rows.length > 0 signifie qu'un utilisateur est trouvé).
        if (result.rows.length > 0) {
            // Récupère le premier (et seul) utilisateur de la réponse.
            const user = result.rows[0];

            // Utilise la déstructuration pour exclure mdp_inscrit et type_inscrit.
            // Cela crée un nouvel objet (userWithout) sans ces champs sensibles.
            const { mdp_inscrit, type_inscrit, ...userWithout } = user;

            // Envoie une réponse JSON avec un message et les données du profil.
            // res.json() convertit l'objet en JSON et définit Content-Type: application/json.
            res.json({
                message: 'Profil récupéré avec succès',
                user: userWithout,
            });
        } else {
            // Si aucun utilisateur n'est trouvé, renvoie une erreur 404 (Not Found).
            // res.status(404) définit le code HTTP.
            res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
    } catch (error) {
        // Affiche l'erreur dans la console pour débogage (ex. : erreur SQL).
        console.error(error);
        // Renvoie une erreur 500 (Internal Server Error).
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

// Route GET /user/previous-courses : Récupère les 6 derniers cours suivis par l'utilisateur.
router.get('/previous-courses', authMiddleware, async (req, res) => {
    try {
        // Récupère l'ID de l'utilisateur depuis req.user.id_inscrit.
        // id_inscrit est inclus dans le token JWT généré par /auth/signup ou /auth/login.
        const userId = req.user.id;

        // Exécute une requête SQL pour joindre INSCRIPTION et COURS.
        // pool.query exécute la requête.
        // Arguments :
        // - Requête SQL : Joint INSCRIPTION (i) et COURS (c) sur id_cours, filtre par id_inscrit, trie par date décroissante, limite à 6.
        // - [userId] : Paramètre sécurisé pour id_inscrit.
        const result = await pool.query(
            `
            SELECT c.nom_cours, c.datetime_cours
            FROM INSCRIPTION i
            JOIN COURS c ON i.id_cours = c.id_cours
            WHERE i.id_inscrit = $1
            ORDER BY c.datetime_cours DESC
            LIMIT 6
            `,
            [userId]
        );

        // Envoie une réponse JSON avec :
        // - message : Confirmation du succès.
        // - courses : Liste des cours (result.rows), chaque élément contient nom_cours et datetime_cours.
        res.json({
            message: 'Cours précédents récupérés avec succès',
            courses: result.rows,
        });
    } catch (error) {
        // Affiche l'erreur pour débogage.
        console.error(error);
        // Renvoie une erreur 500.
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

// Exporte le routeur pour qu'il soit utilisé dans index.js.
module.exports = router;