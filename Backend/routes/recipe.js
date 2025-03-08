const express = require("express");
const router = express.Router();


const { getRecipe , getRecipeByID, addRecipe, updateRecipeById, deleteRecipeById ,upload } = require("../controllers/recipe");

const {verifyToken} = require("../middlewares/auth")

console.log("Recipe routes loaded");

router.get("/", getRecipe);
router.get("/:id", getRecipeByID);
router.post("/",upload.single("coverImage"),verifyToken,addRecipe);
router.put("/:id",upload.single("coverImage"), updateRecipeById);
router.delete("/:id", deleteRecipeById);

module.exports = router; 






