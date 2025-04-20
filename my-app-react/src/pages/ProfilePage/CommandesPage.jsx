import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../services/axios';
import styled from 'styled-components';

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

const OrdersContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const OrderBlock = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const OrderHeader = styled.div`
  background-color: #f5f5f5;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const OrderHeaderText = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #000000;
  margin: 0;
`;

const OrderProducts = styled.div`
  padding: 15px;
  display: flex;
  gap: 20px;
`;

const ProductItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ProductInfo = styled.div`
  flex: 1;
`;

const ProductName = styled.p`
  font-size: 14px;
  font-weight: bold;
  color: #000000;
  margin: 0;
`;

const ViewProductButton = styled.button`
  width: 120px;
  height: 30px;
  background-color: #9a1b14;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 12px;

  &:hover {
    background-color: #000000;
  }
`;

const NoOrdersMessage = styled.p`
  font-size: 16px;
  color: #000000;
`;

const CommandesPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/user/orders');
        setOrders(response.data.orders);
      } catch (error) {
        console.error('Erreur lors de la récupération des commandes:', error);
      }
    };
    fetchOrders();
  }, []);

  const handleViewProduct = (id_produit) => {
    // Redirection vers une page produit fictive
    navigate(`/produit/${id_produit}`);
  };

  return (
    <PageContainer>
      <ReturnButton onClick={() => navigate('/profil')}>Retour</ReturnButton>
      <Title>Mes Commandes</Title>
      {orders.length === 0 ? (
        <NoOrdersMessage>Aucune commande trouvée.</NoOrdersMessage>
      ) : (
        <OrdersContainer>
          {orders.map((order) => (
            <OrderBlock key={order.id_achat}>
              <OrderHeader>
                <OrderHeaderText>
                  Commande du {new Date(order.date_achat).toLocaleDateString('fr-FR')}
                </OrderHeaderText>
                <OrderHeaderText>TOTAL {(order.quantite_achat * order.prix_produit).toFixed(2)} EUR</OrderHeaderText>
                <OrderHeaderText>Commande numéro : {order.id_achat}</OrderHeaderText>
              </OrderHeader>
              <OrderProducts>
                <ProductItem>
                  <ProductInfo>
                    <ProductName>{order.nom_produit} (x{order.quantite_achat})</ProductName>
                  </ProductInfo>
                  <ViewProductButton onClick={() => handleViewProduct(order.id_produit)}>
                    Voir produit
                  </ViewProductButton>
                </ProductItem>
              </OrderProducts>
            </OrderBlock>
          ))}
        </OrdersContainer>
      )}
    </PageContainer>
  );
};

export default CommandesPage;