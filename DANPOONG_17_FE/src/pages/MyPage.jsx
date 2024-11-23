import '../styles/MyPage.css';

import alertIcon from '../assets/myPage/alert.png';
import userIcon from '../assets/myPage/user.png';
import backIcon from '../assets/myPage/back.png';
import bookmarkIcon from '../assets/myPage/북마크.png';
import settingIcon from '../assets/myPage/setting.png';
import { useTranslation } from 'react-i18next';


export const My = () => {
  const { t } = useTranslation();

  return (
    <div className="mypage">
      {/* Header Section */}
      <div className="user-section">
        <img src={userIcon} alt="User Icon" className="user-icon" />
        <p className="user-name">{t("MyPage.user_name")}</p>
      </div>

      {/* Icon Section */}
      <div className="icon-section">
        <div className="icon-item">
          <img src={bookmarkIcon} alt="Bookmark Icon" className="icon-image" />
          <p>{t("MyPage.scrapbook")}</p>
        </div>
        <div className="icon-item">
          <img
            src={alertIcon}
            alt="Notification Icon"
            className="-imageicon"
          />
          <p>{t("MyPage.notifications")}</p>
        </div>
        <div className="icon-item">
          <img src={settingIcon} alt="Settings Icon" className="icon-image" />
          <p>{t("MyPage.settings")}</p>
        </div>
      </div>

      {/* List Section */}
      <div className="list-section">
        <div className="list-item">
          <p>{t("MyPage.my_posts")}</p>
          <img src={backIcon} alt="Arrow Icon" className="arrow-icon" />
        </div>
        <div className="list-item">
          <p>{t("MyPage.applied_classes")}</p>
          <img src={backIcon} alt="Arrow Icon" className="arrow-icon" />
        </div>
        <div className="list-item">
          <p>{t("MyPage.my_chatrooms")}</p>
          <img src={backIcon} alt="Arrow Icon" className="arrow-icon" />
        </div>
      </div>
    </div>
  );
};