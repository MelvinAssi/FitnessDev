import React from "react";
import styled from "styled-components";
import Subscription from "../../components/Subscription.jsx";
import SubscriptionItem1 from "../../assets/icons/Subscription_Item1.png";
import SubscriptionItem2 from "../../assets/icons/Subscription_Item2.png";
import SubscriptionItem3 from "../../assets/icons/Subscription_Item3.png";
import SubscriptionItem4 from "../../assets/icons/Subscription_Item4.png";
import SubscriptionItem5 from "../../assets/icons/Subscription_Item5.png";
import FdEquipment1 from "../../assets/images/fd_equipment1.png";
import FdEquipment2 from "../../assets/images/fd_equipment2.png";
import PartenerIcon1 from "../../assets/icons/logo_gym80.png";
import PartenerIcon2 from "../../assets/icons/logo_hammer.png";
import PartenerIcon3 from "../../assets/icons/logo_technogym.png";
import PartenerIcon4 from "../../assets/icons/logo-life-fitness-1.png";
import PartenerIcon5 from "../../assets/icons/logo_eleiko.png";



const Main = styled.main`
  min-height: 100vh;
  padding-top: 124px;
`;
const Offset= styled.div`
  display:none;
  width:100%;
  height:84px;
  background-color:#000000;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const Title = styled.h1`
  font-size: 45px;
  width: 60%;
  margin: 0 auto;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 35px;
    width: 80%;
  }
`;

const Description = styled.p`
  font-size: 22px;
  width: 80%;
  margin: 20px auto 40px auto;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 30px;
  margin: 0 40px;
  justify-items: center;
  align-items: start;
  padding-bottom: 60px; 


  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;



const SectionDark = styled.section`
  padding-top: 20px;
  background-color: #000000;
  color: #ffffff;
`;
const EquipmentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 20px;
  margin: 20px;
`;
const EquipmentSectionContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  align-items: flex-start;
  padding: 40px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    padding: 20px 10px;
  }
`;


const EquipmentText = styled.div`
  flex: 1;
  min-width: 300px;

  h2 {
    font-size: 32px;

    @media (max-width: 768px) {
      font-size: 24px;
      text-align: center;
    }
  }

  p {
    font-size: 16px;

    @media (max-width: 768px) {
      text-align: justify;
    }
  }
`;

const EquipmentImages = styled(EquipmentWrapper)`
  flex: 1;
  min-width: 300px;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const EquipmentImage = styled.img`
  width: 100%;
  max-width: 400px;
  border-radius: 10px;

  @media (max-width: 768px) {
    width: 90%;
    margin-bottom: 20px;
  }
`;

const PartnersWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  margin: 40px;
`;

const PartnerLogo = styled.img`
  height: 50px;
  object-fit: contain;
`;





const SubscriptionPage = () => {
  const formulas = [
    {
      name: "ESSENTIAL",
      price: 7.99,
      options: 2,
    },
    {
      name: "ORIGINAL",
      price: 9.99,
      options: 4,
    },
    {
      name: "ULTRA",
      price: 10.99,
      options: 5,
    },
  ];

  const Options = [
    { name: "Abonnement sans engagement annuel", img: SubscriptionItem1 },
    { name: "Accès réseau illimité", img: SubscriptionItem2 },
    { name: "Fontaine à boissons fruitées", img: SubscriptionItem3 },
    { name: "Plateforme oscillante**", img: SubscriptionItem4 },
    { name: "Carte d’abonnement partageable", img: SubscriptionItem5 },
  ];

  return (
    <>
    <Offset/>
    <Main>      
      {/* Section abonnements */}
      <section style={{paddingBottom:"20px"}}>
        <Title>SÉLECTIONNE L’ABONNEMENT QUI TE CORRESPOND</Title>
        <Description>
          Avec plus de 60 clubs partout dans le monde, retrouve : Cardio,
          Musculation, Cross-training, espace Femme, Boxe et MMA pour effectuer
          tous tes entraînements ! Découvre nos trois options de forfaits sans
          engagement annuel, à partir de 7,99€ par semaine ! 🔥
        </Description>
        <GridContainer>
          {formulas.map((formula) => (
            <Subscription
              key={formula.name}
              name={formula.name}
              price={formula.price}
              list={Options.slice(0, formula.options)}
            />
          ))}
        </GridContainer>
      </section>

      {/* Section équipements */}
      <SectionDark>
        <Title>SALLES DE SPORT FITNESSDEV</Title>
        <EquipmentSectionContent>
            <EquipmentText>
                <h2>Nos Équipements et Services Uniques</h2>
                <Description>
                    Tes salles de sport ON AIR FITNESS sont exclusivement composées de
                    matériel haut de gamme et connecté des marques TECHNOGYM, HAMMER
                    STRENGTH, ELEIKO, LIFE FITNESS et GYM 80. Avec des espaces force,
                    musculation guidée, cardio-training, espace boxing, haltérophilie…
                    mais aussi un espace dédié aux femmes avec des machines conçues pour
                    répondre aux besoins spécifiques de nos FITGIRLS.
                    <br />
                    Certaines de nos salles de sport te permettent d’accéder à des cours
                    collectifs, de zumba, yoga, pilates, body pump, RPM, des cours Les
                    Mills…
                    <br />
                    Retrouve une salle de sport ON AIR FITNESS à proximité de chez toi et
                    découvre les espaces dont dispose ton futur club. Tu peux te rendre
                    directement sur sa page.
                    <br />                    
                    Plus d'excuses, rejoins-nous pour ton entraînement et plonge au
                    cœur de l'action avec ON AIR FITNESS !
                    
                </Description>
            </EquipmentText>
            <EquipmentImages>
                <EquipmentImage src={FdEquipment1} alt="Équipement 1" />
                <EquipmentImage src={FdEquipment2} alt="Équipement 2" />
            </EquipmentImages>
            </EquipmentSectionContent>
        <PartnersWrapper>
          <PartnerLogo src={PartenerIcon1} alt="GYM80" />
          <PartnerLogo src={PartenerIcon2} alt="Hammer Strength" />
          <PartnerLogo src={PartenerIcon3} alt="Technogym" />
          <PartnerLogo src={PartenerIcon4} alt="Life Fitness" />
          <PartnerLogo src={PartenerIcon5} alt="Eleiko" />
        </PartnersWrapper>
      </SectionDark>
    </Main>
    </>
  );
};

export default SubscriptionPage;
