import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../store/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { categoryService, Category, SubCategory } from '../../services/categoryService';

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
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const [categoriesData, subCategoriesData] = await Promise.all([
          categoryService.getCategories(),
          categoryService.getSubCategories()
        ]);
        setCategories(categoriesData);
        setSubCategories(subCategoriesData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

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

  const getSubCategoriesForCategory = (categoryId: string) => {
    return subCategories.filter(sub => sub.categoryId === categoryId);
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
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/shop/${category.name.toLowerCase()}`}
                  className={styles.categoryLink}
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
        {user ? (
          <div className={styles.userMenu}>
            <button className={styles.iconButton} onClick={toggleUserMenu}>
              <img src={'/images/AboutUs/Nhật.jpg'} alt="User" className={styles.userAvatar} />
            </button>
            {isUserMenuOpen && (
              <div className={styles.userDropdown}>
                <Link to="/profile">Profile</Link>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <Button onClick={handleLoginClick}>Login</Button>
        )}
        <button className={styles.iconButton} onClick={() => setLanguage('vi')}>
          <img src={VNFlag} alt="Vietnamese" />
        </button>
        <button className={styles.iconButton} onClick={() => setLanguage('en')}>
          <img src={UKFlag} alt="English" />
        </button>
      </div>
    </header>
  );
};

export default Header;