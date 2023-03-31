const config = require('./utils/config')
const express = require('express')
require('express-async-errors')

// Fix 2
const path = require('path')
const app = express()

const cors = require('cors')
const recipesRouter = require('./controllers/recipes')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')



mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
.then(() => {
    logger.info('connected to MongoDB')
})
.catch((error) => {
    logger.error('error connection to MongoDB', error.message)
})

app.use(cors())
app.use(express.static(__dirname + '/build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/recipes', recipesRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

  /* final catch-all route to index.html defined last */
  recipesRouter.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'))
  })
  

module.exports = app