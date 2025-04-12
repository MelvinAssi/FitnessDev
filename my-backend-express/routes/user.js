const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

router.get('/profil', authMiddleware, (req, res) => {
    res.json({
        message: 'Bienvenue sur ton profil ! 😎',
        user: req.user
    });
});

module.exports = router;