import { useState } from "react";
import mark_off from "../../assets/recipe/mark_off.png";
import mark_on from "../../assets/recipe/mark_on.png";
import './PopularRecipe.css';

const PopularRecipes = () => {
  // 더미 데이터
  const dummyRecipes = [
    { id: 1, title: "제목1", description: "여기는 본문입니다.", bookmarked: false },
    { id: 2, title: "제목2", description: "여기는 본문입니다.", bookmarked: false },
    { id: 3, title: "제목3", description: "여기는 본문입니다.", bookmarked: false },
  ];

  // 레시피 데이터 상태
  const [recipes, setRecipes] = useState(dummyRecipes);

  // 북마크 상태 변경 핸들러
  const toggleBookmark = (id) => {
    console.log("Toggling bookmark for recipe with id:", id);
    setRecipes((prevRecipes) =>
      prevRecipes.map((recipe) =>
        recipe.id === id
          ? { ...recipe, bookmarked: !recipe.bookmarked }
          : recipe
      )
    );
  };

  return (
    <section className="popular-recipes">
      <h2>인기 레시피</h2>
      <div className="recipe-list">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
            <button
              className="bookmark-btn"
              onClick={() => {
                console.log(`Clicked bookmark for recipe id: ${recipe.id}`);
                toggleBookmark(recipe.id)}}
            >
              <img
                src={recipe.bookmarked ? mark_on : mark_off}
                alt="북마크"
              />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularRecipes;
