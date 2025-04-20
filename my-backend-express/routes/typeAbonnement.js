const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.get('/', async (req, res) => {
  const { nom } = req.query;
  try {
    let result;
    if (nom) {
      result = await pool.query(
        'SELECT * FROM type_abonnement WHERE LOWER(nom_type_abonnement) = LOWER($1)',
        [nom]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Type d’abonnement non trouvé' });
      }
    } else {
      result = await pool.query('SELECT * FROM type_abonnement');
    }
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

module.exports = router;