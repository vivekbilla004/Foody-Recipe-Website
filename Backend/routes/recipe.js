const express = require("express");
const router = express.Router();


const { getRecipe , getRecipeByID, addRecipe, updateRecipeById, deleteRecipeById } = require("../controllers/recipe");
const {verifyToken} = require("../middlewares/auth")
// Define routes
console.log("Recipe routes loaded");

router.get("/", getRecipe);
router.get("/:id", getRecipeByID);
router.post("/",addRecipe);
router.put("/:id", updateRecipeById);
router.delete("/:id", deleteRecipeById);

module.exports = router; 



// ,upload.single("file"),verifyToken


