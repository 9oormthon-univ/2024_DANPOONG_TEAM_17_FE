import { useState, useEffect } from "react";
import subtitleIcon from "../../assets/home/logo2.png";
import locationIcon from "../../assets/home/place.png";
import "./homeHeader.css";

const HomeHeader = () => {
  const [location, setLocation] = useState("위치를 가져오는 중...");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchAddress(latitude, longitude); // Kakao API를 통해 주소 변환
        },
        (error) => {
          console.error("Error fetching location:", error);
          setLocation("위치를 확인할 수 없습니다.");
        }
      );
    } else {
      setLocation("Geolocation을 지원하지 않는 브라우저입니다.");
    }
  }, []);

  const REST_API_KEY = import.meta.env.VITE_KAKAO_API_KEY;

  // Kakao API로 위치 정보를 가져오는 함수
  const fetchAddress = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lng}&y=${lat}`,
        {
          headers: {
            Authorization: `KakaoAK ${REST_API_KEY}`, // 인증 헤더 추가
          },
        }
      );
      const data = await response.json();

      if (data.documents && data.documents.length > 0) {
        const address = data.documents[0].address;
        const locationText = `${address.region_1depth_name} ${address.region_2depth_name} ${address.region_3depth_name}`;
        setLocation(locationText);
      } else {
        setLocation("주소를 가져올 수 없습니다.");
      }
    } catch (error) {
      console.error("Error fetching address from Kakao API:", error);
      setLocation("주소를 가져올 수 없습니다.");
    }
  };

  return (
    <header className="home-header">
      <div className="header-subtitle">
        <p className="subtitle">밥상에서<br></br>시작되는 한국 생활</p>
        <img src={subtitleIcon} alt="Subtitle Icon" className="subtitle-icon" />
      </div>
      <div className="header-location">
        <img src={locationIcon} alt="Location Icon" className="location-icon" />
        <p className="location">{location}</p>
      </div>
    </header>
  );
};

export default HomeHeader;
