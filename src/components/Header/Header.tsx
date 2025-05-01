import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../store/LanguageContext';

import Logo from '../../assets/images/logo/myanvie-logo.png';
import SearchIcon from '../../assets/images/icon/search-icon.svg';
import CartIcon from '../../assets/images/icon/cart-icon.svg';
import VNFlag from '../../assets/images/icon/VNFlag.svg';
import UKFlag from '../../assets/images/icon/UKFlag.png';

import Button from '../Button/Button';
import styles from './Header.module.css'

const Header: React.FC = () => {
  const { t, setLanguage } = useLanguage();
  const [isShopDropdownOpen, setShopDropdownOpen] = useState(false);
  const [isPolicyDropdownOpen, setPolicyDropdownOpen] = useState(false);

  const toggleShopDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    setShopDropdownOpen((prev) => !prev);
    setPolicyDropdownOpen(false); // Đóng dropdown kia nếu đang mở
  };
  
  const togglePolicyDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    setPolicyDropdownOpen((prev) => !prev);
    setShopDropdownOpen(false);
  };

  return (
    <header className={styles.headerContainer}>
      {/* Logo */}
      <div className={styles.logoSection}>
        <img src={Logo} alt="MyAnVie Logo" className={styles.logoImg} />
        <h1 className={styles.brandName}>MYANVIE</h1>
      </div>

      {/* Navigation */}
      <nav className={styles.navigation}>
        <Link to="/" className={`${styles.navLink} active`}>{t.home}</Link>
        <Link to="/about" className={styles.navLink}>{t.about}</Link>

        {/* Dropdown shop */}
        <div
          className={styles.dropdownWrapper}
          onClick={toggleShopDropdown}
        >
          <a href="#" className={styles.navLink}>{t.shop}</a>
          {isShopDropdownOpen && (
            <div className={styles.dropdownMenu}>
              <Link to="/shop/pottery">{t.categories.ceramic}</Link>
              <Link to="/shop/silk">{t.categories.silk}</Link>
              <Link to="/shop/bamboo">{t.categories.bamboo}</Link>
            </div>
          )}
        </div>

        <Link to="/news" className={styles.navLink}>{t.news}</Link>

        <div
          className={styles.dropdownWrapper}
          onClick={togglePolicyDropdown}
        >
          <Link to="#" className={styles.navLink}>{t.policy}</Link>
          {isPolicyDropdownOpen && (
            <div className={styles.dropdownMenu}>
              <Link to="/policy/return">{t.policies.return}</Link>
              <Link to="/policy/shipping">{t.policies.shipping}</Link>
              <Link to="/policy/warranty">{t.policies.warranty}</Link>
            </div>
          )}
        </div>
        <Link to="/contact" className={styles.navLink}>{t.contact}</Link>
      </nav>

      {/* Action buttons */}
      <div className={styles.actionSection}>
        <button className={styles.iconButton}>
          <img src={SearchIcon} alt="Search" />
        </button>
        <button className={styles.iconButton}>
          <img src={CartIcon} alt="Cart" />
        </button>
        <Button>{t.login}</Button>
        <button className={styles.iconButton} onClick={() => setLanguage('vi')}>
          <img src={VNFlag} alt="Vietnam Flag" style={{ width: '30px', height: '30px' }} />
        </button>
        <button className={styles.iconButton} onClick={() => setLanguage('en')}>
          <img src={UKFlag} alt="UK Flag" style={{ width: '30px', height: '30px' }} />
        </button>
      </div>
    </header>
  );
};

export default Header;
