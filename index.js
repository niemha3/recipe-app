// npm run dev to run with nodemon


const http = require("http")
const express = require("express")
const app = express()

app.use(express.json())

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

app.get('/', (req, res) => {
  res.send("<h1> Hello world! </h1>")
})

/**
 * Get all recipes
 */
app.get('/api/recipes', (req, res) => {
  res.json(recipes)
})

/**
 * Get recipe by id
 */
app.get('/api/recipes/:id', (request, response) => {
  const id = Number(request.params.id)
  const recipe = recipes.find((recipe) => recipe.id === id)

  if (recipe) {
    response.json(recipe)
  } else {
    response.status(404).end()
  }
})

/**
 * Delete recipe
 */
app.delete('/api/recipes/:id', (request, response) => {
  const id = Number(request.params.id)
  recipes = recipes.filter((recipe) => recipe.id !== id)

  response.status(204).end()
})

const generateId = () => {
  const maxId = recipes.length > 0
    ? Math.max(...recipes.map((recipe) => recipe.id)) : 0

  return maxId + 1
}

/**
 * Create recipe
 */
app.post('/api/recipes', (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const recipe = {
    name: body.name,
    mainIngredient: body.mainIngredient,
    meal: body.meal,
    id: generateId()
  }

  recipes = recipes.concat(recipe)

  response.json(recipe)

})

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on ${PORT}`)
