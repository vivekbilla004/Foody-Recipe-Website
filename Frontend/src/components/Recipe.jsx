import React, { useEffect } from "react";
import { LuCookingPot } from "react-icons/lu";
import { FaHeart, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link, useLoaderData } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const Recipe = ({
  title,
  ingredients,
  instructions,
  time,
  coverImage,
  _id,
}) => {
  const Recipes = useLoaderData();
  const [allRecipesData, setAllRecipesData] = useState();
  let path = window.location.pathname === "/myrecipe" ? true : false;
  let favItems = JSON.parse(localStorage.getItem("favItems")) ?? [];
  const [isFavRecipe, setIsFavRecipe] = useState(
    favItems.some((recipe) => recipe._id === _id)
  );
  

  useEffect(() => {
    setAllRecipesData(Recipes);
  }, [Recipes]);

  const onHandleDelete = async (id) => {
    await axios
      .delete(`http://localhost:8000/recipes/${id}`)
      .then((res) => console.log(res));
      setAllRecipesData((Recipes) => Recipes.filter((recipe) => recipe._id !== id));
  };

  const onHandleFav = () => {
    let favItems = JSON.parse(localStorage.getItem("favItems")) || [];

    if (isFavRecipe) {
      // Remove from favorites
      favItems = favItems.filter((recipe) => recipe._id !== _id);
    } else {
      // Add the complete recipe details to localStorage
      favItems.push({ title, ingredients, instructions, time, coverImage, _id });
    }

    // Save updated favorites to localStorage
    localStorage.setItem("favItems", JSON.stringify(favItems));

    // Update state
    setIsFavRecipe(!isFavRecipe);
  };
  

  return (
    <>
      <div className="max-w-md bg-white h-[280px] rounded-lg shadow-lg overflow-hidden m-3 w-[200px] ">
        <img
          src={`http://localhost:8000/images/${coverImage}`}
          alt={title}
          className="w-full h-50 p-2 rounded-md object-cover"
        />
        <div className="">
          <h2 className="text-2xl font-bold  text-gray-900">{title}</h2>
          <div className="flex justify-around">
            <div className="text-gray-700 font-medium flex mt-4 ml-2 gap-1">
              <LuCookingPot className="mt-1" />
              <p>{time} mins</p>
            </div>
            <div className=" flex gap-1 m-5 font-large ">
              {!path ? (
                <FaHeart onClick={()=>onHandleFav()} className={`cursor-pointer transition-all duration-300 ${
                  isFavRecipe ? "text-red-500" : "text-gray-500"
                }`}/>
              ) : (
                <div className="flex gap-1">
                  <Link to={`/editrecipe/${_id}`}>
                    <FaEdit />
                  </Link>
                  <MdDelete onClick={() => onHandleDelete(_id)} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Recipe;


// const onHandleFav = () => {
//   favItems = favItems.filter((recipe) => recipe._id === _id).length > 0 ? [...favItems, { title, ingredients, instructions, time, coverImage, _id }] : favItems.filter((recipe) => recipe._id !== _id);
//   localStorage.setItem("favItems", JSON.stringify(favItems));
//   setISFavRecipe(pre =>! pre)
// }
