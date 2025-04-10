import React, { useRef,useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ReCAPTCHA from 'react-google-recaptcha';


const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-self: center;
  align-items :center;
  max-width: 940px;
  width: 80%;
  gap: 20px;
  padding: 20px;
`;
const Select = styled.select`  
    align-self :start;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 10px;
    width:100px;
    height :40px;    
    line-height: 30px; 
  color :rgba(0, 0, 0, 0.5);
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
 width: 150px;
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
const SignUpPage = () => {
    const formRef = useRef();
    const inputs = useRef([]);
    const addInputs = (el) => {
        if (el && !inputs.current.includes(el)) {
            inputs.current.push(el);
        }
    };

    return(
        <>
            <Form ref={formRef}> 
                <Select ref={addInputs} required>
                    <option value="">Civilité</option>
                    <option value="Paiement">Homme</option>
                    <option value="Connexion">Femme</option>
                </Select>
                <Input
                    ref={addInputs}
                    type="text"
                    placeholder="Votre nom"
                    pattern="[a-z]{2,}$"
                    required
                    aria-label="Entrer votre nom"
                />
                <Input
                    ref={addInputs}
                    type="text"
                    placeholder="Votre prénom"
                    pattern="[a-z]{2,}$"
                    required
                    aria-label="Entrer votre prénom"
                />
                <Input
                    ref={addInputs}
                    type="date"
                    placeholder="Votre date de naissance"
                    required
                    aria-label="Entrer votre date de naissance"
                />
                <Input
                    ref={addInputs}
                    type="number"
                    placeholder="Votre numéro de téléphone"
                    required
                    aria-label="Entrer votre numéro de téléphone"
                />
                 <Input
                    ref={addInputs}
                    type="email"
                    placeholder="Adresse e-mail"
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    required
                    aria-label="Entrez votre adresse e-mail"
                />
                <Input
                    ref={addInputs}
                    type="email"
                    placeholder="Confirmation adresse e-mail"
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    required
                    aria-label="Entrez votre adresse e-mail"
                />
                                        
                <Input
                    ref={addInputs}
                    type="password"
                    placeholder="Mot de passe"
                    required
                    aria-label="Entrez votre mot de passe"
                />
                <Input
                    ref={addInputs}
                    type="text"
                    placeholder="Adresse"
                    required
                    aria-label="Entrez votre adresse"
                />
            
                <ReCAPTCHA
                    sitekey="6LdNwBArAAAAAPUVKb7yL-hQF-1I2AJDPvhDrCqA"
                />
                <div>                            
                    <Button type="submit">JE CONFIRME</Button>
                </div>  
            </Form>
        
        
        </>
    )
}
export default SignUpPage;