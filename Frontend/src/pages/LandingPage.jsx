import React from "react";
import CardsPage from "./CardsPage";
import Home from "./Home";
import Navbar from "../components/Navbar";
import { useLoaderData  } from "react-router-dom";
import { useRef } from "react";

const LandingPage = () => {
  const allRecipes = useLoaderData();
  console.log(allRecipes);
  const cardsRef = useRef(null);

  // Function to scroll to CardsPage
  const scrollToCards = () => {
    setTimeout(() => {
      if (cardsRef.current) {
        cardsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100); // Small delay to ensure smooth scroll
  };


  return (
    <div className="w-screen overflow-x-hidden">
      <Navbar />
      <Home scrollToCards={scrollToCards}/>
      <div ref={cardsRef}>
      <CardsPage allRecipesData={allRecipes} />
      </div>
    </div>
  );
};

export default LandingPage;
