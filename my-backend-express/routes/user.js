const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const pool = require('../config/db');

router.get('/profil', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const result = await pool.query('SELECT * FROM inscrit WHERE id_inscrit = $1', [userId]);

        
        if (result.rows.length > 0) {
            const user = result.rows[0];
            const { mdp_inscrit, type_inscrit, ...userWithout } = user;
            res.json({
                message: 'Profil récupéré avec succès',
                user: userWithout
            });
        } else {
            res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});



module.exports = router;