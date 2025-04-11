import React from "react";
import styled from "styled-components";



const Container = styled.div`
  background-color: white;
  width: 320px;
  min-height: 400px;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap :15px; 
  margin-bottom: 10px;
  
`;

const Title = styled.h1`
  color: #ae2119;
  font-size: 48px;
  text-decoration: underline;
`;

const PriceBox = styled.div`
  display: flex;
  justify-content: start;
  align-items: flex-end;
  gap: 5px;
`;

const Price = styled.h1`
  font-size: 32px;
  color: #000000;
`;

const Sub = styled.h2`
  font-size: 16px;
  font-weight: normal;
`;

const Monthly = styled.h2`
  margin-top: 10px;
  color: #000000;
`;

const Details = styled.p`
  font-size: 14px;
  color: #000000;
  margin: 20px 0;
`;

const Options = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 40px;
`;

const OptionItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  img {
    width: 30px;
    height: 30px;
  }

  span {
    font-size: 14px;
  }
`;

const SelectButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;  
  background-color: #000;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #ae2119;
  }
`;

const Subscription = ({ name, price, list }) => {
  return (
    <Container>
      <Title>{name}</Title>
      <PriceBox>
        <Price>{price}€</Price>
        <Sub>/SEMAINE</Sub>
      </PriceBox>
      <Monthly>Soit {price * 4}€/4 SEMAINES</Monthly>
      <Details>
        *Soit un prélèvement de {price * 4}€ toutes les 4 semaines. Hors frais
        d’inscription de 50€ et hors 10€/an pour la garantie matériel.
        Abonnement sans engagement annuel avec 8 semaines de préavis.
        Abonnement donnant accès aux activités en libre-service.
      </Details>

      <Options>
        {list.map((item, index) => (
          <OptionItem key={index}>
            <img src={item.img} alt={item.name} />
            <span>{item.name}</span>
          </OptionItem>
        ))}
      </Options>

      <SelectButton>SELECTIONNER</SelectButton>
    </Container>
  );
};

export default Subscription;
