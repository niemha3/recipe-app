const recipesRouter = require('express').Router()
const Recipe = require('../models/recipe')


/**
 * Get all recipes
 */
recipesRouter.get('/', async (request, response) => {
  const recipes = await Recipe.find({})
  response.json(recipes)

  })

/**
 * Get recipe by id
 */
recipesRouter.get('/:id', async (request, response, next) => {
 
  try {
    const recipe = await Recipe.findById(request.params.id)

    if(recipe) {
      response.json(recipe)

    } else {
      response.status(404).end()

    }
    
  } catch (exception) {

    next(exception)
    
  }
  
  })


/**
 * Delete recipe
 */
recipesRouter.delete('/:id', async (request, response, next) => {

  try {
    await Recipe.findByIdAndRemove(request.params.id)
    response.status(204).end()
    
  } catch (exception) {
    next(exception)
    
  }
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
recipesRouter.post('/', async (request, response, next) => {
    const body = request.body
 
  
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
  
  
    try {

      const savedRecipe = await recipe.save()
      response.status(201).json(savedRecipe)

    } catch (exception) {

      next(exception)
    }
    

  
  })

  module.exports = recipesRouter