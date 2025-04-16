import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage.jsx';
import ContactPage from './pages/ContactPage/ContactPage.jsx';
import LoginPage from './pages/LoginPage/LoginPage.jsx';
import SignUpPage from './pages/SignUpPage/SignUpPage.jsx';
import SubscriptionPage from './pages/SubscriptionPage/SubscriptionPage.jsx';
import Produit from './pages/Produit/Produit.jsx';
import Panier from './pages/Panier/Panier.jsx';
import CartWrapper from './components/CartWrapper.jsx';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/subscription" element ={<SubscriptionPage />} />
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
    </Routes>
  );
};

export default AppRoutes;
