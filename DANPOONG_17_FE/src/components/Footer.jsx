import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/Footer.css';

import homeIcon from '../assets/navi_bar/home.png';
import recipeIcon from '../assets/navi_bar/recipe.png';
import commuIcon from '../assets/navi_bar/community.png';
import myIcon from '../assets/navi_bar/my.png';
import homeIconOn from '../assets/navi_bar/home_on.png';
import recipeIconOn from '../assets/navi_bar/recipe_on.png';
import commuIconOn from '../assets/navi_bar/community_on.png';
import myIconOn from '../assets/navi_bar/my_on.png';

function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: '홈', path: '/', icon: homeIcon, activeIcon: homeIconOn },
    { name: '레시피', path: '/recipe', icon: recipeIcon, activeIcon: recipeIconOn },
    { name: '커뮤니티', path: '/community', icon: commuIcon, activeIcon: commuIconOn },
    { name: '마이', path: '/my', icon: myIcon, activeIcon: myIconOn },
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