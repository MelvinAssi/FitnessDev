const express = require('express');
const router = express.Router();
const pool = require('../config/db');


router.get('/', async (req, res) => {
  const { nom } = req.query;

  try {
    let result;

    if (nom) {
      result = await pool.query(
        'SELECT * FROM produit WHERE nom_produit = $1',
        [nom]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Produit non trouvé' });
      }
    } else {
      result = await pool.query('SELECT * FROM produit');
    }

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});


router.post('/add', async (req, res) => {
    try {
      let produits = req.body;
  
      if (!Array.isArray(produits)) {
        produits = [produits];
      }
  
      const inserted = [];
  
      for (const prod of produits) {
        const { nom_produit, prix_produit } = prod;

        if (!nom_produit || !prix_produit || nom_produit.trim() === "") {
            continue;
          }
        const produitCheck = await pool.query(
          'SELECT * FROM produit WHERE nom_produit = $1',
          [nom_produit]
        );
  
        if (produitCheck.rows.length > 0) {
          continue;
        }
  
        const newProduit = await pool.query(
          `INSERT INTO produit (nom_produit, prix_produit)
           VALUES ($1, $2) RETURNING *`,
          [nom_produit, prix_produit]
        );
  
        inserted.push(newProduit.rows[0]);
      }
  
      res.status(201).json({
        message: `${inserted.length} produit(s) ajouté(s)`,
        produits: inserted
      });
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  });
  

module.exports = router;
