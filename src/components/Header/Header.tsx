import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../store/LanguageContext';
import { useAuth } from '../../context/AuthContext';

import Logo from '../../assets/images/logo/myanvie-logo.png';
import SearchIcon from '../../assets/images/icon/search-icon.svg';
import CartIcon from '../../assets/images/icon/cart-icon.svg';
import VNFlag from '../../assets/images/icon/VNFlag.svg';
import UKFlag from '../../assets/images/icon/UKFlag.png';

import Button from '../Button/Button';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const { t, setLanguage } = useLanguage();
  const { user, logout } = useAuth();
  const [isShopDropdownOpen, setShopDropdownOpen] = useState(false);
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleCartClick = () =>{
    navigate('/cart')
  }

  const handleLogout = () => {
    logout();
    navigate('/');
    setUserMenuOpen(false); // Đóng menu sau khi logout
  };

  const toggleShopDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    setShopDropdownOpen((prev) => !prev);
  };

  const toggleUserMenu = () => {
    setUserMenuOpen((prev) => !prev);
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
        <div className={styles.dropdownWrapper} onClick={toggleShopDropdown}>
          <button className={styles.navLink}>{t.shop}</button>
          {isShopDropdownOpen && (
            <div className={styles.dropdownMenu}>
              <Link to="/shop/pottery">{t.categories.ceramic}</Link>
              <Link to="/shop/silk">{t.categories.silk}</Link>
              <Link to="/shop/bamboo">{t.categories.bamboo}</Link>
            </div>
          )}
        </div>

        <Link to="/news" className={styles.navLink}>{t.news}</Link>
        <Link to="/contact" className={styles.navLink}>{t.contact}</Link>
      </nav>

      {/* Action buttons */}
      <div className={styles.actionSection}>
        <button className={styles.iconButton}>
          <img src={SearchIcon} alt="Search" />
        </button>
        <button className={styles.iconButton} onClick={handleCartClick}>
          <img src={CartIcon} alt="Cart" />
        </button>

        {/* Conditional rendering based on login status */}
        {user ? (
          <div className={styles.userMenuWrapper}>
            <img
              src={'/images/AboutUs/Nhật.jpg'}
              alt="User Avatar"
              className={styles.userAvatar}
              onClick={toggleUserMenu}
            />
            {isUserMenuOpen && (
              <div className={styles.userMenu}>
                <Link to="/profile" onClick={() => setUserMenuOpen(false)}>{t.userMenu.viewProfile}</Link>
                <Link to="/orders" onClick={() => setUserMenuOpen(false)}>{t.userMenu.viewOrders}</Link>
                {user?.role == 1 && (
                  <Link to="/admin" onClick={() => setUserMenuOpen(true)}>
                    {t.userMenu.admin}
                  </Link>
                )}
                <button type="button" onClick={handleLogout}>{t.userMenu.logout}</button>
              </div>
            )}
          </div>
        ) : (
          <Button onClick={handleLoginClick}>{t.login}</Button>
        )}

        <button className={styles.iconButton}>
          <img src={VNFlag} alt="Vietnam Flag" className={styles.flagIcon} onClick={() => setLanguage('vi')} />
        </button>
        <button className={styles.iconButton}>
          <img src={UKFlag} alt="UK Flag" className={styles.flagIcon} onClick={() => setLanguage('en')} />
        </button>
      </div>
    </header>
  );
};

export default Header;