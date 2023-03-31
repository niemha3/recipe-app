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
recipesRouter.get('/:id', async (request, response) => {
 
    const recipe = await Recipe.findById(request.params.id)

    if(recipe) {
      response.json(recipe)

    } else {
      response.status(404).end()

    }
  })


/**
 * Delete recipe
 */
recipesRouter.delete('/:id', async (request, response) => {

    await Recipe.findByIdAndRemove(request.params.id)
    response.status(204).end()
    
  })

  
/**
 * Update existing recipe
 */
recipesRouter.put('/:id', (request, response, next) => {
    const { 
      name,
      meal,
      imageUrlId,
      mainIngredient,
      cookingTimeInMinutes, 
      calories,
      protein, 
      carbohydrates, 
      fat, 
      ingredients, 
      instructions 
    } = request.body
  
    Recipe.findByIdAndUpdate(
      request.params.id,
      { name, meal, mainIngredient, cookingTimeInMinutes, calories, protein, carbohydrates, fat, ingredients, instructions },
      { new: true, runValidators: true, context: 'query' })
      .then(updatedRecipe => {
        response.json(updatedRecipe)
      })
      .catch(error => next(error))
  })

/**
 * Create recipe
 */
recipesRouter.post('/', async (request, response) => {
    const body = request.body
 
  
    const recipe = new Recipe({
      name: body.name,
      meal: body.meal,
      imageUrlId: body.imageUrlId,
      mainIngredient: body.mainIngredient,
      cookingTimeInMinutes: body.cookingTimeInMinutes,
      calories: body.calories,
      protein: body.protein,
      carbohydrates: body.carbohydrates,
      fat: body.fat,
      ingredients: body.ingredients,
      instructions: body.instructions
  
    })
  
      const savedRecipe = await recipe.save()
      response.status(201).json(savedRecipe)
  })

  recipesRouter.get("*", (_, res) => // this solves the issue of individual routes /profile/test not working after deployment
  res.sendFile(path.resolve("build", "index.html"))
);
  module.exports = recipesRouter