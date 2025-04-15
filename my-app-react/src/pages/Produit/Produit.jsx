import React, { useState } from 'react';
import styled from 'styled-components';

// Import images from the asset folder
import fitness from "../../assets/images/fitness.webp";
import blue_hoodie from "../../assets/images/blue_hoodie.png";
import cut_offs from "../../assets/images/cut_offs.jpg";
import leggings_black from "../../assets/images/leggings_black.webp";

// Styled components
const MainContainer = styled.main`
  background-color: #333333;
  padding: 5%;
  min-height: 100vh;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 25px 16px; 
`;

const ProductCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px; 
  background-color: #333333; 
  border-radius: 8px; 
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  top: 20%;
      overflow: hidden;
  ::-webkit-scrollbar {
  display: none;
  }
`;

const StyledImg = styled.img`
  border-radius: 20px;
  width: 100%;
  height: 70%; 
  object-fit: cover; 
`;

const ContentWrapper = styled.div`
  padding: 8px; 
  margin-top: 5%; 
`;

const ProductName = styled.h3`
  font-size: 24px; 
  font-weight: 500; 
  color: #ffffff; 
`;

const ProductPrice = styled.p`
  font-size: 16px; 
  font-weight: 600; 
  color: #ffffff; 
  margin-top: 10%;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20%; 
`;

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ffffff;
  border-radius: 8px;
`;

const QuantityButton = styled.button`
  padding: 4px 10px; 
  background-color: transparent; 
  color: #ffffff; 
  border: 1px solid #ffffff;
  cursor: pointer;
`;

const QuantityText = styled.span`
  color: #ffffff; 
  padding: 2px 20px;
`;

const AddToCartButton = styled.button`
  padding: 4px 12px; 
  background-color: #2563eb; 
  color: #ffffff; 
  border-radius: 4px; /* */
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease; /* Equivalent to transition */
  &:hover {
    background-color: #1d4ed8; /* Equivalent to hover:bg-blue-700 */
  }
`;

const products = [
  { id: 1, name: "Leggings de femme - Black", price: 14.99, image: leggings_black },
  { id: 2, name: "Vest - Black", price: 14.99, image: fitness },
  { id: 3, name: "Leggings de femme - Black", price: 14.99, image: blue_hoodie },
  { id: 4, name: "Leggings de femme - Black", price: 14.99, image: cut_offs },
];

const ProductItem = ({ name, price, image }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    alert(`${name} (x${quantity}) added to cart!`);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <ProductCard>
      <StyledImg src={image} alt={name} />
      <ContentWrapper>
        <ProductName>{name}</ProductName>
        <ProductPrice>€{price.toFixed(2)}</ProductPrice>
        <ButtonContainer>
          <QuantityContainer>
            <QuantityButton onClick={decreaseQuantity}>-</QuantityButton>
            <QuantityText>{quantity}</QuantityText>
            <QuantityButton onClick={increaseQuantity}>+</QuantityButton>
          </QuantityContainer>
          <AddToCartButton onClick={handleAddToCart}>Add to Cart</AddToCartButton>
        </ButtonContainer>
      </ContentWrapper>
    </ProductCard>
  );
};

const Produit = () => {
  return (
    <MainContainer>
      <GridContainer>
        {products.map(product => (
          <ProductItem
            key={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
          />
        ))}
      </GridContainer>
    </MainContainer>
  );
};

export default Produit;