var connect = require('connect');
var serveStatic = require('serve-static');
var express = require("express");
var app = express();
var bodyParser = require('body-parser');

var items = [];
var positions = [ { type: 'redMid', left: '520px', top: '400px' },
    { type: 'redJungle', left: '691px', top: '478px' },
    { type: 'redMarksman', left: '800px', top: '707px' },
    { type: 'redSupport', left: '772px', top: '674px' },
    { type: 'redTop', left: '312px', top: '148px' },
    { type: 'blueMid', left: '410px', top: '505px' },
    { type: 'blueJungle', left: '261px', top: '412px' },
    { type: 'blueMarksman', left: '690px', top: '798px' },
    { type: 'blueSupport', left: '666px', top: '747px' },
    { type: 'blueTop', left: '162px', top: '258px' } ];
var users = [];
var userTimes = {};

app.use(bodyParser.json());
app.post('/', function(req, res){
    user.push(req.body.user);
    res.status(200).json({message: users});
});

app.post('/sendPositions', function(req, res){
    res.status(200).json({message: 'Positions received'});
    positions = [];
    for(var i = 0; i < req.body.positions.length;i++){
        positions.push(req.body.positions[i]);
    }
    console.log(positions);
})


app.post('/sendItems', function(req, res){
    res.status(200).json({message: 'Items received'});
    items = [];
    for( var i = 0; i < req.body.items.length; i++){
        items.push(req.body.items[i]);
    }
    console.log(items);
});

app.post('/getPositions',function(req, res){
    var positionsJSON = {positions: []};
    for(var i = 0; i < positions.length; i++){
        var p = positions[i];
        positionsJSON.positions.push({type: p.type, left: p.left, top: p.top});
    }
    console.log(positionsJSON);
    res.status(200).json(positionsJSON);
})

app.post('/getItems', function(req, res){
    var itemsJSON = {items: []};
    for(var i = 0; i < items.length; i++){
        itemsJSON.items.push({type: items[i].type, x: items[i].x, y: items[i].y, x2: items[i].x2, y2: items[i].y2});
    }
    console.log(itemsJSON);
    res.status(200).json(itemsJSON);
});


app.use(serveStatic(__dirname, {'index': ['index.html']}));
app.listen(3000);
console.log("Listening on 3000")