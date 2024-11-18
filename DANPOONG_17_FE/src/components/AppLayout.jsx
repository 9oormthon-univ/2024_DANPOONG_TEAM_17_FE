import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <div className="app-layout">
      <main className="content">
        <Outlet /> {/* 각 페이지의 콘텐츠가 여기에 렌더링됩니다 */}
      </main>
      <Footer /> {/* 모든 페이지에 공통으로 표시되는 푸터 */}
    </div>
  );
};

export default AppLayout;