// Importe Express pour créer des routes HTTP.
const express = require('express');

// Crée un routeur Express pour organiser les routes de ce fichier.
const router = express.Router();

// Importe le middleware d'authentification pour sécuriser les routes.
const authMiddleware = require('../middleware/auth');

// Importe la connexion à la base de données pour exécuter des requêtes SQL.
const pool = require('../config/db');

// Route GET /user/profil : Récupère les informations du profil de l'utilisateur authentifié.
router.get('/profil', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const result = await pool.query('SELECT * FROM inscrit WHERE id_inscrit = $1', [userId]);
        if (result.rows.length > 0) {
            const user = result.rows[0];
            const { mdp_inscrit, type_inscrit, ...userWithout } = user;
            res.json({
                message: 'Profil récupéré avec succès',
                user: userWithout,
            });
        } else {
            res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

// Route GET /user/previous-courses : Récupère les 6 derniers cours suivis par l'utilisateur.
router.get('/previous-courses', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
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
        res.json({
            message: 'Cours précédents récupérés avec succès',
            courses: result.rows,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

// Exporte le routeur pour qu'il soit utilisé dans index.js.
module.exports = router;