import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddRecipe = () => {
  const [recipesData , setRecipesData] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "ingredients") {
      setRecipesData((prev) => ({ ...prev, ingredients: e.target.value.split(",") }));
    } else if (e.target.name === "coverImage") {
      if (e.target.files.length > 0) {
        console.log("📸 File Selected:", e.target.files[0]); // Debugging line
        setRecipesData((prev) => ({ ...prev, coverImage: e.target.files[0] }));
      } else {
        console.error("❌ No file selected");
      }
    } else {
      setRecipesData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };
  

const onHandleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("title", recipesData.title);
  formData.append("ingredients", JSON.stringify(recipesData.ingredients)); // Convert to string
  formData.append("instructions", recipesData.instructions);
  formData.append("time", recipesData.time);

  //  Ensure the file is appended properly
  if (recipesData.coverImage) {
    formData.append("coverImage", recipesData.coverImage);
  } else {
    console.error("❌ No file selected");
    return; // Prevent submission if no file is selected
  }

  // 🛠 Debugging: Log FormData content before sending
  for (let pair of formData.entries()) {
    console.log(`📤 ${pair[0]}:`, pair[1]);
  }

  try {
    await axios.post("http://localhost:8000/recipes/", formData, {
      headers: { 
        "Content-Type": "multipart/form-data",
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    });

    navigate("/"); // Redirect on success
  } catch (error) {
    console.error("❌ Error:", error.response ? error.response.data : error.message);
  }
};





  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">Add a Recipe</h2>
      <form onSubmit={onHandleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="title"
          onChange={handleChange}
          placeholder="Recipe Title"
          className="p-2 border rounded"
          required
        />

        <textarea
          name="ingredients"
          onChange={handleChange}
          placeholder="Ingredients"
          className="p-2 border rounded"
          required
        />

        <textarea
          name="instructions"
          onChange={handleChange}
          placeholder="Instructions"
          className="p-2 border rounded"
          required
        />

        <input
          type="number"
          name="time"
          onChange={handleChange}
          placeholder="Cooking Time (mins)"
          className="p-2 border rounded"
          required
        />

        <input
          type="file"
          name="coverImage"
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

export default AddRecipe;






