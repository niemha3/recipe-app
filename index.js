// npm run dev to run with nodemon
// Add comment

const http = require("http");
const express = require("express");
const app = express();

let recipes = [
  {
    id: 1,
    name: "Taco chicken salad",
    mainIngredient: "chicken",
    meal: "lunch",
    calories: 650,
    carbs: 50,
    protein: 40,
    fat: 20,
    instructions: "",
  },
  {
    id: 2,
    name: "Tuna club sandwich",
    mainIngredient: "Fish",
    meal: "lunch",
    calories: 650,
    carbs: 50,
    protein: 40,
    fat: 20,
    instructions: "",
  },
  {
    id: 3,
    name: "Pasta bolognese",
    mainIngredient: "Minced pork meat",
    meal: "lunch/dinner",
    calories: 650,
    carbs: 50,
    protein: 40,
    fat: 20,
    instructions: "testing nodemon",
  },
  {
    id: 4,
    name: "Protein oats",
    mainIngredient: "Oats",
    meal: "breakfast",
    calories: 333,
    carbs: 30,
    protein: 30,
    fat: 13,

  }
];

app.get("/", (req, res) => {
  res.send("<h1> Hello world! </h1>");
});

/**
 * Get all recipes
 */
app.get("/api/recipes", (req, res) => {
  res.json(recipes);
});

/**
 * Get recipe by id
 */
app.get("/api/recipes/:id", (request, response) => {
  const id = Number(request.params.id);
  const recipe = recipes.find((recipe) => recipe.id === id);

  if (recipe) {
    response.json(recipe);
  } else {
    response.status(404).end();
  }
});

/**
 * Delete recipe
 */
app.delete("/api/recipes/:id", (request, response) => {
  const id = Number(request.params.id);
  recipes = recipes.filter((recipe) => recipe.id !== id);

  response.status(204).end();
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on ${PORT}`);
