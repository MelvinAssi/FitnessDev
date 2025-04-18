import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import {
  Container,
  LeftBlock,
  HeaderSection,
  Title,
  Subtitle,
  EnrollButton,
  CoursesSection,
  CoursesTitle,
  CourseGrid,
  CourseBlock,
  CourseImage,
  CourseName,
  LargeImageContainer,
  LargeImage,
  GradientOverlay,
  ChevronButton,
  ChevronImage,
  CourseDate,
  ErrorMessage,
  NoCoursesMessage,
} from './CoursePageStyles';
import poleDance from '../../assets/images/pole-dance.jpg';
import coursCollectifs from '../../assets/images/cours-collectifs.jpg';
import espaceCrosstraining from '../../assets/images/espace-crosstraining.jpg';
import espaceBoxe from '../../assets/images/espace-boxe.jpg';
import espaceHalterophilie from '../../assets/images/espace-halterophilie.jpg';
import espaceMma from '../../assets/images/espace-mma.jpg';

function CoursePage() {
  const [selectedImage, setSelectedImage] = useState(coursCollectifs);
  const [selectedCourse, setSelectedCourse] = useState('Cours Collectifs');
  const [previousCourses, setPreviousCourses] = useState([]);
  const [showMainChevrons, setShowMainChevrons] = useState(false);
  const [showHistoryChevrons, setShowHistoryChevrons] = useState(false);
  const [error, setError] = useState('');
  const gridRef = useRef(null);
  const historyGridRef = useRef(null);
  const navigate = useNavigate();

  const courseDetails = {
    'Cours Collectifs': {
      title: 'Cours Collectifs',
      subtitle: 'Rejoignez nos sessions variées tous les lundis de 18:00 à 20:00 pour un entraînement dynamique adapté à tous les niveaux.',
      image: coursCollectifs,
    },
    'Pole Dance': {
      title: 'Pole Dance',
      subtitle: 'Découvrez la pole dance chaque mardi de 18:00 à 20:00, un mélange unique de force et de grâce avec nos coachs experts.',
      image: poleDance,
    },
    'Crosstraining': {
      title: 'Crosstraining',
      subtitle: 'Boostez votre condition physique avec notre crosstraining intensif tous les mercredis de 18:00 à 20:00.',
      image: espaceCrosstraining,
    },
    'Boxe': {
      title: 'Boxe',
      subtitle: 'Plongez dans l’univers de la boxe chaque jeudi de 18:00 à 20:00 pour développer puissance et technique.',
      image: espaceBoxe,
    },
    'Haltérophilie': {
      title: 'Haltérophilie',
      subtitle: 'Maîtrisez les mouvements d’haltérophilie chaque vendredi de 18:00 à 20:00 avec des coachs spécialisés.',
      image: espaceHalterophilie,
    },
    'MMA': {
      title: 'MMA',
      subtitle: 'Entraînez-vous comme un combattant avec nos cours de MMA chaque samedi de 18:00 à 20:00.',
      image: espaceMma,
    },
  };

  useEffect(() => {
    const fetchPreviousCourses = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Veuillez vous connecter');
          return;
        }
        const response = await fetch('http://localhost:3000/user/previous-courses', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 403) {
          console.error('Accès refusé : Token invalide ou expiré');
          localStorage.removeItem('token');
          navigate('/login');
          return;
        }
        if (!response.ok) {
          throw new Error(`Erreur HTTP ${response.status}`);
        }
        const data = await response.json();
        console.log('Inscriptions reçues (CoursePage):', data.courses);

        // Filtrer les cours passés uniquement
        const pastCourses = data.courses.filter((course) => {
          const courseDate = new Date(course.datetime_cours);
          return courseDate < new Date();
        });
        console.log('Cours passés filtrés:', pastCourses);

        setPreviousCourses(pastCourses);
      } catch (error) {
        console.error('Erreur lors de la récupération des cours précédents:', error);
        setError('Impossible de charger l’historique des cours.');
      }
    };
    fetchPreviousCourses();
  }, [navigate]);

  useEffect(() => {
    const checkScroll = () => {
      if (gridRef.current) {
        const scrollWidth = gridRef.current.scrollWidth;
        const clientWidth = gridRef.current.clientWidth;
        console.log('Main Grid - scrollWidth:', scrollWidth, 'clientWidth:', clientWidth);
        setShowMainChevrons(scrollWidth > clientWidth);
      }
      if (historyGridRef.current) {
        const scrollWidth = historyGridRef.current.scrollWidth;
        const clientWidth = historyGridRef.current.clientWidth;
        console.log('History Grid - scrollWidth:', scrollWidth, 'clientWidth:', clientWidth);
        setShowHistoryChevrons(scrollWidth > clientWidth);
      }
    };

    checkScroll();
    setTimeout(checkScroll, 100);
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [previousCourses]);

  const handleImageClick = (courseName) => {
    setSelectedImage(courseDetails[courseName]?.image || coursCollectifs);
    setSelectedCourse(courseName);
  };

  const handleEnrollClick = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login', { state: { redirectCourse: selectedCourse } });
    } else {
      navigate(`/course-selection/${encodeURIComponent(selectedCourse)}`);
    }
  };

  const scrollLeft = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };

  const scrollRight = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

  return (
    <Container>
      <LargeImageContainer>
        <LargeImage src={selectedImage} alt={selectedCourse} />
        <GradientOverlay />
      </LargeImageContainer>
      <LeftBlock>
        <HeaderSection>
          <Title>{courseDetails[selectedCourse]?.title || 'Cours'}</Title>
          <Subtitle>{courseDetails[selectedCourse]?.subtitle || ''}</Subtitle>
          <EnrollButton onClick={handleEnrollClick}>S'inscrire</EnrollButton>
        </HeaderSection>
      </LeftBlock>
      <CoursesSection>
        <CoursesTitle>NOS COURS</CoursesTitle>
        <ChevronButton $visible={showMainChevrons} onClick={() => scrollLeft(gridRef)} direction="left">
          <ChevronImage src="/src/assets/icons/flecheGauche.png" alt="Flèche gauche" />
        </ChevronButton>
        <CourseGrid ref={gridRef}>
          {Object.keys(courseDetails).map((courseName) => (
            <CourseBlock
              key={courseName}
              $isSelected={selectedCourse === courseName}
              onClick={() => handleImageClick(courseName)}
            >
              <CourseImage src={courseDetails[courseName].image} alt={courseName} />
              <CourseName>{courseName}</CourseName>
            </CourseBlock>
          ))}
        </CourseGrid>
        <ChevronButton $visible={showMainChevrons} onClick={() => scrollRight(gridRef)} direction="right">
          <ChevronImage src="/src/assets/icons/flecheDroite.png" alt="Flèche droite" />
        </ChevronButton>
      </CoursesSection>
      <CoursesSection>
        <CoursesTitle>VOS COURS PRÉCÉDENTS</CoursesTitle>
        {error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : previousCourses.length === 0 ? (
          <NoCoursesMessage>Aucun cours passé trouvé.</NoCoursesMessage>
        ) : (
          <>
            <ChevronButton $visible={showHistoryChevrons} onClick={() => scrollLeft(historyGridRef)} direction="left">
              <ChevronImage src="/src/assets/icons/flecheGauche.png" alt="Flèche gauche" />
            </ChevronButton>
            <CourseGrid ref={historyGridRef}>
              {previousCourses.map((course, index) => (
                <CourseBlock
                  key={`${course.id_cours}_${index}`}
                  $isSelected={selectedCourse === course.nom_cours}
                  onClick={() => handleImageClick(course.nom_cours)}
                >
                  <CourseImage
                    src={courseDetails[course.nom_cours]?.image || coursCollectifs}
                    alt={course.nom_cours}
                  />
                  <CourseName>{course.nom_cours}</CourseName>
                  <CourseDate>
                    {new Date(course.datetime_cours).toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })}
                  </CourseDate>
                </CourseBlock>
              ))}
            </CourseGrid>
            <ChevronButton $visible={showHistoryChevrons} onClick={() => scrollRight(historyGridRef)} direction="right">
              <ChevronImage src="/src/assets/icons/flecheDroite.png" alt="Flèche droite" />
            </ChevronButton>
          </>
        )}
      </CoursesSection>
    </Container>
  );
}

export default CoursePage;
// MODIFICATION:
// - Ajout d'un filtre dans fetchPreviousCourses pour n'afficher que les cours passés (datetime_cours < new Date())
// - Ajout de l'état error pour afficher les messages d'erreur
// - Ajout de logs pour déboguer les inscriptions reçues et filtrées
// - Ajout d'un message "Aucun cours passé trouvé" si previousCourses est vide
// - Clé unique pour CourseBlock dans l'historique avec id_cours et index
// - Intégration des styles ErrorMessage et NoCoursesMessage depuis CoursePageStyles.jsx