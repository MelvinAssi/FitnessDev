// Importe Express pour définir des routes HTTP.
const express = require('express');

// Importe bcrypt pour hacher les mots de passe de manière sécurisée.
// Bcrypt crée un hash unique (ex. : $2b$10$...) à partir d'un mot de passe, impossible à inverser.
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
router.post('/signup', [
    body('email_inscrit').isEmail().withMessage('Email invalide'),
    body('mdp_inscrit').isLength({ min: 8 }).withMessage('Mot de passe trop court'),
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array()[0].msg });
        }

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

        const emailCheck = await pool.query(
            'SELECT id_inscrit FROM INSCRIT WHERE email_inscrit = $1',
            [email_inscrit]
        );
        if (emailCheck.rows.length > 0) {
            return res.status(400).json({ error: 'Cet email est déjà utilisé' });
        }

        const hashedPassword = await bcrypt.hash(mdp_inscrit, 10);
        const newUser = await pool.query(
            `INSERT INTO INSCRIT (
                email_inscrit, nom_inscrit, prenom_inscrit, adresse_inscrit,
                telephone_inscrit, mdp_inscrit, type_inscrit, id_abonnement,
                date_naissance, civilite_inscrit
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            RETURNING id_inscrit, email_inscrit, nom_inscrit, prenom_inscrit, type_inscrit`,
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
                civilite_inscrit,
            ]
        );

        const token = jwt.sign(
            {
                id_inscrit: newUser.rows[0].id_inscrit,
                email_inscrit,
                type_inscrit: type_inscrit || 'client',
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(201).json({ user: newUser.rows[0], token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Route POST /auth/login : Authentifie un utilisateur existant.
router.post('/login', async (req, res) => {
    // Extrait email et mot de passe du corps de la requête.
    // req.body contient les données envoyées (ex. : { email_inscrit: "jean.dupont@example.com", mdp_inscrit: "password123" }).
    const { email_inscrit, mdp_inscrit } = req.body;

    try {
        // Cherche l'utilisateur par email dans INSCRIT.
        // pool.query exécute la requête.
        // Arguments :
        // - 'SELECT * FROM INSCRIT WHERE email_inscrit = $1' : Requête pour trouver l'utilisateur.
        // - [email_inscrit] : Paramètre sécurisé.
        const user = await pool.query('SELECT * FROM INSCRIT WHERE email_inscrit = $1', [email_inscrit]);

        // Vérifie si un utilisateur est trouvé (rows.length === 0 si aucun).
        // Si aucun, renvoie une erreur 400 (Bad Request).
        if (user.rows.length === 0) {
            return res.status(400).json({ message: 'Email incorrect' });
        }

        // Compare le mot de passe fourni avec le hash stocké.
        // bcrypt.compare vérifie si mdp_inscrit correspond au hash.
        // Arguments :
        // - mdp_inscrit : Mot de passe brut.
        // - user.rows[0].mdp_inscrit : Hash stocké dans la base.
        // Retourne true si correspond, false sinon.
        const validPassword = await bcrypt.compare(mdp_inscrit, user.rows[0].mdp_inscrit);

        // Si le mot de passe est incorrect, renvoie une erreur 400.
        if (!validPassword) {
            return res.status(400).json({ message: 'mot de passe incorrect' });
        }

        // Génère un token JWT pour l'utilisateur authentifié.
        // Arguments :
        // - { id, email } : Payload avec l'ID et l'email (id est un alias pour id_inscrit).
        // - process.env.JWT_SECRET : Clé secrète.
        // - { expiresIn: '1h' } : Expiration après 1 heure.
        const token = jwt.sign(
            { id: user.rows[0].id_inscrit, email: user.rows[0].email_inscrit },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Envoie une réponse JSON avec le token et un message.
        // Pas de code statut explicite, donc 200 par défaut (OK).
        res.json({ message: 'Connexion réussie', token });
    } catch (err) {
        // Affiche l'erreur pour débogage.
        console.error(err);
        // Renvoie une erreur 500.
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

// Exporte le routeur pour qu'il soit utilisé dans index.js.
module.exports = router;