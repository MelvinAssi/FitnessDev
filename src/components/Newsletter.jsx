import React, { useRef } from "react";
import styled from "styled-components";



const NewsletterContainer =styled.div`
    display: flex;
    justify-content:space-around;
    align-items: center;
`;
const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 30%;
    max-width: 1000px;    
    padding: 20px;
    height:50vh; 
    max-height: 200px;    
    gap:10px;
`;




const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 10px;
  width: 100%;
  height :40px;
`;

const Button = styled.button`
 width: 100%;
 height :40px;
  background-color: #9a1b14;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #000000;
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



  return (
    <>  
        <NewsletterContainer>
            <div style={{width:"30%"}}>    
                <h2>PERTE DE POIDS, PRISE DE MASSE OU JUSTE REMISE EN FORME ?</h2>
                <p>Atteins ton objectif grâce à notre accompagnement personnalisé : recettes, trainings et astuces !</p>
            </div>
            <Form ref={formRef}>                                       
                <Input
                    ref={addInputs}
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