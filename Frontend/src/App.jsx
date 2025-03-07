
import { createBrowserRouter ,RouterProvider } from 'react-router-dom'
import './App.css'
import axios from "axios"

import LandingPage from './pages/LandingPage'
import AddRecipe from './pages/AddRecipe'



function App() {
  
  const getAllRecipes = async() =>{
    let allRecipes = []
    await axios.get("http://localhost:8000/recipes").then((res)=>{
      allRecipes = res.data
    })
    return allRecipes
  }

  const getMyRecipe = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user")); 
  
      if (!user || !user._id) {
        console.warn("No user found in localStorage");
        return []; // ✅ Return empty array instead of crashing
      }
  
      const allRecipes = await getAllRecipes();
      return allRecipes.filter((item) => item.createdBy === user._id);
    } catch (error) {
      console.error("Error fetching user recipes:", error);
      return [];
    }
  };
  



  const router = createBrowserRouter([{
    path: "/",
    element : <LandingPage/> ,
     loader: getAllRecipes ,
  },
  {
    path: "/favrouteRecipe",
    element : <LandingPage/> ,
  },
  {
    path: "/myrecipe",
    element : <LandingPage/> ,
    loader: getMyRecipe ,
  },
  {
    path: "/addrecipe",
    element : <AddRecipe/> ,
  },
])

  return (
    <>
    <RouterProvider router={router} />
      
    </>
  )
}

export default App
