const Recipe = require('../models/recipe.model');

class RecipeService {
  async getAllRecipes(categoryFilter) {
    // Non-blocking asynchronous query evaluation matching constraints
    const filter = categoryFilter ? { category: { $regex: categoryFilter, $options: 'i' } } : {};
    return await Recipe.find(filter);
  }

  async createRecipe(recipeData) {
    const newRecipe = new Recipe(recipeData);
    return await newRecipe.save();
  }

  async updateRecipe(id, updateData) {
    return await Recipe.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true, // Forces PATCH executions to obey schema validation limits
    });
  }

  async deleteRecipe(id) {
    return await Recipe.findByIdAndDelete(id);
  }
}

module.exports = new RecipeService();