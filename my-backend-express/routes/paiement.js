const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const pool = require('../config/db');

router.get('/paiement', authMiddleware, async (req, res) => {

});
module.exports = router;