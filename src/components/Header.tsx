import React from 'react';

// Import images
import Logo from '../assets/images/myanvie-logo.png';
import SearchIcon from '../assets/images/search-icon.svg';
import CartIcon from '../assets/images/cart-icon.svg';

// Import styled components
import {
  HeaderContainer,
  LogoSection,
  LogoImg,
  BrandName,
  Navigation,
  NavLink,
  ActionSection,
  IconButton,
  LoginButton
} from '../assets/styles/Header.styles';

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <LogoSection>
        <LogoImg src={Logo} alt="MyAnVie Logo" />
        <BrandName>MYANVIE</BrandName>
      </LogoSection>

      <Navigation>
        <NavLink to="/" className="active">Trang chủ</NavLink>
        <NavLink to="/about">Về chúng tôi</NavLink>
        <NavLink to="/shop">Cửa hàng</NavLink>
        <NavLink to="/news">Tin tức</NavLink>
        <NavLink to="/policy">Chính sách</NavLink>
        <NavLink to="/contact">Liên hệ</NavLink>
      </Navigation>

      <ActionSection>
        <IconButton aria-label="Search">
          <img src={SearchIcon} alt="Search" />
        </IconButton>
        <IconButton aria-label="Cart">
          <img src={CartIcon} alt="Cart" />
        </IconButton>
        <LoginButton>Đăng nhập</LoginButton>
      </ActionSection>
    </HeaderContainer>
  );
};

export default Header;