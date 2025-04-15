import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import '@fortawesome/fontawesome-free/css/all.min.css';
import NavbarRS from './NavbarRS.jsx';
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
    gap: 0.6vw;
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
  font-size: 1.2vw;
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
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClick = (page) => {
    navigate(page);
    setMenuOpen(false); 
  };

  const LogOut = async () => {
    try {
      await logout();
      navigate('/');
      setMenuOpen(false)
    } catch (error) {
      console.error(error);
    }
  };
  
  const authLinks = user ? (
    <>
      <li>
        <Link to="/profil">
          <StyledH2 scrolled={scrolled}>Profil</StyledH2>
        </Link>
      </li>
      <li>
        <Button text="Déconnexion" height="30px" width="90px" onClick={LogOut} />
      </li>
    </> 
  ) : (
    <>
      <li>
        <Link to="/LogIn">
          <StyledH2 scrolled={scrolled}>Se connecter</StyledH2>
        </Link>
      </li>
      <li>
        <Button
          text="S'inscrire"
          height="30px"
          width="90px"
          onClick={() => handleClick('/SignUp')}
        />
      </li>
    </>
  );
  const otherLinks = (
    <>
          <ul>
            <li>
              <Link to="/">
                <StyledH2 scrolled={scrolled}>Accueil</StyledH2>
              </Link>
            </li>
            <li>
              <Link to="/Contact">
                <StyledH2 scrolled={scrolled}>Contact</StyledH2>
              </Link>
            </li>
            <li>
              <Link to="/subscription">
                <StyledH2 scrolled={scrolled}>Abonnement</StyledH2>
              </Link>
            </li>
            <li>
              <Link to="/Produit">
                <StyledH2 scrolled={scrolled}>Produit</StyledH2>
              </Link>
            </li>
            <li>
              <Link to="/Cours">
                <StyledH2 scrolled={scrolled}>Cours</StyledH2>
              </Link>
            </li>
          </ul>
        </>
  );

  return (
    <HeaderContainer >
      <HeaderOffer>
        <p>🔥 Tes 4 premières semaines à 4,99€/semaine + ton sac à dos offert !</p>
      </HeaderOffer>
      <BurgerMenu/>     
      <HeaderNavbar scrolled={scrolled}>
        <HeaderNavbarLeft>
          <ul>
            {otherLinks}
          </ul>          
        </HeaderNavbarLeft>
        <HeaderNavbarRight>
          <ul>
            {authLinks}
          </ul>          
        </HeaderNavbarRight>
        <Separator scrolled={scrolled} />
        <NavbarRS
          size={34}
          backgroundcolor={scrolled ? '#ffffff' : '#000000'}
          textcolor={scrolled ? '#000000' : '#ffffff'}
        />
      </HeaderNavbar>
    </HeaderContainer>
  );
};

export default Header;