import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: #950B0B;
  color: #FFFFFF;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.171875em;
  letter-spacing: 5%;
  border: none;
  border-radius: 100px;
  padding: 10px 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #7e0a0a;
  }
  
  &.outline {
    background-color: #fff; /* Nền trắng */
    color: #000; /* Chữ đen */
    border: 1px solid #000; /* Viền đen */

    &:hover {
      background-color: #f0f0f0; /* Nền xám nhạt khi hover */
    }

  &:disabled {
    background-color: #d3d3d3;
    cursor: not-allowed;
  }
`;

export default StyledButton;