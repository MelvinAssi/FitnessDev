import React, { useRef } from "react";
import styled from "styled-components";


const NewsletterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
  background-color :#ffffff;

  @media (max-width: 768px) {
    flex-direction: column; 
    align-items: center;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 500px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  gap: 10px;

  @media (max-width: 768px) {
    width: 80%;
    max-width: 100%;
  }
`;

// Champ de saisie
const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 10px;
  width: 100%;
  height: 40px;

  @media (max-width: 768px) {
    font-size: 14px;
    height: 35px;
  }
`;


const Button = styled.button`
  width: 100%;
  height: 40px;
  background-color: #9a1b14;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #000000;
  }

  @media (max-width: 768px) {
    height: 45px;
  }
`;

const TextContent = styled.div`
  width: 100%;
  max-width: 500px;

  h2 {
    font-size: 24px;
    font-weight: bold;
  }

  p {
    font-size: 16px;
    margin-top: 10px;
  }

  @media (max-width: 768px) {
    text-align: center;
    padding: 0 15px;
  }
`;

const Newsletter = () => {
  const formRef = useRef();
  const inputs = useRef([]);

  const addInputs = (el) => {
    if (el && !inputs.current.includes(el)) {
      inputs.current.push(el);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();    
    console.log("Formulaire soumis !");
  };

  return (
    <>
      <NewsletterContainer>        
        <TextContent>
          <h2>PERTE DE POIDS, PRISE DE MASSE OU JUSTE REMISE EN FORME ?</h2>
          <p>Atteins ton objectif grâce à notre accompagnement personnalisé : recettes, trainings et astuces !</p>
        </TextContent>

        <Form ref={formRef} onSubmit={handleFormSubmit}>
          <label htmlFor="email">Adresse e-mail</label>
          <Input
            ref={addInputs}
            id="email"
            type="email"
            placeholder="Adresse e-mail"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            required
            aria-label="Entrez votre adresse email"
          />
          <Button type="submit">JE M'INSCRIS !</Button>
        </Form>
      </NewsletterContainer>
    </>
  );
};

export default Newsletter;
