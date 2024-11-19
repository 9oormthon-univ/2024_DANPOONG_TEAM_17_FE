import './FoodDetailModal.css';

const FoodDetailModal = ({ food, onClose }) => {
  if (!food) return null; // 음식 정보가 없으면 모달을 렌더링하지 않음

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>X</button>
        <h2>{food.name}</h2>
        <p>{food.description}</p>
        <img src={food.img} alt={food.name} className="food-image" />
        <div className="food-details">
          <h3>재료</h3>
          <p>{food.ingredients}</p>
        </div>
        <div className="modal-actions">
          <button className="action-button">근처 식당</button>
          <button className="action-button">레시피</button>
        </div>
      </div>
    </div>
  );
};

export default FoodDetailModal;