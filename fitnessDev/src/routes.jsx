import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage.jsx';
import ContactPage from './pages/ContactPage/ContactPage.jsx';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  );
};

export default AppRoutes;
