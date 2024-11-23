//import { useState, useEffect } from 'react';
import PopularRecipes from '../components/recipePage/PopularRecipe';
import '../styles/RecipePage.css';
import { useNavigate } from 'react-router-dom';

import mark_off from "../assets/recipe/mark_off.png"
//import mark_on from "../assets/recipe/mark_on.png"
import searchIcon from "../assets/recipe/search.png"

export const Recipe = () => {

  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleSearchClick = () => {
    navigate('/recipe/search'); // 검색 페이지로 이동
  };

  const handleRecipeClick = (id) => {
    navigate(`/recipe/${id}`); // 특정 레시피의 상세 페이지로 이동
  };

  // 더미 데이터
  const recentRecipes = [
    { id: 1, author: "미르미", time: "1분 전", title: "소고기묵국", tags: ["대한민국", "국"], image: mark_off },
    { id: 2, author: "미르미", time: "34분 전", title: "된장찌개", tags: ["전통", "한식"], image: mark_off },
  ];


  return(
    <div className="recipe-page">
      {/* 검색 섹션 */}
      <header className="recipe-header">
        <div className="search-container" onClick={handleSearchClick}>
          <img src={searchIcon} alt="검색" className="search-icon" />
          <input type="text" placeholder="검색어를 입력하세요" className="search-input" />
        </div>
        <div className="filter-buttons-container">
        <div className="filter-buttons">
          <button>나라</button>
          <button>난이도</button>
        </div>
        <button className="write-button">글쓰기</button>
        </div>
      </header>

      {/* 인기 레시피 섹션 */}
      <PopularRecipes />

      {/* 최근 레시피 섹션 */}
      <section className="recent-recipes">
        <h2>최근 레시피</h2>
        {recentRecipes.map((recipe) => (
            <div
              key={recipe.id}
              className="recent-recipe-card"
              onClick={() => handleRecipeClick(recipe.id)} // 클릭 이벤트 추가
            >
            <div className="recent-recipe-header">
              <div className="author-info">
                <div className="author-avatar" /> {/* 아바타용 div */}
                <p className="author-name">{recipe.author}</p>
              </div>
              <p className="time-info">{recipe.time}</p>
            </div>
            <div className="recent-recipe-content">
              <div className="recipe-thumbnail"/>
                <img src={recipe.image}/>
              </div>
              <div className="recipe-details">
                <p className="recipe-title">{recipe.title}</p>
                <div className="recipe-tags">
                  {recipe.tags.map((tag, index) => (
                    <span key={index} className="recipe-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <img src={mark_off} alt="북마크" className="bookmark-icon" />
          </div>
        ))}
      </section>
    </div>
  )
}