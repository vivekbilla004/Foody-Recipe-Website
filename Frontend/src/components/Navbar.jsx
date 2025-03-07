
import React, { useEffect, useState } from "react";
import InputDialog from "./InputDialog";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setIsSignedIn(!!storedToken); 
  }, []);

  const handleAuth = () => {
    if (isSignedIn) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsSignedIn(false);
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
        <li className="cursor-pointer hover:text-gray-300 transition duration-300">
          <NavLink to={isSignedIn ? "/favrouteRecipe" : "#"} onClick={!isSignedIn ? () => setIsOpen(true) : undefined}>
            Favorites
          </NavLink>
        </li>
        <li className="cursor-pointer hover:text-gray-300 transition duration-300">
          <NavLink to={isSignedIn ? "/myrecipe" : "#"} onClick={!isSignedIn ? () => setIsOpen(true) : undefined}>
            My Recipe
          </NavLink>
        </li>
        <li className="cursor-pointer hover:text-gray-300 transition duration-300" onClick={handleAuth}>
          {isSignedIn ? "Sign Out" : "Sign In"}
        </li>
      </ul>

      {isOpen && <InputDialog onClose={() => setIsOpen(false)} />}
    </nav>
  );
};

export default Navbar;

