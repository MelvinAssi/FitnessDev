const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const pool = require('../config/db');

// MODIFICATION: Endpoint POST /bookings pour gérer les réservations de cours
router.post('/', authMiddleware, async (req, res) => {
    const { courseName, date, time, duration } = req.body;
    const id_inscrit = req.user.id; // Extrait du token via authMiddleware

    if (!id_inscrit) {
        return res.status(401).json({ error: 'Utilisateur non authentifié' });
    }

    // MODIFICATION: Vérifie que les données requises sont fournies
    if (!courseName || !date || !time || !duration) {
        return res.status(400).json({ error: 'Données manquantes : courseName, date, time, ou duration requis' });
    }

    try {
        // MODIFICATION: Vérifier si le cours existe
        let { rows } = await pool.query(
            'SELECT id_cours FROM COURS WHERE nom_cours = $1 AND datetime_cours = TO_TIMESTAMP($2 || \' \' || $3, \'DD/MM/YYYY HH24:MI\')',
            [courseName, date, time]
        );

        let id_cours;
        if (rows.length === 0) {
            // MODIFICATION: Créer un nouveau cours si aucun n’existe
            const coachMap = {
                'Cours Collectifs': 1, // Anna
                'Pole Dance': 2, // Marc
                'Crosstraining': 3, // Léa
                'Boxe': 4, // Paul
                'Haltérophilie': 5, // Sophie
                'MMA': 6 // Lucas
            };

            // Vérifier si le cours est valide
            if (!coachMap[courseName]) {
                return res.status(400).json({ error: 'Nom de cours invalide' });
            }

            const result = await pool.query(
                'INSERT INTO COURS (nom_cours, duree_cours, datetime_cours, prix_cours, id_coach) VALUES ($1, $2, TO_TIMESTAMP($3 || \' \' || $4, \'DD/MM/YYYY HH24:MI\'), $5, $6) RETURNING id_cours',
                [courseName, 120, date, time, 0, coachMap[courseName]]
            );
            id_cours = result.rows[0].id_cours;
        } else {
            id_cours = rows[0].id_cours;
        }

        // MODIFICATION: Insérer l’inscription dans INSCRIPTION
        await pool.query(
            'INSERT INTO INSCRIPTION (date_inscription, id_inscrit, id_cours) VALUES (NOW(), $1, $2)',
            [id_inscrit, id_cours]
        );

        // MODIFICATION: Réponse de succès
        res.status(201).json({ message: 'Réservation enregistrée' });
    } catch (error) {
        console.error('Erreur lors de la réservation :', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;