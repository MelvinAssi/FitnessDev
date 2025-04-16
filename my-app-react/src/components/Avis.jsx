import React, { useContext, useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { AuthContext } from '../contexts/AuthContext.jsx';
import { db, doc, setDoc, collection, getDocs } from '../firebase.js';
import Modal from 'react-modal';

const Button = styled.button`
  width: 50%;
  max-width: 200px;
  height: 45px;
  background-color: #9a1b14;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #7a1a11;
  }

  @media (max-width: 768px) {
    height: 50px;
  }
`;

const Textarea = styled.textarea`
  border: 1px solid rgba(0, 0, 0, 0.5);
  padding: 10px;
  margin: 8px 0;
  font-size: 16px;
  width: 100%;
  resize: none;
  border-radius: 8px;
  outline: none;
  transition: all 0.2s ease;

  &:focus {
    border-color: #9a1b14;
    box-shadow: 0 0 10px rgba(154, 27, 20, 0.5);
  }
`;

const ReviewCard = styled.div`
  min-width: 300px;
  margin-right: 16px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.15);
  color: #333;
  overflow-y: hidden;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 6px 6px 20px rgba(0, 0, 0, 0.2);
    transform: translateY(-5px);
  }

  strong {
    font-size: 18px;
    color: #9a1b14;
  }

  p {
    font-size: 16px;
    margin-top: 5px;
  }
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ModalTitle = styled.h2`
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #9a1b14;
`;

const Avis = () => {
  const { user, fetchprofil } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const reviewData = useRef();

  const addReview = async (e) => {
    e.preventDefault();

    if (!user) {
      console.error("Utilisateur non authentifié");
      return;
    }

    const reviewRef = doc(db, 'reviews', user.email);
    try {
      const userData = await fetchprofil();
      const firstLetter = userData.nom_inscrit.charAt(0).toUpperCase();
      await setDoc(reviewRef, {
        userName: `${userData.prenom_inscrit} ${firstLetter}.`,
        review: `"${reviewData.current.value}"`
      });
      reviewData.current.value = '';
      setModalIsOpen(false);
      console.log("Avis ajouté avec succès");
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'avis :", error);
    }
  };

  const fetchAllReviews = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "reviews"));
      const reviews = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      console.log("Avis récupérés :", reviews);
      return reviews;
    } catch (error) {
      console.error("Erreur lors de la récupération des avis :", error);
    }
  };

  useEffect(() => {
    const getReviews = async () => {
      const fetchedReviews = await fetchAllReviews();
      setReviews(fetchedReviews);
    };
    getReviews();
  }, []);

  return (
    <div style={{ color: "#000000" }}>
      <h1>Les avis de nos abonnés</h1>
      <div style={{ display: 'flex', overflowX: 'auto', padding: '10px 0' }}>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <ReviewCard key={review.id}>
              <strong>{review.userName}</strong>
              <p>{review.review}</p>
            </ReviewCard>
          ))
        ) : (
          <p>Aucun avis disponible.</p>
        )}
      </div>
      {user && (
        <>
          <Button onClick={() => setModalIsOpen(true)}>Donner ton avis</Button>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            contentLabel="Formulaire d'avis"
            style={{
              content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                transform: 'translate(-50%, -50%)',
                width: '400px',
                padding: '20px',
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: "10px",
                backgroundColor: "#fff",
                boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)"
              },
            }}
          >
            <ModalTitle>Donne ton avis :</ModalTitle>
            <form onSubmit={addReview} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Textarea
                rows="4"
                ref={reviewData}
                placeholder="Écrivez votre avis ici"
                required
              />
              <Button type="submit">Envoyer</Button>
            </form>
          </Modal>
        </>
      )}
    </div>
  );
};

export default Avis;
