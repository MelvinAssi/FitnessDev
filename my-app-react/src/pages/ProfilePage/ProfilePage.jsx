import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext'; // NOUVEAU: Chemin adapté pour contexts
import axios from '../../services/axios'; // NOUVEAU: Chemin adapté pour services

const ProfilePage = () => {
    const { user } = useContext(AuthContext);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('/user/profil');
                setProfile(response.data.user);
            } catch (error) {
                console.error('Erreur profil:', error);
            }
        };
        fetchProfile();
    }, []);

    if (!profile) return <div>Chargement...</div>;

    return (
        <div>
            <h1>Profil</h1>
            <p>Email: {profile.email_inscrit}</p>
            <p>Nom: {profile.nom_inscrit}</p>
            <p>Prénom: {profile.prenom_inscrit}</p>
            <p>Adresse: {profile.adresse_inscrit}</p>
            <p>Téléphone: {profile.telephone_inscrit}</p>
            <p>Type: {profile.type_inscrit}</p>
        </div>
    );
};

export default ProfilePage;
// NOUVEAU: Créé pour afficher les informations de l’utilisateur connecté