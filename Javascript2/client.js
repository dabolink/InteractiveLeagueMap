function getPositionsFromServer(){
    socket.on('getPositions',function(result){
        console.log(result);
        for(var key in result){
            var r = result[key];
            var d = document.getElementById(key);
            d.style.top = r.top;
            d.style.left = r.left;
        }
    });
}

function getItemsFromServer(){
    var temp = [];
    socket.on('getItems',function(result){
        console.log("getting items...");
        for(var i = 0; i < result.items.length;i++){
            temp.push(new Item(result.items[i].type,result.items[i].x,result.items[i].y,result.items[i].x2,result.items[i].y2));
            console.log(temp)
        }
        items = temp;
        ctx.clearRect(0,0, c.width, c.height);
        ctx.drawImage(img,0,0,size,size);
        drawItems();
    });
}

function sendPositionsToServer(){
    var p = ["Mid","Jungle","Marksman","Support","Top"];
    var json = {positions: {}};
    for(var i = 0; i < p.length; i++){
        var t = document.getElementById("red"+p[i]);
        json.positions[t.id] = {top: t.style.top, left: t.style.left};
    }
    for(var i = 0; i < p.length; i++){
        var t = document.getElementById("blue"+p[i]);
        json.positions[t.id] = {top: t.style.top, left: t.style.left};
    }
    socket.emit('sendPositions', json);
    console.log("getting positions");
}
function sendItemsToServer(){
    var json = {items: items};
    socket.emit('sendItems', json);
    console.log("sending Items...");
}
