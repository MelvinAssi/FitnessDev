import styled from 'styled-components';

const StyledHeader = styled.header`
  background-color: #f8f9fa;
  padding: 20px;
  text-align: center;
`;

const Header = () => {
  return <StyledHeader><h1>FitnessDev</h1></StyledHeader>;
};

export default Header;