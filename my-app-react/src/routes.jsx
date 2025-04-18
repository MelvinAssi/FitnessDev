import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage.jsx';
import ContactPage from './pages/ContactPage/ContactPage.jsx';
import LoginPage from './pages/LoginPage/LoginPage.jsx';
import SignUpPage from './pages/SignUpPage/SignUpPage.jsx';
import SubscriptionPage from './pages/SubscriptionPage/SubscriptionPage.jsx';
import CoursePage from './pages/CoursePage/CoursePage';
import CourseSelectionPage from './pages/CourseSelectionPage/CourseSelectionPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import ScrollToTop from './components/ScrollToTop.jsx';

const AppRoutes = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/subscription" element ={<SubscriptionPage />} />
        <Route path='/courses' element={<CoursePage />} />
        <Route path='/course-selection/:courseName' element={<CourseSelectionPage />} />
        <Route path="/profil" element={<ProfilePage />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
