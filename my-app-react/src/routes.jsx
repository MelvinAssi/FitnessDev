import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage.jsx';
import ContactPage from './pages/ContactPage/ContactPage.jsx';
import LoginPage from './pages/LoginPage/LoginPage.jsx';
import SignUpPage from './pages/SignUpPage/SignUpPage.jsx';
import SubscriptionPage from './pages/SubscriptionPage/SubscriptionPage.jsx';
import Produit from './pages/Produit/Produit.jsx';
import Panier from './pages/Panier/Panier.jsx';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/produit" element={<Produit />} />
      <Route path="/subscription" element ={<SubscriptionPage />} />
      <Route path="/panier" element ={<Panier />} />
    </Routes>
  );
};

export default AppRoutes;
