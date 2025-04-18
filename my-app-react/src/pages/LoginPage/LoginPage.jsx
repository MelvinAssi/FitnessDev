import { useRef, useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import styled from "styled-components";
import ReCAPTCHA from 'react-google-recaptcha';

const Offset = styled.div`
  display: none;
  width: 100%;
  height: 84px;
  background-color: #000000;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  padding: 20px;
  overflow: visible;

  a {
    color: #000000;
  }

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
  padding: 20px;
  margin-bottom: 10px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  height: auto;
  overflow: visible;
  position: relative;
  @media (max-width: 768px) {
    width: 90%;
    padding: 10px;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
  width: 100%;

  @media (max-width: 768px) {
    gap: 15px;
  }
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 10px;
  width: 340px;
  height: 40px;

  @media (max-width: 768px) {
    width: 100%;
    padding: 10px;
    font-size: 14px;
  }
`;

const Button = styled.button`
  width: 150px;
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
    width: 100%;
    height: 45px;
  }
`;

const ReCAPTCHACenterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  width: 100%;
  box-sizing: border-box;
  overflow-x: visible;
  div {
    overflow-x: visible;
  }
  @media (max-width: 768px) {
    margin-top: 15px;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  margin-top: 10px;
`;

const LoginPage = () => {
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const formRef = useRef();
  const inputs = useRef([]);
  const recaptchaRef = useRef();

  const handleRecaptchaChange = (value) => {
    setRecaptchaToken(value);
    console.log("ReCAPTCHA value: ", value);
  };

  const addInputs = (el) => {
    if (el && !inputs.current.includes(el)) {
      inputs.current.push(el);
    }
  };

  const handleForm = async (e) => {
    e.preventDefault();
    if (!recaptchaToken) {
      setError('Veuillez valider le reCAPTCHA.');
      return;
    }
    try {
      await login(inputs.current[0].value, inputs.current[1].value, recaptchaToken);
      const redirectCourse = location.state?.redirectCourse;
      if (redirectCourse) {
        navigate(`/course-selection/${encodeURIComponent(redirectCourse)}`);
      } else {
        navigate('/');
      }
    } catch (error) {
      setError('Email ou mot de passe incorrect');
    }
    setRecaptchaToken(null);
    recaptchaRef.current.reset();
  };

  return (
    <>
      <Offset />
      <main style={{ minHeight: "100vh", paddingTop: '124px' }}>
        <FormContainer>
          <h1>Connexion</h1>
          <Form ref={formRef} onSubmit={handleForm}>
            <InputContainer>
              <div>
                <Input
                  ref={addInputs}
                  id="login-email"
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
                  id="login-password"
                  type="password"
                  placeholder="Mot de passe"
                  required
                  aria-label="Entrez votre mot de passe"
                />
              </div>
              <ReCAPTCHACenterWrapper>
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                  onChange={handleRecaptchaChange}
                  size="normal"
                />
              </ReCAPTCHACenterWrapper>
              <div>
                <Button type="submit" disabled={!recaptchaToken}>Se Connecter</Button>
              </div>
            </InputContainer>
            {error && <ErrorMessage>{error}</ErrorMessage>}
          </Form>
          <p>
            Tu n'as pas encore de compte ? <Link to="/signup" className="signup-link">M'inscrire maintenant</Link>
          </p>
        </FormContainer>
      </main>
    </>
  );
};

export default LoginPage;