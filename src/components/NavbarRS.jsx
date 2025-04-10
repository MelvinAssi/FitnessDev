import React from 'react';
import styled from 'styled-components';
import '@fortawesome/fontawesome-free/css/all.min.css';

const NavbarRSstyle = styled.div`
  width: ${({ $size }) => ($size * 4) + (5 * 16)}px; 
  height: ${({ $size }) => $size}px;

  ul {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
    justify-content: space-evenly;
  }

  li {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: ${({ $backgroundcolor }) => $backgroundcolor};
    color: ${({ $textcolor }) => $textcolor};
    height: ${({ $size }) => $size}px;
    width: ${({ $size }) => $size}px;
  }

  a {    
    color: ${({ $textcolor }) => $textcolor};  // Couleur pour le lien
    line-height: 0;
    transition: color 0.3s ease, transform 0.3s ease;
  }

  a i {  // Ajout pour cibler directement les icônes FontAwesome
    color: ${({ $textcolor }) => $textcolor};  // Force la couleur des icônes
  }

  a:hover {
    color: #AE2119;
  }

  a:hover i {  // Assure que les icônes suivent la couleur au hover
    color: #AE2119;
  }
`;

const NavbarRS = ({ size, backgroundcolor, textcolor }) => {
  return (
    <NavbarRSstyle 
      $size={size} 
      $backgroundcolor={backgroundcolor} 
      $textcolor={textcolor}  // Assurez-vous que cette prop est correctement passée
    >
      <ul>
        <li>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook-f"></i>
          </a>
        </li>
        <li>
          <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-youtube"></i>
          </a>
        </li>
        <li>
          <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-tiktok"></i>
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
        </li>
      </ul>
    </NavbarRSstyle>
  );
};

export default NavbarRS;
