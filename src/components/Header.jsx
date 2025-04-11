import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import '@fortawesome/fontawesome-free/css/all.min.css';
import NavbarRS from './NavbarRS.jsx';
import useScroll from '../hooks/useScroll.jsx';

// Define Styled Components outside of the component
const HeaderOffer = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'scrolled',
})`
  background-color: #AE2119;
  width: 100vw;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #FFFFFF;
  font-weight: bold;
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
  padding: 0 20px;
  margin: ${({ scrolled }) => (scrolled ? '0 auto' : '13px ')};
  border-radius: ${({ scrolled }) => (scrolled ? '0px' : '10px')};
  background-color: ${({ scrolled }) => (scrolled ? '#000000' : '#FFFFFF')};
  box-shadow: ${({ scrolled }) => (scrolled ? '0 4px 8px rgba(0,0,0,0.35)' : '0 4px 4px rgba(0,0,0,0.25)')};    
  transition: 
    background-color 0.5s ease,
    box-shadow 0.5s ease,
    width 0.5s ease,
    margin 0.5s ease,
    border-radius 0.5s ease;
  
  ul {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
    list-style: none;
  }

  li {
    text-decoration: none;
  }

  a {
    text-decoration: none;
    color: #000000;
  }

  h2 {
    font-size: 12px;
  }
`;

const HeaderNavbarLeft = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'scrolled',
})`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: start;
  color: #000000;
  flex-grow: 1;
`;

const HeaderNavbarRight = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'scrolled',
})`
  display: flex;
  flex-direction: row;
  align-items: center;

  li:last-child {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    width: 90px;
    background-color: #AE2119;    
    border-radius: 5px;
    text-align: center;    
    transition: background-color 0.3s ease, transform 0.3s ease;

    h2 {
      color: #FFFFFF;
    }    
  }

  li:last-child:hover {
    background-color: #000000;    
  }  
`;

const StyledH2 = styled.h2.withConfig({
  shouldForwardProp: (prop) => prop !== 'scrolled',
})`
  font-size: 12px;
  color: ${({ scrolled }) => (scrolled ? '#FFFFFF' : '#000000')};
  transition: color 0.3s ease;
`;

const Separator = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'scrolled',
})`
  width: 1px; 
  height: 40px; 
  background-color: ${({ scrolled }) => (scrolled ? '#FFFFFF' : '#000000')};
  margin: 0 10px;
`;

const Header = () => {
  const scrolled = useScroll();
  console.log(scrolled);

  return (
    <>
      <header style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <HeaderOffer>
          <p>🔥 Tes 4 premières semaines à 4,99€/semaine + ton sac à dos offert !</p>
        </HeaderOffer>
        <HeaderNavbar scrolled={scrolled}>
          <HeaderNavbarLeft>
            <ul>
              <li><Link to="/"><StyledH2 scrolled={scrolled}>Accueil</StyledH2></Link></li>
              <li><Link to="/Contact"><StyledH2 scrolled={scrolled}>Contact</StyledH2></Link></li>
              <li><Link to="/subscription"><StyledH2 scrolled={scrolled}>Abonnement</StyledH2></Link></li>
              <li><Link to="/Produit"><StyledH2 scrolled={scrolled}>Produit</StyledH2></Link></li>
              <li><Link to="/Cours"><StyledH2 scrolled={scrolled}>Cours</StyledH2></Link></li>
            </ul>
          </HeaderNavbarLeft>
          <HeaderNavbarRight>
            <ul>
              <li><Link to="/LogIn"><StyledH2 scrolled={scrolled}>Se connecter</StyledH2></Link></li>
              <li><Link to="/SignUp"><StyledH2 scrolled={scrolled}>S'inscrire</StyledH2></Link></li>
            </ul>
          </HeaderNavbarRight>
          <Separator scrolled={scrolled} />
          <NavbarRS 
            size={34}
            backgroundcolor={scrolled ? '#FFFFFF' : '#000000'}  // Couleur de fond dynamique
            textcolor={scrolled ? '#000000' : '#FFFFFF'}  // Couleur du texte dynamique
          />
        </HeaderNavbar>
      </header>
    </>
  );
};

export default Header;
