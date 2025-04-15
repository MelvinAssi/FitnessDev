const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');
require('dotenv').config();

const router = express.Router();
router.post('/signup', async (req, res) => {
    try {
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
            'SELECT * FROM INSCRIT WHERE email_inscrit = $1',
            [email_inscrit]
        );
        if (emailCheck.rows.length > 0) {
            return res.status(400).json({ error: 'Cet email est déjà utilisé' });
        }

        
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(mdp_inscrit, saltRounds);

       
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

        const token = jwt.sign(
            { id_inscrit: newUser.rows[0].id_inscrit, email_inscrit, type_inscrit },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(201).json({ user: newUser.rows[0], token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

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
  
  module.exports = router;