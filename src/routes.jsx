import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage.jsx';
import ContactPage from './pages/ContactPage/ContactPage.jsx';
import LoginPage from './pages/LoginPage/LoginPage.jsx';
import SignUpPage from './pages/SignUpPage/SignUpPage.jsx';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
    </Routes>
  );
};

export default AppRoutes;
