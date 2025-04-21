/**
 * Fichier : routes.jsx
 * Description : Composant React définissant les routes de l'application FitnessDev à l'aide de React Router.
 * Chaque route correspond à une page ou une fonctionnalité, comme la page d'accueil, le panier, ou le profil.
 * Utilise des composants enveloppés (ex. CartWrapper) pour certaines routes afin de gérer le contexte du panier.
 * Inclut Paiement.jsx pour la page de paiement, aligné avec la branche Trey.
 * Contexte : Projet FitnessDev, aligné avec la branche Trey pour utiliser Panier.jsx, Produit.jsx, Checkout.jsx, et Paiement.jsx.
 * Dépendances : react-router-dom pour la gestion des routes, composants de pages spécifiques.
 */

/** Importation des dépendances nécessaires */
import { Routes, Route } from 'react-router-dom'; // Routes et Route pour définir les itinéraires de navigation
import HomePage from './pages/HomePage/HomePage.jsx'; // Page d'accueil de l'application
import ContactPage from './pages/ContactPage/ContactPage.jsx'; // Page de contact
import LoginPage from './pages/LoginPage/LoginPage.jsx'; // Page de connexion
import SignUpPage from './pages/SignUpPage/SignUpPage.jsx'; // Page d'inscription
import SubscriptionPage from './pages/SubscriptionPage/SubscriptionPage.jsx'; // Page des abonnements
// Imports alignés avec la branche Trey pour la gestion du panier, des produits, et du paiement
import Produit from './pages/Produit/Produit.jsx'; // Page des produits
import Panier from './pages/Panier/Panier.jsx'; // Page du panier
import CartWrapper from './components/CartWrapper.jsx'; // Composant enveloppeur pour fournir le contexte du panier
import Checkout from './pages/Checkout/Checkout.jsx'; // Page de validation de commande
import Paiement from './pages/Paiement/Paiement.jsx'; // Page de paiement
// Imports pour les fonctionnalités de cours et de profil
import CoursePage from './pages/CoursePage/CoursePage.jsx'; // Page des cours
import CourseSelectionPage from './pages/CourseSelectionPage/CourseSelectionPage.jsx'; // Page de sélection de créneaux de cours
import ProfilePage from './pages/ProfilePage/ProfilePage.jsx'; // Page principale du profil utilisateur
import EditProfilePage from './pages/ProfilePage/EditProfilePage.jsx'; // Page de modification du profil
import CoursesInscritsPage from './pages/ProfilePage/CoursesInscritsPage.jsx'; // Page des cours inscrits
import CommandesPage from './pages/ProfilePage/CommandesPage.jsx'; // Page des commandes
import ScrollToTop from './components/ScrollToTop.jsx'; // Composant pour remonter en haut de la page à chaque navigation

/**
 * Composant : AppRoutes
 * Description : Définit les routes de l'application FitnessDev en utilisant le composant Routes de react-router-dom.
 * Chaque Route associe un chemin URL (path) à un composant de page. Certaines routes (produit, panier, checkout) sont
 * enveloppées dans CartWrapper pour fournir le contexte du panier. Inclut un composant ScrollToTop pour améliorer
 * l'expérience utilisateur.
 * Paramètres : Aucun
 * Retour : JSX contenant le composant Routes avec toutes les routes définies
 */
const AppRoutes = () => {
  // Fragment (<>) regroupe ScrollToTop et Routes sans ajouter de balise DOM supplémentaire
  // Syntaxe : <>contenu</> est équivalent à <React.Fragment>
  return (
    <>
      {/* ScrollToTop remonte en haut de la page à chaque changement de route */}
      <ScrollToTop />
      
      {/* Routes est le conteneur principal pour toutes les routes de l'application */}
      <Routes>
        {/* Route pour la page d'accueil, accessible à l'URL racine "/" */}
        <Route path="/" element={<HomePage />} />
        
        {/* Route pour la page de contact, accessible à "/contact" */}
        <Route path="/contact" element={<ContactPage />} />
        
        {/* Route pour la page de connexion, accessible à "/login" */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Route pour la page d'inscription, accessible à "/signup" */}
        <Route path="/signup" element={<SignUpPage />} />
        
        {/* Route pour la page des abonnements, accessible à "/subscription" */}
        <Route path="/subscription" element={<SubscriptionPage />} />
        
        {/* Route pour la page des produits, enveloppée dans CartWrapper pour le contexte du panier */}
        <Route
          path="/produit"
          element={
            <CartWrapper>
              <Produit />
            </CartWrapper>
          }
        />
        
        {/* Route pour la page du panier, enveloppée dans CartWrapper pour le contexte du panier */}
        <Route
          path="/panier"
          element={
            <CartWrapper>
              <Panier />
            </CartWrapper>
          }
        />
        
        {/* Route pour la page de validation de commande, enveloppée dans CartWrapper */}
        <Route
          path="/checkout"
          element={
            <CartWrapper>
              <Checkout />
            </CartWrapper>
          }
        />
        
        {/* Route pour la page de paiement, accessible à "/paiement" */}
        <Route path="/paiement" element={<Paiement />} />
        
        {/* Route pour la page des cours, accessible à "/courses" */}
        <Route path="/courses" element={<CoursePage />} />
        
        {/* Route dynamique pour la sélection des créneaux de cours, accessible à "/course-selection/:courseName" */}
        <Route path="/course-selection/:courseName" element={<CourseSelectionPage />} />
        
        {/* Route pour la page principale du profil, accessible à "/profil" */}
        <Route path="/profil" element={<ProfilePage />} />
        
        {/* Route pour la page des cours inscrits, accessible à "/courses-inscrits" */}
        <Route path="/courses-inscrits" element={<CoursesInscritsPage />} />
        
        {/* Route pour la page de modification du profil, accessible à "/profil/edit" */}
        <Route path="/profil/edit" element={<EditProfilePage />} />
        
        {/* Route pour la page des commandes, accessible à "/commandes" */}
        <Route path="/commandes" element={<CommandesPage />} />
      </Routes>
    </>
  );
};

/** Exportation du composant AppRoutes pour utilisation dans l'application */
export default AppRoutes;