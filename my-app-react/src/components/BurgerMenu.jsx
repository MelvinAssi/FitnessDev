import React, { useState,useContext } from 'react';
import useScroll from '../hooks/useScroll.jsx';
import styled from 'styled-components';
import MenuIcon from '../assets/icons/menu.svg?react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext.jsx';
import Button from './Button.jsx';
import '@fortawesome/fontawesome-free/css/all.min.css';


const StyledH2 = styled.h2`
    font-size: 12px;
    color: #ffffff ;    
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
  shouldForwardProp: (prop) => prop !== 'isOpen'&& prop !== 'scrolled',
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

    &:hover{
        background-color :#ffffff;
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

  display:flex ;
  margin-top: 10px;
  height :30px;
  align-self: center;
  font-size:20px;
  color: #ffffff;
  cursor: pointer;
  
`;
const BurgerMenu =()=>{
    const scrolled = useScroll();
    const [menuOpen, setMenuOpen] = useState(false);
    const {user,logout} = useContext(AuthContext);
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
            <StyledH2 >Profil</StyledH2>
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
            <StyledH2 >Se connecter</StyledH2>
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
    <>
          <ul>
            <li>
              <Link to="/" onClick={() => setMenuOpen(false)}>
                <StyledH2 >Accueil</StyledH2>
              </Link>
            </li>
            <li>
              <Link to="/Contact" onClick={() => setMenuOpen(false)}>
                <StyledH2 >Contact</StyledH2>
              </Link>
            </li>
            <li>
              <Link to="/subscription" onClick={() => setMenuOpen(false)}>
                <StyledH2 >Abonnement</StyledH2>
              </Link>
            </li>
            <li>
              <Link to="/Produit" onClick={() => setMenuOpen(false)}>
                <StyledH2 >Produit</StyledH2>
              </Link>
            </li>
            <li>
              <Link to="/courses" onClick={() => setMenuOpen(false)}>
                <StyledH2 >Cours</StyledH2>
              </Link>
            </li>
          </ul>
        </>
  );

    return (
        <>      
            <BurgerHeader scrolled={scrolled}>
                <BurgerIcon onClick={() => setMenuOpen(!menuOpen)}  />
                  <ul style={{display: "flex",flexDirection:"row" ,gap: "10px"}}>
                    {authLinks}
                  </ul>
                <Link to="/panier" aria-label="Voir le panier" style={{textDecoration: "none"}}  >
                  <Panier className="fas fa-shopping-cart"></Panier>
                </Link>
            </BurgerHeader>

            <BurgerMenuContainer isOpen={menuOpen} scrolled={scrolled}>
                <ul>
                    {otherLinks}
                </ul>
            </BurgerMenuContainer>
        </>
    )
}
export default BurgerMenu;