const Recipe = require('../models/Recipe')

const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images')
    },
    filename: function (req, file, cb) {
      const filename= Date.now() + '-' + file.fieldname
      cb(null, filename)
    }
  })
  
  const upload = multer({ storage: storage })

const getRecipe = async(req,res)=>{
    const recipes = await Recipe.find()
    return res.json(recipes)
}

const getRecipeByID = async(req,res)=>{
   const recipeById = await Recipe.findById(req.params.id)
   return res.json(recipeById)
}

const addRecipe = async (req, res) => {
    try {
        console.log(req.user);
        console.log("📥 Received Data:", JSON.stringify(req.body, null, 2));
        console.log("📂 Received File:", req.file ? req.file.filename : "No file received");

        const { title, ingredients, instructions, time, coverImage } = req.body;

        if (!title || !ingredients || !instructions || !time) {
            return res.status(400).json({ message: "Required fields can't be empty" });
        }
        const formattedIngredients = Array.isArray(ingredients) ? ingredients : JSON.parse(ingredients);

        const newRecipe = await Recipe.create({
            title,
            ingredients: formattedIngredients,
            instructions,
            time,
            coverImage : req.file.filename ,
            createdBy: req.user.id
        });

        console.log("✅ Recipe Successfully Saved:", newRecipe);
        return res.status(201).json(newRecipe);
    } catch (error) {
        console.error("❌ Error in addRecipe:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};



const updateRecipeById = async(req,res)=>{
    const{title , ingredients , instructions , time , coverImage} = req.body;
    let recipe = await Recipe.findById(req.params.id)
    if(recipe) {
        await Recipes.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.json({title , ingredients , instructions , time , coverImage})
    }
}
const deleteRecipeById = (req,res)=>{
    res.json({message:"hello namaste"})
}

module.exports = {getRecipe,getRecipeByID,addRecipe,updateRecipeById,deleteRecipeById , upload };


