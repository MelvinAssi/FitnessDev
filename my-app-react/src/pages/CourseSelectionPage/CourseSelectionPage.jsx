import { useState } from 'react';
import styled from 'styled-components';
import Button from '../../components/Button';

const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 20px;
`;

const Title = styled.h1`
  font-family: 'Enriqueta', sans-serif;
  font-size: 2.5rem;
  color: #000000;
  text-align: center;
  margin-bottom: 1rem;
`;

const CourseList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CourseItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
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

const CourseSelectionPage = () => {
  const [courses] = useState([
    { id: 1, name: 'Yoga', coach: 'Anna', time: 'Lundi 18h00' },
    { id: 2, name: 'Musculation', coach: 'Marc', time: 'Mardi 19h00' },
    { id: 3, name: 'Zumba', coach: 'Léa', time: 'Mercredi 17h30' },
    { id: 4, name: 'Boxe', coach: 'Paul', time: 'Jeudi 20h00' },
  ]);

  const [confirmation, setConfirmation] = useState('');

  const handleEnroll = (courseName) => {
    setConfirmation(`Inscription confirmée pour ${courseName} !`);
    setTimeout(() => setConfirmation(''), 3000);
  };

  return (
    <Container>
      <Title>Choisir un cours</Title>
      <CourseList>
        {courses.map((course) => (
          <CourseItem key={course.id}>
            <CourseInfo>
              <CourseName>{course.name}</CourseName>
              <CourseDetails>Coach : {course.coach}</CourseDetails>
              <CourseDetails>Horaire : {course.time}</CourseDetails>
            </CourseInfo>
            <Button onClick={() => handleEnroll(course.name)}>S'inscrire</Button>
          </CourseItem>
        ))}
      </CourseList>
      {confirmation && <Confirmation>{confirmation}</Confirmation>}
    </Container>
  );
};

export default CourseSelectionPage;