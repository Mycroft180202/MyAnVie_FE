import React from 'react';
import { useLanguage } from '../../store/LanguageContext';
import Logo from '../../assets/images/logo/myanvie-logo.png';
import SearchIcon from '../../assets/images/icon/search-icon.svg';
import CartIcon from '../../assets/images/icon/cart-icon.svg';
import VNFlag from '../../assets/images/icon/VNFlag.svg';
import UKFlag from '../../assets/images/icon/UKFlag.png';
import {
  HeaderContainer,
  LogoSection,
  LogoImg,
  BrandName,
  Navigation,
  NavLink,
  ActionSection,
  IconButton,
} from './Header.styles';
import Button from '../Button/Button';

const Header: React.FC = () => {
  const { t, setLanguage } = useLanguage();

  return (
    <HeaderContainer>
      <LogoSection>
        <LogoImg src={Logo} alt="MyAnVie Logo" />
        <BrandName>MYANVIE</BrandName>
      </LogoSection>

      <Navigation>
        <NavLink to="/" className="active">{t.home}</NavLink>
        <NavLink to="/about">{t.about}</NavLink>
        <NavLink to="/shop">{t.shop}</NavLink>
        <NavLink to="/news">{t.news}</NavLink>
        <NavLink to="/policy">{t.policy}</NavLink>
        <NavLink to="/contact">{t.contact}</NavLink>
      </Navigation>

      <ActionSection>
        <IconButton aria-label="Search">
          <img src={SearchIcon} alt="Search" />
        </IconButton>
        <IconButton aria-label="Cart">
          <img src={CartIcon} alt="Cart" />
        </IconButton>
        <Button>
          {t.login}
        </Button>
        <IconButton aria-label="Vietnam Flag" onClick={() => setLanguage('vi')}>
          <img src={VNFlag} alt="Vietnam Flag" style={{ width: '30px', height: '30px' }} />
        </IconButton>
        <IconButton aria-label="UK Flag" onClick={() => setLanguage('en')}>
          <img src={UKFlag} alt="UK Flag" style={{ width: '30px', height: '30px' }} />
        </IconButton>
      </ActionSection>
    </HeaderContainer>
  );
};

export default Header;