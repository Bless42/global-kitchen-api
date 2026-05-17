const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipe.controller');

router.route('/')
  .get(recipeController.getRecipes)
  .post(recipeController.createRecipe);

router.route('/:id')
  .patch(recipeController.updateRecipe)
  .delete(recipeController.deleteRecipe);

module.exports = router;