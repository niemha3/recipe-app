const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Recipe = require('../models/recipe')


beforeEach(async () => {
    await Recipe.deleteMany({})

    let recipeObject = new Recipe(helper.initialRecipes[0])
    await recipeObject.save()

    recipeObject = new Recipe(helper.initialRecipes[1])
    await recipeObject.save()
})


it('should return recipes as json', async() => {
    await api
        .get('/api/recipes')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

afterAll(async () => {
    await mongoose.connection.close()
})

it('should return all recipes', async () => {
    const response = await api.get('/api/recipes')
    
    expect(response.body).toHaveLength(helper.initialRecipes.length)
})

it('should find specific recipe within the returned recipes', async () => {
    const response = await api.get('/api/recipes')

    const names = response.body.map(recipe => recipe.name)

    expect(names).toContain('Pork bibimbap')
})

it('should add new recipe to recipes list', async () => {
    const newRecipe = {
        name: 'Chicken Fajitas',
        ingredients: ['i1', 'i2', 'i3'],
        instructions: 'ins1'
    }

    await api
    .post('/api/recipes')
    .send(newRecipe)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const recipesAtEnd = await helper.recipesInDb()
    
    const names = recipesAtEnd.map(recipe => recipe.name)

    expect(recipesAtEnd).toHaveLength(helper.initialRecipes.length + 1)
    
    expect(names).toContain(newRecipe.name)

})

it('should not add recipe when name is not filled', async () => {
    const newRecipe = {
        mainIngredient: 'Chicken',
        ingredients: ['i1', 'i2'],
        instructions: 'ins1'
    }

    await api
    .post('/api/recipes')
    .send(newRecipe)
    .expect(400)

    const recipesAtEnd = await helper.recipesInDb()

    expect(recipesAtEnd).toHaveLength(helper.initialRecipes.length)

})

it('should show specific recipe', async() => {
    const recipesAtStart = await helper.recipesInDb()

    const recipeToShow = recipesAtStart[0]

    const resultRecipe = await api
    .get(`/api/recipes/${recipeToShow.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

    expect(resultRecipe.body).toEqual(recipeToShow)
})

it('should delete given recipe', async () => {
    const recipesAtStart = await helper.recipesInDb()

    const recipeToDelete = recipesAtStart[0]

    await api
    .delete(`/api/recipes/${recipeToDelete.id}`)
    .expect(204)

    const recipesAtEnd = await helper.recipesInDb()

    expect(recipesAtEnd).toHaveLength(helper.initialRecipes.length - 1)

    const names = recipesAtEnd.map(recipe => recipe.name)

    expect(names).not.toContain(recipeToDelete.name)
})
