const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Recipe title is required'],
      trim: true,
    },
    ingredients: {
      type: [String],
      required: [true, 'Ingredients array cannot be empty'],
      validate: {
        validator: function (v) {
          return Array.isArray(v) && v.length > 0;
        },
        message: 'A recipe must have at least one ingredient.',
      },
    },
    instructions: {
      type: String,
      required: [true, 'Cooking instructions are required'],
      trim: true,
    },
    cookingTime: {
      type: Number,
      required: [true, 'Cooking time is required'],
      min: [1, 'Cooking time must be a positive number'],
    },
    difficulty: {
      type: String,
      required: [true, 'Difficulty level is required'],
      enum: {
        values: ['Easy', 'Medium', 'Hard'],
        message: '{VALUE} is not a valid difficulty level',
      },
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
    },
  },
  {
    timestamps: true, // Captures record mutations directly via standard BSON Date objects
  }
);

// High-performance read index optimizing query speed on categories lookup
recipeSchema.index({ category: 1 });

module.exports = mongoose.model('Recipe', recipeSchema);