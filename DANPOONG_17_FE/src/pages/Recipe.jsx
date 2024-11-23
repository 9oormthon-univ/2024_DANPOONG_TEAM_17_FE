import { useState, useEffect } from 'react';
import PopularRecipes from '../components/recipePage/PopularRecipe';
import '../styles/RecipePage.css';
import { useNavigate } from 'react-router-dom';
import { apiUrl } from '../axios/apiUrl';

import dummy_img from '../assets/dummy/계란찜.jpg';
import mark_off from "../assets/recipe/mark_off.png";
import searchIcon from "../assets/recipe/search.png"

export const Recipe = () => {
  const navigate = useNavigate();
  const [recentRecipes, setRecentRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleSearchClick = () => {
    navigate('/recipe/search');
  };

  const handleRecipeClick = (id) => {
    navigate(`/recipe/${id}`);
  };

  const handlePostClick = () => {
    navigate('/recipe/post');
  };

  // API 호출
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await apiUrl.get('/api/recipes');
        setRecentRecipes(response.data.content);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch recipes:', error);
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div className="recipe-page">
      <header className="recipe-header">
        <div className="search-container" onClick={handleSearchClick}>
          <img src={searchIcon} alt="검색" className="search-icon" />
          <input type="text" placeholder="검색어를 입력하세요" className="search-input" />
        </div>
        <div className="recipe-filter-buttons-container">
          <div className="recipe-filter-buttons">
            <button>나라</button>
            <button>난이도</button>
          </div>
          <button className="write-button" onClick={handlePostClick}>글쓰기</button>
        </div>
      </header>

      <PopularRecipes />

      <section className="recent-recipes">
        <h2>최근 레시피</h2>
        {isLoading ? (
          <p>로딩 중...</p>
        ) : recentRecipes.length === 0 ? (
          <p>레시피가 없습니다.</p>
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
                    <p className="author-name">미르미</p> {/* 작성자 */}
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
