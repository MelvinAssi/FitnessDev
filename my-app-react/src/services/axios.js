/**
 * Fichier : axios.js
 * Description : Configure une instance Axios personnalisée pour les requêtes HTTP vers le backend
 * (http://localhost:3000). Gère les tokens JWT via des intercepteurs et journalise les erreurs (notamment 403).
 */

/**
 * Importation
 * - axios : Bibliothèque pour les requêtes HTTP
 */
import axios from 'axios';

/**
 * Création d'une instance Axios
 * Syntaxe : axios.create(config) crée une instance avec des configurations par défaut
 * - baseURL : URL de base pour toutes les requêtes
 * - headers : Type de contenu JSON par défaut
 */
const instance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Intercepteur de requête
 * Description : Ajoute un token JWT à l'en-tête Authorization si présent dans localStorage.
 * Journalise le token ou avertit s'il est absent.
 * Syntaxe : instance.interceptors.request.use(onFulfilled, onRejected)
 */
instance.interceptors.request.use(
  (config) => {
    // Récupère le token JWT
    const token = localStorage.getItem('token');
    
    // Journalise pour débogage
    console.log('Token envoyé:', token);
    
    // Ajoute le token à l'en-tête si présent
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    } else {
      console.warn('Aucun token trouvé dans localStorage');
    }
    
    // Retourne la configuration modifiée
    return config;
  },
  (error) => {
    // Journalise les erreurs
    console.error('Erreur dans l\'intercepteur de requête:', error);
    
    // Propage l'erreur
    return Promise.reject(error);
  }
);

/**
 * Intercepteur de réponse
 * Description : Gère les erreurs de réponse, notamment les erreurs 403 pour déboguer.
 * Syntaxe : instance.interceptors.response.use(onFulfilled, onRejected)
 */
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Journalise les erreurs 403
    if (error.response && error.response.status === 403) {
      console.error('Erreur 403: Token invalide ou accès interdit', error.response.data);
    }
    
    // Propage l'erreur
    return Promise.reject(error);
  }
);

/**
 * Exportation
 * Description : Exporte l'instance Axios configurée
 */
export default instance;