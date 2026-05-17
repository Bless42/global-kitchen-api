require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const recipeRoutes = require('./routes/recipe.routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Establish Connection to Database Instance
connectDB();

// Base built-in JSON pipeline parser middleware 
app.use(express.json());

// Mount Application Domain Routes
app.use('/recipes', recipeRoutes);

// System Guard Central Interceptor Middleware (Must sit at the absolute bottom)
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🔥 Server listening cleanly on port ${PORT}`);
});