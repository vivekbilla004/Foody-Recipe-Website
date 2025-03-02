
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

  const getMyRecipe =async() => {
    let user = JSON.parse(localStorage.getItem("user"))
    let allRecipes = await getAllRecipes()
    allRecipes.filter(item => item.createdBy === user._id) 
  }



  const router = createBrowserRouter([{
    path: "/",
    element : <LandingPage/> ,
     loader: getAllRecipes
  },
  {
    path: "/favrouteRecipe",
    element : <LandingPage/> ,
  },
  {
    path: "/myrecipe",
    element : <LandingPage/> ,
    loader: getMyRecipe
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
