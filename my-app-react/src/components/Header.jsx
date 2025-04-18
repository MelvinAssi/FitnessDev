import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import '@fortawesome/fontawesome-free/css/all.min.css';
import useScroll from '../hooks/useScroll.jsx';
import Button from './Button.jsx';
import { AuthContext } from '../contexts/AuthContext.jsx';
import BurgerMenu from './BurgerMenu.jsx';

const HeaderContainer = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeaderOffer = styled.div`
  z-index: 1100;
  background-color: #ae2119;
  width: 100vw;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-weight: bold;
  @media (max-width: 768px) {
    font-size:12px;
  }
`;

const HeaderNavbar = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'scrolled',
})`
  display: flex;
  position: fixed;
  z-index: 999;
  top: ${({ scrolled }) => (scrolled ? '0' : '40px')};
  flex-direction: row;
  align-items: center;
  width: ${({ scrolled }) => (scrolled ? '100%' : '80vw')};
  height: 84px;
  padding: 0 15px;
  margin: ${({ scrolled }) => (scrolled ? '0 auto' : '13px')};
  border-radius: ${({ scrolled }) => (scrolled ? '0px' : '10px')};
  background-color: ${({ scrolled }) => (scrolled ? '#000000' : '#ffffff')};
  box-shadow: ${({ scrolled }) =>
    scrolled ? '0 4px 8px rgba(0,0,0,0.35)' : '0 4px 4px rgba(0,0,0,0.25)'};
  transition: background-color 0.5s ease, box-shadow 0.5s ease, width 0.5s ease,
    margin 0.5s ease, border-radius 0.5s ease, top 0.5s ease;

  ul {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    list-style: none;
  }

  li {
    text-decoration: none;
  }

  a {
    text-decoration: none;
    color: #000000;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;
const Panier = styled.i.withConfig({
  shouldForwardProp: (prop) => prop !== 'scrolled',
})`
  display:flex ;
  margin-top: 10px;
  height :30px;
  align-self: center;
  font-size:20px;
  color: ${({ scrolled }) => (scrolled ? '#ffffff' : '#000000')};
  cursor: pointer;
`;

const HeaderNavbarLeft = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'scrolled',
})`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  flex-grow: 1;
`;

const HeaderNavbarRight = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'scrolled',
})`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledH2 = styled.h2.withConfig({
  shouldForwardProp: (prop) => prop !== 'scrolled',
})`
  font-size: 14px;
  color: ${({ scrolled }) => (scrolled ? '#ffffff' : '#000000')};
  transition: color 0.3s ease;
`;

const Separator = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'scrolled',
})`
  width: 1px;
  height: 40px;
  background-color: ${({ scrolled }) => (scrolled ? '#ffffff' : '#000000')};
  margin: 0 10px;
`;

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const scrolled = useScroll();

  const handleClick = (page) => {
    navigate(page);
  };

  const LogOut = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  const authLinks = user ? (
    <>
      <ul>
        <li>
          <Link to="/profil" aria-label="Aller à la page profil">
            <StyledH2 scrolled={scrolled}>Profil</StyledH2>
          </Link>
        </li>
        <li>
          <Button
            text="Déconnexion"
            height="30px"
            width="90px"
            onClick={LogOut}
            aria-label="Se déconnecter"
          />
        </li>
      </ul>
    </>
  ) : (
    <>
      <ul>
        <li>
          <Link to="/login" aria-label="Aller à la page de connexion">
            <StyledH2 scrolled={scrolled}>Se connecter</StyledH2>
          </Link>
        </li>
        <li>
          <Button
            text="S'inscrire"
            height="30px"
            width="90px"
            onClick={() => handleClick('/signup')}
            aria-label="S'inscrire à un compte"
          />
        </li>
      </ul>
    </>
  );
  
  const otherLinks = (
    <ul>
      <li>
        <Link to="/" aria-label="Aller à l'accueil">
          <StyledH2 scrolled={scrolled}>Accueil</StyledH2>
        </Link>
      </li>
      <li>
        <Link to="/contact" aria-label="Aller à la page contact">
          <StyledH2 scrolled={scrolled}>Contact</StyledH2>
        </Link>
      </li>
      <li>
        <Link to="/subscription" aria-label="Voir les abonnements">
          <StyledH2 scrolled={scrolled}>Abonnement</StyledH2>
        </Link>
      </li>
      <li>
        <Link to="/produit" aria-label="Voir les produits">
          <StyledH2 scrolled={scrolled}>Produit</StyledH2>
        </Link>
      </li>
      <li>
        <Link to="/courses" aria-label="Voir les cours">
          <StyledH2 scrolled={scrolled}>Cours</StyledH2>
        </Link>
      </li>
    </ul>
  );
  
  return (
    <HeaderContainer>
      <HeaderOffer>
        <p>🔥 Tes 4 premières semaines à 4,99€/semaine + ton sac à dos offert !</p>
      </HeaderOffer>
      <BurgerMenu />
      <HeaderNavbar scrolled={scrolled}>
        <HeaderNavbarLeft>
          {otherLinks}
        </HeaderNavbarLeft>

        <Link to="/panier" aria-label="Voir le panier">
          <Panier className="fas fa-shopping-cart" scrolled={scrolled}></Panier>
        </Link>
        <Separator scrolled={scrolled} />

        <HeaderNavbarRight>
          {authLinks}
        </HeaderNavbarRight>  

      </HeaderNavbar>
    </HeaderContainer>
  );
};

export default Header;