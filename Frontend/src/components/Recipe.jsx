import React from 'react'


const Recipe = ({ title, ingredients, instructions, time, coverImage }) => {

 
  return (
    <>
<div className="max-w-md bg-white h-[350px] rounded-lg shadow-lg overflow-hidden m-3 w-[250px]">
      <img src={coverImage} alt={title} className="w-full h-40 p-2 rounded-md object-cover" />
      <div className="">
        <h2 className="text-2xl font-bold  text-gray-900">{title}</h2>
        <p className="text-gray-700 font-medium">Cooking Time: {time.total} mins</p>
        <h3 className="font-semibold ">Ingredients:</h3>
        {/* <ul className="list-disc list-inside text-gray-700">
          {ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul> */}
        {/* <h3 className="font-semibold mt-4">Instructions:</h3> */}
        <p className="text-gray-700">{instructions}</p>
      </div>
    </div>
    </>
  )
}

export default Recipe
