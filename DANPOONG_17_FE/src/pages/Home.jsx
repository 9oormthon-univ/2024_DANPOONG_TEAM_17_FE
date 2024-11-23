import { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { apiUrl } from '../axios/apiUrl';
import axios from "axios";
import Header from '../components/Header';
import '../styles/HomePage.css';
import FoodDetailModal from '../components/homePage/foodDetailModal';
import HomeHeader from '../components/homePage/homeHeader';

import cameraIcon from '../assets/home/camera2.png';

export const Home = () => {
  const { t, i18n } = useTranslation(); // 번역 함수 가져오기
  const [foods, setFoods] = useState([]); // 음식 리스트 상태
  const [selectedFood, setSelectedFood] = useState(null); // 선택된 음식 상태
  const [selectedIngredients, setSelectedIngredients] = useState([]); // 선택된 음식 상태

  const ingredients = [
    { key: "ingredient_btn_1", value: "소고기" },
    { key: "ingredient_btn_2", value: "돼지고기" },
    { key: "ingredient_btn_3", value: "닭고기" },
    { key: "ingredient_btn_4", value: "해산물" },
    { key: "ingredient_btn_5", value: "달걀" },
    { key: "ingredient_btn_6", value: "우유" },
  ];

  // Google Translate API를 호출하여 텍스트 번역
  const translateText = async (text, targetLanguage = "en") => {
    try {
      const response = await axios.post(
        "https://translation.googleapis.com/language/translate/v2",
        null,
        {
          params: {
            q: text,
            target: targetLanguage,
            source: "ko",
            key: import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY, // Google Translate API 키
          },
        }
      );
      return response.data.data.translations[0].translatedText;
    } catch (error) {
      console.error("Translation error:", error);
      return text; // 번역 실패 시 원본 텍스트 반환
    }
  };
  
    const fetchFoods = async (excludedIngredients = '') => {
      try {
        const keyword = excludedIngredients ? excludedIngredients.join(',') : '""';
        const params = {
          keyword,
          filter: "exclude",
          isIngredients: true,
        }

        const response = await apiUrl.get('/api/foods/search', {params}); // authHttp 사용
        const foodData = response.data.content;
        
        if (i18n.language === "en") {
          // 영어일 경우 번역
          const translatedFoods = await Promise.all(
            foodData.map(async (food) => ({
              ...food,
              name: await translateText(food.name, "en"),
              explanation: await translateText(food.explanation, "en"),
              ingredients: await translateText(food.ingredients, "en"),
            }))
          );
          setFoods(translatedFoods);
        } else {
          // 한국어 데이터를 그대로 사용
          setFoods(foodData);
        }
      } catch (error) {
        console.error('Failed to fetch foods:', error);
      }
    }



  useEffect(() => {
    fetchFoods();
  }, [i18n.language]); // 언어가 변경될 때마다 데이터 다시 로드

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
          <h2>{t("Home.home_ingredient1")}</h2>
          <p>{t("Home.home_ingredient2")}</p>
          <div className="filter-buttons">
            {ingredients.map((ingredient) => (
              <button
                key={ingredient.key} // 유일한 키 값 사용
                onClick={() => handleIngredientClick(ingredient.value)} // 값 전달
                className={`filter-button ${
                  selectedIngredients.includes(ingredient.value) ? "active" : ""
                }`}
              >
                {t(`Home.${ingredient.key}`)} {/* 번역된 텍스트 */}
              </button>
            ))}
          </div>

          
          <div className="food-list">
            {foods.length > 0 ? (
              foods.map((food, index) => (
                <div
                  key={index}
                  className="food-item"
                  onClick={() => setSelectedFood(food)}
                >
                  <img
                    src={food.imagePath} // imagePath가 없으면 기본 이미지 사용
                    alt={food.name}
                  />
                  <p>{food.name}</p>
                </div>
              ))
            ) : (
              <p>{t("Home.no_food")}</p> // 필터링된 결과가 없을 경우 메시지 출력
            )}
          </div>
        </section>
      </main>

      <button className="camera-button" onClick={() => alert("준비 중인 기능입니다.")}>
        <img src={cameraIcon} alt="Camera Icon" />
      </button>

      {selectedFood && (
        <FoodDetailModal
          food={selectedFood}
          onClose={() => setSelectedFood(null)}
        />
      )}
    </div>
  );
};