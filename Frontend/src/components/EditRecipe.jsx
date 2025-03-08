import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const EditRecipe = () => {
  const [recipesData, setRecipesData] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      await axios
        .get(`http://localhost:8000/recipes/${id}`)
        .then((response) => {
          let res = response.data;
          setRecipesData({
            title: res.title,
            ingredients: res.ingredients.join(","),
            instructions: res.instructions,
            time: res.time,
            coverImage: res.coverImage || null,
          });
        });
    };
    getData();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "ingredients") {
      setRecipesData({ ...recipesData, ingredients: e.target.value });
    } else if (e.target.name === "coverImage") {
      if (e.target.files.length > 0) {
        setRecipesData({ ...recipesData, coverImage: e.target.files[0] });
      }
    } else {
      setRecipesData({ ...recipesData, [e.target.name]: e.target.value });
    }
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .put(`http://localhost:8000/recipes/${id}`, recipesData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "bearer " + localStorage.getItem("token"),
        },
      })
      .then(() => navigate("/myrecipe"));
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">Add a Recipe</h2>
      <form onSubmit={onHandleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="title"
          onChange={handleChange}
          value={recipesData.title}
          placeholder="Recipe Title"
          className="p-2 border rounded"
          required
        />

        <textarea
          name="ingredients"
          onChange={handleChange}
          value={recipesData.ingredients}
          placeholder="Ingredients"
          className="p-2 border rounded"
          required
        />

        <textarea
          name="instructions"
          onChange={handleChange}
          value={recipesData.instructions}
          placeholder="Instructions"
          className="p-2 border rounded"
          required
        />

        <input
          type="number"
          name="time"
          onChange={handleChange}
          value={recipesData.time}
          placeholder="Cooking Time (mins)"
          className="p-2 border rounded"
          required
        />

        <input
          type="file"
          name="coverImage"
          //   value={recipesData.coverImage}
          onChange={handleChange}
          placeholder="file"
          className="p-2 border rounded"
        />

        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Submit Recipe
        </button>
      </form>
    </div>
  );
};

export default EditRecipe;
