import React from 'react';
import styled from 'styled-components';
import '@fortawesome/fontawesome-free/css/all.min.css';



const NavbarRS = () => {


const NavbarRSstyle = styled.div`
  width: 216px; 
  height: 34px;
  
  
  ul {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
    justify-content: space-evenly;
    
    
  }

  li {
    display: flex;
    align-items :center;
    justify-content :center;
    border-radius:50%;
    background-color: #000000;
    height:34px;
    width:34px;
    
  }

  a {    
    color: #FFFFFF;
    line-height:0;
    transition: color 0.3s ease, transform 0.3s ease;
  }

  a:hover {
    color: #AE2119;
    transform: scale(1.2);
  }
`;

    return(
        <>
            <NavbarRSstyle>
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
            
        </>
    )

}
export default NavbarRS