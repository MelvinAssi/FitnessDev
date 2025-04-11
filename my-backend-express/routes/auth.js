const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');
require('dotenv').config();

const router = express.Router();

router.post('/login', async (req, res) => {
    console.log("Route POST /auth/login appelée");
    console.log("Contenu du body reçu :", req.body);
    const { email_inscrit, mdp_inscrit } = req.body;
    console.log("Email reçu :", email_inscrit);
    try {      
      const user = await pool.query('SELECT * FROM INSCRIT WHERE email_inscrit = $1', [email_inscrit]);
      if (user.rows.length === 0) {
        return res.status(400).json({ message: 'Email incorrect' });
      }

      
      const validPassword = await bcrypt.compare(mdp_inscrit, user.rows[0].mdp_inscrit);
      if (!validPassword) {
        return res.status(400).json({ message: 'mot de passe incorrect' });
      }
      console.log('Mot de passe envoyé:', mdp_inscrit);
      console.log('Mot de passe haché en base de données:', user.rows[0].mdp_inscrit);
      
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
  
  module.exports = router;