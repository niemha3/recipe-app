// npm run dev to run with nodemon


require('dotenv').config()
const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const Recipe = require('./models/recipe')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))



app.get('/', (req, res) => {
  res.send("<h1> Hello world! </h1>")
})

/**
 * Get all recipes
 */
app.get('/api/recipes', (request, response) => {
  Recipe.find({}).then(recipes => {
    response.json(recipes)
  })
})

/**
 * Get recipe by id
 */
app.get('/api/recipes/:id', (request, response) => {
  Recipe.findById(request.params.id).then(recipe => {
    response.json(recipe)
  })
})

/**
 * Delete recipe
 */
app.delete('/api/recipes/:id', (request, response) => {
  const id = Number(request.params.id)
  recipes = recipes.filter((recipe) => recipe.id !== id)

  response.status(204).end()
})


/**
 * Create recipe
 */
app.post('/api/recipes', (request, response) => {
  const body = request.body

  if (body.name === undefined) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const recipe = new Recipe({
    name: body.name,
    mainIngredient: body.mainIngredient,
  })




  recipe.save().then(savedRecipe => {
    response.json(savedRecipe)
  })

})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})

// const mongoose = require('mongoose')

// if (process.argv.length < 3) {
//   console.log('give password as argument')
//   process.exit(1)
// }

// const password = process.argv[2]

// const url = process.env.MONGODB_URI

// console.log('connecting to', url)

// mongoose.connect(url)
//   .then(result => {
//     console.log('connected to MONGODB')
//   })
//   .catch((error) => {
//     console.log('error connecting to MongoDB: ', error.message)
//   })
