import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/Footer.css';

import homeIcon from '../assets/navi_bar/home.png';
import recipeIcon from '../assets/navi_bar/recipe.png';
import commuIcon from '../assets/navi_bar/community.png';
import myIcon from '../assets/navi_bar/my.png';

function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: '홈', path: '/', icon: homeIcon },
    { name: '레시피', path: '/recipe', icon: recipeIcon },
    { name: '커뮤니티', path: '/community', icon: commuIcon },
    { name: '마이', path: '/my', icon: myIcon },
  ];

  return (
    <footer className="footer">
      {menuItems.map((item) => (
        <div
          key={item.name}
          className={`footer-icon ${location.pathname === item.path ? 'active' : ''}`}
          onClick={() => navigate(item.path)}
        >
          <img src={item.icon} alt={item.name} />
          <p>{item.name}</p>
        </div>
      ))}
    </footer>
  );
}

export default Footer;