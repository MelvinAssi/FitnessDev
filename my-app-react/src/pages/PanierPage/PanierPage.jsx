import React from 'react';
import styled from 'styled-components';

const PanierContainer = styled.div`
  padding: 20px;
  text-align: center;
`;

const PanierPage = () => {
  return (
    <PanierContainer>
      <h1>Mon Panier</h1>
      <p>Contenu du panier à venir...</p>
    </PanierContainer>
  );
};

export default PanierPage;