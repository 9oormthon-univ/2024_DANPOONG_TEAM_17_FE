import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/RecipeSearch.css';
import searchIcon from '../assets/recipe/search.png';
import closeIcon from '../assets/recipe/cancel.png';
import backIcon from '../assets/recipe/화살표.png';

export const Search = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const clearSearch = () => {
    setSearchTerm('');
  };

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      // 검색 결과 페이지로 이동
      navigate('/recipe/search/result');
    }
  };

  // 뒤로가기 버튼 클릭 시 레시피 페이지로 이동
  const handleBackClick = () => {
    navigate('/recipe');
  };

  const filteredKeywords =
    searchTerm.length > 0
      ? ['육개장', '육전', '육회', '육수', '육라면'].filter((keyword) =>
          keyword.includes(searchTerm)
        )
      : [];

  const recentKeywords = ['육개장', '소고기'];
  const popularKeywords = ['육개장', '된장찌개', '김치찌개', '비빔밥', '삼겹살', '육회비빔밥', '불고기', '미역국', '회덮밥', '라면'];

  return (
    <div className="recip-search-page">
      <header className="search-header">
        <button className="back-btn" onClick={handleBackClick}>
          <img src={backIcon} alt="뒤로가기" />
        </button>
        <div className="search-bar">
          <input
            type="text"
            placeholder="검색어를 입력해주세요"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()} // Enter 키 처리
            className="search-input"
          />
          {searchTerm && (
          <button className="clear-btn" onClick={clearSearch}>
            <img src={closeIcon} alt="지우기" />
          </button>
        )}
          <img src={searchIcon} alt="검색" className="search-icon" />
        </div>
      </header>

      {filteredKeywords.length > 0 && (
        <section className="filtered-results">
          {filteredKeywords.map((keyword, index) => {
            const matchIndex = keyword.indexOf(searchTerm);
            const beforeMatch = keyword.slice(0, matchIndex);
            const matchText = keyword.slice(
              matchIndex,
              matchIndex + searchTerm.length
            );
            const afterMatch = keyword.slice(matchIndex + searchTerm.length);

            return (
              <div key={index} className="filtered-item">
                <span className="black-text">{beforeMatch}</span>
                <span className="red-text">{matchText}</span>
                <span className="black-text">{afterMatch}</span>
              </div>
            );
          })}
        </section>
      )}

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
