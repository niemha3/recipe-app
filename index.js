const express = require('express')
const path = require('path')
const app = express()
const cors = require('cors')
require('dotenv').config()

const Recipe = require('./models/recipe')

const requestLogger = (request, response, next) => {
  console.log('Method: ', request.method)
  console.log('Path: ', request.path)
  console.log('Body: ', request.body)
  console.log('---')
  next()
}



app.use(cors())
app.use(express.json())
app.use(requestLogger)
app.use(express.static('build'))
// app.use(express.static(path.resolve(__dirname, 'build')))


//add comment
// app.get("*", (_, res) => // this solves the issue of individual routes /profile/test not working after deployment
//   res.sendFile(path.resolve("build", "index.html"))
// )

/**
 * Get all recipes
 */
app.get('/api/recipes', (request, response) => {
  Recipe.find({}).then(recipes => {
    response.json(recipes)
  })
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}



const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status()
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}



/**
 * Get recipe by id
 */
app.get('/api/recipes/:id', (request, response, next) => {
  Recipe.findById(request.params.id).then(recipe => {
    if (recipe) {
      response.json(recipe)
    } else {
      response.status(404).end()
    }
  })
    .catch(error => next(error))


})

/**
 * Delete recipe
 */
app.delete('/api/recipes/:id', (request, response, next) => {
  Recipe.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))

})

/**
 * Update existing recipe
 */
app.put('/api/recipes/:id', (request, response, next) => {
  const { name, mainIngredient } = request.body

  Recipe.findByIdAndUpdate(request.params.id, { name, mainIngredient }, { new: true, runValidators: true, context: 'query' })
    .then(updatedRecipe => {
      response.json(updatedRecipe)
    })
    .catch(error => next(error))
})


/**
 * Create recipe
 */
app.post('/api/recipes', (request, response, next) => {
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
    .catch(error => next(error))

})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)


})

