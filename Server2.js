var connect = require('connect');
var serveStatic = require('serve-static');
var app = require("express")();
var bodyParser = require('body-parser');
var http = require('http');
var server = http.createServer(app).listen(3000);
var io = require('socket.io').listen(server);
var items = [];
var users = [];

var startPositions = [ { type: 'redMid', left: '520px', top: '400px' },
    { type: 'redJungle', left: '691px', top: '478px' },
    { type: 'redMarksman', left: '800px', top: '707px' },
    { type: 'redSupport', left: '772px', top: '674px' },
    { type: 'redTop', left: '312px', top: '148px' },
    { type: 'blueMid', left: '410px', top: '505px' },
    { type: 'blueJungle', left: '261px', top: '412px' },
    { type: 'blueMarksman', left: '690px', top: '798px' },
    { type: 'blueSupport', left: '666px', top: '747px' },
    { type: 'blueTop', left: '162px', top: '258px' } ];
var positions = startPositions;
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
        positions = startPositions;
        items = [];
        io.sockets.emit('getPositions', {positions: positions});
        io.sockets.emit('getItems', {items: items});
    })
    socket.on('sendPositions',function(p) {
        positions = p.positions;
        io.sockets.emit('getPositions', {positions: p.positions});
        console.log("positions sent");
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