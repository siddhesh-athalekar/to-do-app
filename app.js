const express = require('express')
const todoController = require('./controllers/todoController')

const app = express()

// setup template engine
app.set('view engine', 'ejs')

// Static files
app.use(express.static('./public'))

// Fire Controllers
todoController(app)

// Listen to a port
app.listen(3000)
console.log('Server started on port 3000...')
