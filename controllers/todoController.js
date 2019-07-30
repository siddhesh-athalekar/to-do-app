const bodyParser = require('body-parser')
const mongoose = require('mongoose')

// Connect to cloud database (MongoDB Atlas)
mongoose.connect('<db connection string>', {useNewUrlParser: true })

// Create a schema - this is like a blueprint
const todoSchema = new mongoose.Schema({
    item: String
})

// Create Model
const Todo = mongoose.model('Todo', todoSchema)

// Create and save data to mongodb
// const itemOne = Todo({item: 'buy fruits'}).save(function(err){
//     if(err){
//         throw err
//     }
//     console.log('item saved in cloud')
// })

const urlencodedParser = bodyParser.urlencoded({extended: false})

module.exports = function(app){
    app.get('/todo', function(req, res){
        // Get data from mongodb and pass it to the view
        Todo.find({}, function(err, data){
            if(err){
                throw err
            }
            res.render('todo', {todos: data})
        })        
    })

    app.post('/todo', urlencodedParser, function(req, res){
        // Get data from the view and pass it to mongodb
        const newTodo = Todo(req.body).save(function(err, data){
            if(err){
                throw err
            }
            res.json({todos: data}) 
        })        
    })

    app.delete('/todo/:item', function(req, res){
        // Delete the requested item from mongodb
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
            if(err){
                throw err
            }
            res.json({todos: data})
        })        
    })
}