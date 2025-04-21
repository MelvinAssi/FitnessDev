/**
 * Fichier : Subscription.jsx
 * Description : Composant React pour afficher une carte d'abonnement spécifique avec son nom, prix, options, et un bouton de sélection. 
 * Effectue des requêtes API pour récupérer le prix sur 4 semaines et vérifier si l'abonnement est actif pour l'utilisateur connecté. 
 * Le bouton est désactivé si l'abonnement est déjà actif. Utilisé dans SubscriptionPage.jsx pour afficher plusieurs formules.
 */

import React, { useEffect, useState, useContext } from "react"; // Importe React et les hooks nécessaires pour gérer l'état, les effets secondaires, et le contexte
import styled from "styled-components"; // Importe styled-components pour créer des composants stylisés avec CSS
import axios from "../services/axios.js"; // Importe l'instance Axios configurée pour effectuer des requêtes HTTP vers le backend
import { AuthContext } from "../contexts/AuthContext.jsx"; // Importe AuthContext pour accéder à l'état de l'utilisateur connecté

const Container = styled.div`
  background-color: white;
  width: 100%;
  max-width: 350px;
  min-height: 400px;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 15px;
  margin: 0 auto;

  @media (max-width: 480px) {
    padding: 15px;
    max-width: 100%;
  }
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

const SelectButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'isButtonDisabled'
})`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: ${({ isButtonDisabled }) => (isButtonDisabled ? '#ccc' : '#000')};
  color: ${({ isButtonDisabled }) => (isButtonDisabled ? '#888' : 'white')};
  border: none;
  border-radius: 6px;
  cursor: ${({ isButtonDisabled }) => (isButtonDisabled ? 'not-allowed' : 'pointer')};

  &:hover {
    background-color: ${({ isButtonDisabled }) => (isButtonDisabled ? '#ccc' : '#ae2119')};
  }
`;

/**
 * Composant : Subscription
 * Description : Affiche une carte d'abonnement avec son nom, prix (hebdomadaire et sur 4 semaines), liste d'options, et un bouton de sélection.
 * Vérifie via API si l'abonnement est actif pour désactiver le bouton. La fonction handleClick est un placeholder pour une future logique de sélection.
 * Props :
 * - name : Nom de l'abonnement (ex. : "ESSENTIAL")
 * - price : Prix hebdomadaire affiché (non utilisé directement, remplacé par price4s/4)
 * - list : Tableau d'options à afficher (chaque option a un nom et une image)
 * Retour : JSX représentant une carte d'abonnement
 */
const Subscription = ({ name, price, list }) => {
  // Récupère l'utilisateur connecté depuis AuthContext pour vérifier son abonnement
  const { user } = useContext(AuthContext);

  // État pour stocker le prix sur 4 semaines récupéré depuis l'API, initialisé à null
  const [price4s, setPrice4s] = useState(null);

  // État pour stocker l'ID de l'abonnement récupéré depuis l'API, initialisé à null
  const [id, setID] = useState(null);

  // État pour désactiver le bouton si l'abonnement est déjà actif, initialisé à false
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  /**
   * Effet : Récupération des détails de l'abonnement
   * Description : Effectue une requête GET à /type_abonnement pour récupérer le prix sur 4 semaines et l'ID de l'abonnement correspondant au nom.
   * S'exécute une seule fois au montage du composant.
   * Dépendances : [] (exécuté une seule fois)
   */
  useEffect(() => {
    // Envoie une requête GET à l'endpoint /type_abonnement avec le paramètre nom
    axios.get('/type_abonnement', {
      // Paramètres de la requête : filtre par nom de l'abonnement
      params: {
        nom: name
      }
    })
    // Gère la réponse réussie
    .then(response => {
      // Met à jour l'état price4s avec le prix sur 4 semaines du premier résultat
      setPrice4s(response.data[0].prix_4_semaines);
      // Met à jour l'état id avec l'ID de l'abonnement du premier résultat
      setID(response.data[0].id_type_abonnement);
    })
    // Gère les erreurs de la requête
    .catch(error => {
      // Journalise l'erreur pour débogage
      console.error(error);
    });
  }, []); // Tableau vide pour exécution unique au montage

  /**
   * Effet : Vérification de l'abonnement actif
   * Description : Si un utilisateur est connecté, vérifie via une requête GET à /user/abonnement/check si l'abonnement actuel correspond à cet abonnement.
   * Désactive le bouton si l'abonnement est actif.
   * Dépendances : [user] (relance si l'utilisateur change)
   */
  useEffect(() => {
    // Vérifie si un utilisateur est connecté
    if (user) {
      // Envoie une requête GET à l'endpoint /user/abonnement/check pour vérifier l'abonnement actif
      axios.get('/user/abonnement/check')
      // Gère la réponse réussie
      .then(response => {
        // Journalise l'ID de l'abonnement actif pour débogage
        console.log('Check Abonnement:', response.data.id_type_abonnement);
        // Compare l'ID de l'abonnement actif avec l'ID de cet abonnement
        if (response.data.id_type_abonnement == id) {
          // Désactive le bouton si l'abonnement est déjà actif
          setIsButtonDisabled(true);
        }
      })
      .then(response => {
        setPrice4s(response.data[0].prix_4s_type_abonnement);
        setID(response.data[0].id_type_abonnement);
      })
      .catch(error => {        
        console.error(error);
      });
    }
  }, [user]); // Dépendance : user, relance si l'utilisateur change

  /**
   * Fonction : handleClick
   * Description : Placeholder pour la logique de sélection de l'abonnement (non implémentée).
   * Retour : Aucun
   */
  const handleClick = () => {
    // Fonction vide servant de placeholder pour une future logique
  };

  // Début du rendu JSX
  return (
    // Conteneur principal de la carte d'abonnement
    <Container>
      {/* Titre de l'abonnement (ex. : ESSENTIAL) */}
      <Title>{name}</Title>
      
      {/* Conteneur pour afficher le prix hebdomadaire */}
      <PriceBox>
        {/* Prix hebdomadaire calculé en divisant le prix sur 4 semaines par 4 */}
        <Price>{price4s / 4}€</Price>
        {/* Texte indiquant que c'est un prix par semaine */}
        <Sub>/SEMAINE</Sub>
      </PriceBox>
      
      {/* Affichage du prix total sur 4 semaines */}
      <Monthly>Soit {price4s}€/4 SEMAINES</Monthly>
      
      {/* Détails contractuels de l'abonnement */}
      <Details>
        *Soit un prélèvement de {price4s}€ toutes les 4 semaines. Hors frais
        d’inscription de 50€ et hors 10€/an pour la garantie matériel.
        Abonnement sans engagement annuel avec 8 semaines de préavis.
        Abonnement donnant accès aux activités en libre-service.
      </Details>

      {/* Liste des options incluses dans l'abonnement */}
      <Options>
        {/* Mappe chaque option de la liste fournie */}
        {list.map((item, index) => (
          // Conteneur pour une option individuelle
          <OptionItem key={index}>
            {/* Image de l'option (ex. : icône) */}
            <img src={item.img} alt={item.name} />
            {/* Nom de l'option (ex. : "Accès réseau illimité") */}
            <span>{item.name}</span>
          </OptionItem>
        ))}
      </Options>

      {/* Bouton de sélection, désactivé si l'abonnement est actif */}
      <SelectButton isButtonDisabled={isButtonDisabled} disabled={isButtonDisabled} onClick={handleClick}>
        {/* Affiche "ACTIF" si l'abonnement est actif, sinon "SELECTIONNER" */}
        {isButtonDisabled ? 'ACTIF' : 'SELECTIONNER'}
      </SelectButton>
    </Container>
  );
};

// Exporte le composant Subscription pour utilisation dans SubscriptionPage.jsx
export default Subscription;