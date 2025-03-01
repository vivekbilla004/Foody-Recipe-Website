import React from 'react'
import CardsPage from './CardsPage'
import Home from "./Home"
import Navbar from '../components/Navbar'
import { useLoaderData } from 'react-router-dom'

const LandingPage = () => {
    const allRecipes = useLoaderData()
    console.log(allRecipes)

  return (
    <div className='w-screen overflow-x-hidden'>
      <Navbar/>
      <Home/>
      <CardsPage allRecipesData={allRecipes}/>
    </div>
  )
}

export default LandingPage
