import React from 'react'

import Recipe from '../components/Recipe'

const CardsPage = ({allRecipesData}) => {


  return (
    <div className="flex flex-wrap justify-center  bg-blue-950 text-black  min-h-screen ">
      
      {allRecipesData.map((recipe,index)=> 
      <Recipe 
      key = {index}
      title = {recipe.title}
      ingredients= {recipe.ingredients}
      instructions ={recipe.instructions}
      coverImage = {recipe.coverImage}
      time = {recipe.time}
      _id = {recipe._id}

      />
    ) }
    </div>
  )
}

export default CardsPage
