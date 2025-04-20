import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '../../services/axios';
import * as S from './ProfilePageStyles';

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [profile, setProfile] = useState(null);
  const [abonnement, setAbonnement] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/user/profil');
        setProfile(response.data.user);
      } catch (error) {
        console.error('Erreur profil:', error);
      }
    };

    const fetchAbonnement = async () => {
      try {
        const response = await axios.get('/user/abonnement/check');
        setAbonnement(response.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setAbonnement(null); // Aucun abonnement actif
        } else {
          console.error('Erreur abonnement:', error);
        }
      }
    };

    fetchProfile();
    fetchAbonnement();
  }, [location.state?.refresh]);

  const handleCancelAbonnement = async () => {
    try {
      await axios.put('/user/abonnement/cancel');
      setAbonnement(null);
      setShowPopup(false);
    } catch (error) {
      console.error('Erreur lors de l\'annulation de l\'abonnement:', error);
    }
  };

  const today = new Date().toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  if (!profile) return <div>Chargement...</div>;

  return (
    <>
      <S.Offset />
      <S.Main>
        <S.Container>
          <S.Title>PROFIL</S.Title>
          <S.GridContainer>
            <S.LargeBlock>
              <S.BlockTitle>INFORMATIONS PROFIL</S.BlockTitle>
              <S.InfoList>
                <S.InfoItem><strong>Email :</strong> {profile.email_inscrit}</S.InfoItem>
                <S.InfoItem><strong>Nom :</strong> {profile.nom_inscrit}</S.InfoItem>
                <S.InfoItem><strong>Prénom :</strong> {profile.prenom_inscrit}</S.InfoItem>
                <S.InfoItem><strong>Adresse :</strong> {profile.adresse_inscrit}</S.InfoItem>
                <S.InfoItem><strong>Téléphone :</strong> {profile.telephone_inscrit || 'Non renseigné'}</S.InfoItem>
                <S.InfoItem><strong>Type :</strong> {profile.type_inscrit || 'Non défini'}</S.InfoItem>
              </S.InfoList>
              <S.RedButton onClick={() => navigate('/profil/edit')}>MODIFIER</S.RedButton>
            </S.LargeBlock>

            <S.LargeBlock>
              <S.BlockTitle>ABONNEMENT ACTIF</S.BlockTitle>
              {abonnement ? (
                <S.InfoList>
                  <S.InfoItem><strong>Type :</strong> {abonnement.nom_type_abonnement}</S.InfoItem>
                  <S.InfoItem><strong>Durée :</strong> {abonnement.duree_abonnement} mois</S.InfoItem>
                  <S.InfoItem><strong>Début :</strong> {new Date(abonnement.datedebut_abonnement).toLocaleDateString()}</S.InfoItem>
                  <S.InfoItem><strong>Fin :</strong> {new Date(abonnement.datefin_abonnement).toLocaleDateString()}</S.InfoItem>
                </S.InfoList>
              ) : (
                <S.InfoList>
                  <S.InfoItem>Aucun abonnement actif</S.InfoItem>
                </S.InfoList>
              )}
              <S.RedButton
                onClick={() => setShowPopup(true)}
                disabled={!abonnement}
              >
                MODIFIER
              </S.RedButton>
            </S.LargeBlock>
          </S.GridContainer>

          <S.SmallGridContainer>
            <S.SmallBlock>
              <S.BlockTitle>HISTORIQUE ACHATS</S.BlockTitle>
              <S.RedButton onClick={() => navigate('/commandes')}>VOIR</S.RedButton> {/* MODIFICATION: Navigation vers /commandes */}
            </S.SmallBlock>

            <S.SmallBlock>
              <S.BlockTitle>COURS INSCRITS</S.BlockTitle>
              <S.RedButton onClick={() => navigate('/courses-inscrits')}>VOIR</S.RedButton>
            </S.SmallBlock>
          </S.SmallGridContainer>

          {showPopup && (
            <S.Overlay>
              <S.Popup>
                <S.PopupTitle>ANNULER ABONNEMENT</S.PopupTitle>
                <S.PopupText>Après Confirmation, votre abonnement prendra fin le {today}</S.PopupText>
                <S.ButtonContainer>
                  <S.RedButton onClick={handleCancelAbonnement}>ANNULER</S.RedButton>
                  <S.GrayButton onClick={() => setShowPopup(false)}>FERMER</S.GrayButton>
                </S.ButtonContainer>
              </S.Popup>
            </S.Overlay>
          )}
        </S.Container>
      </S.Main>
    </>
  );
};

export default ProfilePage;