var connect = require('connect');
var serveStatic = require('serve-static');
var express = require("express");
var app = express();
var bodyParser = require('body-parser');

var items = [];

app.use(bodyParser.json());
app.post('/', function(req, res){
    res.status(200).json({message: 'You\'re a wizard, Harry'});
});
app.post('/sendItems', function(req, res){
    res.status(200).json({message: 'message recieved'});
    for( var i = 0; i < req.body.items.length; i++){
        items.push(req.body.items[i]);
    }
    console.log(items);
});
app.post('/getItems', function(req, res){
    var itemsJSON = {items: []};
    for(var i = 0; i < items.length; i++){
        itemsJSON.items.push({type: items[i].type, x: items[i].x, y: items[i].y, x2: items[i].x2, y2: items[i].y2});
    }
    console.log(itemsJSON)
    res.status(200).json(itemsJSON);
});


app.use(serveStatic(__dirname, {'index': ['index.html']}));
app.listen(3000);