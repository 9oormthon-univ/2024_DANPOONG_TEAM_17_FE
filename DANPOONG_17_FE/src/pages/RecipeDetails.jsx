import '../styles/RecipeDetails.css';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { apiUrl } from '../axios/apiUrl';
import backIcon from '../assets/recipe/화살표.png';
import dummy_img from '../assets/dummy/계란찜.jpg';

export const RecipeDetails = () => {
  const { id } = useParams(); // URL에서 id 가져오기
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null); // 선택한 레시피 데이터 저장
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태

  // 가공된 재료 데이터를 반환
  const parseIngredients = (ingredientsString) => {
    const ingredientList = ingredientsString.split(','); // 문자열을 ','로 나누기
    return ingredientList.map((ingredient, index) => ({
      name: ingredient.trim(), // 재료 이름
      quantity: `${index + 1}T`, // 예시로 수량 설정
      source: index % 2 === 0 ? '마트' : '시장', // 예시로 구매처 설정
    }));
  };

  // 조리법을 쉼표(,)로 분리해 리스트로 변환
  const parseInstructions = (descriptionString) => {
    if (!descriptionString) return [];
    return descriptionString.split(',').map((step) => step.trim());
  };

  // 뒤로가기 버튼 클릭 시 레시피 페이지로 이동
  const handleBackClick = () => {
    navigate('/recipe');
  };

  // 모든 레시피를 가져와 id로 필터링
  const fetchRecipeDetails = async () => {
    try {
      setIsLoading(true);
      const response = await apiUrl.get('/api/recipes'); // 모든 레시피 조회
      const allRecipes = response.data.content; // 백엔드에서 받은 데이터

      // id로 해당 레시피 찾기
      const selectedRecipe = allRecipes.find((recipe) => recipe.id === parseInt(id, 10));
      setRecipe(selectedRecipe || null); // 해당 레시피 저장 (없으면 null)
    } catch (error) {
      console.error('Failed to fetch recipe details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipeDetails();
  }, [id]);

  if (isLoading) {
    return <p>로딩 중...</p>;
  }

  if (!recipe) {
    return <p>레시피를 찾을 수 없습니다.</p>;
  }

  const ingredientsTableData = parseIngredients(recipe.ingredients);
  const instructions = parseInstructions(recipe.description);

  return (
    <div className="recipe-details-page">
      <header className="details-header">
        <button className="back-btn" onClick={handleBackClick}>
          <img src={backIcon} alt="뒤로가기" />
        </button>
        <h1>레시피</h1>
      </header>

      <section className="recipe-info">
        <img src={recipe.imagePath || dummy_img} alt="레시피 이미지" className="recipe-image" />
        <div className="recipe-title">
          <h2>{recipe.title}</h2>
        </div>
        <div className="recipe-tags">
          {recipe.country && <span className="tag">{recipe.country}</span>}
          {recipe.difficulty && <span className="tag">{recipe.difficulty}</span>}
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
            {ingredientsTableData.map((ingredient, index) => (
              <tr key={index}>
                <td>{ingredient.name}</td>
                <td>{ingredient.quantity}</td>
                <td>{ingredient.source}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="instructions">
        <h3>조리법</h3>
        <ol className="steps">
          {instructions.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </section>
    </div>
  );
};
