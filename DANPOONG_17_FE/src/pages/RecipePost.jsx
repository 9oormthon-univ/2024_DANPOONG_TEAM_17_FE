import '../styles/RecipePost.css';

import { useState } from 'react';
import backIcon from '../assets/recipe/화살표.png';

export const RecipePost = () => {
  const [ingredients, setIngredients] = useState([{ name: '', quantity: '', source: '' }]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState([]);
  //const [image, setImage] = useState(null);

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: '', quantity: '', source: '' }]);
  };

  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index][field] = value;
    setIngredients(updatedIngredients);
  };

  const handleRemoveIngredient = (index) => {
    const updatedIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(updatedIngredients);
  };

  const handleFileChange = (event) => {
    const uploadedFiles = Array.from(event.target.files);
    setFiles(uploadedFiles);
  };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     setImage(file);
//     console.log('Selected File:', file);
//   };

  const handleSubmit = (e) => {
    e.preventDefault();
    const recipeData = {
      title,
      description,
      ingredients,
    };
    console.log('Recipe Submitted:', recipeData);
  };

  return (
    <div className="recipe-post">
      <header className="recipe-post-header">
        <button className="back-button" onClick={() => console.log('Back')}>
            <img src={backIcon} alt="뒤로가기" />
        </button>
        <h1>레시피</h1>
        <button className="submit-button" onClick={handleSubmit}>
          등록
        </button>
      </header>

      <main className="recipe-post-main">
        <input
          className="recipe-title-input"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="dropdowns">
          <select className="dropdown">
            <option>나라별</option>
            <option>한국</option>
            <option>중국</option>
            <option>일본</option>
          </select>
          <select className="dropdown">
            <option>난이도</option>
            <option>쉬움</option>
            <option>보통</option>
            <option>어려움</option>
          </select>
        </div>

        <table className="ingredients-table">
          <thead>
            <tr>
              <th>재료</th>
              <th>수량 및 단위</th>
              <th>구매처</th>
            </tr>
          </thead>
          <tbody>
            {ingredients.map((ingredient, index) => (
              <tr key={index}>
                <td>
                  <input
                    className="ingredient-input"
                    placeholder="재료"
                    value={ingredient.name}
                    onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    className="ingredient-input"
                    placeholder="수량"
                    value={ingredient.quantity}
                    onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    className="ingredient-input"
                    placeholder="구매처"
                    value={ingredient.source}
                    onChange={(e) => handleIngredientChange(index, 'source', e.target.value)}
                  />
                </td>
                <td>
                  <button className="remove-button" onClick={() => handleRemoveIngredient(index)}>
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="add-button" onClick={handleAddIngredient}>
          + 추가
        </button>

        <textarea
          className="description-input"
          placeholder="게시물을 작성해주세요."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="photo-upload">
        <label htmlFor="file-upload" className="file-label" />
          <input
            type="file"
            id="file-upload"
            multiple
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <button
            className="upload-btn"
            onClick={() => document.getElementById("file-upload").click()}
          >
            파일 선택
          </button>
        </div>
        {files.length > 0 && (
          <div className="file-info">
            <p>{files.length}개의 파일이 선택되었습니다.</p>
            <ul>
              {files.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
};
