import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import subtitleIcon from "../../assets/home/logo2.png";
import locationIcon from "../../assets/home/place.png";
import "./homeHeader.css";

const HomeHeader = () => {
  const { t } = useTranslation(); // 번역 함수 가져오기
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
          setLocation(t("HomeHeader.errorLocation"));
        }
      );
    } else {
      setLocation(t("HomeHeader.notSupportLocation"));
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
        setLocation(t("HomeHeader.can'tGetLocation"));
      }
    } catch (error) {
      console.error("Error fetching address from Kakao API:", error);
      setLocation(t("HomeHeader.can'tGetLocation"));
    }
  };

  return (
    <header className="home-header">
      <div className="header-subtitle">
        <p className="subtitle">{t("HomeHeader.subTitle1")}<br></br>{t("HomeHeader.subTitle2")}</p>
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
