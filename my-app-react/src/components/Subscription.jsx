import React,{useEffect,useState,useContext} from "react";
import styled from "styled-components";
import axios from "../services/axios.js";
import { AuthContext } from "../contexts/AuthContext.jsx";



const Container = styled.div`
  background-color: white;
  width: 100%;
  max-width: 350px;
  min-height: 400px;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 15px;
  margin: 0 auto;

  @media (max-width: 480px) {
    padding: 15px;
    max-width: 100%;
  }
`;

const Title = styled.h1`
  color: #ae2119;
  font-size: 48px;
  text-decoration: underline;
`;

const PriceBox = styled.div`
  display: flex;
  justify-content: start;
  align-items: flex-end;
  gap: 5px;
`;

const Price = styled.h1`
  font-size: 32px;
  color: #000000;
`;

const Sub = styled.h2`
  font-size: 16px;
  font-weight: normal;
`;

const Monthly = styled.h2`
  margin-top: 10px;
  color: #000000;
`;

const Details = styled.p`
  font-size: 14px;
  color: #000000;
  margin: 20px 0;
`;

const Options = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 40px;
`;

const OptionItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  img {
    width: 30px;
    height: 30px;
  }

  span {
    font-size: 14px;
  }
`;

const SelectButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'isButtonDisabled'})`
  margin-top: 20px;
  padding: 10px 20px;  
  background-color: ${({ isButtonDisabled }) => (isButtonDisabled ? '#ccc' : '#000')};
  color: ${({ isButtonDisabled }) => (isButtonDisabled ? '#888' : 'white')};
  border: none;
  border-radius: 6px;
  cursor: ${({ isButtonDisabled }) => (isButtonDisabled ? 'not-allowed' : 'pointer')};
  
  &:hover {
    background-color: ${({ isButtonDisabled }) => (isButtonDisabled ? '#ccc' : '#ae2119')};
  }
`;


const Subscription = ({ name, price, list }) => {
    const {user} = useContext(AuthContext);
    const [price4s, setPrice4s] = useState(null);
    const [id, setID] = useState(null);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);  

    useEffect(() => { 
      axios.get('/type_abonnement', {
        params: {
          nom: name
        }
      })
      .then(response => {
        setPrice4s(response.data[0].prix_4_semaines);
        setID(response.data[0].id_type_abonnement);
      })
      .catch(error => {
        console.error(error);
      });

    }, []);
    useEffect(()=>{
      
      if (user) {
        
        axios.get('/user/abonnement/check')
        .then(response => {
          console.log('Check Abonnement:', response.data.id_type_abonnement);
          if(response.data.id_type_abonnement==id){
            setIsButtonDisabled(true);
          }

        })
        .catch(error => {
          //console.error('Erreur check abonnement:', error);
        });
      }  
    }, [user]);

  const handleClick = () =>{
    
  } 
  return (
    <Container>
      <Title>{name}</Title>
      <PriceBox>
        <Price>{price4s/4}€</Price>
        <Sub>/SEMAINE</Sub>
      </PriceBox>
      <Monthly>Soit {price4s}€/4 SEMAINES</Monthly>
      <Details>
        *Soit un prélèvement de {price4s}€ toutes les 4 semaines. Hors frais
        d’inscription de 50€ et hors 10€/an pour la garantie matériel.
        Abonnement sans engagement annuel avec 8 semaines de préavis.
        Abonnement donnant accès aux activités en libre-service.
      </Details>

      <Options>
        {list.map((item, index) => (
          <OptionItem key={index}>
            <img src={item.img} alt={item.name} />
            <span>{item.name}</span>
          </OptionItem>
        ))}
      </Options>

      <SelectButton isButtonDisabled={isButtonDisabled} disabled={isButtonDisabled} onClick={handleClick()}>
        {isButtonDisabled ? 'ACTIF' : 'SELECTIONNER'}
      </SelectButton>
    </Container>
  );
};

export default Subscription;
