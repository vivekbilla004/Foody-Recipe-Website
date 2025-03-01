const Recipes = require("../models/recipe")

const getRecipe = async(req,res)=>{
    const recipe = await Recipes.find()
    return res.json(recipe)
}

const getRecipeByID = async(req,res)=>{
   const recipeById = await Recipes.findById(req.params.id)
   return res.json(recipeById)
}
const addRecipe = async(req,res)=>{
    const{title , ingredients , instructions , time , coverImage} = req.body;
    if(!title || !ingredients || !instructions || !time || !coverImage) {
        res.json({message: "required field can't be empty"})
    }
    const newRecipe = await Recipes.create({
        title , ingredients , instructions , time , coverImage
    })
    return res.json(newRecipe)
}
const updateRecipeById = async(req,res)=>{
    const{title , ingredients , instructions , time , coverImage} = req.body;
    let recipe = await Recipes.findById(req.params.id)
    if(recipe) {
        await Recipes.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.json({title , ingredients , instructions , time , coverImage})
    }
}
const deleteRecipeById = (req,res)=>{
    res.json({message:"hello namaste"})
}

module.exports= {getRecipe,getRecipeByID,addRecipe,updateRecipeById,deleteRecipeById};

