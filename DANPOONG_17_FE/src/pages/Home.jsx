import { useState, useEffect } from 'react';
import { apiUrl } from '../axios/apiUrl';
import Header from '../components/Header';
import '../styles/HomePage.css';
import FoodDetailModal from '../components/homePage/foodDetailModal';
import HomeHeader from '../components/homePage/homeHeader';
//import imageMap from '../components/homePage/imageMap';

//import dummy_img from '../assets/dummy/계란찜.jpg';
import cameraIcon from '../assets/home/camera2.png';

export const Home = () => {
  const [foods, setFoods] = useState([]); // 음식 리스트 상태
  const [selectedFood, setSelectedFood] = useState(null); // 선택된 음식 상태
  const [selectedIngredients, setSelectedIngredients] = useState([]); // 선택된 음식 상태

  // 더미 데이터
  // const dummyData = [
  //   { id: 1, name: '계란찜', img: dummy_img, description: '부드럽고 맛있는 계란찜', ingredients: '달걀, 물, 소금' },
  //   { id: 2, name: '계란찜', img: dummy_img, description: '부드럽고 맛있는 계란찜', ingredients: '달걀, 물, 소금' },
  //   { id: 3, name: '계란찜', img: dummy_img, description: '부드럽고 맛있는 계란찜', ingredients: '달걀, 물, 소금' },
  //   { id: 4, name: '계란찜', img: dummy_img, description: '부드럽고 맛있는 계란찜', ingredients: '달걀, 물, 소금' },
  // ];

    const fetchFoods = async (excludedIngredients = '') => {
      try {
        const keyword = excludedIngredients ? excludedIngredients.join(',') : '""';
        const params = {
          keyword,
          filter: "exclude",
          isIngredients: true,
        }

        console.log("Request params:", params);
        const response = await apiUrl.get('/api/foods/search', {params}); // authHttp 사용
        const foodData = response.data.content;
        
        console.log("Fetched foods:", foodData);
        setFoods(foodData); // API 응답 데이터를 foods 상태로 설정
      } catch (error) {
        console.error('Failed to fetch foods:', error);
      }
    }



  useEffect(() => {
    fetchFoods();
  }, []);

  // 재료 버튼 클릭 핸들러
  const handleIngredientClick = (ingredient) => {
    setSelectedIngredients((prev) => {
      const updatedIngredients = prev.includes(ingredient)
        ? prev.filter((item) => item !== ingredient) // 선택된 재료를 제거
        : [...prev, ingredient]; // 새 재료를 추가

        if (updatedIngredients.length === 0) {
          fetchFoods(); // 초기 데이터 호출
        } else {
          fetchFoods(updatedIngredients); // 선택된 재료로 API 호출
        }
      return updatedIngredients; // 상태 업데이트
    });
  };

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
            {foods.length > 0 ? (
              foods.map((food, index) => (
                <div
                  key={index}
                  className="food-item"
                  onClick={() => {
                    console.log("Selected food:", food);
                    setSelectedFood(food)}}
                >
                  <img
                    src={food.imagePath} // imagePath가 없으면 기본 이미지 사용
                    alt={food.name}
                  />
                  <p>{food.name}</p>
                </div>
              ))
            ) : (
              <p>추천할 음식이 없습니다.</p> // 필터링된 결과가 없을 경우 메시지 출력
            )}
          </div>
        </section>
      </main>

      <button className="camera-button" onClick={() => alert("준비 중인 기능입니다.")}>
        <img src={cameraIcon} alt="Camera Icon" />
      </button>

      <FoodDetailModal food={selectedFood} onClose={() => {
        console.log("Closing modal");
        setSelectedFood(null)}} />
    </div>
  );
};