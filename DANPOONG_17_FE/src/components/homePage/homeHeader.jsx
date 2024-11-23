import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import subtitleIcon from "../../assets/home/logo2.png";
import locationIcon from "../../assets/home/place.png";
import "./homeHeader.css";

const HomeHeader = () => {
  const { t, i18n } = useTranslation(); // 번역 함수 가져오기
  const [location, setLocation] = useState(t("HomeHeader.getLocation"));

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
  }, [i18n.language]);

  const REST_API_KEY = import.meta.env.VITE_KAKAO_API_KEY;
  const VITE_GOOGLE_TRANSLATE_API_KEY = import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY

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
        
        
        if (i18n.language === "en") {
          // 영어로 번역
          const translatedAddress = await translateText(locationText, "en");
          setLocation(translatedAddress);
        } else {
          setLocation(locationText); // 한국어 그대로 사용
        }
      } else {
        setLocation(t("HomeHeader.can'tGetLocation"));
      }
    } catch (error) {
      console.error("Error fetching address from Kakao API:", error);
      setLocation(t("HomeHeader.can'tGetLocation"));
    }
  };

  // Google Translate API로 텍스트 번역하는 함수
  const translateText = async (text, targetLanguage = "en") => {
    try {
      const response = await axios.post(
        "https://translation.googleapis.com/language/translate/v2",
        null,
        {
          params: {
            q: text, // 번역할 텍스트
            target: targetLanguage, // 번역 대상 언어
            source: "ko", // 원본 언어
            key: VITE_GOOGLE_TRANSLATE_API_KEY, // Google Translate API 키
          },
        }
      );
      return response.data.data.translations[0].translatedText; // 번역된 텍스트 반환
    } catch (error) {
      console.error("Translation error:", error);
      return text; // 번역 실패 시 원본 텍스트 반환
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
