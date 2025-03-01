import React from 'react'

const Navbar = () => {
  return (
    <nav className="w-screen flex justify-between items-center p-4  h-18 bg-white bg-opacity-20 backdrop-blur-lg shadow-lg">
      <div className="flex items-center">
        <img src="https://static.vecteezy.com/system/resources/previews/012/871/553/original/certified-halal-food-logo-best-for-food-packaging-islamic-food-logo-png.png" alt="Logo" className="h-10 ml-4" />
        <span className="ml-3 text-xl font-bold text-blue-950">FOODy</span>
      </div>
      <ul className="hidden md:flex mr-2 space-x-6 text-blue-950 text-xl font-semibold">
        <li className="cursor-pointer hover:text-gray-300 transition duration-300">Home</li>
        <li className="cursor-pointer hover:text-gray-300 transition duration-300">My Recipes</li>
        <li className="cursor-pointer hover:text-gray-300 transition duration-300">Favourites</li>
        <li className="cursor-pointer hover:text-gray-300 transition duration-300">Sign In</li>
      </ul>
      <button className="md:hidden text-white text-2xl">☰</button>
    </nav>
  )
}

export default Navbar;
