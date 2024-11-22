import { useState, useEffect } from 'react';
import PopularRecipes from '../components/recipePage/PopularRecipe';
import '../styles/RecipePage.css';

import mark_off from "../assets/recipe/mark_off.png"
import mark_on from "../assets/recipe/mark_on.png"
import searchIcon from "../assets/recipe/search.png"

// export function Recipe() {
//     return (
//       <div>
//         <h1>Recipe Page</h1>
//         <p>레시피 페이지</p>
//       </div>
//     );
// }

export const Recipe = () => {

  // 더미 데이터
  const popularRecipes = [
    { id: 1, title: "제목1", description: "1. 여기는 본문입니다.", bookmarked: false },
    { id: 2, title: "제목2", description: "2. 여기는 본문입니다.", bookmarked: true },
    { id: 3, title: "제목3", description: "3. 여기는 본문입니다.", bookmarked: false },
  ];

  const recentRecipes = [
    { id: 1, author: "미르미", time: "1분 전", title: "소고기묵국", tags: ["대한민국", "국"] },
    { id: 2, author: "미르미", time: "34분 전", title: "된장찌개", tags: ["전통", "한식"] },
  ];


  return(
    <div className="recipe-page">
      {/* 검색 섹션 */}
      <header className="recipe-header">
        <div className="search-container">
          <img src={searchIcon} alt="검색" className="search-icon" />
          <input type="text" placeholder="검색어를 입력하세요" className="search-input" />
          <button className="write-button">글쓰기</button>
        </div>
        <div className="filter-buttons">
          <button>나라</button>
          <button>난이도</button>
        </div>
      </header>

      {/* 인기 레시피 섹션 */}
      <section className="popular-recipes">
        <h2>인기 레시피</h2>
        <div className="recipe-list">
          {popularRecipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <div className="recipe-info">
                <p className="recipe-title">{recipe.title}</p>
                <p className="recipe-description">{recipe.description}</p>
              </div>
              <img
                src={recipe.bookmarked ? mark_on : mark_off}
                alt="북마크"
                className="bookmark-icon"
              />
            </div>
          ))}
        </div>
      </section>

      {/* 최근 레시피 섹션 */}
      <section className="recent-recipes">
        <h2>최근 레시피</h2>
        {recentRecipes.map((recipe) => (
          <div key={recipe.id} className="recent-recipe-card">
            <div className="recent-recipe-header">
              <div className="author-info">
                <div className="author-avatar" /> {/* 아바타용 div */}
                <p className="author-name">{recipe.author}</p>
              </div>
              <p className="time-info">{recipe.time}</p>
            </div>
            <div className="recent-recipe-content">
              <div className="recipe-thumbnail" />
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
          </div>
        ))}
      </section>
    </div>
  )
}