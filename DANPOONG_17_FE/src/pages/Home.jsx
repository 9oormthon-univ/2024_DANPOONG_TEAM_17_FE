import { useState, useEffect } from 'react';
import Header from '../components/Header';
import '../styles/HomePage.css';
import FoodDetailModal from '../components/homePage/foodDetailModal';
import HomeHeader from '../components/homePage/homeHeader';

import dummy_img from '../assets/dummy/계란찜.jpg';
import cameraIcon from '../assets/home/camera2.png';

export const Home = () => {
  const [foods, setFoods] = useState([]); // 음식 리스트 상태
  const [selectedFood, setSelectedFood] = useState(null); // 선택된 음식 상태
  const [filteredFoods, setFilteredFoods] = useState([]); // 필터링된 음식 리스트 상태
  const [selectedIngredients, setSelectedIngredients] = useState([]); // 선택된 음식 상태

  // 더미 데이터
  const dummyData = [
    { id: 1, name: '계란찜', img: dummy_img, description: '부드럽고 맛있는 계란찜', ingredients: '달걀, 물, 소금' },
    { id: 2, name: '계란찜', img: dummy_img, description: '부드럽고 맛있는 계란찜', ingredients: '달걀, 물, 소금' },
    { id: 3, name: '계란찜', img: dummy_img, description: '부드럽고 맛있는 계란찜', ingredients: '달걀, 물, 소금' },
    { id: 4, name: '계란찜', img: dummy_img, description: '부드럽고 맛있는 계란찜', ingredients: '달걀, 물, 소금' },
  ];

  useEffect(() => {
    // 현재는 더미 데이터를 사용
    setFoods(dummyData);
    setFilteredFoods(dummyData);
  }, []);

  // 재료 버튼 클릭 핸들러
  const handleIngredientClick = (ingredient) => {
    setSelectedIngredients((prev) => {
      if (prev.includes(ingredient)) {
        return prev.filter((item) => item !== ingredient); // 이미 선택된 재료는 제거
      } else {
        return [...prev, ingredient]; // 새로 선택된 재료는 추가
      }
    });
  };

  useEffect(() => {
    if (!foods || !Array.isArray(foods)) {
      setFilteredFoods([]); // foods가 유효하지 않으면 빈 배열로 설정
      return;
    }
  
    const newFilteredFoods = foods.filter((food) => {
      if (!food || typeof food !== "object") return false; // food가 객체가 아닌 경우 제외
      const foodIngredients = typeof food.ingredients === "string" ? food.ingredients : ""; // ingredients 기본값 설정
      return !selectedIngredients.some((ingredient) =>
        foodIngredients.includes(ingredient)
      );
    });
  
    setFilteredFoods(newFilteredFoods);
  }, [selectedIngredients, foods]);

  return (
    <div className="home">
      <Header />
      <HomeHeader />
      <main className="home-content">

        <section className="food-recommendation">
          <h2>미르미님을 위한 오늘의 음식 추천</h2>
          <p>제외하고 싶은 재료를 아래에서 선택해보세요</p>
          <div className="filter-buttons">
            {["소고기", "돼지고기", "닭고기", "해산물", "달걀", "우유"].map((ingredient) => (
              <button
                key={ingredient}
                onClick={() => handleIngredientClick(ingredient)}
                className={`filter-button ${
                  selectedIngredients.includes(ingredient) ? "active" : ""
                }`}
                >
                {ingredient}
              </button>
            ))}
          </div>

          
          <div className="food-list">
            {filteredFoods.length > 0 ? (
              filteredFoods.map((food) => (
                <div
                  key={food.id}
                  className="food-item"
                  onClick={() => setSelectedFood(food)}
                >
                  <img src={food.img} alt={food.name} />
                  <p>{food.name}</p>
                </div>
              ))
            ) : (
              <p>추천할 음식이 없습니다.</p> // 필터링된 결과가 없을 경우 메시지 출력
            )}
          </div>
        </section>
      </main>

      <button className="camera-button">
        <img src={cameraIcon} alt="Camera Icon" />
      </button>

      <FoodDetailModal food={selectedFood} onClose={() => setSelectedFood(null)} />
    </div>
  );
};