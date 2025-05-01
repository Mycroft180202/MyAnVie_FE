import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import ChatPopup from './components/ChatPopup/ChatPopup';
import Footer from './components/Footer/Footer';
import HomePage from './pages/Home/HomePage';
import { LanguageProvider } from './store/LanguageContext';
import AboutUsPage from './pages/AboutUs/AboutUs';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <div className="App">
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutUsPage />} />
          </Routes>
          <Footer />
        </Router>
        <ChatPopup />
      </div>
    </LanguageProvider>
  );
};

export default App;