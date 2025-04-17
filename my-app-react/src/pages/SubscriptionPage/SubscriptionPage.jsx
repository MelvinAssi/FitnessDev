import React from "react";
import styled from 'styled-components';

import fd_homepage1 from "../../assets/images/fd_homepage1.jpg";
import fd_homepage2 from "../../assets/images/fd_homepage2.jpg";
import fd_homepage3 from "../../assets/images/fd_homepage3.jpg";
import fd_homepage_responsive1 from "../../assets/images/fd_homepage_responsive1.jpg";
import fd_homepage_responsive2 from "../../assets/images/fd_homepage_responsive2.jpg";
import fd_homepage_responsive3 from "../../assets/images/fd_homepage_responsive3.jpg";

import Carousel from "../../components/Carousel";
import Avis from "../../components/Avis";

// === Styled Components ===

const Section = styled.div`
 
  min-height: 100vh;
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

  @media (max-width: 768px) {
    background-image: none;
    flex-direction: column;
    align-items: center;
  }
`;

const ContentBlock = styled.div`
  width: 50%;

  @media (max-width: 768px) {
    background-image: ${({ bgMobile }) => `url(${bgMobile})`};
    background-size: cover;
    width: 100%;
    height: 50%;
  }
`;

const DarkSection = styled(Section)`
  background-color: #000000;
  background-image: none;
  flex-direction: column;
`;


// === Composant principal ===

const HomePage = () => {
  return (
    <main>
      <Section
        bgDesktop={fd_homepage1}
        bgMobile={fd_homepage_responsive1}
        style={{ flexDirection: "column" }}
      >
        <h1>DÉPASSE-TOI ET ATTEINS TES OBJECTIFS !</h1>
        <p>Retrouve ton club FitnessDev le plus proche de 6H à 23H en France</p>
      </Section>

      <Section bgDesktop={fd_homepage2}>
  <ContentBlock bgMobile={fd_homepage_responsive2} style={{ color: "#000000" }}>
    <h1>FITNESSDEV CLUBS DE SPORT</h1>
    <p>Trouve ton club FitnessDev le plus proche et profite d’un accès 7j/7, de 6H à 23H</p>
    <p>Avec ta carte FitnessDev, tu as accès librement à l'ensemble de nos clubs, ouverts de 6h à 23h* en France, Espagne et dans les DOM-TOM.</p>
    <p>Non-stop, 7j/7, 365 jours/an, pour t'entraîner, te surpasser et réaliser tes objectifs sans contrainte.</p>
  </ContentBlock>
  <ContentBlock bgMobile={fd_homepage_responsive2} />
</Section>

<Section bgDesktop={fd_homepage3}>
  <ContentBlock bgMobile={fd_homepage_responsive3} />
  <ContentBlock bgMobile={fd_homepage_responsive3} style={{ color: "#000000" }}>
    <h1>+120 000</h1>
    <h1>D'ADHÉRENTS</h1>
    <p>Rejoins notre communauté de passionnés qui se dépassent et se surpassent au quotidien pour atteindre leurs objectifs.</p>
    <p>Inscris-toi dès aujourd'hui et profite de tous les avantages de l’enseigne de fitness préférée des Français.</p>
  </ContentBlock>
</Section>

      <DarkSection>
        <h1 style={{ color: "#ffffff" }}>Notre Salle</h1>
        <Carousel />
      </DarkSection>

      <Section>
        <Avis />
      </Section>
    </main>
  );
};

export default HomePage;
