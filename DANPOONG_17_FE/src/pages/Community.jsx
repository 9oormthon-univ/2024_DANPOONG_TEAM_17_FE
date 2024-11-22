import '../styles/CommunityPage.css';
import Header from '../components/Header';
import dummy_img from '../assets/dummy/계란찜.jpg';

export const Community = () => {
  const sections = [
    {
      title: '쿠킹 클래스',
      description:
        '세계 각국의 요리를 배울 수 있는 쿠킹클래스! 다양한 문화를 직접 체험하며 새로운 요리 스킬을 익혀보세요.',
      images: [dummy_img, dummy_img, dummy_img], // 이미지 파일명
    },
    {
      title: '함께 요리하기',
      description:
        '같이 요리하며 새로운 친구를 만나보세요! 다양한 국적의 사람들과 함께 요리하며 문화와 맛의 교류를 즐길 수 있습니다.',
      images: [dummy_img, dummy_img, dummy_img],
    },
    {
      title: '맛집 탐방하기',
      description:
        '현지인이 추천하는 맛집을 탐방하며 진정한 로컬 맛을 느껴보세요. 함께 음식의 매력을 나누며 새로운 추억을 만들어보세요.',
      images: [dummy_img, dummy_img, dummy_img],
    },
  ];

  return (
    <div className="community-page">
      <Header />
      {sections.map((section, index) => (
        <div key={index} className="community-section">
          <div className="section-header">
            <h2>{section.title}</h2>
            <button className="view-more-btn">전체보기</button>
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