const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 4,
        required: true
    },
    mainIngredient: String,
    cookingTime: Number,
    protein: Number,
    carbohydrates: Number,
    fat: Number,
    ingredients: [String],
    instructions: [String]
})

// Muutetaan mongoosen palauttama _id olio merkkijonoksi
recipeSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Recipe', recipeSchema)