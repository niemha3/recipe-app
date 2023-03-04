const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://harrinieminenkoodaa:${password}@cluster0.natsda8.mongodb.net/recipeApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const recipeSchema = new mongoose.Schema({
    name: String,
    mainIngredient: String
})

const Recipe = mongoose.model('Recipe', recipeSchema)

const recipe = new Recipe({
    name: 'Salmon with smashed potatoes',
    mainIngredient: 'Salmon'
})



recipe.save().then(result => {
    console.log('recipe saved!')
    mongoose.connection.close()
})

Recipe.find({}).then(result => {
    result.forEach(recipe => {
        console.log(recipe)
    })
    mongoose.connection.close()
})