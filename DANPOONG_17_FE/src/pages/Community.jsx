import '../styles/CommunityPage.css';
import Header from '../components/Header';
import class1 from '../assets/community/class1.jpg';
import class2 from '../assets/community/class2.jpg';
import class3 from '../assets/community/class3.jpg';
import together1 from '../assets/community/together1.jpg';
import together2 from '../assets/community/together2.jpg';
import together3 from '../assets/community/together3.jpg';
import popular1 from '../assets/community/popular1.jpg';
import popular2 from '../assets/community/popular2.jpg';
import popular3 from '../assets/community/popular3.jpg';

import { useTranslation } from 'react-i18next';

export const Community = () => {
  const { t } = useTranslation();
  const sections = [
    {
      title: t("Community.cooking_Class"),
      description:
      t("Community.cooking_Class_description"),
      images: [class1, class2, class3], // 이미지 파일명
    },
    {
      title: t("Community.together"),
      description:
      t("Community.together_description"),
      images: [together1, together2, together3],
    },
    {
      title: t("Community.exploring"),
      description:
      t("Community.exploring_description"),
      images: [popular1, popular2, popular3],
    },
  ];

  return (
    <div className="community-page">
      <Header />
      {sections.map((section, index) => (
        <div key={index} className="community-section">
          <div className="section-header">
            <h2>{section.title}</h2>
            <button className="view-more-btn">{t("Community.view_more_btn")}</button>
          </div>
          <p className="section-description">{section.description}</p>
          <div className="section-images">
            {section.images.map((image, idx) => (
              <img
                key={idx}
                src={image} // 이미지 경로
                alt={`${section.title} ${idx + 1}`}
                className="dummy-image"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};