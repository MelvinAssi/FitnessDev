import { Link } from 'react-router-dom';
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
  const gridRef = useRef(null);
  const historyGridRef = useRef(null);

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
          console.error('Aucun token trouvé dans localStorage');
          return;
        }
        const response = await fetch('http://localhost:3000/user/previous-courses', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(`Erreur HTTP ${response.status}`);
        }
        const data = await response.json();
        if (data.courses) {
          setPreviousCourses(data.courses);
        } else {
          console.error('Aucune donnée de cours reçue:', data);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des cours précédents:', error);
      }
    };
    fetchPreviousCourses();
  }, []);

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
          <EnrollButton to="/course-selection">S'inscrire</EnrollButton>
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
        <ChevronButton $visible={showHistoryChevrons} onClick={() => scrollLeft(historyGridRef)} direction="left">
          <ChevronImage src="/src/assets/icons/flecheGauche.png" alt="Flèche gauche" />
        </ChevronButton>
        <CourseGrid ref={historyGridRef}>
          {previousCourses.map((course, index) => (
            <CourseBlock
              key={index}
              $isSelected={selectedCourse === course.nom_cours}
              onClick={() => handleImageClick(course.nom_cours)}
            >
              <CourseImage
                src={courseDetails[course.nom_cours]?.image || coursCollectifs}
                alt={course.nom_cours}
              />
              <CourseName>{course.nom_cours}</CourseName>
              <CourseDate>{new Date(course.datetime_cours).toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })}</CourseDate>
            </CourseBlock>
          ))}
        </CourseGrid>
        <ChevronButton $visible={showHistoryChevrons} onClick={() => scrollRight(historyGridRef)} direction="right">
          <ChevronImage src="/src/assets/icons/flecheDroite.png" alt="Flèche droite" />
        </ChevronButton>
      </CoursesSection>
    </Container>
  );
}

export default CoursePage;