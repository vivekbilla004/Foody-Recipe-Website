const express = require("express");
const router = express.Router();

// Import your controller functions (assuming they exist)
const { getRecipe , getRecipeByID, addRecipe, updateRecipeById, deleteRecipeById} = require("../controllers/recipe");

// Define routes
console.log("Recipe routes loaded");

router.get("/", getRecipe);
router.get("/:id", getRecipeByID);
router.post("/", addRecipe);
router.put("/:id", updateRecipeById);
router.delete("/:id", deleteRecipeById);

module.exports = router; // ✅ This correctly exports `router`


