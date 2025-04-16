import React from "react";
import fd_homepage1 from "../../assets/images/fd_homepage1.jpg";
import fd_homepage2 from "../../assets/images/fd_homepage2.jpg";
import fd_homepage3 from "../../assets/images/fd_homepage3.jpg";


import styled from 'styled-components';
import Carousel from "../../components/Carousel";
import Avis from "../../components/Avis";

const Section = styled.div`
  background-image: ${({ bgimage }) => `url(${bgimage})`};
  height: 100vh;
  background-size: cover;
  background-position: center;
  display: flex;  
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
  padding: 20px;

  h1 {
    font-size: 3rem;
    margin: 0;
    font-weight: bold;
  }

  p {
    font-size: 1.25rem;
    margin-top: 10px;
    max-width: 600px;
    text-align: center;
  }
`;




const HomePage = () => {
  return (
    <main>
      <Section bgimage={fd_homepage1} style={{flexDirection : "column"}}>
        <h1>DÉPASSE-TOI ET ATTEINS TES OBJECTIFS !</h1>
        <p>Retrouve ton club FitnessDev le plus proche de 6H à 23H en France</p>
      </Section>
      <Section bgimage={fd_homepage2}>
        <div style={{width :"50%",color:"#000000"}}>
          <h1>FITNESSDEV CLUBS DE SPORT</h1>
          <p>Trouve ton club FitnessDev le plus proche et profite d’un accès 7j/7, de à 23H</p>
          <p>Avec ta carte FitnessDev, tu as accès librement à l'ensemble de nos clubs, ouverts de 6h à 23h* en France, Espagne et dans les DOM-TOM.</p>
          <p>Non-stop, 7j/7, 365 jours/an, pour t'entraîner, te surpasser et réaliser tes objectifs sans contrainte.</p>
        </div>
        <div style={{width :"50%"}}></div>        
      </Section>
      <Section bgimage={fd_homepage3}>
        <div style={{width :"50%" }}>
          
        </div>
        <div style={{width :"50%",color:"#000000"}}>
          <h1>+120 000</h1>
          <h1>D'ADHÉRENTS</h1>
          <p>Rejoins notre communauté de passionnés qui se dépassent et se surpassent au quotidien pour atteindre leurs objectifs.</p>
          <p>Inscris-toi dès aujourd'hui et profite de tous les avantages de l’enseigne de fitness préférée des Français.</p>
       </div>
        
      </Section>
      <Section style={{flexDirection : "column",backgroundColor:"#000000"}}>
          <h1 style={{color :"#ffffff"}}>Notre Salle</h1>
          <Carousel ></Carousel>
      </Section>
      <Section>
        <Avis></Avis>
      </Section>
    </main>
  );
};

export default HomePage;
