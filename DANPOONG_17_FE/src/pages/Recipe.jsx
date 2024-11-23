import { useState, useEffect } from 'react';
import PopularRecipes from '../components/recipePage/PopularRecipe';
import '../styles/RecipePage.css';
import { useNavigate } from 'react-router-dom';
import { apiUrl } from '../axios/apiUrl';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

import dummy_img from '../assets/dummy/계란찜.jpg';
import mark_off from "../assets/recipe/mark_off.png";
import searchIcon from "../assets/recipe/search.png"

export const Recipe = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [recentRecipes, setRecentRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const GOOGLE_TRANSLATE_API_KEY = import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY;

  const handleSearchClick = () => {
    navigate('/recipe/search');
  };

  const handleRecipeClick = (id) => {
    navigate(`/recipe/${id}`);
  };

  const handlePostClick = () => {
    navigate('/recipe/post');
  };

  // Google Translate API를 사용하여 텍스트 번역
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

  // 레시피 데이터 가져오기 및 번역
  const fetchRecipes = async () => {
    try {
      setIsLoading(true);
      const response = await apiUrl.get('/api/recipes');
      const recipeData = response.data.content;

      if (i18n.language === "en") {
        // 영어로 번역
        const translatedRecipes = await Promise.all(
          recipeData.map(async (recipe) => ({
            ...recipe,
            title: await translateText(recipe.title, "en"),
            country: recipe.country
              ? await translateText(recipe.country, "en")
              : null,
            difficulty: recipe.difficulty
              ? await translateText(recipe.difficulty, "en")
              : null,
          }))
        );
        setRecentRecipes(translatedRecipes);
      } else {
        // 한국어 데이터 그대로 사용
        setRecentRecipes(recipeData);
      }
    } catch (error) {
      console.error('Failed to fetch recipes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log(`Current language: ${i18n.language}`);
    fetchRecipes();
  }, [i18n.language]); // 언어가 변경될 때마다 데이터 다시 로드

  return (
    <div className="recipe-page">
      <header className="recipe-header">
        <div className="search-container" onClick={handleSearchClick}>
          <img src={searchIcon} alt="검색" className="search-icon" />
          <input type="text" placeholder={t("Recipe.search_placeholder")} className="search-input" />
        </div>
        <div className="recipe-filter-buttons-container">
          <div className="recipe-filter-buttons">
            <button>{t("Recipe.filter_country")}</button>
            <button>{t("Recipe.filter_difficulty")}</button>
          </div>
          <button className="write-button" onClick={handlePostClick}>{t("Recipe.write_button")}</button>
        </div>
      </header>

      <section className="recent-recipes">
        <h2>{t("Recipe.recent_recipes")}</h2>
        {isLoading ? (
          <p>{t("Recipe.loading")}</p>
        ) : recentRecipes.length === 0 ? (
          <p>{t("Recipe.no_recipes")}</p>
        ) : (
          recentRecipes.map((recipe) => (
            <div
              key={recipe.id}
              className="recent-recipe-card"
              onClick={() => handleRecipeClick(recipe.id)}
            >
              <div className="recent-recipe-header">
                <div className="author-info">
                  <div className="author-avatar" /> {/* 아바타용 div */}
                  <div className="author-details">
                    <p className="author-name">{t("Recipe.author_name")}</p> {/* 작성자 */}
                    <p className="time-info">{new Date(recipe.createdAt).toLocaleDateString()}</p> {/* 날짜 */}
                  </div>
                </div>
              </div>
              <div className="recent-recipe-content">
                <div className="recipe-thumbnail">
                  <img
                    src={recipe.imagePath || dummy_img}
                    alt={recipe.title}
                  />
                </div>
                <div className="recipe-details">
                  <p className="recipe-title">{recipe.title}</p>
                  <div className="recipe-tags">
                    {recipe.country && <span className="recipe-tag">{recipe.country}</span>}
                    {recipe.difficulty && <span className="recipe-tag">{recipe.difficulty}</span>}
                  </div>
                </div>
              </div>
              {/* 북마크 아이콘 추가 */}
              <img src={mark_off} alt="북마크" className="bookmark-icon" />
            </div>
          ))
        )}
      </section>
    </div>
  );
};
