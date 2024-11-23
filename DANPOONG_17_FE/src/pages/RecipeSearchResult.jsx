import '../styles/RecipeSearchResult.css';

export const RecipeSearchResult = () => {
  const dummyResults = [
    {
      id: 1,
      title: '육개장',
      author: '미르미1113',
      date: '2024.10.29',
    },
    {
      id: 2,
      title: '고사리 육개장',
      author: '미르미1113',
      date: '2024.10.29',
    },
    {
      id: 3,
      title: '육개장 칼국수',
      author: '미르미1113',
      date: '2024.10.29',
    },
    {
      id: 4,
      title: '육개장',
      author: '미르미1113',
      date: '2024.10.29',
    },
  ];

  return (
    <div className="search-result-page">
      <header className="search-result-header">
        <div className="header-left">
          <span className="result-count">총 {dummyResults.length}개 검색결과</span>
        </div>
        <div className="header-right">
          <button className="sort-button">정확도순 ▾</button>
        </div>
      </header>

      <div className="search-results">
        {dummyResults.map((result) => (
          <div key={result.id} className="result-item">
            <div className="result-thumbnail" />
            <div className="result-info">
              <h3 className="result-title">{result.title}</h3>
              <p className="result-author">{result.author}</p>
              <p className="result-date">{result.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};