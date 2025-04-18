const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
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

// Route GET /user/previous-courses : Récupère toutes les inscriptions de l'utilisateur.
router.get('/previous-courses', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const result = await pool.query(
            `
            SELECT c.nom_cours, c.datetime_cours, c.id_cours
            FROM INSCRIPTION i
            JOIN COURS c ON i.id_cours = c.id_cours
            WHERE i.id_inscrit = $1
            ORDER BY c.datetime_cours DESC
            `,
            [userId]
        );
        res.json({
            message: 'Inscriptions récupérées avec succès',
            courses: result.rows,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

// Exporte le routeur pour qu'il soit utilisé dans index.js.
module.exports = router;
// MODIFICATION: Suppression de datetime_cours < NOW() pour inclure toutes les inscriptions