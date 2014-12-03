var connect = require('connect');
var serveStatic = require('serve-static');
var app = require("express")();
var bodyParser = require('body-parser');
var http = require('http');
var server = http.createServer(app).listen(3000);
var io = require('socket.io').listen(server);
var items = [];
var users = [];

var startPositions = {'redMid': {left: '520px', top: '400px' },
    'redJungle': {left: '691px', top: '478px'},
    'redMarksman': {left: '800px', top: '707px' },
    'redSupport': {left: '772px', top: '674px' },
    'redTop': {left: '312px', top: '148px' },
    'blueMid': {left: '410px', top: '505px' },
    'blueJungle': {left: '261px', top: '412px' },
    'blueMarksman': {left: '690px', top: '798px' },
    'blueSupport': {left: '666px', top: '747px' },
    'blueTop': {left: '162px', top: '258px' } };
var positions = {'redMid': {left: '520px', top: '400px' },
    'redJungle': {left: '691px', top: '478px'},
    'redMarksman': {left: '800px', top: '707px' },
    'redSupport': {left: '772px', top: '674px' },
    'redTop': {left: '312px', top: '148px' },
    'blueMid': {left: '410px', top: '505px' },
    'blueJungle': {left: '261px', top: '412px' },
    'blueMarksman': {left: '690px', top: '798px' },
    'blueSupport': {left: '666px', top: '747px' },
    'blueTop': {left: '162px', top: '258px' } };
/////////////////////////////// SOCKET IO /////////////////////////////////////////////////
io.on('connection', function(socket){
    console.log("user has connected");
    socket.emit('sendItems',{items: items});
    socket.emit('sendPositions',{positions: positions});
    socket.on('disconnect', function(){
        console.log("a user has disconnected");
        users = [];
        io.sockets.emit('sendUser');
    });
    socket.on('join',function(msg){
        console.log(msg.name);
        users.push(msg.name);
        io.sockets.emit('getUsers',{users: users});
    })
    socket.on('reset',function(){
        console.log("reset");
        for(var k in positions){
            positions[k].top = startPositions[k].top;
            positions[k].left = startPositions[k].left
        }
        items = [];
        console.log(positions)
        io.sockets.emit('getPositions', positions);
        io.sockets.emit('getItems', {items: items});
    })
    socket.on('sendPositions',function(p) {
        positions = p.positions;
        io.sockets.emit('getPositions', {positions: p.positions});
        console.log("positions sent");
    });
    socket.on('sendPosition',function(p){
        for(var key in p) {
            console.log("key " + positions[key]);
            if(positions[key] != undefined) {
                positions[key].top = p.top;
                positions[key].left = p.left;
                io.sockets.emit('getPosition', p);
                console.log("sendingPosition...")
            }
        }
    });
    socket.on('sendItems',function(i){
        items = i.items;
        io.sockets.emit('getItems', {items: i.items});
        console.log("items sent");
    });
    socket.on('getPositions', function(){
        socket.emit('sendPosition', {positions: positions});
        console.log('positions sent 2');
    });
    socket.on('getItems',function(){
        socket.emit('sendPositions', {items: items});
        console.log('items sent 2');
    });
});

//////////////////////////////////// EXPRESS ///////////////////////////////////////////////


app.use(bodyParser.json());

app.use(serveStatic(__dirname, {'index': ['index2.html']}));
console.log("Listening on 3000");