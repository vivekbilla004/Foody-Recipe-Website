import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"



const AddRecipe = () => {
  const [recipeData,setRecipeData] = useState({})
  const navigate = useNavigate();

 const handleChange = (e) =>{
  console.log(e.target.files[0])
 let val =(e.target.name === "ingredients") ? e.target.value.split(" , ") : (e.target.name === "file") ? e.target.files[0]: e.target.value
   setRecipeData(pre => ({...pre , [e.target.name] : val}))
 }

 const handleSubmit = async (e) => {
e.preventDefault();


  console.log(recipeData)


try {
  await axios.post("http://localhost:8000/recipes", recipeData, {
    headers: {
     "Content-Type": " multipart/form-data",
      "authorization": "Bearer " +localStorage.getItem("token")
    },
  });
  navigate("/");
} catch (error) {
  console.error("Error uploading recipe:", error);
}


 }

  return (
<div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">Add a Recipe</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          type="text"
          name="file"
          
          onChange={handleChange}
          placeholder="file"
          className="p-2 border rounded"
          required
        />

        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Submit Recipe
        </button>
      </form>
    </div>
  )
}

export default AddRecipe
