const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const pool = require('../config/db');
const bcrypt = require('bcrypt');

router.get('/profil', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const result = await pool.query('SELECT * FROM inscrit WHERE id_inscrit = $1', [userId]);
        if (result.rows.length > 0) {
            const user = result.rows[0];
            const { mdp_inscrit, ...userWithout } = user;
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
        console.log('Cours envoyés:', result.rows); // MODIFICATION: Log pour débogage
        res.json({
            message: 'Inscriptions récupérées avec succès',
            courses: result.rows,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

router.put('/profil', authMiddleware, async (req, res) => {
    const {
        civilite,
        name,
        firstname,
        phone,
        email,
        password,
        adress,
        recaptchaToken,
    } = req.body;

    try {
        if (!recaptchaToken) {
            return res.status(400).json({ message: 'reCAPTCHA requis' });
        }

        let query = 'UPDATE INSCRIT SET ';
        const values = [];
        let paramIndex = 1;

        if (civilite) {
            query += `type_inscrit = $${paramIndex}, `;
            values.push(civilite);
            paramIndex++;
        }
        if (name) {
            query += `nom_inscrit = $${paramIndex}, `;
            values.push(name);
            paramIndex++;
        }
        if (firstname) {
            query += `prenom_inscrit = $${paramIndex}, `;
            values.push(firstname);
            paramIndex++;
        }
        if (phone) {
            query += `telephone_inscrit = $${paramIndex}, `;
            values.push(phone);
            paramIndex++;
        }
        if (email) {
            query += `email_inscrit = $${paramIndex}, `;
            values.push(email);
            paramIndex++;
        }
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            query += `mdp_inscrit = $${paramIndex}, `;
            values.push(hashedPassword);
            paramIndex++;
        }
        if (adress) {
            query += `adresse_inscrit = $${paramIndex}, `;
            values.push(adress);
            paramIndex++;
        }

        console.log('Requête SQL:', query);
        console.log('Valeurs SQL:', values);

        query = query.slice(0, -2);
        query += ` WHERE id_inscrit = $${paramIndex} RETURNING *`;
        values.push(req.user.id);

        const result = await pool.query(query, values);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        const user = result.rows[0];
        const { mdp_inscrit, ...userWithout } = user;

        res.json({
            message: 'Profil mis à jour avec succès',
            user: userWithout,
        });
    } catch (err) {
        console.error('Erreur lors de la mise à jour du profil:', err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

router.delete('/course/:id_cours', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const courseId = req.params.id_cours;
        console.log('Tentative de suppression - id_inscrit:', userId, 'id_cours:', courseId); // MODIFICATION: Log pour débogage

        const result = await pool.query(
            `
            DELETE FROM INSCRIPTION
            WHERE id_inscrit = $1 AND id_cours = $2
            RETURNING *
            `,
            [userId, courseId]
        );

        if (result.rowCount === 0) {
            console.log('Aucune inscription trouvée pour id_inscrit:', userId, 'id_cours:', courseId); // MODIFICATION: Log pour débogage
            return res.status(404).json({ message: 'Inscription non trouvée' });
        }

        console.log('Inscription supprimée:', result.rows[0]); // MODIFICATION: Log pour débogage
        res.json({
            message: 'Inscription annulée avec succès',
        });
    } catch (error) {
        console.error('Erreur lors de l\'annulation de l\'inscription:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

router.get('/orders', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const result = await pool.query(
            `
            SELECT 
                a.id_achat,
                a.date_achat,
                a.quantite_achat,
                p.id_produit,
                p.nom_produit,
                p.prix_produit
            FROM ACHAT a
            JOIN PRODUIT p ON a.id_produit = p.id_produit
            WHERE a.id_inscrit = $1
            ORDER BY a.date_achat DESC
            `,
            [userId]
        );

        console.log('Achats envoyés:', result.rows); // Log pour débogage
        res.json({
            message: 'Achats récupérés avec succès',
            orders: result.rows,
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des achats:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

module.exports = router;