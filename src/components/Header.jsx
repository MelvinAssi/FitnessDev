import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import '@fortawesome/fontawesome-free/css/all.min.css';
import NavbarRS from './NavbarRS.jsx';

const HeaderOffer = styled.div`
  background-color: #AE2119;
  width: 100vw;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #FFFFFF;
  font-weight: bold;
`;

const HeaderNavbar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 80vw;
  height: 84px;
  margin: 13px;
  border-radius: 10px;
  padding : 0 20px;
  background-color: #FFFFFF;
  box-shadow: 0 4px 4px rgba(0,0,0,0.25);

  ul {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap:20px;
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

const HeaderNavbar1 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: start;
  color: #000000;
  flex-grow: 1;
  

`;

const HeaderNavbarRight = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;


  li:last-child{
    background-color: #AE2119;    
    border-radius: 5px;
    padding :3px 14px;
    transition: background-color 0.3s ease, transform 0.3s ease;

    h2{
      color : #FFFFFF;
    }
  }

  li:last-child:hover{
    background-color: #000000;    
  }

  
`;

const Separator = styled.div`
  width: 1px; 
  height: 40px; 
  background-color: #000000; 
  margin: 0 10px;
`;

const Header = () => {
  return (
    <>
      <header style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <HeaderOffer>
          <p>🔥 Tes 4 premières semaines à 4,99€/semaine + ton sac à dos offert !</p>
        </HeaderOffer>
        <HeaderNavbar>
          <HeaderNavbar1>
            <ul>
              <li><Link to="/"><h2>Accueil</h2></Link></li>
              <li><Link to="/Contact"><h2>Contact</h2></Link></li>
              <li><Link to="/Abonnement"><h2>Abonnement</h2></Link></li>
              <li><Link to="/Produit"><h2>Produit</h2></Link></li>
              <li><Link to="/Cours"><h2>Cours</h2></Link></li>
            </ul>
          </HeaderNavbar1>
          <HeaderNavbarRight>
            <ul>
              <li><Link to="/LogIn"><h2>Se connecter</h2></Link></li>
              <li><Link to="/SingnUp"><h2>S'inscrire</h2></Link></li>
            </ul>
          </HeaderNavbarRight>
          <Separator />
          <NavbarRS style={{ height: "84px" }} />
        </HeaderNavbar>
        
      </header>
    </>
  );
};

export default Header;
