import '../styles/RecipeSearchResult.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import searchIcon from '../assets/recipe/search.png';
import closeIcon from '../assets/recipe/cancel.png';
import backIcon from '../assets/recipe/화살표.png';

export const RecipeSearchResult = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('query'); // URL에서 검색어 추출
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/recipe');
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      // 검색 결과 페이지로 이동
      navigate(`/recipe/search/result?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  useEffect(() => {
    // 백엔드 API 호출 (더미 데이터로 대체 가능)
    const fetchResults = async () => {
      try {
        setIsLoading(true);
        // API 요청으로 실제 데이터를 가져오는 코드 작성
        const dummyResults = [
          { id: 1, title: '육개장', author: '미르미1113', date: '2024.10.29' },
          { id: 2, title: '고사리 육개장', author: '미르미1113', date: '2024.10.29' },
          { id: 3, title: '육개장 칼국수', author: '미르미1113', date: '2024.10.29' },
          { id: 4, title: '육개장', author: '미르미1113', date: '2024.10.29' },
        ];
        setResults(dummyResults);
      } catch (error) {
        console.error('Failed to fetch results:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [searchQuery]); // 검색어가 변경될 때마다 호출

  

  return (
    <div className="search-result-page">
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

      <div className="header-left">
          <span className="result-count">총 {results.length}개 검색결과</span>
          <span className="current-search">"{searchQuery}" 검색</span> {/* 검색어 표시 */}
      </div>
      <div className="header-right">
          <button className="sort-button">정확도순 ▾</button>
      </div>

      <div className="search-results">
        {isLoading ? (
          <p>로딩 중...</p>
        ) : results.length === 0 ? (
          <p>검색 결과가 없습니다.</p>
        ) : (
          results.map((result) => (
            <div key={result.id} className="result-item">
              <div className="result-thumbnail" />
              <div className="result-info">
                <h3 className="result-title">{result.title}</h3>
                <p className="result-author">{result.author}</p>
                <p className="result-date">{result.date}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};