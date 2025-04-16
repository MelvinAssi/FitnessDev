import React, {useState, useRef } from "react";
import styled from 'styled-components';
import ButtonInputAdd from "../../components/ButtonInputAdd";


const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15px;
  width: 100%; 
  padding: 20px; 
`;

const FormTitle = styled.h1`
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 1140px;
  width: 100%;
  gap: 20px;
  padding: 20px;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  padding: 8px;
  margin: 5px 0;
  height : 30px;
  font-size: 16px;
  width: 100%;
`;

const Textarea = styled.textarea`
  border: none;
  border: 1px solid rgba(0, 0, 0, 0.5);
  padding: 8px;
  margin: 5px 0;
  font-size: 16px;
  width: 100%;
  resize: none;
`;

const Select = styled.select`
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  padding: 0 8px;
  margin: 5px 0;
  font-size: 16px;
  height: 30px;
  line-height: 30px; 
  width: 100%;  
  color :rgba(0, 0, 0, 0.5);
`;

const SubmitButton = styled.button`
  background-color: #ffffff;
  color: #000000;
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #9a1b14;
    color: #ffffff;
  }
`;

const HorizontalGroup = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;

  & > div {
    width: 50%;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    & > div {
      width: 100%;
    }
  }
`;


const ContactPage = () => {
  const inputs = useRef([]);
  const formRef = useRef();
  const [messageEnvoye, setMessageEnvoye] = useState(false);

  const addInputs = (el) => {
    if (el && !inputs.current.includes(el)) {
      inputs.current.push(el);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setMessageEnvoye(true);
    formRef.current.reset();
    setTimeout(() => setMessageEnvoye(false), 5000);
  };

  return (
    <>
      <main style={{minHeight:"100vh", paddingTop: '124px' }}>        
        <FormContainer>
          <FormTitle>CONTACTEZ-NOUS</FormTitle>
          
          {messageEnvoye && (
            <p style={{ color: "#9a1b14", fontWeight: "bold" }}>
              ✅ Votre message a bien été envoyé !
            </p>
          )}
          <Form onSubmit={handleSubmit} ref={formRef}>
            <HorizontalGroup>
              <div>
                <Input
                  ref={addInputs}
                  type="text"
                  placeholder="Votre nom"
                  pattern="[a-z]{2,}$"
                  required
                  aria-label="Entrer votre nom"
                />
              </div>
              <div >
                <Input
                  ref={addInputs}
                  type="text"
                  placeholder="Votre prénom"
                  pattern="[a-z]{2,}$"
                  required
                  aria-label="Entrer votre prénom"
                />
              </div>
            </HorizontalGroup>

            <HorizontalGroup>
              <div >
                <Input
                  ref={addInputs}
                  type="email"
                  placeholder="Entrer votre email..."
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  required
                  aria-label="Entrer votre adresse email"
                />
              </div>
              <div >
              <Select id="service" name="Request_type" required>
                <option value="">--Sélectionner votre service--</option>
                <option value="Paiement">Paiement</option>
                <option value="Connexion">Connexion</option>
              </Select>
              </div>
            </HorizontalGroup>

            <div>
              <Input
                ref={addInputs}
                type="text"
                placeholder="Sujet de votre demande"
                aria-label="Entrer le sujet de votre demande"
                required
              />
            </div>
            <ButtonInputAdd/>
            <div>
              <Textarea
                ref={addInputs}
                placeholder="Écrivez votre message.."
                rows="5"
                aria-label="Entrer le message"
                required
              />
            </div>
            <SubmitButton type="submit" className="send-button">Envoyer</SubmitButton>
          </Form>
        </FormContainer>
      </main>
    </>
  );
};

export default ContactPage;
