
const express = require('express');
const authRoutes = require('./routes/auth');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(express.json());

app.use('/auth', authRoutes); 
app.get('/', (req, res) => {
    res.send('Bienvenue sur l\'API Express !');
});


app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});