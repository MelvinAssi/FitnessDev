/**
 * Fichier : auth.js
 * Description : Module de routes Express pour gérer l'authentification des utilisateurs (inscription et connexion).
 * Fournit des endpoints POST pour /signup (création de compte) et /login (connexion).
 * Valide les données, utilise bcrypt pour hacher les mots de passe, génère des tokens JWT, et vérifie le reCAPTCHA.
 */

const express = require('express'); // Importe Express pour créer un routeur
const bcrypt = require('bcrypt'); // Importe bcrypt pour hacher les mots de passe
const jwt = require('jsonwebtoken'); // Importe jsonwebtoken pour créer des tokens JWT
const pool = require('../config/db'); // Importe l'instance Pool pour PostgreSQL
const { body, validationResult } = require('express-validator'); // Importe express-validator pour valider les données
const verifyRecaptcha = require('../middleware/verifyRecaptcha'); // Importe le middleware pour vérifier le reCAPTCHA
require('dotenv').config(); // Charge les variables d'environnement (ex. : JWT_SECRET)

const router = express.Router(); // Crée une instance de routeur Express

/**
 * Route : POST /signup
 * Description : Crée un nouveau compte utilisateur en insérant les données dans la table INSCRIT.
 * Valide l'e-mail et le mot de passe, vérifie le reCAPTCHA, hache le mot de passe, et génère un token JWT.
 * Retourne l'utilisateur créé et le token.
 */
router.post('/signup', [
    // Valide l'e-mail avec express-validator
    // body('email_inscrit').isEmail() vérifie que le champ est un e-mail valide
    body('email_inscrit').isEmail().withMessage('Email invalide'),
    
    // Valide le mot de passe (minimum 8 caractères)
    body('mdp_inscrit').isLength({ min: 8 }).withMessage('Mot de passe trop court'),
    
    // Applique le middleware verifyRecaptcha pour valider le token reCAPTCHA
    verifyRecaptcha
], async (req, res) => {
    try {
        // Vérifie les erreurs de validation définies par express-validator
        // validationResult(req) retourne un objet avec les erreurs
        const errors = validationResult(req);
        
        // Si des erreurs existent, renvoie une erreur 400 avec le premier message
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array()[0].msg });
        }

        // Extrait les données du corps de la requête
        const {
            email_inscrit, // E-mail de l'utilisateur
            nom_inscrit, // Nom
            prenom_inscrit, // Prénom
            adresse_inscrit, // Adresse
            telephone_inscrit, // Téléphone
            mdp_inscrit, // Mot de passe en clair
            type_inscrit, // Type (ex. : client)
            id_abonnement, // ID de l'abonnement (optionnel)
            date_naissance, // Date de naissance
            civilite_inscrit, // Civilité (ex. : Homme, Femme)
        } = req.body;

        // Vérifie si l'e-mail est déjà utilisé
        // Requête SQL pour chercher dans la table INSCRIT
        const emailCheck = await pool.query(
            'SELECT id_inscrit FROM INSCRIT WHERE email_inscrit = $1',
            [email_inscrit]
        );

        // Si l'e-mail existe, renvoie une erreur 400
        if (emailCheck.rows.length > 0) {
            return res.status(400).json({ error: 'Cet email est déjà utilisé' });
        }

        // Hache le mot de passe avec bcrypt
        // bcrypt.hash(mdp_inscrit, 10) génère un hash avec 10 tours de sel
        const hashedPassword = await bcrypt.hash(mdp_inscrit, 10);

        // Insère un nouvel utilisateur dans la table INSCRIT
        // Syntaxe : INSERT INTO ... VALUES ($1, $2, ...) RETURNING ...
        const newUser = await pool.query(
            `INSERT INTO INSCRIT (
                email_inscrit, nom_inscrit, prenom_inscrit, adresse_inscrit,
                telephone_inscrit, mdp_inscrit, type_inscrit, id_abonnement,
                date_naissance, civilite_inscrit
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            RETURNING id_inscrit, email_inscrit, nom_inscrit, prenom_inscrit, type_inscrit`,
            [
                email_inscrit, // $1
                nom_inscrit, // $2
                prenom_inscrit, // $3
                adresse_inscrit, // $4
                telephone_inscrit, // $5
                hashedPassword, // $6
                type_inscrit || 'client', // $7, valeur par défaut 'client'
                id_abonnement || null, // $8, null si non fourni
                date_naissance, // $9
                civilite_inscrit, // $10
            ]
        );

        // Génère un token JWT pour l'utilisateur
        // Syntaxe : jwt.sign(payload, secret, options)
        // - payload : Données à encoder (ex. : ID et e-mail)
        // - secret : Clé secrète pour signer le token
        // - options : Inclut expiresIn pour une durée de vie de 1 heure
        const token = jwt.sign(
            {
                id_inscrit: newUser.rows[0].id_inscrit, // ID utilisateur
                email_inscrit, // E-mail
                type_inscrit: type_inscrit || 'client', // Type
            },
            process.env.JWT_SECRET, // Clé secrète depuis .env
            { expiresIn: '1h' } // Expire dans 1 heure
        );

        // Renvoie une réponse 201 avec l'utilisateur et le token
        res.status(201).json({ user: newUser.rows[0], token });
    } catch (err) {
        // Journalise l'erreur
        console.error(err);
        // Renvoie une erreur 500
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

/**
 * Route : POST /login
 * Description : Connecte un utilisateur en vérifiant son e-mail et son mot de passe.
 * Valide le reCAPTCHA, compare le mot de passe avec le hash stocké, et génère un token JWT.
 * Retourne un message de succès et le token.
 */
router.post('/login', verifyRecaptcha, async (req, res) => {
    // Extrait l'e-mail et le mot de passe du corps de la requête
    const { email_inscrit, mdp_inscrit } = req.body;

    try {
        // Recherche l'utilisateur par e-mail dans la table INSCRIT
        const user = await pool.query('SELECT * FROM INSCRIT WHERE email_inscrit = $1', [email_inscrit]);

        // Vérifie si l'utilisateur existe
        if (user.rows.length === 0) {
            // Renvoie une erreur 400 si l'e-mail n'existe pas
            return res.status(400).json({ message: 'Email incorrect' });
        }

        // Compare le mot de passe fourni avec le hash stocké
        // bcrypt.compare retourne true si les mots de passe correspondent
        const validPassword = await bcrypt.compare(mdp_inscrit, user.rows[0].mdp_inscrit);

        // Si le mot de passe est invalide, renvoie une erreur 400
        if (!validPassword) {
            return res.status(400).json({ message: 'mot de passe incorrect' });
        }

        // Génère un token JWT pour la connexion
        const token = jwt.sign(
            { id: user.rows[0].id_inscrit, email: user.rows[0].email_inscrit }, // Payload
            process.env.JWT_SECRET, // Clé secrète
            { expiresIn: '1h' } // Expiration
        );

        // Renvoie une réponse avec un message et le token
        res.json({ message: 'Connexion réussie', token });
    } catch (err) {
        // Journalise l'erreur
        console.error(err);
        // Renvoie une erreur 500
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Exporte le routeur pour index.js
module.exports = router;