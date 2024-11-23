import { useState } from "react";
import { useTranslation } from "react-i18next";
import '../styles/Header.css';

import header_logo from '../assets/home/logo1.png';
import header_language from '../assets/home/Globe.png';


const Header = () => {
    const { i18n } = useTranslation();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('한국어');
  
    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };
  
    const handleLanguageSelect = (language) => {
      const languageCode = language === "한국어" ? "ko" : "en"; // 언어 코드 설정
      setSelectedLanguage(language);
      setIsDropdownOpen(false);
      i18n.changeLanguage(languageCode); // 언어 변경
    };
  
    return (
      <header className="header">
        <div className="header-logo">
          <img src={header_logo} alt="문화 한상 로고" className="logo-image" />
        </div>
        <div className="header-language" onClick={toggleDropdown}>
          <img src={header_language} alt="Language Selector" className="language-icon" />
          <span className="language-text">{selectedLanguage}</span>
          {isDropdownOpen && (
            <div className="language-dropdown">
              <p onClick={() => handleLanguageSelect('한국어')}>한국어</p>
              <p onClick={() => handleLanguageSelect('English')}>English</p>
            </div>
          )}
        </div>
      </header>
    );
  };
  
  export default Header;