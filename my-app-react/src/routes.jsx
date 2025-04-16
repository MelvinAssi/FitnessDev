import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage.jsx';
import ContactPage from './pages/ContactPage/ContactPage.jsx';
import LoginPage from './pages/LoginPage/LoginPage.jsx';
import SignUpPage from './pages/SignUpPage/SignUpPage.jsx';
import SubscriptionPage from './pages/SubscriptionPage/SubscriptionPage.jsx';
// Added imports from Trey branch for cart functionality
import Produit from './pages/Produit/Produit.jsx';
import Panier from './pages/Panier/Panier.jsx';
import CartWrapper from './components/CartWrapper.jsx';
// Added imports from main branch for course-related pages and ScrollToTop
import CoursePage from './pages/CoursePage/CoursePage';
import CourseSelectionPage from './pages/CourseSelectionPage/CourseSelectionPage';
import ScrollToTop from './components/ScrollToTop.jsx';

const AppRoutes = () => {
  return (
    <>
      {/* Added ScrollToTop from main branch to ensure scrolling to top on route changes */}
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
        {/* Routes from main branch for course-related pages */}
        <Route path="/courses" element={<CoursePage />} />
        <Route path="/course-selection" element={<CourseSelectionPage />} />
      </Routes>
    </>
  );
};

export default AppRoutes;