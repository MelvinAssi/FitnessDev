import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage.jsx';
import ContactPage from './pages/ContactPage/ContactPage.jsx';
import LoginPage from './pages/LoginPage/LoginPage.jsx';
import SignUpPage from './pages/SignUpPage/SignUpPage.jsx';
import SubscriptionPage from './pages/SubscriptionPage/SubscriptionPage.jsx';
// Imports from Trey branch for cart functionality
import Produit from './pages/Produit/Produit.jsx';
import Panier from './pages/Panier/Panier.jsx';
import CartWrapper from './components/CartWrapper.jsx';
import Checkout from './pages/Checkout/Checkout.jsx';
import Paiement from './pages/Paiement/Paiement.jsx';
// Imports from main branch for course-related and profile pages
import CoursePage from './pages/CoursePage/CoursePage';
import CourseSelectionPage from './pages/CourseSelectionPage/CourseSelectionPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import EditProfilePage from './pages/ProfilePage/EditProfilePage';
import CoursesInscritsPage from './pages/ProfilePage/CoursesInscritsPage';
import CommandesPage from './pages/ProfilePage/CommandesPage';
import ScrollToTop from './components/ScrollToTop.jsx';

const AppRoutes = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Common routes present in both branches */}
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/subscription" element={<SubscriptionPage />} />
        {/* Routes from Trey branch, wrapped in CartWrapper for cart functionality */}
        <Route
          path="/produit"
          element={
            <CartWrapper>
              <Produit />
            </CartWrapper>
          }
        />
        <Route
          path="/panier"
          element={
            <CartWrapper>
              <Panier />
            </CartWrapper>
          }
        />
        <Route
          path="/checkout"
          element={
            <CartWrapper>
              <Checkout />
            </CartWrapper>
          }
        />
        <Route path="/paiement" element={<Paiement />} />
        {/* Routes from main branch for course and profile pages */}
        <Route path="/courses" element={<CoursePage />} />
        <Route path="/course-selection/:courseName" element={<CourseSelectionPage />} />
        <Route path="/profil" element={<ProfilePage />} />
        <Route path="/courses-inscrits" element={<CoursesInscritsPage />} />
        <Route path="/profil/edit" element={<EditProfilePage />} />
        <Route path="/commandes" element={<CommandesPage />} />
      </Routes>
    </>
  );
};

export default AppRoutes;