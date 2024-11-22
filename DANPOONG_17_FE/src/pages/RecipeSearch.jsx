import { useState } from 'react';
import '../styles/RecipeSearch.css';
import searchIcon from '../assets/recipe/search.png';
import closeIcon from '../assets/recipe/cancel.png';

export const Search = () => {

  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const recentKeywords = ['육개장', '소고기'];
  const popularKeywords = ['육개장', '된장찌개', '김치찌개', '비빔밥', '삼겹살', '육회비빔밥', '불고기', '미역국', '회덮밥', '라면'];

  return (
    <div className="recip-search-page">
      <header className="search-header">
        <div className="search-bar">
          <img src={searchIcon} alt="검색" className="search-icon" />
          <input
            type="text"
            placeholder="검색어를 입력해주세요"
            value={searchTerm}
            onChange={handleInputChange}
            className="search-input"
          />
          {searchTerm && (
          <button className="clear-btn" onClick={clearSearch}>
            <img src={closeIcon} alt="지우기" />
          </button>
        )}
        </div>
      </header>

      <section className="recent-search">
        <h2>최근 검색어</h2>
        <div className="tags">
          {recentKeywords.map((keyword, index) => (
            <span key={index} className="tag">
              {keyword} <span className="tag-close">×</span>
            </span>
          ))}
        </div>
      </section>

      <section className="popular-search">
        <h2>인기 검색어</h2>
        <div className="popular-list">
          {popularKeywords.map((keyword, index) => (
            <div key={index} className="keyword-item">
              <span className="keyword-rank">{index + 1}</span> {keyword}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
