/**
 * Fichier : Paiement.jsx
 * Description : Composant React pour la page de paiement dans FitnessDev. Affiche un formulaire pour saisir l'adresse de livraison
 * et les informations de carte bancaire, valide les entrées avec des expressions régulières, et journalise la soumission.
 * Inclut des styles responsifs pour mobile et des messages d'erreur pour les champs invalides. Intégré avec le flux de commande
 * (Panier.jsx, Produit.jsx, Checkout.jsx) dans la branche Trey.
 * Contexte : Projet FitnessDev, aligné avec la branche Trey.
 * Dépendances : react (composant, hooks), styled-components (styles).
 */

/** Importation des dépendances nécessaires */
import React, { useState } from 'react'; // React est la bibliothèque principale pour créer des composants, useState gère l'état local
import styled from 'styled-components'; // styled-components permet de définir des styles CSS dans des composants JavaScript

/** Définition des composants stylisés avec styled-components */
const PaiementContainer = styled.div`
  background-color: #000000;
  min-height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 600px) {
    padding: 10px;
  }
`;

const FormSection = styled.div`
  width: 100%;
  max-width: 600px;
  margin-bottom: 20px;
  @media (max-width: 600px) {
    max-width: 100%;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  @media (max-width: 600px) {
    margin-bottom: 10px;
  }
`;

const Label = styled.label`
  color: #ffffff;
  font-size: 14px;
  margin-bottom: 5px;
  @media (max-width: 600px) {
    font-size: 12px;
  }
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  background-color: #ffffff;
  color: #000000;
  width: 100%;
  box-sizing: border-box;
  &::placeholder {
    color: #999;
  }
  @media (max-width: 600px) {
    font-size: 14px;
    padding: 8px;
  }
`;

const InputRow = styled.div`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  @media (max-width: 600px) {
    gap: 10px;
  }
`;

const InputHalf = styled(Input)`
  flex: 1;
  min-width: 150px;
  @media (max-width: 600px) {
    min-width: 120px;
  }
`;

const ErrorMessage = styled.span`
  color: #ff0000;
  font-size: 12px;
  margin-top: 5px;
  @media (max-width: 600px) {
    font-size: 10px;
  }
`;

const Divider = styled.hr`
  width: 100%;
  max-width: 600px;
  border: none;
  border-top: 2px solid #333333;
  margin: 20px 0;
  @media (max-width: 600px) {
    margin: 15px 0;
  }
`;

const VisaLogo = styled.img`
  height: 30px;
  margin-bottom: 10px;
  @media (max-width: 600px) {
    height: 25px;
  }
`;

const SubmitButton = styled.button`
  background-color: #ff0000;
  color: #ffffff;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #cc0000;
  }
  @media (max-width: 600px) {
    font-size: 14px;
    padding: 8px 15px;
  }
`;

/**
 * Composant : Paiement
 * Description : Affiche un formulaire pour saisir l'adresse de livraison (adresse, ville, code postal, région) et les
 * informations de carte bancaire (numéro, date d'expiration, CVV). Valide les entrées avec des expressions régulières,
 * affiche des messages d'erreur pour les champs invalides, et journalise les données lors de la soumission. Inclut des
 * styles responsifs pour mobile.
 * Paramètres : Aucun
 * Retour : JSX contenant le formulaire de paiement avec sections pour l'adresse et la carte bancaire
 */
const Paiement = () => {
  // Crée un état local formData avec useState pour stocker les valeurs des champs du formulaire
  // Initialisé avec un objet contenant les champs addressLine1, city, postalCode, region, cardNumber, expiryDate, cvv, tous vides
  // setFormData est la fonction pour mettre à jour cet état
  // Syntaxe : const [state, setState] = useState(initialValue)
  // Exemple : formData peut devenir { addressLine1: '123 Rue Exemple', city: 'Paris', ... }
  const [formData, setFormData] = useState({
    addressLine1: '', // Adresse principale
    city: '', // Ville
    postalCode: '', // Code postal
    region: '', // Région
    cardNumber: '', // Numéro de carte
    expiryDate: '', // Date d’expiration (MM/YYYY)
    cvv: '', // Code CVV
  });

  // Crée un état local errors avec useState pour stocker les messages d’erreur des champs
  // Initialisé avec un objet vide, car aucun champ n’a d’erreur au départ
  // setErrors est la fonction pour mettre à jour cet état
  // Exemple : errors peut devenir { addressLine1: 'Ce champ est requis', cardNumber: 'Format invalide' }
  const [errors, setErrors] = useState({});

  // Définit un objet statique regexPatterns contenant les expressions régulières pour valider chaque champ
  // Chaque propriété correspond à un champ et contient un RegExp pour tester la validité
  const regexPatterns = {
    addressLine1: /.+/, // Doit contenir au moins un caractère (non vide)
    city: /^[A-Za-z\s]+$/, // Lettres (majuscules/minuscules) et espaces uniquement
    postalCode: /^\d{5}$/, // Exactement 5 chiffres (code postal français)
    region: /^[A-Za-z\s]+$/, // Lettres et espaces uniquement
    cardNumber: /^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/, // 16 chiffres, espaces optionnels tous les 4 chiffres
    expiryDate: /^(0[1-9]|1[0-2])\/\d{4}$/, // Format MM/YYYY (01-12 pour le mois)
    cvv: /^\d{3,4}$/, // 3 ou 4 chiffres
  };

  /**
   * Fonction : handleChange
   * Description : Gère les changements dans les champs du formulaire en mettant à jour l’état formData avec la nouvelle
   * valeur saisie par l’utilisateur. Déclenchée par l’événement onChange des inputs.
   * Paramètres :
   * - e : Objet d’événement (Event) contenant les informations sur l’input modifié
   * Retour : Aucun (effet secondaire : mise à jour de formData)
   */
  const handleChange = (e) => {
    // Déstructure l’objet e.target pour obtenir name (nom du champ) et value (valeur saisie)
    // Syntaxe : const { prop1, prop2 } = objet
    // e.target est l’élément DOM déclenchant l’événement (ex. <input name="addressLine1" value="123 Rue Exemple">)
    const { name, value } = e.target;

    // setFormData met à jour l’état formData en copiant les valeurs existantes et en modifiant le champ spécifié
    // Syntaxe : setState(newState)
    // ...formData utilise l’opérateur spread pour copier toutes les propriétés actuelles
    // [name]: value utilise la syntaxe de propriété calculée pour mettre à jour le champ correspondant (ex. addressLine1)
    setFormData({ ...formData, [name]: value });
  };

  /**
   * Fonction : validateForm
   * Description : Valide tous les champs du formulaire en vérifiant s’ils sont non vides et conformes aux expressions
   * régulières définies dans regexPatterns. Stocke les erreurs dans l’état errors et retourne un booléen indiquant si
   * le formulaire est valide.
   * Paramètres : Aucun
   * Retour : Booléen (true si aucune erreur, false sinon)
   */
  const validateForm = () => {
    // Crée un objet vide pour stocker les nouveaux messages d’erreur
    const newErrors = {};

    // Object.keys(formData) retourne un tableau des clés de l’objet formData
    // Syntaxe : Object.keys(objet)
    // Retour : Tableau de chaînes (ex. ['addressLine1', 'city', ...])
    // forEach parcourt chaque clé pour valider le champ correspondant
    // Syntaxe : array.forEach(callback)
    // Callback arguments : key (clé courante), index, array
    Object.keys(formData).forEach((key) => {
      // Vérifie si le champ est vide
      // !formData[key] retourne true si la valeur est vide ('') ou undefined
      if (!formData[key]) {
        // Ajoute un message d’erreur pour le champ
        newErrors[key] = 'Ce champ est requis';
      } else if (!regexPatterns[key].test(formData[key])) {
        // regexPatterns[key].test(formData[key]) teste si la valeur respecte l’expression régulière
        // Syntaxe : RegExp.test(string)
        // Retour : Booléen (true si la chaîne correspond, false sinon)
        // Si le test échoue, ajoute un message d’erreur spécifique
        switch (key) {
          case 'city':
          case 'region':
            newErrors[key] = 'Seules les lettres et les espaces sont autorisés';
            break;
          case 'postalCode':
            newErrors[key] = 'Le code postal doit contenir 5 chiffres';
            break;
          case 'cardNumber':
            newErrors[key] = 'Le numéro de carte doit contenir 16 chiffres';
            break;
          case 'expiryDate':
            newErrors[key] = 'La date doit être au format MM/YYYY';
            break;
          case 'cvv':
            newErrors[key] = 'Le CVV doit contenir 3 ou 4 chiffres';
            break;
          default:
            newErrors[key] = 'Format invalide';
        }
      }
    });

    // setErrors met à jour l’état errors avec le nouvel objet d’erreurs
    setErrors(newErrors);

    // Object.keys(newErrors).length === 0 vérifie s’il y a des erreurs
    // Retourne true si aucune erreur, false sinon
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Fonction : handleSubmit
   * Description : Gère la soumission du formulaire en empêchant le rechargement de la page, validant les champs,
   * et journalisant les données si le formulaire est valide. Prévu pour une future logique de traitement des paiements.
   * Paramètres :
   * - e : Objet d’événement (Event) représentant la soumission du formulaire
   * Retour : Aucun (effet secondaire : journalisation, mise à jour des erreurs)
   */
  const handleSubmit = (e) => {
    // e.preventDefault() empêche le comportement par défaut du formulaire (rechargement de la page)
    // Syntaxe : event.preventDefault()
    e.preventDefault();

    // Appelle validateForm pour vérifier la validité du formulaire
    // validateForm retourne un booléen
    if (validateForm()) {
      // Si valide, journalise les données du formulaire pour débogage
      // console.log prend un message et l’objet formData
      console.log('Form submitted successfully:', formData);
      // TODO : Ajouter la logique de traitement des paiements (ex. appel API)
    } else {
      // Si invalide, journalise les erreurs pour débogage
      console.log('Form validation failed:', errors);
    }
  };

  /**
   * Rendu JSX du composant
   * Description : Structure la page avec deux sections : une pour l’adresse de livraison (adresse, ville, code postal, région)
   * et une pour les informations de carte bancaire (numéro, date d’expiration, CVV). Affiche des messages d’erreur sous
   * chaque champ invalide et un bouton de validation.
   * Retour : JSX représentant la page de paiement
   */
  return (
    <PaiementContainer>
      {/* Section pour l’adresse de livraison */}
      <FormSection>
        {/* Champ pour l’adresse principale */}
        <InputWrapper>
          <Label>Adresse ligne 1*</Label>
          <Input
            type="text" // Type d’input : texte
            name="addressLine1" // Nom du champ, utilisé dans handleChange
            value={formData.addressLine1} // Valeur liée à l’état formData
            onChange={handleChange} // Gestionnaire d’événement pour les changements
            placeholder="Adresse ligne 1*" // Texte d’indication
          />
          {/* Affiche un message d’erreur si addressLine1 est invalide */}
          {errors.addressLine1 && <ErrorMessage>{errors.addressLine1}</ErrorMessage>}
        </InputWrapper>

        {/* Champ pour la ville */}
        <InputWrapper>
          <Label>Ville*</Label>
          <Input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Ville*"
          />
          {errors.city && <ErrorMessage>{errors.city}</ErrorMessage>}
        </InputWrapper>

        {/* Ligne pour code postal et région */}
        <InputRow>
          {/* Champ pour le code postal */}
          <InputWrapper>
            <Label>Code postal*</Label>
            <InputHalf
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              placeholder="Code postal*"
            />
            {errors.postalCode && <ErrorMessage>{errors.postalCode}</ErrorMessage>}
          </InputWrapper>

          {/* Champ pour la région */}
          <InputWrapper>
            <Label>Région*</Label>
            <InputHalf
              type="text"
              name="region"
              value={formData.region}
              onChange={handleChange}
              placeholder="Région*"
            />
            {errors.region && <ErrorMessage>{errors.region}</ErrorMessage>}
          </InputWrapper>
        </InputRow>
      </FormSection>

      {/* Séparateur visuel */}
      <Divider />

      {/* Section pour les informations de carte bancaire */}
      <FormSection>
        {/* Logo Visa pour indiquer les cartes acceptées */}
        <VisaLogo
          src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" // URL de l’image
          alt="Visa" // Texte alternatif pour accessibilité
        />
        {/* Champ pour le numéro de carte */}
        <InputWrapper>
          <Label>Numéro de carte*</Label>
          <Input
            type="text"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            placeholder="0000 0000 0000 0000"
          />
          {errors.cardNumber && <ErrorMessage>{errors.cardNumber}</ErrorMessage>}
        </InputWrapper>

        {/* Ligne pour date d’expiration et CVV */}
        <InputRow>
          {/* Champ pour la date d’expiration */}
          <InputWrapper>
            <Label>Date d'expiration*</Label>
            <InputHalf
              type="text"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              placeholder="00/0000"
            />
            {errors.expiryDate && <ErrorMessage>{errors.expiryDate}</ErrorMessage>}
          </InputWrapper>

          {/* Champ pour le CVV */}
          <InputWrapper>
            <Label>CVV*</Label>
            <InputHalf
              type="text"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              placeholder="3-4 chiffres"
            />
            {errors.cvv && <ErrorMessage>{errors.cvv}</ErrorMessage>}
          </InputWrapper>
        </InputRow>
      </FormSection>

      {/* Bouton de validation du formulaire */}
      <SubmitButton onClick={handleSubmit}>VALIDER</SubmitButton>
    </PaiementContainer>
  );
};

/** Exportation du composant Paiement pour utilisation dans les routes */
export default Paiement;