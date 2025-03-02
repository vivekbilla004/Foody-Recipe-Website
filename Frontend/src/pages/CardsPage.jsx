import React from 'react'

import Recipe from '../components/Recipe'

const CardsPage = ({allRecipesData}) => {


  return (
    <div className="flex flex-wrap justify-center  bg-blue-950 text-black  min-h-screen ">
      {/* Card components will be added here later */}
      {allRecipesData.map((recipe,index)=> 
      <Recipe 
      key = {index}
      title = {recipe.title}
      ingredients= {recipe.ingredients}
      instructions ={recipe.instructions}
      coverImage = {recipe.coverImage}
      time = {recipe.time}

      />
    ) }
    </div>
  )
}

export default CardsPage
