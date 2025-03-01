const mongoose = require("mongoose");

const RecipeSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  ingredients: {
    type: [String],  
    required: true
  },
  instructions: {
    type: [String],  
    required: true
  },
  time: {
    prep: { type: String, required: true },
    cook: { type: String, required: true },
    total: { type: String, required: true }
  },
  coverImage: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Recipe", RecipeSchema);
