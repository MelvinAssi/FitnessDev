import React, { useRef, useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "../../services/axios";
import styled from "styled-components";
import ReCAPTCHA from 'react-google-recaptcha';

// Réutilisation des styles de SignUpPage.jsx
const Offset = styled.div`
  display: none;
  width: 100%;
  height: 84px;
  background-color: #000000;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-self: center;
  align-items: center;
  max-width: 940px;
  width: 80%;
  gap: 20px;
  padding: 20px;
`;

const Select = styled.select`
  align-self: start;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 10px;
  width: 100px;
  height: 40px;
  line-height: 30px;
  color: rgba(0, 0, 0, 0.5);
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 10px;
  width: 100%;
  height: 40px;
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

  &:disabled {
    background-color: #999999;
    cursor: not-allowed;
  }
`;

const CancelButton = styled(Button)`
  background-color: #666666;

  &:hover {
    background-color: #4d4d4d;
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

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const EditProfilePage = () => {
  const { user, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const formRef = useRef();
  const inputs = useRef([]);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const recaptchaRef = useRef();
  const [initialData, setInitialData] = useState(null);
  const [recaptchaError, setRecaptchaError] = useState(null);
  const [civilite, setCivilite] = useState('');

  const addInputs = (el) => {
    if (el && !inputs.current.includes(el)) {
      inputs.current.push(el);
    }
  };

  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
    setRecaptchaError(null);
  };

  const handleRecaptchaError = () => {
    setRecaptchaError('Erreur de chargement du reCAPTCHA. Veuillez réessayer.');
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/user/profil');
        setInitialData(response.data.user);
        setCivilite(response.data.user.type_inscrit || '');
        console.log('Données initiales:', response.data.user);
      } catch (error) {
        console.error('Erreur lors de la récupération du profil:', error);
      }
    };
    fetchProfile();
  }, []);

  const handleCiviliteChange = (e) => {
    setCivilite(e.target.value);
  };

  const handleForm = async (e) => {
    e.preventDefault();
    if (!recaptchaToken) {
      alert('Veuillez valider le reCAPTCHA.');
      return;
    }

    const data = {
      civilite,
      name: inputs.current[0]?.value,
      firstname: inputs.current[1]?.value,
      phone: inputs.current[2]?.value,
      email: inputs.current[3]?.value,
      emailConfirm: inputs.current[4]?.value,
      password: inputs.current[5]?.value || undefined,
      adress: inputs.current[6]?.value,
    };

    console.log('Données envoyées à PUT /profil:', data);

    if (data.email !== data.emailConfirm) {
      return alert("Les adresses e-mail ne correspondent pas.");
    }

    try {
      const response = await axios.put('/user/profil', { ...data, recaptchaToken });
      updateUser(response.data.user);
      navigate('/profil', { state: { refresh: true } });
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil:', error);
      alert('Échec de la mise à jour du profil');
    }
  };

  if (!initialData) return <div>Chargement...</div>;

  return (
    <>
      <Offset />
      <main style={{ minHeight: "100vh", paddingTop: '124px' }}>
        <h1>Modifier mes informations</h1>
        <Form ref={formRef} onSubmit={handleForm}>
          <Select value={civilite} onChange={handleCiviliteChange} required>
            <option value="">Civilité</option>
            <option value="Homme">Homme</option>
            <option value="Femme">Femme</option>
          </Select>
          <Input
            ref={addInputs}
            type="text"
            defaultValue={initialData.nom_inscrit}
            placeholder="Votre nom"
            pattern="[a-zA-Z]{2,}"
            required
            aria-label="Entrer votre nom"
          />
          <Input
            ref={addInputs}
            type="text"
            defaultValue={initialData.prenom_inscrit}
            placeholder="Votre prénom"
            pattern="[a-zA-Z]{2,}"
            required
            aria-label="Entrer votre prénom"
          />
          <Input
            ref={addInputs}
            type="tel"
            defaultValue={initialData.telephone_inscrit || ''}
            placeholder="Votre numéro de téléphone"
            pattern="[0-9]{10}"
            required
            aria-label="Entrer votre numéro de téléphone"
          />
          <Input
            ref={addInputs}
            type="email"
            defaultValue={initialData.email_inscrit}
            placeholder="Adresse e-mail"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}" // MODIFICATION: Supprimé \ pour le point
            required
            aria-label="Entrez votre adresse e-mail"
          />
          <Input
            ref={addInputs}
            type="email"
            defaultValue={initialData.email_inscrit}
            placeholder="Confirmation adresse e-mail"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}" // MODIFICATION: Supprimé \ pour le point
            required
            aria-label="Confirmez votre adresse e-mail"
          />
          <Input
            ref={addInputs}
            type="password"
            placeholder="Nouveau mot de passe (facultatif)"
            aria-label="Entrez un nouveau mot de passe"
          />
          <Input
            ref={addInputs}
            type="text"
            defaultValue={initialData.adresse_inscrit}
            placeholder="Adresse"
            required
            aria-label="Entrez votre adresse"
          />
          <ReCAPTCHACenterWrapper>
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
              onChange={handleRecaptchaChange}
              onErrored={handleRecaptchaError}
              size="normal"
            />
            {recaptchaError && <p style={{ color: 'red' }}>{recaptchaError}</p>}
          </ReCAPTCHACenterWrapper>
          <ButtonContainer>
            <Button type="submit" disabled={!recaptchaToken}>ENREGISTRER</Button>
            <CancelButton as={Link} to="/profil">ANNULER</CancelButton>
          </ButtonContainer>
        </Form>
      </main>
    </>
  );
};

export default EditProfilePage;