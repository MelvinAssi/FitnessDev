import React, { useState } from 'react';
import styled from 'styled-components';

//>>>>>> Styled Components
const PaiementContainer = styled.div`
  background-color: #000000;
  min-height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormSection = styled.div`
  width: 100%;
  max-width: 600px;
  margin-bottom: 20px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

const Label = styled.label`
  color: #ffffff;
  font-size: 14px;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  background-color: #ffffff;
  color: #000000;
  width: 100%;
  box-sizing: border-box;

  &::placeholder {
    color: #999;
  }
`;

const InputRow = styled.div`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
`;

const InputHalf = styled(Input)`
  flex: 1;
  min-width: 150px;
`;

const ErrorMessage = styled.span`
  color: #ff0000;
  font-size: 12px;
  margin-top: 5px;
`;

const Divider = styled.hr`
  width: 100%;
  max-width: 600px;
  border: none;
  border-top: 2px solid #333333;
  margin: 20px 0;
`;

const VisaLogo = styled.img`
  height: 30px;
  margin-bottom: 10px;
`;

const SubmitButton = styled.button`
  background-color: #ff0000;
  color: #ffffff;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #cc0000;
  }
`;
//>>>>>>

const Paiement = () => {
  //>>>>>> State for form inputs and errors
  const [formData, setFormData] = useState({
    addressLine1: '',
    city: '',
    postalCode: '',
    region: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const [errors, setErrors] = useState({});
  //>>>>>>

  //>>>>>> Regex patterns for validation
  const regexPatterns = {
    addressLine1: /.+/, // Must not be empty
    city: /^[A-Za-z\s]+$/, // Letters and spaces only
    postalCode: /^\d{5}$/, // 5 digits (French postal code)
    region: /^[A-Za-z\s]+$/, // Letters and spaces only
    cardNumber: /^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/, // 16 digits, optional spaces every 4 digits
    expiryDate: /^(0[1-9]|1[0-2])\/\d{4}$/, // MM/YYYY format
    cvv: /^\d{3,4}$/, // 3 or 4 digits
  };
  //>>>>>>

  //>>>>>> Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  //>>>>>>

  //>>>>>> Validate form on submit
  const validateForm = () => {
    const newErrors = {};

    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = 'Ce champ est requis';
      } else if (!regexPatterns[key].test(formData[key])) {
        switch (key) {
          case 'city':
          case 'region':
            newErrors[key] = 'Seules les lettres et les espaces sont autorisés';
            break;
          case 'postalCode':
            newErrors[key] = 'Le code postal doit contenir 5 chiffres';
            break;
          case 'cardNumber':
            newErrors[key] = 'Le numéro de carte doit contenir 16 chiffres';
            break;
          case 'expiryDate':
            newErrors[key] = 'La date doit être au format MM/YYYY';
            break;
          case 'cvv':
            newErrors[key] = 'Le CVV doit contenir 3 ou 4 chiffres';
            break;
          default:
            newErrors[key] = 'Format invalide';
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  //>>>>>>

  //>>>>>> Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted successfully:', formData);
      // Add future payment processing logic here
    } else {
      console.log('Form validation failed:', errors);
    }
  };
  //>>>>>>

  return (
    <PaiementContainer>
      {/* Shipping Address Section */}
      <FormSection>
        <InputWrapper>
          <Label>Adresse ligne 1*</Label>
          <Input
            type="text"
            name="addressLine1"
            value={formData.addressLine1}
            onChange={handleChange}
            placeholder="Adresse ligne 1*"
          />
          {errors.addressLine1 && <ErrorMessage>{errors.addressLine1}</ErrorMessage>}
        </InputWrapper>

        <InputWrapper>
          <Label>Ville*</Label>
          <Input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Ville*"
          />
          {errors.city && <ErrorMessage>{errors.city}</ErrorMessage>}
        </InputWrapper>

        <InputRow>
          <InputWrapper>
            <Label>Code postal*</Label>
            <InputHalf
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              placeholder="Code postal*"
            />
            {errors.postalCode && <ErrorMessage>{errors.postalCode}</ErrorMessage>}
          </InputWrapper>

          <InputWrapper>
            <Label>Région*</Label>
            <InputHalf
              type="text"
              name="region"
              value={formData.region}
              onChange={handleChange}
              placeholder="Région*"
            />
            {errors.region && <ErrorMessage>{errors.region}</ErrorMessage>}
          </InputWrapper>
        </InputRow>
      </FormSection>

      {/* Divider */}
      <Divider />

      {/* Payment Information Section */}
      <FormSection>
        <VisaLogo
          src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
          alt="Visa"
        />
        <InputWrapper>
          <Label>Numéro de carte*</Label>
          <Input
            type="text"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            placeholder="0000 0000 0000 0000"
          />
          {errors.cardNumber && <ErrorMessage>{errors.cardNumber}</ErrorMessage>}
        </InputWrapper>

        <InputRow>
          <InputWrapper>
            <Label>Date d'expiration*</Label>
            <InputHalf
              type="text"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              placeholder="00/0000"
            />
            {errors.expiryDate && <ErrorMessage>{errors.expiryDate}</ErrorMessage>}
          </InputWrapper>

          <InputWrapper>
            <Label>CVV*</Label>
            <InputHalf
              type="text"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              placeholder="3-4 chiffres"
            />
            {errors.cvv && <ErrorMessage>{errors.cvv}</ErrorMessage>}
          </InputWrapper>
        </InputRow>
      </FormSection>

      {/* Submit Button */}
      <SubmitButton onClick={handleSubmit}>VALIDER</SubmitButton>
    </PaiementContainer>
  );
};

export default Paiement;