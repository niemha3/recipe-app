const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connectiong to MongoDb: ', error.message)
    })

const recipeSchema = new mongoose.Schema({
    name: String,
    mainIngredient: String
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