// Importe le module jsonwebtoken pour créer et vérifier des tokens JWT.
// JWT est un standard pour encoder des données (ex. : identité utilisateur) de manière sécurisée.
const jwt = require('jsonwebtoken');

// Charge les variables d'environnement depuis .env (ex. : JWT_SECRET).
// JWT_SECRET est utilisé pour signer/vérifier les tokens.
require('dotenv').config();

// Définit une fonction middleware appelée authenticateToken.
// Arguments :
// - req : Objet requête, contient les données envoyées par le client (ex. : headers).
// - res : Objet réponse, utilisé pour envoyer des données ou erreurs au client.
// - next : Fonction pour passer au middleware suivant ou à la route si tout est valide.
const authenticateToken = (req, res, next) => {
    // Récupère l'en-tête Authorization depuis req.headers.
    // Exemple d'en-tête : "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...".
    // req.headers['authorization'] accède à la valeur de l'en-tête Authorization (en minuscules).
    const authHeader = req.headers['authorization'];

    // Extrait le token en vérifiant si authHeader existe, puis en coupant après "Bearer ".
    // authHeader.split(' ') retourne un tableau : ["Bearer", "eyJhbGci..."].
    // [1] prend le deuxième élément (le token lui-même).
    // && vérifie que authHeader existe avant de tenter split pour éviter les erreurs.
    const token = authHeader && authHeader.split(' ')[1];

    // Si aucun token n'est fourni (token est undefined ou null), renvoie une erreur.
    // res.status(401) définit le code HTTP 401 (Unauthorized).
    // res.json({ message: 'Token manquant' }) envoie un objet JSON comme réponse.
    if (!token) return res.status(401).json({ message: 'Token manquant' });

    // Vérifie la validité du token avec jwt.verify.
    // Arguments :
    // - token : La chaîne JWT à vérifier.
    // - process.env.JWT_SECRET : La clé secrète utilisée pour signer le token (doit correspondre à celle utilisée dans auth.js).
    // - (err, user) => {...} : Callback exécuté après vérification.
    //   - err : Erreur si le token est invalide (ex. : expiré, modifié).
    //   - user : Données décodées du token si valide (ex. : { id_inscrit: 1, email_inscrit: "jean.dupont@example.com" }).
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        // Si une erreur est détectée (ex. : token expiré), renvoie une erreur 403 (Forbidden).
        // 403 indique que l'accès est interdit, même avec un token.
        if (err) return res.status(403).json({ message: 'Token invalide' });

        // Ajoute les données décodées du token à req.user pour les utiliser dans la route suivante.
        // Ex. : req.user = { id_inscrit: 1, email_inscrit: "jean.dupont@example.com" }.
        req.user = user;

        // Appelle next() pour passer à la route ou au middleware suivant.
        // Sans next(), la requête resterait bloquée.
        next();
    });
};

// Exporte la fonction middleware pour qu'elle soit utilisée dans les routes (ex. : user.js).
module.exports = authenticateToken;