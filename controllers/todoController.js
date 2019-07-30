const bodyParser = require('body-parser')

let data = [
    {
        item: 'get milk'
    },
    {
        item: 'walk dog'
    },
    {
        item: 'code your app'
    }
]
const urlencodedParser = bodyParser.urlencoded({extended: false})

module.exports = function(app){
    app.get('/todo', function(req, res){
        res.render('todo', {todos: data})
    })

    app.post('/todo', urlencodedParser, function(req, res){
        data.push(req.body)
        res.json({todos: data})
    })

    app.delete('/todo/:item', function(req, res){
        data = data.filter(function(todo){
            return todo.item.replace(/ /g, '-') !== req.params.item
        })
        res.json({todos: data})
    })
}