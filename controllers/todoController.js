const bodyParser = require('body-parser')

const data = [
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

    app.delete('/todo', function(req, res){

    })
}