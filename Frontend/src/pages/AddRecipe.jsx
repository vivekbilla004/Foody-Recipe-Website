import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddRecipe = () => {
  const [recipesData , setRecipesData] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "coverImage") {
        setRecipesData((prev) => ({
            ...prev,
            coverImage: files[0], 
        }));
    } else if (name === "ingredients") {
        setRecipesData((prev) => ({
            ...prev,
            ingredients: value.split(",").map((item) => item.trim()), 
        }));
    } else {
        setRecipesData((prev) => ({
            ...prev,
            [name]: value, 
        }));
    }
};

const onHandleSubmit = async (e) => {
  e.preventDefault();

  console.log("📤 Sending Data:", recipesData);

  // Ensure all required fields are present
  if (!recipesData.title || !recipesData.ingredients?.length || !recipesData.instructions || !recipesData.time || !recipesData.coverImage) {
      console.error("❌ Missing required fields:", recipesData);
      alert("Please fill all required fields before submitting.");
      return;
  }

  //Create FormData and append fields properly
  const formData = new FormData();
  formData.append("title", recipesData.title);
  formData.append("ingredients", JSON.stringify(recipesData.ingredients));
  formData.append("instructions", recipesData.instructions);
  formData.append("time", recipesData.time);
  formData.append("coverImage", recipesData.coverImage); 

  // Debugging: Log FormData
  for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
  }

  try {
      const response = await axios.post("http://localhost:8000/recipes", formData, {
          headers: { "Content-Type": "multipart/form-data" ,
            "Authorization" :"bearer " + localStorage.getItem("token")
           },

      });

      console.log("✅ Recipe successfully added:", response.data);
      navigate("/");
  } catch (error) {
      console.error("❌ Error submitting recipe:", error.response?.data || error);
      alert("Error submitting recipe. Check the console for details.");
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



// {
//   headers: {
//     "Content-Type": " multipart/form-data",
//     "authorization": "Bearer " + localStorage.getItem("token"),
//   },
// }