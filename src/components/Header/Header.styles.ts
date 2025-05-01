import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 4rem;
  background: #FFFFFF; /* Change background to white */
  backdrop-filter: blur(50px);
`;

export const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1; /* Allow space for navigation to align left */
`;

export const LogoImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 40px;
`;

export const BrandName = styled.h1`
  font-family: 'TH Hoaico 2', sans-serif;
  font-size: 18px;
  font-weight: 400;
  letter-spacing: 0.1em; /* Increase letter spacing */
  color: #950B0B;
`;

export const Navigation = styled.nav`
  display: flex;
  align-items: center;
  gap: 24px;
  flex: 6; /* Push navigation closer to the logo */
`;

export const NavLink = styled(Link)`
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 5%;
  color: #000000;
  text-decoration: none;
  transition: color 0.3s;

  &:hover {
    color: #950B0B;
  }

  &.active {
    color: #950B0B;
  }
`;

export const ActionSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 24px;
    height: 24px;
  }
`;

export const LoginButton = styled.button`
  background-color: #950B0B;
  color: #FFFFFF;
  border: none;
  border-radius: 100px;
  padding: 10px 24px;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 5%;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #7a0909;
  }
    `;