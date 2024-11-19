import { useState, useEffect } from "react";
import subtitleIcon from "../../assets/home/logo2.png";
import locationIcon from "../../assets/home/place.png";
import "./HomeHeader.css";

const HomeHeader = () => {

    const [location, setLocation] = useState("위치를 가져오는 중...");

    useEffect(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetchAddress(latitude, longitude); // 위도와 경도를 주소로 변환
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

    // 위치 정보를 위한 API 설정
    const fetchAddress = async (lat, lng) => {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
          );
          const data = await response.json();
          const address = data.address;
          
          const city = address.city || address.town || address.village || null;
          const district = address.state_district || address.county || null;
          const road = address.road || null;

          const parts = [
            city && `${city}시`,
            district,
            road,
          ].filter(Boolean); // null 또는 undefined를 제외
      
          // 주소를 하나의 문자열로 합침
          const locationText = parts.join(" ");
          setLocation(locationText);
        } catch (error) {
          console.error("Error fetching address:", error);
          setLocation("주소를 가져올 수 없습니다.");
        }
      };

  return (
    <header className="home-header">
      <div className="header-subtitle">
        <p className="subtitle">밥상에서 시작되는 한국 생활</p>
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