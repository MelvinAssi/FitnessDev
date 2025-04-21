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
import { CartContext } from '../contexts/CartContext.jsx';
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

const CartIconWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
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

const CartBadge = styled.span`
  position: absolute;
  top: -5px;
  right: -10px;
  background-color: #ff0000;
  color: #ffffff;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: bold;
`;

/**
 * Composant : BurgerMenu
 * Description : Menu burger pour navigation mobile avec liens et options d'authentification.
 * Retour : JSX avec en-tête burger et panneau de navigation
 */
const BurgerMenu = () => {
  const scrolled = useScroll();
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const { totalCartItems } = useContext(CartContext); // From Trey
  const navigate = useNavigate();

  const LogOut = async () => {
    try {
      await logout();
      navigate('/');
      setMenuOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = (page) => {
    navigate(page);
    setMenuOpen(false);
  };

  const authLinks = user ? (
    <>
      <li>
        <Link to="/profil" onClick={() => setMenuOpen(false)}>
          <StyledH2>Profil</StyledH2>
        </Link>
      </li>
      <li>
        <Button text="Déconnexion" height="30px" width="90px" onClick={LogOut} />
      </li>
    </>
  ) : (
    <>
      <li>
        <Link to="/LogIn" onClick={() => setMenuOpen(false)}>
          <StyledH2>Se connecter</StyledH2>
        </Link>
      </li>
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

  const otherLinks = (
    <ul>
      <li>
        <Link to="/" onClick={() => setMenuOpen(false)}>
          <StyledH2>Accueil</StyledH2>
        </Link>
      </li>
      <li>
        <Link to="/contact" onClick={() => setMenuOpen(false)}>
          <StyledH2>Contact</StyledH2>
        </Link>
      </li>
      <li>
        <Link to="/subscription" onClick={() => setMenuOpen(false)}>
          <StyledH2>Abonnement</StyledH2>
        </Link>
      </li>
      <li>
        <Link to="/produit" onClick={() => setMenuOpen(false)}>
          <StyledH2>Produit</StyledH2>
        </Link>
      </li>
      <li>
        <Link to="/panier" onClick={() => setMenuOpen(false)}>
          <StyledH2>Panier</StyledH2>
        </Link>
      </li>
      <li>
        <Link to="/checkout" onClick={() => setMenuOpen(false)}>
          <StyledH2>Checkout</StyledH2>
        </Link>
      </li>
      <li>
        <Link to="/paiement" onClick={() => setMenuOpen(false)}>
          <StyledH2>Paiement</StyledH2>
        </Link>
      </li>
      <li>
        <Link to="/courses" onClick={() => setMenuOpen(false)}>
          <StyledH2>Cours</StyledH2>
        </Link>
      </li>
      <li>
        <Link to="/course-selection/:courseName" onClick={() => setMenuOpen(false)}>
          <StyledH2>Sélection de Cours</StyledH2>
        </Link>
      </li>
      <li>
        <Link to="/profil" onClick={() => setMenuOpen(false)}>
          <StyledH2>Profil</StyledH2>
        </Link>
      </li>
      <li>
        <Link to="/courses-inscrits" onClick={() => setMenuOpen(false)}>
          <StyledH2>Cours Inscrits</StyledH2>
        </Link>
      </li>
      <li>
        <Link to="/profil/edit" onClick={() => setMenuOpen(false)}>
          <StyledH2>Modifier Profil</StyledH2>
        </Link>
      </li>
      <li>
        <Link to="/commandes" onClick={() => setMenuOpen(false)}>
          <StyledH2>Commandes</StyledH2>
        </Link>
      </li>
    </ul>
  );

  return (
    <>
      <BurgerHeader scrolled={scrolled}>
        <BurgerIcon onClick={() => setMenuOpen(!menuOpen)} />
        <ul style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
          {authLinks}
        </ul>
        <Link to="/panier" aria-label="Voir le panier" style={{ textDecoration: 'none' }}>
          <CartIconWrapper>
            <Panier className="fas fa-shopping-cart">
              {totalCartItems > 0 && <CartBadge>{totalCartItems}</CartBadge>}
            </Panier>
          </CartIconWrapper>
        </Link>
      </BurgerHeader>

      <BurgerMenuContainer isOpen={menuOpen} scrolled={scrolled}>
        {otherLinks}
      </BurgerMenuContainer>
    </>
  );
};

export default BurgerMenu;