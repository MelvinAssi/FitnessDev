/**
 * Fichier : HomePage.jsx
 * Description : Composant React pour la page d'accueil de l'application FitnessDev. Affiche une section héros
 * avec une image de fond et un appel à l'action, plusieurs sections promotionnelles avec des images et du texte
 * décrivant les clubs, la communauté, et les équipements, un carrousel de photos de la salle, et une section
 * pour les avis des utilisateurs. Utilise des images différentes pour desktop et mobile pour une expérience
 * responsive optimisée.
 */

import React from "react"; // Importe React pour créer le composant fonctionnel
import styled from 'styled-components'; // Importe styled-components pour définir des styles CSS spécifiques au composant
import fd_homepage1 from "../../assets/images/fd_homepage1.jpg"; // Importe l'image de fond pour la section héros en version desktop
import fd_homepage2 from "../../assets/images/fd_homepage2.jpg"; // Importe l'image de fond pour la section clubs en version desktop
import fd_homepage3 from "../../assets/images/fd_homepage3.jpg"; // Importe l'image de fond pour la section adhérents en version desktop
import fd_homepage_responsive1 from "../../assets/images/fd_homepage_responsive1.jpg"; // Importe l'image de fond pour la section héros en version mobile
import fd_homepage_responsive2 from "../../assets/images/fd_homepage_responsive2.jpg"; // Importe l'image de fond pour la section clubs en version mobile
import fd_homepage_responsive3 from "../../assets/images/fd_homepage_responsive3.jpg"; // Importe l'image de fond pour la section adhérents en version mobile
import Carousel from "../../components/Carousel"; // Importe le composant Carousel pour afficher un carrousel d'images de la salle
import Avis from "../../components/Avis"; // Importe le composant Avis pour afficher les avis des utilisateurs

const Offset = styled.div`
  display: none;
  width: 100%;
  height: 84px;
  background-color: #000000;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const HeroSectionWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;

  @media (max-width: 768px) {
    height: auto;
  }
`;

const HeroSection = styled.section`
  position: relative;
  background-image: ${({ $bgDesktop }) => `url(${$bgDesktop})`};
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    background-image: none;
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0px;
    left: 0;
  }
`;

const HeroContent = styled.div`
  text-align: center;
  color: white;
  padding: 20px;
  h1 {
    font-size: 2rem;

    @media (min-width: 769px) {
      font-size: 3rem;
    }
  }

  p {
    font-size: 1rem;

    @media (min-width: 769px) {
      font-size: 1.25rem;
    }
  }
`;

const Section = styled.div`
  background-image: ${({ $bgDesktop }) => `url(${$bgDesktop})`};
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
    font-size: 2.8rem;
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
    min-height: auto;
    flex-direction: column;
    align-items: center;
    background-image: ${({ $bgMobile }) => `url(${$bgMobile})`};
    background-position: top;
    background-size: 100% auto;
    background-repeat: no-repeat;
    padding: 0;

    h1 {
      font-size: 2rem;
      margin: 0;
      font-weight: bold;
    }

    p {
      font-size: 1rem;
      margin-top: 10px;
      max-width: 600px;
      text-align: center;
    }
  }
`;

const ContentBlock = styled.div`
  width: 43%;
  @media (max-width: 768px) {
    width: 100%;
    min-height: 50vh;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
  }
`;

const MobileImage = styled.img`
  display: none;

  @media (max-width: 768px) {
    display: block;
    width: 100%;
    height: auto;
  }
`;

const DarkSection = styled(Section)`
  background-color: #000000;
  background-image: none;
  flex-direction: column;
`;

/**
 * Composant : HomePage
 * Description : Affiche la page d'accueil avec une section héros, des sections promotionnelles pour les clubs
 * et la communauté, un carrousel d'images de la salle, et une section d'avis. Utilise des images différentes
 * pour desktop et mobile pour une expérience responsive.
 * Retour : JSX contenant les sections de la page d'accueil
 */
const HomePage = () => {
  // Début du rendu JSX
  return (
    // Balise principale pour la structure sémantique de la page
    <main>
      {/* Conteneur de compensation pour le menu burger en mobile, visible uniquement sur écrans < 768px */}
      <Offset />
      
      {/* Enveloppe pour la section héros, permettant un positionnement relatif */}
      <HeroSectionWrapper>
        {/* Image visible uniquement en mobile, remplace l'image de fond pour optimiser le rendu */}
        <MobileImage src={fd_homepage_responsive1} alt="Visuel mobile" />
        
        {/* Section héros avec image de fond pour desktop */}
        <HeroSection $bgDesktop={fd_homepage1}>
          {/* Contenu centré avec titre et texte */}
          <HeroContent>
            {/* Titre principal pour inciter à l'action */}
            <h1>DÉPASSE-TOI ET ATTEINS TES OBJECTIFS !</h1>
            {/* Description des horaires et de la disponibilité des clubs */}
            <p>Retrouve ton club FitnessDev le plus proche de 6H à 23H en France</p>
          </HeroContent>
        </HeroSection>
      </HeroSectionWrapper>

      {/* Section promotionnelle sur les clubs FitnessDev */}
      <Section $bgDesktop={fd_homepage2} $bgMobile={fd_homepage_responsive2} style={{ justifyContent: "flex-start" }}>
        {/* Image pour mobile, visible uniquement sur écrans < 768px */}
        <MobileImage src={fd_homepage_responsive2} alt="Visuel mobile" />
        
        {/* Contenu textuel, aligné à gauche sur desktop */}
        <ContentBlock style={{ color: "#000000" }}>
          {/* Titre mettant en avant les clubs */}
          <h1>FITNESSDEV CLUBS DE SPORT</h1>
          {/* Description des horaires et de l'accès */}
          <p>Trouve ton club FitnessDev le plus proche et profite d’un accès 7j/7, de 6H à 23H</p>
          {/* Détails sur l'accès multi-clubs */}
          <p>Avec ta carte FitnessDev, tu as accès librement à l'ensemble de nos clubs, ouverts de 6h à 23h* en France, Espagne et dans les DOM-TOM.</p>
          {/* Message motivant pour l'entraînement */}
          <p>Non-stop, 7j/7, 365 jours/an, pour t'entraîner, te surpasser et réaliser tes objectifs sans contrainte.</p>
        </ContentBlock>
      </Section>

      {/* Section promotionnelle sur la communauté */}
      <Section $bgDesktop={fd_homepage3} $bgMobile={fd_homepage_responsive3} style={{ justifyContent: "flex-end" }}>
        {/* Image pour mobile */}
        <MobileImage src={fd_homepage_responsive3} alt="Visuel mobile" />
        
        {/* Contenu textuel, aligné à droite sur desktop */}
        <ContentBlock style={{ height: "auto", color: "#000000" }}>
          {/* Nombre d'adhérents pour impressionner */}
          <h1>+120 000</h1>
          {/* Titre complémentaire */}
          <h1>D'ADHÉRENTS</h1>
          {/* Invitation à rejoindre la communauté */}
          <p>Rejoins notre communauté de passionnés qui se dépassent et se surpassent au quotidien pour atteindre leurs objectifs.</p>
          {/* Appel à l'action pour s'inscrire */}
          <p>Inscris-toi dès aujourd'hui et profite de tous les avantages de l’enseigne de fitness préférée des Français.</p>
        </ContentBlock>
      </Section>

      {/* Section sombre pour le carrousel */}
      <DarkSection>
        {/* Titre de la section, en blanc pour contraste */}
        <h1 style={{ color: "#ffffff" }}>Notre Salle</h1>
        {/* Carrousel d'images de la salle */}
        <Carousel />
      </DarkSection>

      {/* Section pour les avis des utilisateurs */}
      <Section style={{ minHeight: "50vh", flexDirection: "row" }}>
        {/* Composant Avis pour afficher les commentaires des utilisateurs */}
        <Avis />
      </Section>
    </main>
  );
};

// Exporte le composant HomePage pour utilisation dans les routes
export default HomePage;