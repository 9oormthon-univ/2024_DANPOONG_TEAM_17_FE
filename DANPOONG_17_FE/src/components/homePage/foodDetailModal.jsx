import './foodDetailModal.css';
import PropTypes from "prop-types";
import { useNavigate } from 'react-router-dom';

const FoodDetailModal = ({ food, onClose }) => {
  const navigate = useNavigate();

  if (!food) {
    console.log("Food is null or undefined");
    return null
  }; // 음식 정보가 없으면 모달을 렌더링하지 않음

  const handleNearbyRestaurantsClick = async () => {
    const query = encodeURIComponent(food.name);
    const kakaoMapUrl = `https://map.kakao.com/?q=${query}`;
    window.open(kakaoMapUrl, "_blank");
  };

  const handleRecipeClick = () => {
    navigate(`/recipe/search/result?query=${encodeURIComponent(food.name)}`);
  };
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>X</button>
        <h2>{food.name}</h2>
        <p>{food.explanation}</p>
        <img src={food.imagePath} alt={food.name} className="food-image" />
        <div className="food-details">
          <h3>재료</h3>
          <p>{food.ingredients}</p>
        </div>
        <div className="modal-actions">
          <button className="action-button" onClick={handleNearbyRestaurantsClick}>근처 식당</button>
          <button className="action-button" onClick={handleRecipeClick}>레시피</button>
        </div>
      </div>
    </div>
  );
};

FoodDetailModal.propTypes = {
  food: PropTypes.shape({
    name: PropTypes.string.isRequired,
    explanation: PropTypes.string.isRequired,
    ingredients: PropTypes.string.isRequired,
  }),
  onClose: PropTypes.func.isRequired,
};

export default FoodDetailModal;