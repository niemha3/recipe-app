const recipesRouter = require('express').Router()
const Recipe = require('../models/recipe')


/**
 * Get all recipes
 */
recipesRouter.get('/recipes', (request, response) => {
    Recipe.find({}).then(recipes => {
      response.json(recipes)
    })
  })

/**
 * Get recipe by id
 */
recipesRouter.get('/', (request, response, next) => {
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
recipesRouter.delete('/:id', (request, response, next) => {
    Recipe.findByIdAndRemove(request.params.id)
      .then(result => {
        response.status(204).end()
      })
      .catch(error => next(error))
  
  })

  
/**
 * Update existing recipe
 */
recipesRouter.put('/:id', (request, response, next) => {
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
recipesRouter.post('/api/recipes', (request, response, next) => {
    const body = request.body
  
    if (body.name === undefined) {
      return response.status(400).json({
        error: 'content missing'
      })
    }
  
    const recipe = new Recipe({
      name: body.name,
      mainIngredient: body.mainIngredient,
      cookingTimeInMinutes: body.cookingTime,
      protein: body.protein,
      carbohydrates: body.carbohydrates,
      fat: body.fat,
      ingredients: body.ingredients,
      instructions: body.instructions
  
    })
  
  
  
  
    recipe.save().then(savedRecipe => {
      response.json(savedRecipe)
    })
      .catch(error => next(error))
  
  })

  module.exports = recipesRouter