import React, { useRef,useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ReCAPTCHA from 'react-google-recaptcha';


const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:center;
  margin-top: 20px;

  a{
    color :#000000;
  }
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 1000px;    
    padding: 20px;
    height:50vh; 
    max-height: 200px;    
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;



const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px; 
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 10px;
  width: 340px;
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
const ReCAPTCHACenterWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    width: 100%;
    height: auto;
    box-sizing: border-box;
`;

const LoginPage = () => {
    const [recaptchaValue, setRecaptchaValue] = useState(null);

    const handleRecaptchaChange = (value) => {
        setRecaptchaValue(value);
        console.log("ReCAPTCHA value: ", value); 
    };



    const formRef = useRef();
    const inputs = useRef([]);
    const addInputs = (el) => {
        if (el && !inputs.current.includes(el)) {
            inputs.current.push(el);
        }
    };

    return (
        <main style={{ paddingTop: '124px' }}>
            <FormContainer>
                <h1>Connexion</h1>
                <Form ref={formRef}>
                    <InputContainer>
                        <div>                            
                            <Input
                                ref={addInputs}
                                type="email"
                                placeholder="Adresse e-mail"
                                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                required
                                aria-label="Entrez votre adresse email"
                            />
                        </div>
                        <div>                            
                            <Input
                                ref={addInputs}
                                type="password"
                                placeholder="Mot de passe"
                                required
                                aria-label="Entrez votre mot de passe"
                            />
                        </div>
                        <div>                            
                            <Button type="submit">Se Connecter</Button>
                        </div>
                    </InputContainer>

                    <ReCAPTCHACenterWrapper>
                        <ReCAPTCHA
                            sitekey="6LdNwBArAAAAAPUVKb7yL-hQF-1I2AJDPvhDrCqA"
                            onChange={handleRecaptchaChange}
                        />
                    </ReCAPTCHACenterWrapper>
                </Form>
                <p>
                    Tu n'as pas encore de compte ? <Link to="/signup" className="signup-link">M'inscrire maintenant</Link>
                </p>
            </FormContainer>
        </main>
        
    );
};

export default LoginPage;
