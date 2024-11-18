import { useState, useEffect } from 'react';
import Header from '../components/Header';
import '../styles/HomePage.css';

import dummy_img from '../assets/dummy/계란찜.jpg';
import locationIcon from '../assets/home/place.png';
import subtitleIcon from '../assets/home/logo2.png';

export const Home = () => {
  const [foods, setFoods] = useState([]);

  // 더미 데이터
  const dummyData = [
    { id: 1, name: '계란찜', img: dummy_img },
    { id: 2, name: '계란찜', img: dummy_img },
    { id: 3, name: '계란찜', img: dummy_img },
    { id: 4, name: '계란찜', img: dummy_img },
  ];

  useEffect(() => {
    // 현재는 더미 데이터를 사용
    setFoods(dummyData);
  }, []);

  return (
    <div className="home">
      <Header />
      <main className="home-content">
        <header className="home-header">
        <div className="header-subtitle">
            <p className="subtitle">밥상에서 시작되는 한국 생활</p>
            <img src={subtitleIcon} alt="Subtitle Icon" className="subtitle-icon" />
          </div>
          <div className="header-location">
            <img src={locationIcon} alt="Location Icon" className="location-icon" />
            <p className="location">경기 안산시 상록구 한양대로 55</p>
          </div>
        </header>

        <section className="food-recommendation">
          <h2>미르미님을 위한 오늘의 음식 추천</h2>
          <p>제외하고 싶은 재료를 아래에서 선택해보세요</p>
          <div className="filter-buttons">
            <button>소고기</button>
            <button>돼지고기</button>
            <button>닭고기</button>
            <button>해산물</button>
            <button>달걀</button>
            <button>우유</button>
          </div>

          <div className="food-list">
            {foods.map((food) => (
              <div key={food.id} className="food-item">
                <img src={food.img} alt={food.name} />
                <p>{food.name}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};