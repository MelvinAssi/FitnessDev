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
router.post('/signup', async (req, res) => {
    try {
        // Utilise la déstructuration pour extraire les champs du corps de la requête (req.body).
        // req.body contient les données envoyées par le frontend (ex. : via un formulaire).
        // Exemple : { email_inscrit: "jean.dupont@example.com", nom_inscrit: "Dupont", ... }.
        const {
            email_inscrit,
            nom_inscrit,
            prenom_inscrit,
            adresse_inscrit,
            telephone_inscrit,
            mdp_inscrit,
            type_inscrit,
            id_abonnement,
<<<<<<< HEAD
<<<<<<< HEAD
            date_naissance,
            civilite_inscrit,
=======
>>>>>>> f7ff712dda30f821a846590a99df5e3672116ff1
=======
            date_naissance,
            civilite_inscrit,
>>>>>>> melvin_dev
        } = req.body;

        // Vérifie si l'email existe déjà pour éviter les doublons.
        // pool.query exécute une requête SQL.
        // Arguments :
        // - 'SELECT * FROM INSCRIT WHERE email_inscrit = $1' : Requête pour chercher un utilisateur par email.
        // - [email_inscrit] : Tableau des paramètres, $1 est remplacé par email_inscrit pour éviter les injections SQL.
        const emailCheck = await pool.query(
            'SELECT * FROM INSCRIT WHERE email_inscrit = $1',
            [email_inscrit]
        );

        // Vérifie si des lignes sont retournées (rows.length > 0 signifie que l'email existe).
        // Si oui, renvoie une erreur 400 (Bad Request) avec un message JSON.
        if (emailCheck.rows.length > 0) {
            return res.status(400).json({ error: 'Cet email est déjà utilisé' });
        }

        // Définit le nombre de tours pour le hachage bcrypt.
        // 10 est un compromis entre sécurité (plus de tours = plus lent à craquer) et performance.
        const saltRounds = 10;

        // Hache le mot de passe avec bcrypt.hash.
        // Arguments :
        // - mdp_inscrit : Le mot de passe brut envoyé par l'utilisateur.
        // - saltRounds : Nombre de tours pour le hachage.
        // - await : Attend que le hachage soit terminé (asynchrone).
        const hashedPassword = await bcrypt.hash(mdp_inscrit, saltRounds);

        // Insère le nouvel utilisateur dans la table INSCRIT.
        // pool.query exécute la requête SQL.
        // Arguments :
        // - INSERT INTO ... : Requête pour insérer les données.
        // - [...] : Tableau des valeurs à insérer, correspondant aux $1, $2, etc.
        // - RETURNING * : Retourne toutes les colonnes de la nouvelle ligne insérée.
        const newUser = await pool.query(
            `INSERT INTO INSCRIT (
                email_inscrit, nom_inscrit, prenom_inscrit, adresse_inscrit,
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> melvin_dev
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
<<<<<<< HEAD
=======
                telephone_inscrit, mdp_inscrit, type_inscrit, id_abonnement
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
            [
                email_inscrit, // $1 : Email unique.
                nom_inscrit, // $2 : Nom.
                prenom_inscrit, // $3 : Prénom.
                adresse_inscrit, // $4 : Adresse.
                telephone_inscrit, // $5 : Téléphone.
                hashedPassword, // $6 : Mot de passe haché.
                type_inscrit || 'client', // $7 : Type, par défaut 'client' si non fourni (opérateur || pour fallback).
                id_abonnement || null, // $8 : ID abonnement, null si non fourni.
>>>>>>> f7ff712dda30f821a846590a99df5e3672116ff1
=======
>>>>>>> melvin_dev
            ]
        );

        // Génère un token JWT pour l'utilisateur nouvellement créé.
        // jwt.sign crée un token signé.
        // Arguments :
        // - { id_inscrit, email_inscrit, type_inscrit } : Payload, données incluses dans le token.
        // - process.env.JWT_SECRET : Clé secrète pour signer le token.
        // - { expiresIn: '1h' } : Options, ici le token expire après 1 heure.
        const token = jwt.sign(
            { id_inscrit: newUser.rows[0].id_inscrit, email_inscrit, type_inscrit },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Envoie une réponse HTTP 201 (Created) avec :
        // - user : Les données de l'utilisateur inséré (newUser.rows[0]).
        // - token : Le JWT pour authentifier les futures requêtes.
        // res.status(201) définit le code HTTP.
        // res.json() envoie les données au format JSON.
        res.status(201).json({ user: newUser.rows[0], token });
    } catch (err) {
        // En cas d'erreur (ex. : problème DB, JSON malformé), affiche dans la console.
        console.error(err);
        // Renvoie une erreur 500 (Internal Server Error) avec un message.
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