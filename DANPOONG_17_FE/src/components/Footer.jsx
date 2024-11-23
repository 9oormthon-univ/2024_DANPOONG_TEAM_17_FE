import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/Footer.css';
import { useTranslation } from "react-i18next";

import homeIcon from '../assets/navi_bar/home.png';
import recipeIcon from '../assets/navi_bar/recipe.png';
import commuIcon from '../assets/navi_bar/community.png';
import myIcon from '../assets/navi_bar/my.png';
import homeIconOn from '../assets/navi_bar/home_on.png';
import recipeIconOn from '../assets/navi_bar/recipe_on.png';
import commuIconOn from '../assets/navi_bar/community_on.png';
import myIconOn from '../assets/navi_bar/my_on.png';

function Footer() {
  const { t } = useTranslation(); // 번역 함수 가져오기
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: t("Footer.home_navi_name"), path: '/', icon: homeIcon, activeIcon: homeIconOn },
    { name: t("Footer.recipe_navi_name"), path: '/recipe', icon: recipeIcon, activeIcon: recipeIconOn },
    { name: t("Footer.commu_navi_name"), path: '/community', icon: commuIcon, activeIcon: commuIconOn },
    { name: t("Footer.my_navi_name"), path: '/my', icon: myIcon, activeIcon: myIconOn },
  ];

  return (
    <footer className="footer">
      {menuItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
            <div
                key={item.name}
                className={`footer-icon ${isActive ? 'active' : ''}`}
                onClick={() => navigate(item.path)}
            >
                <img src={isActive ? item.activeIcon : item.icon} alt={item.name} />
                <p>{item.name}</p>
            </div>
        );
    })}
    </footer>
  );
}

export default Footer;