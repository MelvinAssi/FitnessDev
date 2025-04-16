import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { CartContext } from '../../contexts/CartContext';

// Styled components for Panier page
const PanierContainer = styled.div`
  background-color: #ffffff;
  padding: 20px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 15%;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 15px;
`;

const ItemDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const ItemTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
`;

const ItemDescription = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
  line-height: 1.4;
`;

const ItemPrice = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0;
`;

const DecorativeBar = styled.div`
  width: 50px;
  height: 8px;
  background-color: #d3d3d3;
  border-radius: 4px;
  margin: 5px 0;
`;

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
`;

const QuantityButton = styled.button`
  padding: 5px 10px;
  background-color: #f0f0f0;
  color: #333;
  border: none;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: #e0e0e0;
  }
`;

const QuantityText = styled.span`
  padding: 5px 15px;
  color: #333;
  font-size: 16px;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
`;

const EmptyBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

const AddIcon = styled.div`
  font-size: 40px;
  color: #666;
`;

const SummarySection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: #d3d3d3;
  border-radius: 8px;
`;

const ThinLine = styled.hr`
  border: none;
  border-top: 1px solid #d3d3d3;
  margin: 20px 0;
`;

const TotalText = styled.p`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
`;

const ValiderButton = styled.button`
  background-color: #000000;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
`;

const ValiderText = styled.span`
  color: #ff0000;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
`;

const Panier = () => {
  const { cartItems, addToCart } = useContext(CartContext) || { cartItems: [], addToCart: () => {} };
  const navigate = useNavigate();

  // Debugging
  useEffect(() => {
    console.log('Panier - Cart Items:', cartItems);
  }, [cartItems]);

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      // Remove the item from the cart if quantity is less than 1
      const updatedItems = cartItems.filter((item) => item.id !== itemId);
      addToCart(updatedItems);
    } else {
      // Update the cart item quantity
      const updatedItems = cartItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );
      addToCart(updatedItems);
    }
  };

  const handleAddMoreItems = () => {
    console.log('Navigating to Produit page');
    navigate('/produit', { replace: false }); // Correct navigation to /produit
  };

  const handleValidate = () => {
    console.log('Valider button clicked');
    // Add validation logic here (e.g., navigate to checkout, save cart, etc.)
  };

  // Calculate total sum
  const totalSum = cartItems.reduce((total, item) => {
    return total + (item.price * (item.quantity || 1));
  }, 0);

  // Ensure cartItems is an array
  if (!Array.isArray(cartItems)) {
    console.error('cartItems is not an array:', cartItems);
    return (
      <PanierContainer>
        <p style={{ textAlign: 'center', color: '#666' }}>
          Une erreur s'est produite. Veuillez réessayer.
        </p>
        <EmptyBlock onClick={handleAddMoreItems}>
          <AddIcon>+</AddIcon>
        </EmptyBlock>
      </PanierContainer>
    );
  }

  console.log('Rendering Panier page'); // Debugging
  return (
    <PanierContainer>
      {cartItems.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#666' }}>Votre panier est vide.</p>
      ) : (
        cartItems.map((item) => {
          if (!item || !item.id || !item.name || !item.image) {
            console.warn('Invalid cart item:', item);
            return null;
          }
          return (
            <CartItem key={item.id}>
              <ItemImage src={item.image} alt={item.name} onError={(e) => {
                console.error('Failed to load image:', item.image);
                e.target.style.display = 'none'; // Hide broken image
              }} />
              <ItemDetails>
                <ItemTitle>{item.name}</ItemTitle>
                <ItemDescription>
                  {item.name === "Leggings de femme - Black" &&
                    "Notre collection Tech revient à l'essentiel, avec une coupe décontractée et un style décoratif et contrasté."}
                  {item.name === "Gilet zippé Code - Noir" &&
                    "Notre shaker pour compléments alimentaires vous aide à rester hydraté tout au long de la journée, et la boule de mélange a été conçue pour vous offrir un shake lisse quel que soit le complément que vous mélangez."}
                  {item.name === "Pull à capuche Strike - Bleu marine" &&
                    "Nos manchons de compression en néoprène peuvent aider à réduire les tensions, les douleurs et l'inconfort au niveau du genou sans limiter l'amplitude de vos mouvements."}
                  {item.name === "Coupe de compression Apex - Rouge" &&
                    "Nos manchons de compression en néoprène peuvent aider à réduire les tensions, les douleurs et l'inconfort au niveau du genou sans limiter l'amplitude de vos mouvements."}
                </ItemDescription>
                <DecorativeBar />
                <ItemPrice>€{(item.price * (item.quantity || 1)).toFixed(2)}</ItemPrice>
              </ItemDetails>
              <QuantityContainer>
                <QuantityButton
                  onClick={() => handleQuantityChange(item.id, (item.quantity || 1) - 1)}
                >
                  -
                </QuantityButton>
                <QuantityText>{item.quantity || 1}</QuantityText>
                <QuantityButton
                  onClick={() => handleQuantityChange(item.id, (item.quantity || 1) + 1)}
                >
                  +
                </QuantityButton>
              </QuantityContainer>
            </CartItem>
          );
        })
      )}
      <EmptyBlock onClick={handleAddMoreItems}>
        <AddIcon>+</AddIcon>
      </EmptyBlock>
      <ThinLine />
      <SummarySection>
        <TotalText>Total: €{totalSum.toFixed(2)}</TotalText>
        <ValiderButton onClick={handleValidate}>
          <ValiderText>VALIDER</ValiderText>
        </ValiderButton>
      </SummarySection>
      <ThinLine />
    </PanierContainer>
  );
};

export default Panier;