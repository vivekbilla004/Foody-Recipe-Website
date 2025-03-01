import React from "react";


const Home = () => {
  return (
    <>
     

     <div className=" w-screen overflow-x-hidden flex flex-col items-center justify-center bg-gradient-to-r from-orange-500 to-red-500 text-white min-h-screen">
      <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl shadow-lg p-5 mt-6 text-center w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-4 text-black">Order Food & Groceries</h1>
        <p className="text-lg text-black">Discover the best restaurants and enjoy amazing deals.</p>
        <input
          className="mt-6 bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition duration-300"
          placeholder="Search here"
        />
      </div>
    </div>
      
    </>
  );
};

export default Home;
