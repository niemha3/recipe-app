const Recipe = require('../models/recipe')

const initialRecipes = [
    {
        name: 'Pasta bolognese',
        ingredients: ['i1', 'i2', 'i3'],
        instructions: 'ins1'
    },
    {
        name: 'Pork bibimbap',
        ingredients: ['i1', 'i2', 'i3'],
        instructions: 'ins1'
    }
]

const nonExistingId = async () => {
    const recipe = new Recipe({name: 'willBeRemoved'})
    await recipe.save()
    await recipe.remove()

    return recipe._id.toString() 
}

const recipesInDb = async () => {
    const recipes = await Recipe.find({})
    return recipes.map(recipe => recipe.toJSON())
}

module.exports = {
    initialRecipes, nonExistingId, recipesInDb
}