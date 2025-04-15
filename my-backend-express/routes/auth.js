// Importe Express pour définir des routes HTTP.
const express = require('express');

// Importe bcrypt pour hacher les mots de passe de manière sécurisée.
const bcrypt = require('bcrypt');

// Importe jsonwebtoken pour générer et vérifier des tokens JWT.
const jwt = require('jsonwebtoken');

// Importe la connexion à la base de données (pool) pour exécuter des requêtes SQL.
const pool = require('../config/db');

// Charge les variables d'environnement (ex. : JWT_SECRET).
require('dotenv').config();

// Crée un routeur Express pour organiser les routes d'authentification.
const router = express.Router();

// Route POST /auth/signup : Crée un nouvel utilisateur dans la base.
router.post('/signup', async (req, res) => {
    try {
        // Utilise la déstructuration pour extraire les champs du corps de la requête (req.body).
        const {
            email_inscrit,
            nom_inscrit,
            prenom_inscrit,
            adresse_inscrit,
            telephone_inscrit,
            mdp_inscrit,
            type_inscrit,
            id_abonnement,
            date_naissance,
            civilite_inscrit,
        } = req.body;

        // Vérifie si l'email existe déjà pour éviter les doublons.
        const emailCheck = await pool.query(
            'SELECT * FROM INSCRIT WHERE email_inscrit = $1',
            [email_inscrit]
        );

        if (emailCheck.rows.length > 0) {
            return res.status(400).json({ error: 'Cet email est déjà utilisé' });
        }

        // Définit le nombre de tours pour le hachage bcrypt.
        const saltRounds = 10;

        // Hache le mot de passe avec bcrypt.hash.
        const hashedPassword = await bcrypt.hash(mdp_inscrit, saltRounds);

        // Insère le nouvel utilisateur dans la table INSCRIT.
        const newUser = await pool.query(
            `INSERT INTO INSCRIT (
                email_inscrit, nom_inscrit, prenom_inscrit, adresse_inscrit,
                telephone_inscrit, mdp_inscrit, type_inscrit, id_abonnement,
                date_naissance, civilite_inscrit
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
            [
                email_inscrit,
                nom_inscrit,
                prenom_inscrit,
                adresse_inscrit,
                telephone_inscrit,
                hashedPassword,
                type_inscrit || 'client',
                id_abonnement || null,
                date_naissance,
                civilite_inscrit
            ]
        );

        // Génère un token JWT pour l'utilisateur nouvellement créé.
        const token = jwt.sign(
            { id_inscrit: newUser.rows[0].id_inscrit, email_inscrit, type_inscrit },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Envoie une réponse HTTP 201 (Created).
        res.status(201).json({ user: newUser.rows[0], token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Route POST /auth/login : Authentifie un utilisateur existant.
router.post('/login', async (req, res) => {
    const { email_inscrit, mdp_inscrit } = req.body;

    try {
        const user = await pool.query('SELECT * FROM INSCRIT WHERE email_inscrit = $1', [email_inscrit]);

        if (user.rows.length === 0) {
            return res.status(400).json({ message: 'Email incorrect' });
        }

        const validPassword = await bcrypt.compare(mdp_inscrit, user.rows[0].mdp_inscrit);

        if (!validPassword) {
            return res.status(400).json({ message: 'mot de passe incorrect' });
        }

        const token = jwt.sign(
            { id: user.rows[0].id_inscrit, email: user.rows[0].email_inscrit },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ message: 'Connexion réussie', token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

// Exporte le routeur pour qu'il soit utilisé dans index.js.
module.exports = router;