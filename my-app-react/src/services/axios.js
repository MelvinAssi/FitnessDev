import axios from 'axios';

// Crée une instance d'axios avec une URL de base
const instance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token JWT à chaque requête
// MODIFICATION: Ajout de logs pour diagnostiquer les erreurs de token
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    console.log('Token envoyé:', token); // MODIFICATION: Log du token
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    } else {
      console.warn('Aucun token trouvé dans localStorage');
    }
    return config;
  },
  (error) => {
    console.error('Erreur dans l\'intercepteur de requête:', error);
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs de réponse
// MODIFICATION: Logs détaillés pour les erreurs 403
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 403) {
      console.error('Erreur 403: Token invalide ou accès interdit', error.response.data);
    }
    return Promise.reject(error);
  }
);

export default instance;