import React, { useEffect, useState } from "react";
import InputDialog from "./InputDialog";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSignIn, setSignIn] = useState(true);
  // const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    let storedToken = localStorage.getItem("token");
    setSignIn(!storedToken);
  }, []);

  const checkLogin = () => {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setSignIn(true);
    } else {
      setIsOpen(true);
    }
  };

  return (
    <nav className="w-screen flex justify-between items-center p-4 bg-white bg-opacity-20 backdrop-blur-lg shadow-lg">
      <div className="flex items-center">
        <img
          src="https://static.vecteezy.com/system/resources/previews/012/871/553/original/certified-halal-food-logo-best-for-food-packaging-islamic-food-logo-png.png"
          alt="Logo"
          className="h-10 ml-4"
        />
        <span className="ml-3 text-xl font-bold text-blue-950">FOODy</span>
      </div>

      <ul className="hidden md:flex mr-2 space-x-6 text-blue-950 text-xl font-semibold">
        <li className="cursor-pointer hover:text-gray-300 transition duration-300">
          <NavLink to="/">Home</NavLink>
        </li>
        <li
          className="cursor-pointer hover:text-gray-300 transition duration-300"
          onClick={() => isSignIn && setIsOpen(true)}
        >
          <NavLink to={isSignIn ? "/favrouteRecipe" : "/"}>Favorites</NavLink>
        </li>
        <li
          className="cursor-pointer hover:text-gray-300 transition duration-300"
          onClick={() => isSignIn && setIsOpen(true)}
        >
          <NavLink to={isSignIn ? "/Myrecipe" : "/"}>My Recipe</NavLink>
        </li>
        <li
          className="cursor-pointer hover:text-gray-300 transition duration-300"
          onClick={checkLogin}
        >
          {isSignIn ? "SignIn" : "SignOut"} :   
  
        </li>
      </ul>

      {isOpen && <InputDialog onClose={() => setIsOpen(false)} />}
    </nav>
  );
};

export default Navbar;

// onClick={()=>{setIsOpen(true)}}
