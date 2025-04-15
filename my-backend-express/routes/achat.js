const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const pool = require('../config/db');


router.post('/', authMiddleware, async (req, res) => {
    const id_inscrit = req.user.id;
    

    try{        
        const { type_paiement ,produits} = req.body;
        if (!Array.isArray(produits)) {
            produits = [produits];
        }
        const panier = await pool.query(
            `INSERT INTO achat(date_achat, id_inscrit)
             VALUES ($1, $2) RETURNING *`,
            [new Date(), id_inscrit]
        );        
        const id_achat = panier.rows[0].id_achat;  
            
        for (const produit of produits) {
            const { id_produit, quantite } = produit;
            const newProduit = await pool.query(
                `INSERT INTO achat_produit (id_achat,id_produit, quantite)
                 VALUES ($1, $2, $3) RETURNING *`,
                [id_achat,id_produit, quantite]
            );
        }

        const sommePanier = await pool.query(
            `SELECT 
                SUM(ap.quantite * p.prix_produit) AS montant_total
            FROM 
                achat_produit ap
            JOIN 
                produit p ON ap.id_produit = p.id_produit
            WHERE 
                ap.id_achat = $1`, 
            [id_achat] 
        );

        const montant = sommePanier.rows[0].montant_total;

        const newPaiement = await pool.query(`
            INSERT INTO paiement (
                montant_paiement, date_paiement, type_paiement,
                id_achat, id_inscrit
            ) VALUES ($1, CURRENT_DATE, $2, $3, $4) RETURNING *`,
            [
                montant,
                type_paiement,
                id_achat,
                id_inscrit
            ]
        );


        res.status(201).json({
            message: "Panier et paiement créés avec succès",
            panier : `La somme est de ${montant}`,
            paiement: newPaiement.rows[0]
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

module.exports = router;