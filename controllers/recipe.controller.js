const recipeService = require('../services/recipe.service');

// GET /recipes
exports.getRecipes = async (req, res, next) => {
  try {
    const { category } = req.query;
    const recipes = await recipeService.getAllRecipes(category);
    return res.status(200).json({ success: true, count: recipes.length, data: recipes }); // Direct JSON signaling
  } catch (error) {
    next(error);
  }
};

// POST /recipes
exports.createRecipe = async (req, res, next) => {
  try {
    const newRecipe = await recipeService.createRecipe(req.body);
    return res.status(201).json({ success: true, data: newRecipe }); // Direct JSON signaling
  } catch (error) {
    next(error);
  }
};

// PATCH /recipes/:id
exports.updateRecipe = async (req, res, next) => {
  try {
    const updatedRecipe = await recipeService.updateRecipe(req.params.id, req.body);

    if (!updatedRecipe) {
      return res.status(404).json({ success: false, message: 'Recipe not found' });
    }

    return res.status(200).json({ success: true, data: updatedRecipe });
  } catch (error) {
    next(error);
  }
};

// DELETE /recipes/:id
exports.deleteRecipe = async (req, res, next) => {
  try {
    const deletedRecipe = await recipeService.deleteRecipe(req.params.id);

    if (!deletedRecipe) {
      return res.status(404).json({ success: false, message: 'Recipe not found' });
    }

    return res.status(200).json({ success: true, message: 'Recipe removed successfully' });
  } catch (error) {
    next(error);
  }
};