import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../store/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { categoryService } from '../../services/categoryService';
import { Category } from '../../types/category';

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
  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryService.getAllCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleCartClick = () =>{
    navigate('/cart');
  }

  const handleLogout = () => {
    logout();
    navigate('/');
    setUserMenuOpen(false);
  };

  const toggleShopDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    setShopDropdownOpen((prev) => !prev);
  };

  const toggleUserMenu = () => {
    setUserMenuOpen((prev) => !prev);
  };

  const handleCategoryClick = (categoryName: string) => {
    navigate(`/shop?category=${categoryName}`);
    setShopDropdownOpen(false);
  };

  return (
    <header className={styles.headerContainer}>
      {/* Logo */}
      <div className={styles.logoSection}>
        <Link to="/">
          <img src={Logo} alt="MyAnVie Logo" className={styles.logoImg} />
        </Link>
        <h1 className={styles.brandName}>MYANVIE</h1>
      </div>

      {/* Navigation */}
      <nav className={styles.navigation}>
        <Link to="/" className={styles.navLink}>{t.home}</Link>
        <Link to="/about" className={styles.navLink}>{t.about}</Link>

        {/* Dropdown shop */}
        <div className={styles.dropdownWrapper}>
          <Link to="/shop" className={styles.navLink} onClick={toggleShopDropdown}>{t.shop}</Link>
          {isShopDropdownOpen && (
            <div className={styles.dropdownMenu}>
              <Link to="/shop" onClick={() => setShopDropdownOpen(false)}>Tất cả sản phẩm</Link>
              {categories.map((category) => (
                <Link 
                  key={category.id}
                  to="/shop"
                  onClick={() => handleCategoryClick(category.name)}
                >
                  {category.name}
                </Link>
              ))}
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
                {user?.role === 1 && (
                  <Link to="/admin" onClick={() => setUserMenuOpen(false)}>
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