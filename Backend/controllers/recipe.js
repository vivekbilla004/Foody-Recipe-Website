const Recipes = require("../models/recipe")

// const multer  = require('multer')

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './public/images')
//     },
//     filename: function (req, file, cb) {
//       const filename= Date.now() + '-' + file.fieldname
//       cb(null, filename)
//     }
//   })
  
//   const upload = multer({ storage: storage })

const getRecipe = async(req,res)=>{
    const recipe = await Recipes.find()
    return res.json(recipe)
}

const getRecipeByID = async(req,res)=>{
   const recipeById = await Recipes.findById(req.params.id)
   return res.json(recipeById)
}
const addRecipe = async (req, res) => {
    try {
        // console.log(req.user);
        // console.log(req.file)

        const { title, ingredients, instructions, time, coverImage } = req.body;

        // Check for missing fields and return immediately
        if (!title || !ingredients || !instructions || !time || !coverImage) {
            return res.json({ message: "Required field can't be empty" });  // ✅ Added return to stop further execution
        }

        const newRecipe = await Recipes.create({
            title,
            ingredients,
            instructions,
            time,
            coverImage 
            // createdBy : req.user.id
        });

        return res.json(newRecipe); 
    } catch (error) {
        console.error("Error in addRecipe:", error);  
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

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

