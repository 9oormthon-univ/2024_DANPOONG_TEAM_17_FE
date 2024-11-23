import '../styles/RecipeDetails.css';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import backIcon from '../assets/recipe/화살표.png';
import dummy_img from '../assets/dummy/계란찜.jpg'

export const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

    // 뒤로가기 버튼 클릭 시 레시피 페이지로 이동
    const handleBackClick = () => {
        navigate('/recipe');
    };

  return (
    <div className="recipe-details-page">
      <header className="details-header">
        <button className="back-btn" onClick={handleBackClick}>
          <img src={backIcon} alt="뒤로가기" />
        </button>
        <h1>레시피</h1>
      </header>

      <section className="recipe-info">
        <img src={dummy_img} alt="레시피 이미지" className="recipe-image" />
        <div className="recipe-title">
          <h2>소고기묵국</h2>
        </div>
        <div className="recipe-tags">
          <span className="tag">대한민국</span>
          <span className="tag">국</span>
        </div>
      </section>

      <section className="ingredients">
        <h3>재료</h3>
        <table className="ingredients-table">
          <thead>
            <tr>
              <th>재료</th>
              <th>수량 및 단위</th>
              <th>구매처</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>소고기</td>
              <td>1kg</td>
              <td>마트</td>
            </tr>
            <tr>
              <td>묵</td>
              <td>200g</td>
              <td>시장</td>
            </tr>
            <tr>
              <td>파</td>
              <td>50g</td>
              <td>마트</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="instructions">
        <h3>조리법</h3>
        <ol className="steps">
          <li>재료를 깨끗이 세척해주세요.</li>
          <li>소고기를 적당한 크기로 썰어주세요.</li>
          <li>묵을 얇게 썰어 냄비에 넣어주세요.</li>
          <li>물과 소고기를 함께 끓인 후 간을 맞추세요.</li>
          <li>완성된 소고기묵국을 예쁜 그릇에 담아주세요.</li>
        </ol>
      </section>

      <section className="related-products">
        <h3>필수 상품</h3>
        <div className="product-card">
          <img src={dummy_img} alt="상품 이미지" className="product-image" />
          <p>마트에서 구매 가능</p>
        </div>
      </section>

      <section className="comments">
        <h3>댓글</h3>
        <div className="comment">
          <p className="comment-author">미르미</p>
          <p className="comment-date">2024.10.29</p>
          <p className="comment-content">이 레시피 정말 좋아요!</p>
        </div>
        <div className="add-comment">
          <textarea placeholder="댓글을 작성해주세요"></textarea>
          <button className="submit-btn">작성</button>
        </div>
      </section>
    </div>
  );
};