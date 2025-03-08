import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import InputDialog from "../components/InputDialog";

const Home = ({ scrollToCards }) => {
  const [isOpen, setIsopen] = useState(false);
  const navigate = useNavigate();
  const handleAdRecipe = () => {
    let token = localStorage.getItem("token");
    if (token) {
      navigate("/addrecipe");
    } else {
      setIsopen(true);
    }
  };

  return (
    <>
      <div className="w-screen inset-0 overflow-hidden">
        <div className=" w-screen overflow-x-hidden flex flex-col items-center justify-center bg-gradient-to-r from-orange-500 to-red-500 text-white h-[450px]">
          <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl shadow-lg p-5 text-center w-[700px] mt-55">
            <h1 className="text-3xl font-bold mb-4 text-black">
              Explore Recipes
            </h1>
            <p className="text-lg text-black">
              Discover the best Recipes and enjoy amazing deals.
            </p>
            <div className=" flex gap-4    justify-center items-center p-4">
              <button
                className="p-3 text-white bg-black  hover:bg-gray-800 font-bold rounded-md shadow-lg transition duration-300 "
                onClick={handleAdRecipe}
              >
                Share Your Recipe
              </button>
              <button
                className="p-3 text-white bg-black  hover:bg-gray-800 font-bold rounded-md shadow-lg transition duration-300 "
                onClick={scrollToCards}
              >
                Explore Recipes
              </button>
            </div>
          </div>
          {isOpen && <InputDialog onClose={() => setIsopen(false)} />}
        </div>
      </div>
    </>
  );
};

export default Home;
