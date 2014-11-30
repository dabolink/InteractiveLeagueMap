var connect = require('connect');
var serveStatic = require('serve-static');
var express = require("express");
var app = express();

app.post('/', function(req, res, next){
    res.status(200).json({message: 'You\'re a wizard, Harry'});
});


app.use(serveStatic(__dirname, {'index': ['index.html']}));
app.listen(3000);