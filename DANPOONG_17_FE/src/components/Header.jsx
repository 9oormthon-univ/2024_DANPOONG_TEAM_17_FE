import { useState } from "react";
import '../styles/Header.css';

import header_logo from '../assets/home/logo1.png';
import header_language from '../assets/home/Globe.png';


const Header = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('한국어');
  
    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };
  
    const handleLanguageSelect = (language) => {
      setSelectedLanguage(language);
      setIsDropdownOpen(false);
      // 추후 다국어 라이브러리와 연동하여 언어를 변경하는 로직을 추가
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
              <p onClick={() => handleLanguageSelect('中文')}>中文</p>
              <p onClick={() => handleLanguageSelect('日本語')}>日本語</p>
            </div>
          )}
        </div>
      </header>
    );
  };
  
  export default Header;