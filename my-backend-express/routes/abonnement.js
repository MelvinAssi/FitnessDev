/**
 * Fichier : abonnement.js
 * Description : Module de routes Express pour gérer les abonnements des utilisateurs dans l'application FitnessDev.
 * Fournit des endpoints pour vérifier un abonnement actif, souscrire à un nouvel abonnement avec paiement,
 * et annuler un abonnement actif. Utilise un middleware d'authentification et interagit avec la base de données PostgreSQL.
 */

const express = require('express'); // Importe Express pour créer un routeur
const router = express.Router(); // Crée une instance de routeur Express pour définir les endpoints
const authMiddleware = require('../middleware/auth'); // Importe le middleware d'authentification pour vérifier les tokens JWT
const pool = require('../config/db'); // Importe l'instance Pool pour les connexions à PostgreSQL

/**
 * Route : GET /check
 * Description : Vérifie si l'utilisateur a un abonnement actif en interrogeant la table abonnement.
 * Requiert un token JWT valide (via authMiddleware).
 * Retourne les détails de l'abonnement actif ou une erreur 404 si aucun abonnement n'est trouvé.
 */
router.get('/check', authMiddleware, async (req, res) => {
    // Récupère l'ID de l'utilisateur depuis le token JWT décodé par authMiddleware
    // req.user est ajouté par authMiddleware (ex. : { id: 1, email_inscrit: "user@example.com" })
    const id_inscrit = req.user.id;

    try {
        // Exécute une requête SQL pour récupérer l'abonnement actif
        // Syntaxe : pool.query(queryText, params, callback)
        // - queryText : Requête SQL avec des placeholders ($1)
        // - params : Tableau des valeurs pour les placeholders
        // La requête joint les tables abonnement et type_abonnement pour inclure le nom du type
        const result = await pool.query(
            `SELECT a.*, t.nom_type_abonnement 
             FROM abonnement a
             JOIN type_abonnement t ON a.id_type_abonnement = t.id_type_abonnement
             WHERE a.id_inscrit = $1 AND a.actif_abonnement = true`,
            [id_inscrit] // $1 est remplacé par id_inscrit
        );

        // Vérifie si aucun abonnement actif n'a été trouvé
        // result.rows est un tableau des lignes retournées (vide si aucun résultat)
        if (result.rows.length === 0) {
            // Renvoie une erreur HTTP 404 (Not Found) avec un message JSON
            return res.status(404).json({ message: "Aucun abonnement actif trouvé" });
        }

        // Renvoie les détails du premier abonnement actif trouvé
        // result.rows[0] contient un objet avec les colonnes de la table abonnement et nom_type_abonnement
        res.json(result.rows[0]);

    } catch (err) {
        // Journalise l'erreur pour débogage
        // err contient des détails comme une erreur SQL ou un problème de connexion
        console.error(err);
        // Renvoie une erreur HTTP 500 (Internal Server Error) avec un message JSON
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

/**
 * Route : POST /subscribe
 * Description : Crée un nouvel abonnement pour l'utilisateur et enregistre un paiement associé.
 * Vérifie d'abord si un abonnement actif existe déjà. Requiert un token JWT et des données valides.
 * Retourne les détails de l'abonnement et du paiement créés.
 */
router.post('/subscribe', authMiddleware, async (req, res) => {
    // Extrait les données du corps de la requête (req.body) via destructuring
    // Les champs attendus sont ceux nécessaires pour la table abonnement et paiement
    const { 
        duree_abonnement, // Durée de l'abonnement en mois
        datedebut_abonnement, // Date de début (format texte)
        datefin_abonnement, // Date de fin
        prix_abonnement, // Prix total
        actif_abonnement = true, // Statut actif, true par défaut
        id_type_abonnement, // ID du type d'abonnement (ex. : 1 pour ESSENTIAL)
        type_paiement, // Type de paiement (ex. : carte, prélèvement)
    } = req.body;

    // Récupère l'ID de l'utilisateur depuis le token JWT
    const id_inscrit = req.user.id;

    try {
        // Vérifie si l'utilisateur a déjà un abonnement actif
        // Requête SQL pour chercher dans la table abonnement
        const check = await pool.query(
            `SELECT * FROM abonnement WHERE id_inscrit = $1 AND actif_abonnement = true`,
            [id_inscrit]
        );

        // Si un abonnement actif existe, renvoie une erreur 400 (Bad Request)
        if (check.rows.length > 0) {
            return res.status(400).json({ message: "Un abonnement actif existe déjà" });
        }

        // Insère un nouvel abonnement dans la table abonnement
        // Syntaxe : INSERT INTO ... VALUES ($1, $2, ...) RETURNING *
        // RETURNING * renvoie toutes les colonnes de la ligne insérée
        const newAbonnement = await pool.query(
            `INSERT INTO abonnement (
                duree_abonnement, datedebut_abonnement, datefin_abonnement, 
                prix_abonnement, actif_abonnement, id_type_abonnement, id_inscrit
            ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [
                duree_abonnement, // $1 : Durée
                datedebut_abonnement, // $2 : Date début
                datefin_abonnement, // $3 : Date fin
                prix_abonnement, // $4 : Prix
                actif_abonnement, // $5 : Actif
                id_type_abonnement, // $6 : Type d'abonnement
                id_inscrit // $7 : ID utilisateur
            ]
        );

        // Stocke les détails de l'abonnement créé
        // newAbonnement.rows[0] contient l'objet inséré (ex. : { id_abonnement, duree_abonnement, ... })
        const abonnement = newAbonnement.rows[0];

        // Insère un enregistrement de paiement dans la table paiement
        // Utilise CURRENT_DATE pour la date du jour
        const newPaiement = await pool.query(`
            INSERT INTO paiement (
                montant_paiement, date_paiement, type_paiement,
                id_abonnement, id_inscrit
            ) VALUES ($1, CURRENT_DATE, $2, $3, $4) RETURNING *`,
            [
                prix_abonnement, // $1 : Montant du paiement
                type_paiement, // $2 : Type de paiement
                abonnement.id_abonnement, // $3 : ID de l'abonnement
                id_inscrit // $4 : ID utilisateur
            ]
        );

        // Renvoie une réponse HTTP 201 (Created) avec les détails
        // Inclut l'abonnement et le paiement créés
        res.status(201).json({
            message: "Abonnement et paiement créés avec succès",
            abonnement, // Objet abonnement
            paiement: newPaiement.rows[0] // Objet paiement
        });

    } catch (err) {
        // Journalise l'erreur pour débogage
        console.error(err);
        // Renvoie une erreur 500 avec un message générique
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

/**
 * Route : PUT /cancel
 * Description : Annule l'abonnement actif de l'utilisateur en mettant actif_abonnement à false.
 * Requiert un token JWT. Retourne les détails de l'abonnement annulé ou une erreur 404 si aucun abonnement.
 */
router.put('/cancel', authMiddleware, async (req, res) => {
    // Récupère l'ID de l'utilisateur depuis le token JWT
    const id_inscrit = req.user.id;

    try {
        // Exécute une requête SQL pour mettre à jour l'abonnement
        // Met actif_abonnement à false pour l'abonnement actif de l'utilisateur
        const result = await pool.query(
            `UPDATE abonnement 
             SET actif_abonnement = false 
             WHERE id_inscrit = $1 AND actif_abonnement = true 
             RETURNING *`,
            [id_inscrit]
        );

        // Vérifie si aucune ligne n'a été mise à jour
        // result.rowCount indique le nombre de lignes affectées
        if (result.rowCount === 0) {
            // Renvoie une erreur 404 si aucun abonnement actif
            return res.status(404).json({ message: "Aucun abonnement actif à annuler" });
        }

        // Renvoie une réponse avec l'abonnement annulé
        res.json({
            message: "Abonnement annulé avec succès",
            abonnement: result.rows[0] // Objet de l'abonnement mis à jour
        });

    } catch (err) {
        // Journalise l'erreur
        console.error(err);
        // Renvoie une erreur 500
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

// Exporte le routeur pour qu'il soit monté dans index.js
module.exports = router;