import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../services/axios';
import styled from 'styled-components';
import poleDance from '../../assets/images/pole-dance.jpg';
import coursCollectifs from '../../assets/images/cours-collectifs.jpg';
import espaceCrosstraining from '../../assets/images/espace-crosstraining.jpg';
import espaceBoxe from '../../assets/images/espace-boxe.jpg';
import espaceHalterophilie from '../../assets/images/espace-halterophilie.jpg';
import espaceMma from '../../assets/images/espace-mma.jpg';

// Mapping des noms de cours aux images
const courseDetails = {
  'Cours Collectifs': { image: coursCollectifs },
  'Pole Dance': { image: poleDance },
  'Crosstraining': { image: espaceCrosstraining },
  'Boxe': { image: espaceBoxe },
  'Haltérophilie': { image: espaceHalterophilie },
  'MMA': { image: espaceMma },
};

// Styles
const PageContainer = styled.div`
  background-color: #ffffff;
  min-height: 100vh;
  padding-top: 124px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #000000;
  margin-bottom: 20px;
`;

const ReturnButton = styled.button`
  width: 150px;
  height: 40px;
  background-color: #9a1b14;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 20px;

  &:hover {
    background-color: #000000;
  }
`;

const CoursesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  max-width: 1200px;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CourseBlock = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;

  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
`;

const CourseImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const CourseInfo = styled.div`
  padding: 10px;
  text-align: center;
`;

const CourseDateTime = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #000000;
  margin: 0;
`;

const CourseName = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #000000;
  margin: 5px 0 0;
`;

const NoCoursesMessage = styled.p`
  font-size: 16px;
  color: #000000;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Popup = styled.div`
  background: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
  max-width: 400px;
  width: 90%;
`;

const PopupTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const PopupText = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const RedButton = styled.button`
  width: 100px;
  height: 40px;
  background-color: #9a1b14;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #000000;
  }

  &:disabled {
    background-color: #999999;
    cursor: not-allowed;
  }
`;

const GrayButton = styled.button`
  width: 100px;
  height: 40px;
  background-color: #666666;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #4d4d4d;
  }
`;

const CoursesInscritsPage = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isCanceling, setIsCanceling] = useState(false); // MODIFICATION: État pour gérer le chargement

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('/user/previous-courses');
        // Filtrer les cours à venir (datetime_cours > maintenant)
        const now = new Date();
        const upcomingCourses = response.data.courses.filter(
          (course) => new Date(course.datetime_cours) > now
        );
        setCourses(upcomingCourses);
      } catch (error) {
        console.error('Erreur lors de la récupération des cours inscrits:', error);
      }
    };
    fetchCourses();
  }, []);

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
    setShowPopup(true);
  };

  const handleCancelInscription = async () => {
    if (!selectedCourse || isCanceling) return;

    setIsCanceling(true); // MODIFICATION: Désactiver le bouton pendant la requête
    try {
      await axios.delete(`/user/course/${selectedCourse.id_cours}`);
      // Rafraîchir la liste des cours
      const response = await axios.get('/user/previous-courses');
      const now = new Date();
      const upcomingCourses = response.data.courses.filter(
        (course) => new Date(course.datetime_cours) > now
      );
      setCourses(upcomingCourses);
      setShowPopup(false);
      setSelectedCourse(null);
    } catch (error) {
      // MODIFICATION: Gérer l'erreur 404 silencieusement
      if (error.response && error.response.status === 404) {
        // Inscription déjà supprimée, rafraîchir la liste
        const response = await axios.get('/user/previous-courses');
        const now = new Date();
        const upcomingCourses = response.data.courses.filter(
          (course) => new Date(course.datetime_cours) > now
        );
        setCourses(upcomingCourses);
      } else {
        console.error('Erreur lors de l\'annulation de l\'inscription:', error);
        alert('Échec de l\'annulation de l\'inscription');
      }
    } finally {
      setIsCanceling(false); // MODIFICATION: Réactiver le bouton
      setShowPopup(false);
      setSelectedCourse(null);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedCourse(null);
  };

  return (
    <PageContainer>
      <ReturnButton onClick={() => navigate('/profil')}>Retour</ReturnButton>
      <Title>Mes Cours Inscrits</Title>
      {courses.length === 0 ? (
        <NoCoursesMessage>Aucun cours à venir.</NoCoursesMessage>
      ) : (
        <CoursesGrid>
          {courses.map((course, index) => (
            <CourseBlock
              key={`${course.id_cours}_${index}`} // MODIFICATION: Clé unique avec index
              onClick={() => handleCourseClick(course)}
            >
              <CourseImage
                src={courseDetails[course.nom_cours]?.image || coursCollectifs}
                alt={course.nom_cours}
              />
              <CourseInfo>
                <CourseDateTime>
                  {new Date(course.datetime_cours).toLocaleString('fr-FR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </CourseDateTime>
                <CourseName>{course.nom_cours}</CourseName>
              </CourseInfo>
            </CourseBlock>
          ))}
        </CoursesGrid>
      )}
      {showPopup && (
        <Overlay>
          <Popup>
            <PopupTitle>ANNULER INSCRIPTION</PopupTitle>
            <PopupText>
              Voulez-vous annuler votre inscription au cours "{selectedCourse?.nom_cours}" du{' '}
              {new Date(selectedCourse?.datetime_cours).toLocaleDateString('fr-FR')} ?
            </PopupText>
            <ButtonContainer>
              <RedButton onClick={handleCancelInscription} disabled={isCanceling}>
                ANNULER
              </RedButton>
              <GrayButton onClick={closePopup}>FERMER</GrayButton>
            </ButtonContainer>
          </Popup>
        </Overlay>
      )}
    </PageContainer>
  );
};

export default CoursesInscritsPage;