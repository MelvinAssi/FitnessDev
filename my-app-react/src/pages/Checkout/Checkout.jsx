import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { CartContext } from '../../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

//>>>>>> Styled Components
const CheckoutContainer = styled.div`
  background-color: #ffffff;
  min-height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 84px; // Offset for fixed header
`;

const SectionTitle = styled.h2`
  background-color: #000000;
  color: #ffffff;
  padding: 10px 20px;
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
  width: 100%;
  text-align: center;
  margin: 20px 0;
`;

const CartItemsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

const CartItemImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
`;

const ShippingOptionsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

const ShippingOption = styled.label`
  background-color: #f5f5f5;
  padding: 15px;
  border-radius: 8px;
  width: 200px;
  text-align: center;
  cursor: pointer;
  border: 2px solid ${({ checked }) => (checked ? '#000000' : '#cccccc')};
`;

const ShippingTitle = styled.h3`
  font-size: 16px;
  font-weight: bold;
  margin: 0 0 10px 0;
`;

const ShippingPrice = styled.p`
  font-size: 14px;
  font-weight: 600;
  margin: 0;
`;

const ShippingTime = styled.p`
  font-size: 12px;
  color: #666;
  margin: 5px 0 0 0;
`;

const RadioInput = styled.input`
  margin-right: 10px;
`;

const PaymentMethodsContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin-bottom: 20px;
`;

const PaymentOption = styled.label`
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #cccccc;
  cursor: pointer;
`;

const PaymentText = styled.span`
  font-size: 16px;
  font-weight: 500;
`;

const PaymentIcons = styled.div`
  display: flex;
  gap: 10px;
  margin: 10px 0;
`;

const PaymentIcon = styled.img`
  height: 30px;
`;

const TermsText = styled.p`
  font-size: 12px;
  color: #666;
  text-align: center;
  margin: 20px 0;
`;

const SummaryContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
`;

const TotalBox = styled.div`
  background-color: #000000;
  color: #ffffff;
  padding: 10px 20px;
  font-size: 18px;
  font-weight: bold;
  border-radius: 4px;
`;

const ValiderButton = styled.button`
  background-color: #ff0000;
  color: #ffffff;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #cc0000;
  }
`;
//>>>>>>

const Checkout = () => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const navigate = useNavigate();

  //>>>>>> State for shipping and payment
  const [selectedShipping, setSelectedShipping] = useState(null); // Track selected shipping option
  const [selectedPayment, setSelectedPayment] = useState(null); // Track selected payment method

  const shippingOptions = [
    { name: 'LIVRAISON STANDARD', price: 3.90, time: '9-11 jours ouvrés' },
    { name: 'LIVRAISON EXPRESS', price: 7.85, time: '5-7 jours ouvrés' },
    { name: 'LIVRAISON ÉCONOMIQUE', price: 1.99, time: '16-22 jours ouvrés' },
  ];

  const paymentMethods = [
    { name: 'Visa ****1269', value: 'visa' },
    { name: 'Coupon Limité', value: 'coupon' },
    { name: 'Apple Pay', value: 'apple-pay' },
  ];
  //>>>>>>

  //>>>>>> Calculate total sum
  const cartTotal = cartItems.reduce((total, item) => {
    return total + (item.price * (item.quantity || 1));
  }, 0);
  const shippingCost = selectedShipping ? selectedShipping.price : 0;
  const totalSum = cartTotal + shippingCost;
  //>>>>>>

  //>>>>>> Handle Valider button click
  const handleValidate = () => {
    if (!selectedShipping || !selectedPayment) {
      alert('Veuillez sélectionner une option de livraison et un mode de paiement.');
      return;
    }
    console.log('Order confirmed:', {
      cartItems,
      shipping: selectedShipping,
      payment: selectedPayment,
      total: totalSum,
    });
    // Optionally clear cart and redirect
    setCartItems([]);
    navigate('/'); // Redirect to homepage (adjust as needed)
  };
  //>>>>>>

  return (
    <CheckoutContainer>
      {/* Cart Items Section */}
      <SectionTitle>COMMANDES</SectionTitle>
      <CartItemsContainer>
        {cartItems.length === 0 ? (
          <p>Votre panier est vide.</p>
        ) : (
          cartItems.map((item) => (
            <CartItemImage
              key={item.id}
              src={item.image}
              alt={item.name}
              onError={(e) => {
                console.error('Failed to load image:', item.image);
                e.target.style.display = 'none';
              }}
            />
          ))
        )}
      </CartItemsContainer>

      {/* Shipping Options Section */}
      <SectionTitle>LIVRAISON</SectionTitle>
      <ShippingOptionsContainer>
        {shippingOptions.map((option) => (
          <ShippingOption
            key={option.name}
            checked={selectedShipping && selectedShipping.name === option.name}
          >
            <RadioInput
              type="radio"
              name="shipping"
              value={option.name}
              checked={selectedShipping && selectedShipping.name === option.name}
              onChange={() => setSelectedShipping(option)}
            />
            <ShippingTitle>{option.name}</ShippingTitle>
            <ShippingPrice>{option.price.toFixed(2)}€</ShippingPrice>
            <ShippingTime>({option.time})</ShippingTime>
          </ShippingOption>
        ))}
      </ShippingOptionsContainer>

      {/* Payment Methods Section */}
      <SectionTitle>MODE DE PAIEMENT</SectionTitle>
      <PaymentMethodsContainer>
        {paymentMethods.map((method) => (
          <PaymentOption key={method.value}>
            <RadioInput
              type="radio"
              name="payment"
              value={method.value}
              checked={selectedPayment && selectedPayment.value === method.value}
              onChange={() => setSelectedPayment(method)}
            />
            <PaymentText>{method.name}</PaymentText>
          </PaymentOption>
        ))}
      </PaymentMethodsContainer>

      {/* Payment Icons */}
      <PaymentIcons>
        <PaymentIcon src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" />
        <PaymentIcon src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png" alt="Mastercard" />
        <PaymentIcon src="https://upload.wikimedia.org/wikipedia/commons/1/16/Paypal_2014_logo.png" alt="Paypal" />
        <PaymentIcon src="https://upload.wikimedia.org/wikipedia/commons/7/71/Apple_Pay_logo.svg" alt="Apple Pay" />
      </PaymentIcons>

      {/* Terms and Conditions */}
      <TermsText>
        En passant cette commande, vous acceptez les{' '}
        <a href="#" style={{ color: '#000' }}>
          Conditions Générales
        </a>{' '}
        et la{' '}
        <a href="#" style={{ color: '#000' }}>
          Politique de Confidentialité
        </a>{' '}
        de Fitness Dev
      </TermsText>

      {/* Summary and Valider Button */}
      <SummaryContainer>
        <TotalBox>{totalSum.toFixed(2)}€</TotalBox>
        <ValiderButton onClick={handleValidate}>VALIDER</ValiderButton>
      </SummaryContainer>
    </CheckoutContainer>
  );
};

export default Checkout;