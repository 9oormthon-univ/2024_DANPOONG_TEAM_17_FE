import './foodDetailModal.css';
import PropTypes from "prop-types";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import axios from "axios";

const FoodDetailModal = ({ food, onClose }) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [translatedFood, setTranslatedFood] = useState(food);

  const GOOGLE_TRANSLATE_API_KEY = import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY;

  useEffect(() => {
    // 언어가 영어일 경우 번역 실행
    const translateFoodDetails = async () => {
      if (i18n.language === "en" && food) {
        try {
          const translatedName = await translateText(food.name, "en");
          const translatedExplanation = await translateText(
            food.explanation,
            "en"
          );
          const translatedIngredients = await translateText(
            food.ingredients,
            "en"
          );

          setTranslatedFood({
            ...food,
            name: translatedName,
            explanation: translatedExplanation,
            ingredients: translatedIngredients,
          });
        } catch (error) {
          console.error("Error translating food details:", error);
        }
      } else {
        // 한국어일 경우 원본 데이터 사용
        setTranslatedFood(food);
      }
    };

    translateFoodDetails();
  }, [food, i18n.language]);

  if (!translatedFood) {
    console.log("Food is null or undefined");
    return null
  }; // 음식 정보가 없으면 모달을 렌더링하지 않음

  // Google Translate API로 텍스트 번역하는 함수
  const translateText = async (text, targetLanguage = "en") => {
    try {
      const response = await axios.post(
        "https://translation.googleapis.com/language/translate/v2",
        null,
        {
          params: {
            q: text, // 번역할 텍스트
            target: targetLanguage, // 번역 대상 언어
            source: "ko", // 원본 언어
            key: GOOGLE_TRANSLATE_API_KEY, // Google Translate API 키
          },
        }
      );
      return response.data.data.translations[0].translatedText; // 번역된 텍스트 반환
    } catch (error) {
      console.error("Translation error:", error);
      return text; // 번역 실패 시 원본 텍스트 반환
    }
  };

  const handleNearbyRestaurantsClick = async () => {
    const query = encodeURIComponent(food.name);
    const kakaoMapUrl = `https://map.kakao.com/?q=${query}`;
    window.open(kakaoMapUrl, "_blank");
  };

  const handleRecipeClick = () => {
    navigate(`/recipe/search/result?query=${encodeURIComponent(translatedFood.name)}`);
  };
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>X</button>
        <h2>{translatedFood.name}</h2>
        <p>{translatedFood.explanation}</p>
        <img src={translatedFood.imagePath} alt={translatedFood.name} className="food-image" />
        <div className="food-details">
          <h3>{t("HomeFoodDetailModalader.ingredients")}</h3>
          <p>{translatedFood.ingredients}</p>
        </div>
        <div className="modal-actions">
          <button className="action-button" onClick={handleNearbyRestaurantsClick}>{t("HomeFoodDetailModalader.nearbyRestaurants")}</button>
          <button className="action-button" onClick={handleRecipeClick}>{t("HomeFoodDetailModalader.recipe")}</button>
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