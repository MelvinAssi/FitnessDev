/**
 * Fichier : BurgerMenu.jsx
 * Description : Composant React pour un menu burger responsive (mobile uniquement). Affiche une icône
 * de menu qui ouvre un panneau de navigation avec des liens et options d'authentification.
 * Utilise AuthContext pour gérer la connexion/déconnexion.
 */

import React, { useState, useContext } from 'react';
import useScroll from '../hooks/useScroll.jsx';
import styled from 'styled-components';
import MenuIcon from '../assets/icons/menu.svg?react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext.jsx';
import Button from './Button.jsx';
import '@fortawesome/fontawesome-free/css/all.min.css';

const StyledH2 = styled.h2`
    font-size: 12px;
    color: #ffffff;    
`;

const BurgerIcon = styled(MenuIcon)`
  width: 32px;
  height: 32px;
  cursor: pointer;
  fill: #ffffff;
  display: block;

  @media (min-width: 768px) {
    display: none;
  }
`;

const BurgerMenuContainer = styled.nav.withConfig({
  shouldForwardProp: (prop) => prop !== 'isOpen' && prop !== 'scrolled',
})`
  transform: ${({ isOpen }) => (isOpen ? 'translateY(0)' : 'translateY(-100%)')};
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
  pointer-events: ${({ isOpen }) => (isOpen ? 'auto' : 'none')};
  transition: transform 0.3s ease, opacity 0.3s ease, position 0.3s ease;

  flex-direction: column;
  position: fixed;
  top: ${({ scrolled }) => (scrolled ? '84px' : '124px')};
  left: 0;
  right: 0;
  background-color: #000000;
  z-index: 1000;
  padding: 20px;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  li {
    margin: 0;
  }

  a {
    text-decoration: none;
    color: #ffffff;
    font-size: 16px;
    font-weight: 500;
    display: block;
    padding: 10px 0;
  }

  button {
    &:hover {
        background-color: #ffffff;
        color: #9a1b14;
    }
  }

  @media (min-width: 768px) {
    display: none;
  }
`;

const BurgerHeader = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'scrolled',
})`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
  height: 84px;
  padding: 0 20px;
  background-color: #000000;
  position: fixed;
  top: ${({ scrolled }) => (scrolled ? '0' : '40px')};
  z-index: 1001;
  transition: top 0.3s ease;

  @media (min-width: 768px) {
    display: none;
  }
`;

const Panier = styled.i`
  display: flex;
  margin-top: 10px;
  height: 30px;
  align-self: center;
  font-size: 20px;
  color: #ffffff;
  cursor: pointer;
`;

/**
 * Composant : BurgerMenu
 * Description : Menu burger pour navigation mobile avec liens et options d'authentification.
 * Retour : JSX avec en-tête burger et panneau de navigation
 */
const BurgerMenu = () => {
  // Utilise le hook useScroll pour détecter si la page a été défilée (seuil par défaut : 40px)
  const scrolled = useScroll();
  
  // État pour contrôler l'ouverture/fermeture du menu burger
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Récupère user et logout depuis AuthContext
  const { user, logout } = useContext(AuthContext);
  
  // Hook pour naviguer programmatiquement
  const navigate = useNavigate();

  /**
   * Fonction : LogOut
   * Description : Déconnecte l'utilisateur et redirige vers la page d'accueil.
   * Retour : Aucun
   */
  const LogOut = async () => {
    try {
      // Appelle la fonction logout du contexte
      await logout();
      
      // Redirige vers la page d'accueil
      navigate('/');
      
      // Ferme le menu burger
      setMenuOpen(false);
    } catch (error) {
      // Journalise toute erreur
      console.error(error);
    }
  };

  /**
   * Fonction : handleClick
   * Description : Navigue vers une page et ferme le menu.
   * Arguments :
   * - page : URL de la page cible
   * Retour : Aucun
   */
  const handleClick = (page) => {
    // Navigue vers la page spécifiée
    navigate(page);
    
    // Ferme le menu burger
    setMenuOpen(false);
  };

  // Définit les liens d'authentification selon l'état de connexion
  const authLinks = user ? (
    // Si utilisateur connecté
    <>
      {/* Lien vers la page de profil */}
      <li>
        <Link to="/profil" onClick={() => setMenuOpen(false)}>
          <StyledH2>Profil</StyledH2>
        </Link>
      </li>
      {/* Bouton de déconnexion */}
      <li>
        <Button text="Déconnexion" height="30px" width="90px" onClick={LogOut} />
      </li>
    </>
  ) : (
    // Si utilisateur non connecté
    <>
      {/* Lien vers la page de connexion */}
      <li>
        <Link to="/LogIn" onClick={() => setMenuOpen(false)}>
          <StyledH2>Se connecter</StyledH2>
        </Link>
      </li>
      {/* Bouton pour s'inscrire */}
      <li>
        <Button
          text="S'inscrire"
          height="30px"
          width="90px"
          onClick={() => handleClick('/signup')}
        />
      </li>
    </>
  );

  // Définit les autres liens de navigation
  const otherLinks = (
    <>
      <ul>
        {/* Lien vers la page d'accueil */}
        <li>
          <Link to="/" onClick={() => setMenuOpen(false)}>
            <StyledH2>Accueil</StyledH2>
          </Link>
        </li>
        {/* Lien vers la page de contact */}
        <li>
          <Link to="/Contact" onClick={() => setMenuOpen(false)}>
            <StyledH2>Contact</StyledH2>
          </Link>
        </li>
        {/* Lien vers la page d'abonnement */}
        <li>
          <Link to="/subscription" onClick={() => setMenuOpen(false)}>
            <StyledH2>Abonnement</StyledH2>
          </Link>
        </li>
        {/* Lien vers la page des produits */}
        <li>
          <Link to="/Produit" onClick={() => setMenuOpen(false)}>
            <StyledH2>Produit</StyledH2>
          </Link>
        </li>
        {/* Lien vers la page des cours */}
        <li>
          <Link to="/courses" onClick={() => setMenuOpen(false)}>
            <StyledH2>Cours</StyledH2>
          </Link>
        </li>
      </ul>
    </>
  );

  // Début du rendu JSX
  return (
    // Fragment pour regrouper les éléments
    <>
      {/* En-tête du menu burger avec icône, liens auth, et icône panier */}
      <BurgerHeader scrolled={scrolled}>
        {/* Icône burger pour ouvrir/fermer le menu */}
        <BurgerIcon onClick={() => setMenuOpen(!menuOpen)} />
        
        {/* Liste des liens d'authentification */}
        <ul style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
          {authLinks}
        </ul>
        
        {/* Lien vers la page du panier */}
        <Link to="/panier" aria-label="Voir le panier" style={{ textDecoration: "none" }}>
          <Panier className="fas fa-shopping-cart"></Panier>
        </Link>
      </BurgerHeader>

      {/* Panneau de navigation du menu burger */}
      <BurgerMenuContainer isOpen={menuOpen} scrolled={scrolled}>
        {/* Liste des autres liens de navigation */}
        <ul>
          {otherLinks}
        </ul>
      </BurgerMenuContainer>
    </>
  );
};

// Exporte le composant BurgerMenu pour utilisation ailleurs
export default BurgerMenu;