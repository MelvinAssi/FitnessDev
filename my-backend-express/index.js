// Modules requis
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const https = require('https');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Crée une instance Express
const app = express();

// Middleware de sécurité
app.use(cors({
    origin: ['https://localhost:5173', 'https://backend:5173'],
    credentials: true,
}));
app.use(helmet());
app.use(helmet.hsts({
  maxAge: 63072000, // 2 ans
  includeSubDomains: true,
  preload: true
}));
app.use(express.json()); // Parse JSON

// Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const userAbonnementRoutes = require('./routes/abonnement');
const typeAbonnementRoutes = require('./routes/typeAbonnement');
const produitRoutes = require('./routes/produit');
const achatRoutes = require('./routes/achat');

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/user/abonnement', userAbonnementRoutes);
app.use('/type_abonnement', typeAbonnementRoutes);
app.use("/produit", produitRoutes);
app.use("/user/achat", achatRoutes);

// Route de test
app.get('/', (req, res) => {
  res.send('Bienvenue sur l\'API Express sécurisée !');
});

// Lecture des certificats SSL
const keyPath = path.join(__dirname, 'certs', 'localhost-key.pem');
const certPath = path.join(__dirname, 'certs', 'localhost.pem');

const privateKey = fs.readFileSync(keyPath, 'utf8');
const certificate = fs.readFileSync(certPath, 'utf8');
const credentials = { key: privateKey, cert: certificate };

// Lancer le serveur HTTPS
const PORT = 3001;
https.createServer(credentials, app).listen(PORT, () => {
  console.log(`✅ Serveur HTTPS démarré sur https://localhost:${PORT}`);
});
