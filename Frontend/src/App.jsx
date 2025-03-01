
import { createBrowserRouter ,RouterProvider } from 'react-router-dom'
import './App.css'
import axios from "axios"

import LandingPage from './pages/LandingPage'



function App() {
  
  const getAllRecipes = async() =>{
    let allRecipes = []
    await axios.get("http://localhost:8000/recipes").then((res)=>{
      allRecipes = res.data
    })
    return allRecipes
  }



  const router = createBrowserRouter([{
    path: "/",
    element : <LandingPage/> ,
     loader: getAllRecipes
  }
])

  return (
    <>
    <RouterProvider router={router} />
      
    </>
  )
}

export default App
