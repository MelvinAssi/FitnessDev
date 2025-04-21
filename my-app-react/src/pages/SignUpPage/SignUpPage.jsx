/**
 * Fichier : SignUpPage.jsx
 * Description : Composant React pour la page d'inscription de l'application. Affiche un formulaire
 * permettant aux utilisateurs d'entrer leurs informations (civilité, nom, prénom, date de naissance,
 * téléphone, e-mail, confirmation d'e-mail, mot de passe, adresse) et de valider un reCAPTCHA.
 * Appelle la fonction signup du contexte pour créer un compte et redirige vers l'accueil après succès.
 */

import React, { useRef, useState, useContext } from "react"; // Importe React, useRef pour les références, useState pour l'état, useContext pour le contexte
import { Link, useNavigate } from "react-router-dom"; // Importe Link pour les liens et useNavigate pour la redirection
import { AuthContext } from "../../contexts/AuthContext"; // Importe AuthContext pour accéder à la fonction signup
import styled from "styled-components"; // Importe styled-components pour les styles CSS
import ReCAPTCHA from 'react-google-recaptcha'; // Importe le composant ReCAPTCHA pour la vérification anti-bot

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

/**
 * Composant : SignUpPage
 * Description : Affiche un formulaire d'inscription avec des champs pour les informations personnelles,
 * vérifie la correspondance des e-mails, valide le reCAPTCHA, et appelle la fonction signup pour créer un compte.
 * Redirige vers l'accueil après succès ou affiche une erreur en cas d'échec.
 * Retour : JSX contenant le formulaire d'inscription
 */
const SignUpPage = () => {
  // Récupère la fonction signup depuis AuthContext pour gérer l'inscription
  const { signup } = useContext(AuthContext);

  // Crée une fonction navigate pour rediriger l'utilisateur après inscription
  const navigate = useNavigate();

  // Crée une référence pour le formulaire afin de le manipuler (ex. : accès aux valeurs)
  const formRef = useRef();

  // Crée une référence pour stocker la liste des éléments input (civilité, nom, prénom, etc.)
  const inputs = useRef([]);

  /**
   * Fonction : addInputs
   * Description : Ajoute un élément input ou select à la liste des références inputs si celui-ci n'est pas déjà inclus.
   * Arguments :
   * - el : Élément DOM (input ou select) à ajouter
   * Retour : Aucun
   */
  const addInputs = (el) => {
    // Vérifie si l'élément existe et n'est pas déjà dans la liste
    if (el && !inputs.current.includes(el)) {
      // Ajoute l'élément à la liste des références
      inputs.current.push(el);
    }
  };

  // Crée un état recaptchaToken pour stocker le token généré par le reCAPTCHA
  const [recaptchaToken, setRecaptchaToken] = useState(null);

  // Crée une référence pour le composant ReCAPTCHA afin de le manipuler (ex. : réinitialiser)
  const recaptchaRef = useRef();

  /**
   * Fonction : handleRecaptchaChange
   * Description : Met à jour l'état recaptchaToken lorsqu'un token est généré par le reCAPTCHA.
   * Arguments :
   * - token : Token généré (ou null si réinitialisé)
   * Retour : Aucun
   */
  const handleRecaptchaChange = (token) => {
    // Met à jour l'état recaptchaToken avec le token reçu
    setRecaptchaToken(token);
  };

  /**
   * Fonction : handleForm
   * Description : Gère la soumission du formulaire d'inscription. Vérifie le reCAPTCHA, valide la correspondance
   * des e-mails, appelle la fonction signup, et redirige après succès ou affiche une erreur.
   * Arguments :
   * - e : Événement de soumission du formulaire
   * Retour : Aucun
   */
  const handleForm = async (e) => {
    // Empêche le rechargement par défaut du navigateur
    e.preventDefault();

    // Vérifie si un token reCAPTCHA a été généré
    if (!recaptchaToken) {
      // Affiche une alerte si le reCAPTCHA n'est pas validé
      alert('Veuillez valider le reCAPTCHA.');
      // Arrête l'exécution
      return;
    }

    // Crée un objet data contenant les valeurs des champs du formulaire
    // Chaque champ est accédé via inputs.current[index].value
    const data = {
      // Civilité (ex. : "Homme" ou "Femme")
      civilite: inputs.current[0]?.value,
      // Nom de famille
      name: inputs.current[1]?.value,
      // Prénom
      firstname: inputs.current[2]?.value,
      // Date de naissance (format AAAA-MM-JJ)
      birthday: inputs.current[3]?.value,
      // Numéro de téléphone
      phone: inputs.current[4]?.value,
      // Adresse e-mail
      email: inputs.current[5]?.value,
      // Confirmation de l'e-mail
      emailConfirm: inputs.current[6]?.value,
      // Mot de passe
      password: inputs.current[7]?.value,
      // Adresse physique
      adress: inputs.current[8]?.value,
    };

    // Vérifie si les champs e-mail et confirmation correspondent
    if (data.email !== data.emailConfirm) {
      // Affiche une alerte si les e-mails ne correspondent pas
      return alert("Les adresses e-mail ne correspondent pas.");
    }

    try {
      // Appelle la fonction signup avec les données du formulaire et le token reCAPTCHA
      await signup(data, recaptchaToken);
      
      // Redirige l'utilisateur vers la page d'accueil après une inscription réussie
      navigate('/');
    } catch (error) {
      // Affiche une alerte en cas d'échec de l'inscription
      alert('signup failed');
    }
  };

<<<<<<< HEAD
        const data = {
            civilite: inputs.current[0]?.value,
            name: inputs.current[1]?.value,
            firstname: inputs.current[2]?.value,
            birthday: inputs.current[3]?.value,
            phone: inputs.current[4]?.value,
            email: inputs.current[5]?.value,
            emailConfirm: inputs.current[6]?.value,
            password: inputs.current[7]?.value,
            adress: inputs.current[8]?.value,
        };
        if (data.email !== data.emailConfirm) {
            return alert("Les adresses e-mail ne correspondent pas.");
        }
        try {
          await signup(data,recaptchaToken);
          navigate('/'); 
        } catch (error) {
          alert('signup failed');
        }
    };
    return(
        <>
            <Offset/>
            <main style={{minHeight:"100vh", paddingTop: '124px' }}>
                <h1>Informations</h1>
                <Form ref={formRef} onSubmit={handleForm}> 
                    <Select ref={addInputs} required>
                        <option value="">Civilité</option>
                        <option value="Homme">Homme</option>
                        <option value="Femme">Femme</option>
                    </Select>
                    <Input
                        ref={addInputs}
                        type="text"
                        placeholder="Votre nom"
                        pattern="^[a-zA-Z]{2,}$"
                        required
                        aria-label="Entrer votre nom"
                    />
                    <Input
                        ref={addInputs}
                        type="text"
                        placeholder="Votre prénom"
                        pattern="^[a-zA-Z]{2,}$"
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
                        pattern="^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                        required
                        aria-label="Entrez votre adresse e-mail"
                    />
                    <Input
                        ref={addInputs}
                        type="email"
                        placeholder="Confirmation adresse e-mail"
                        pattern="^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                        required
                        aria-label="Entrez votre adresse e-mail"
                    />
                                            
                    <Input
                        ref={addInputs}
                        type="password"
                        placeholder="Mot de passe"
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{12,50}$"
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
                
                    <ReCAPTCHACenterWrapper>
                        <ReCAPTCHA
                            ref={recaptchaRef}
                            sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                            onChange={handleRecaptchaChange}
                            size="normal"
                        />
                    </ReCAPTCHACenterWrapper>
                    <div>                            
                        <Button type="submit" disabled={!recaptchaToken}>JE CONFIRME</Button>
                    </div>  
                </Form>
            </main>
        </>
    )
}
=======
  // Début du rendu JSX
  return (
    // Fragment pour regrouper les éléments sans conteneur supplémentaire
    <>
      {/* Conteneur de compensation pour le menu burger en mobile */}
      <Offset />
      
      {/* Balise principale pour la structure sémantique */}
      <main style={{ minHeight: "100vh", paddingTop: '124px' }}>
        {/* Titre de la page */}
        <h1>Informations</h1>
        
        {/* Formulaire d'inscription */}
        <Form ref={formRef} onSubmit={handleForm}>
          {/* Menu déroulant pour sélectionner la civilité */}
          <Select ref={addInputs} required>
            {/* Option par défaut, vide pour forcer une sélection */}
            <option value="">Civilité</option>
            {/* Option pour Homme */}
            <option value="Homme">Homme</option>
            {/* Option pour Femme */}
            <option value="Femme">Femme</option>
          </Select>
          
          {/* Champ pour le nom */}
          <Input
            ref={addInputs}
            type="text"
            placeholder="Votre nom"
            pattern="[a-z]{2,}$"
            required
            aria-label="Entrer votre nom"
          />
          
          {/* Champ pour le prénom */}
          <Input
            ref={addInputs}
            type="text"
            placeholder="Votre prénom"
            pattern="[a-z]{2,}$"
            required
            aria-label="Entrer votre prénom"
          />
          
          {/* Champ pour la date de naissance */}
          <Input
            ref={addInputs}
            type="date"
            placeholder="Votre date de naissance"
            required
            aria-label="Entrer votre date de naissance"
          />
          
          {/* Champ pour le numéro de téléphone */}
          <Input
            ref={addInputs}
            type="number"
            placeholder="Votre numéro de téléphone"
            required
            aria-label="Entrer votre numéro de téléphone"
          />
          
          {/* Champ pour l'e-mail */}
          <Input
            ref={addInputs}
            type="email"
            placeholder="Adresse e-mail"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            required
            aria-label="Entrez votre adresse e-mail"
          />
          
          {/* Champ pour confirmer l'e-mail */}
          <Input
            ref={addInputs}
            type="email"
            placeholder="Confirmation adresse e-mail"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            required
            aria-label="Entrez votre adresse e-mail"
          />
          
          {/* Champ pour le mot de passe */}
          <Input
            ref={addInputs}
            type="password"
            placeholder="Mot de passe"
            required
            aria-label="Entrez votre mot de passe"
          />
          
          {/* Champ pour l'adresse */}
          <Input
            ref={addInputs}
            type="text"
            placeholder="Adresse"
            required
            aria-label="Entrez votre adresse"
          />
          
          {/* Conteneur pour le reCAPTCHA */}
          <ReCAPTCHACenterWrapper>
            {/* Composant ReCAPTCHA */}
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
              onChange={handleRecaptchaChange}
              size="normal"
            />
          </ReCAPTCHACenterWrapper>
          
          {/* Conteneur pour le bouton de soumission */}
          <div>
            {/* Bouton de soumission, désactivé si aucun token reCAPTCHA */}
            <Button type="submit" disabled={!recaptchaToken}>JE CONFIRME</Button>
          </div>
        </Form>
      </main>
    </>
  );
};

// Exporte le composant SignUpPage pour utilisation dans les routes
>>>>>>> 07900abf7def4abe1ae1f3a3f272b3171b5500f3
export default SignUpPage;