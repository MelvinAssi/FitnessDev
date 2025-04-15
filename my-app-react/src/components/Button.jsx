import styled from 'styled-components';

const StyledButton = styled.button`

  background-color: #9a1b14;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 12px;
  width: ${({ width }) => width || 'auto'};
  height: ${({ height }) => height || 'auto'};

  &:hover {
    background-color: #000000;
  }
`;

const Button = ({ text,width,height,onClick }) => {
  return <StyledButton onClick={onClick} width={width} height={height}>{text}</StyledButton>;
};

export default Button;