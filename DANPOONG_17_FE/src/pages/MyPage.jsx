import '../styles/MyPage.css';

import alertIcon from '../assets/myPage/alert.png';
import userIcon from '../assets/myPage/user.png';
import backIcon from '../assets/myPage/back.png';
import bookmarkIcon from '../assets/myPage/북마크.png';
import settingIcon from '../assets/myPage/setting.png';


export const My = () => {
  return (
    <div className="mypage">
      {/* Header Section */}
      <div className="user-section">
        <img src={userIcon} alt="User Icon" className="user-icon" />
        <p className="user-name">미르미</p>
      </div>

      {/* Icon Section */}
      <div className="icon-section">
        <div className="icon-item">
          <img src={bookmarkIcon} alt="Bookmark Icon" className="icon-image" />
          <p>스크랩북</p>
        </div>
        <div className="icon-item">
          <img
            src={alertIcon}
            alt="Notification Icon"
            className="-imageicon"
          />
          <p>알림</p>
        </div>
        <div className="icon-item">
          <img src={settingIcon} alt="Settings Icon" className="icon-image" />
          <p>설정</p>
        </div>
      </div>

      {/* List Section */}
      <div className="list-section">
        <div className="list-item">
          <p>내가 쓴 글</p>
          <img src={backIcon} alt="Arrow Icon" className="arrow-icon" />
        </div>
        <div className="list-item">
          <p>신청한 쿠킹 클래스</p>
          <img src={backIcon} alt="Arrow Icon" className="arrow-icon" />
        </div>
        <div className="list-item">
          <p>내 채팅방</p>
          <img src={backIcon} alt="Arrow Icon" className="arrow-icon" />
        </div>
      </div>
    </div>
  );
};