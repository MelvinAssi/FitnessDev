import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const shouldForwardProp = (prop) => prop !== 'isVisible';

// --- Début des styles (pas de commentaires ici, comme demandé) ---
const Container = styled.div`
  max-width: 800px;
  margin: 6rem auto;
  padding: 0 20px;
`;

const Title = styled.h1`
  font-family: 'Enriqueta', sans-serif;
  font-size: 2.5rem;
  color: #000000;
  text-align: center;
  margin-bottom: 2rem;
`;

const CourseList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 0.5rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const ReturnLink = styled(Link)`
  display: block;
  color: #9a1b14;
  font-size: 1rem;
  text-align: left;
  margin-bottom: 1rem;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const CourseItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  width: 100%;
`;

const CourseInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const CourseName = styled.h2`
  font-family: 'Rufina', serif;
  font-size: 1.5rem;
  margin: 0;
`;

const CourseDetails = styled.p`
  font-family: 'Hind Siliguri', sans-serif;
  font-size: 1rem;
  color: #666;
  margin: 0.25rem 0 0;
`;

const Confirmation = styled.p`
  font-family: 'Hind Siliguri', sans-serif;
  font-size: 1rem;
  color: #ae2119;
  text-align: center;
  margin-top: 1rem;
`;

const ErrorMessage = styled.p`
  font-family: 'Hind Siliguri', sans-serif;
  font-size: 1rem;
  color: #ff0000;
  text-align: center;
  margin-top: 1rem;
`;

const CustomReserveButton = styled.button`
  display: inline-block;
  width: 200px;
  height: 70px;
  line-height: 70px;
  background-color: ${({ disabled }) => (disabled ? '#cccccc' : '#9a1b14')};
  color: ${({ disabled }) => (disabled ? '#666666' : '#ffffff')};
  border: none;
  border-radius: 5px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  font-size: 20px;
  font-weight: 700;
  padding: 0 20px;
  box-sizing: border-box;
  z-index: 1;
  text-align: center;
  &:hover:not(:disabled) {
    background-color: #000000;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const ConfirmationPopup = styled.div.withConfig({ shouldForwardProp })`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(${({ isVisible }) => (isVisible ? 1 : 0.8)});
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  text-align: center;
  max-width: 400px;
  width: 90%;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: transform 0.3s ease, opacity 0.3s ease;
  animation: fadeIn 0.3s ease forwards;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.8);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }
`;

const PopupMessage = styled.p`
  font-family: 'Hind Siliguri', sans-serif;
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
`;

const PopupButton = styled.button`
  background-color: #9a1b14;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  margin: 0 0.5rem;
  &:hover {
    background-color: #000000;
  }
`;
// --- Fin des styles ---

const CourseSelectionPage = () => {
  const { courseName } = useParams();
  const navigate = useNavigate();
  const [confirmation, setConfirmation] = useState('');
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [inscribedCourses, setInscribedCourses] = useState([]);
  const [slotCourseIds, setSlotCourseIds] = useState({});
  const [loading, setLoading] = useState(true);
  const [renderKey, setRenderKey] = useState(0);
  const [error, setError] = useState(''); // MODIFICATION: Ajoute gestion des erreurs

  const courseDetails = {
    'Cours Collectifs': { day: 1, time: '18:00', coach: 'Anna' },
    'Pole Dance': { day: 2, time: '18:00', coach: 'Marc' },
    'Crosstraining': { day: 3, time: '18:00', coach: 'Léa' },
    'Boxe': { day: 4, time: '18:00', coach: 'Paul' },
    'Haltérophilie': { day: 5, time: '18:00', coach: 'Sophie' },
    'MMA': { day: 6, time: '18:00', coach: 'Lucas' },
  };

  const getNextThreeWeeks = (course) => {
    const slots = [];
    const today = new Date();
    const courseDay = courseDetails[course]?.day;
    const courseTime = courseDetails[course]?.time;
    const courseCoach = courseDetails[course]?.coach;

    if (!courseDay || !courseTime || !courseCoach) {
      return slots;
    }

    for (let i = 0; i < 3; i++) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + ((courseDay - today.getDay() + 7) % 7) + i * 7);
      const formattedDate = nextDate.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
      slots.push({
        id: i + 1,
        date: formattedDate,
        time: courseTime,
        coach: courseCoach,
      });
    }
    return slots;
  };

  const [slots] = useState(getNextThreeWeeks(decodeURIComponent(courseName)));

  // Forcer le re-rendu après mise à jour de inscribedCourses
  useEffect(() => {
    setRenderKey((prev) => prev + 1);
    console.log('RenderKey mis à jour:', renderKey, 'Inscribed Courses:', inscribedCourses);
  }, [inscribedCourses]);

  useEffect(() => {
    const fetchInscriptions = async () => {
      setLoading(true);
      setError(''); // Réinitialiser l'erreur
      const token = localStorage.getItem('token');
      console.log('Token utilisé:', token);
      if (!token) {
        navigate('/login');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/user/previous-courses', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 403) {
          console.error('Accès refusé: Token invalide');
          localStorage.removeItem('token');
          navigate('/login');
          setLoading(false);
          return;
        }
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des cours');
        }

        const data = await response.json();
        console.log('Inscriptions reçues:', data.courses);

        const courseIdMap = {};
        const courseIds = slots
          .map((slot) => {
            const slotParts = slot.date.split('/');
            const slotDateStr = `${slotParts[2]}-${slotParts[1]}-${slotParts[0]}`; // YYYY-MM-DD
            const slotTime = slot.time; // ex. : "18:00"

            const matchingCourse = data.courses.find((course) => {
              const courseDate = new Date(course.datetime_cours);
              const courseDateStr = courseDate.toISOString().split('T')[0];
              const courseTime = courseDate.toLocaleTimeString('fr-FR', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
                timeZone: 'Europe/Paris',
              });
              console.log('Course:', {
                nom_cours: course.nom_cours,
                datetime_cours: course.datetime_cours,
                id_cours: course.id_cours,
                courseDateStr,
                courseTime,
                slotDateStr,
                slotTime,
                matches:
                  course.nom_cours === decodeURIComponent(courseName) &&
                  courseDateStr === slotDateStr &&
                  courseTime === slotTime,
              });
              return (
                course.nom_cours === decodeURIComponent(courseName) &&
                courseDateStr === slotDateStr &&
                courseTime === slotTime
              );
            });

            if (matchingCourse) {
              const courseId = matchingCourse.id_cours;
              if (courseId) {
                courseIdMap[`${slot.date}_${slot.time}`] = courseId;
                return courseId;
              }
            }
            return null;
          })
          .filter((id) => id !== null && id !== undefined);

        setInscribedCourses(courseIds);
        setSlotCourseIds(courseIdMap);
        console.log('Inscribed Courses:', courseIds, 'Slot Course IDs:', courseIdMap);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des inscriptions :', error);
        setError('Impossible de charger les inscriptions. Veuillez réessayer.');
        setInscribedCourses([]);
        setSlotCourseIds({});
        setLoading(false);
      }
    };

    fetchInscriptions();
  }, [courseName, slots, navigate]);

  const handleReserve = async (slot, confirmed = false) => {
    if (!confirmed) {
      setSelectedSlot(slot);
      setShowConfirmPopup(true);
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          courseName: decodeURIComponent(courseName),
          date: slot.date,
          time: slot.time,
          duration: '2 hours',
        }),
      });

      if (response.status === 403) {
        console.error('Accès refusé: Token invalide');
        localStorage.removeItem('token');
        navigate('/login');
        return;
      }
      if (!response.ok) {
        throw new Error('Erreur lors de la réservation');
      }

      const data = await response.json();
      if (data.id_cours) {
        setSlotCourseIds((prev) => ({
          ...prev,
          [`${slot.date}_${slot.time}`]: data.id_cours,
        }));
        setInscribedCourses((prev) => [...prev, data.id_cours]);
      }

      setShowConfirmPopup(false);
      setShowSuccessPopup(true);
      setConfirmation(`Réservation confirmée pour ${courseName} le ${slot.date} à ${slot.time} !`);
      setTimeout(() => {
        setConfirmation('');
        setShowSuccessPopup(false);
      }, 3000);

      const fetchInscriptions = async () => {
        setLoading(true);
        try {
          const response = await fetch('http://localhost:3000/user/previous-courses', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.status === 403) {
            localStorage.removeItem('token');
            navigate('/login');
            setLoading(false);
            return;
          }
          if (!response.ok) {
            throw new Error('Erreur lors de la récupération des cours');
          }

          const data = await response.json();
          console.log('Inscriptions reçues après réservation:', data.courses);

          const courseIdMap = {};
          const courseIds = slots
            .map((slot) => {
              const slotParts = slot.date.split('/');
              const slotDateStr = `${slotParts[2]}-${slotParts[1]}-${slotParts[0]}`;
              const slotTime = slot.time;

              const matchingCourse = data.courses.find((course) => {
                const courseDate = new Date(course.datetime_cours);
                const courseDateStr = courseDate.toISOString().split('T')[0];
                const courseTime = courseDate.toLocaleTimeString('fr-FR', {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false,
                  timeZone: 'Europe/Paris',
                });
                console.log('Course après réservation:', {
                  nom_cours: course.nom_cours,
                  datetime_cours: course.datetime_cours,
                  id_cours: course.id_cours,
                  courseDateStr,
                  courseTime,
                  slotDateStr,
                  slotTime,
                });
                return (
                  course.nom_cours === decodeURIComponent(courseName) &&
                  courseDateStr === slotDateStr &&
                  courseTime === slotTime
                );
              });

              if (matchingCourse) {
                const courseId = matchingCourse.id_cours;
                if (courseId) {
                  courseIdMap[`${slot.date}_${slot.time}`] = courseId;
                  return courseId;
                }
              }
              return null;
            })
            .filter((id) => id !== null && id !== undefined);

          setInscribedCourses(courseIds);
          setSlotCourseIds(courseIdMap);
          console.log('Inscribed Courses après réservation:', courseIds, 'Slot Course IDs:', courseIdMap);
          setLoading(false);
        } catch (error) {
          console.error('Erreur lors de la récupération des inscriptions :', error);
          setError('Impossible de charger les inscriptions après réservation. Veuillez réessayer.');
          setLoading(false);
        }
      };
      await fetchInscriptions();
    } catch (error) {
      alert('Échec de la réservation : ' + error.message);
      setShowConfirmPopup(false);
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>Choisir un créneau pour {decodeURIComponent(courseName)}</Title>
      {loading ? (
        <CourseDetails>Chargement des créneaux...</CourseDetails>
      ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : (
        <CourseList key={`course-list-${renderKey}`}>
          <ReturnLink to="/courses">Retour</ReturnLink>
          {slots.length > 0 ? (
            slots.map((slot) => {
              const isDisabled = slotCourseIds[`${slot.date}_${slot.time}`] && inscribedCourses.includes(slotCourseIds[`${slot.date}_${slot.time}`]);
              console.log('Disabled for slot:', slot.date, slot.time, isDisabled, 'RenderKey:', renderKey);
              return (
                <CourseItem key={`${slot.date}_${slot.time}`}>
                  <CourseInfo>
                    <CourseName>{decodeURIComponent(courseName)}</CourseName>
                    <CourseDetails>Date : {slot.date}</CourseDetails>
                    <CourseDetails>Horaire : {slot.time}</CourseDetails>
                    <CourseDetails>Coach : {slot.coach}</CourseDetails>
                  </CourseInfo>
                  <CustomReserveButton
                    onClick={() => handleReserve(slot)}
                    disabled={isDisabled}
                  >
                    Réserver
                  </CustomReserveButton>
                </CourseItem>
              );
            })
          ) : (
            <CourseDetails>Aucun créneau disponible pour ce cours.</CourseDetails>
          )}
        </CourseList>
      )}
      {confirmation && <Confirmation>{confirmation}</Confirmation>}
      {showConfirmPopup && selectedSlot && (
        <>
          <Overlay />
          <ConfirmationPopup isVisible={showConfirmPopup}>
            <PopupMessage>
              Êtes-vous sûr de vouloir vous inscrire pour le cours {decodeURIComponent(courseName)} le {selectedSlot.date} à {selectedSlot.time} ?
            </PopupMessage>
            <PopupButton onClick={() => handleReserve(selectedSlot, true)}>Confirmer</PopupButton>
            <PopupButton onClick={() => setShowConfirmPopup(false)}>Annuler</PopupButton>
          </ConfirmationPopup>
        </>
      )}
      {showSuccessPopup && selectedSlot && (
        <>
          <Overlay />
          <ConfirmationPopup isVisible={showSuccessPopup}>
            <PopupMessage>
              Réservation confirmée pour {decodeURIComponent(courseName)} le {selectedSlot.date} à {selectedSlot.time} !
            </PopupMessage>
            <PopupButton onClick={() => setShowSuccessPopup(false)}>OK</PopupButton>
          </ConfirmationPopup>
        </>
      )}
    </Container>
  );
};

export default CourseSelectionPage;
// MODIFICATION: Améliorations pour stabilité et débogage
// - Maintient les clés uniques pour CourseItem (slot.date_slot.time)
// - Conserve renderKey pour forcer le re-rendu après mise à jour de inscribedCourses
// - Ajoute un état error pour afficher les erreurs de fetchInscriptions
// - Ajoute des logs pour déboguer le rendu de isDisabled
// - Gère statiquement les créneaux pour les 3 prochaines semaines
// - Utilise toLocaleTimeString avec timeZone: 'Europe/Paris' pour un décalage précis (CEST, UTC+2)