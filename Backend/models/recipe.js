const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  ingredients: [{ type: Array, required: true }],
  instructions: [{ type: String, required: true }], 
  time: { type: String, required: true },
  coverImage: { type: String, required: false } ,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Recipe", recipeSchema);
