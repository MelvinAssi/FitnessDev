import { useState } from 'react';
import { login } from '../../services/authService.js';

const ContactPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const user = await login(email, password);
      console.log('Connecté :', user);
    } catch (error) {
      console.error('Erreur de connexion :', error);
    }
  };

  return (
    <div>
      <h2>Contactez-nous - FitnessDev</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Mot de passe"
      />
      <button onClick={handleLogin}>Se connecter</button>
    </div>
  );
};

export default ContactPage;