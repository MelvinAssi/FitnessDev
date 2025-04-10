import Newsletter from "./Newsletter";
import styled from "styled-components";


const FooterContainer = styled.footer`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const CopyrightStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000000;
  color: #ffffff;
  width: 100%;
  height: 50px;

  p {
    margin: 0;
    font-size: 14px;
    text-align: center;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <Newsletter />
      <CopyrightStyle>
        <p>Copyright © 2025 Tous droits réservés FitnessDev</p>
      </CopyrightStyle>
    </FooterContainer>
  );
};

export default Footer;
