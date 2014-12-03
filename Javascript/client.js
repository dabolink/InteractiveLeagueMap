function serverPost(uri, keyPair, successFunction, async){
    asyncro = (typeof async === "undefined") ? true : false;
    $.ajax({
        url: '/' + uri,
        type: 'POST',
        contentType: 'application/json',
        data: keyPair,
        success: function(result){
            successFunction(result);
        },
        error: function(){
            alert('There was a problem.\n');
        }})
}
serverPost('',{}, function(result){
    console.log(result.message);
});

function getPositionsFromServer(){
    serverPost('getPositions',{},function(result){
       console.log(result.positions);
        for(var i = 0; i < result.positions.length;i++){
            var r = result.positions[i];
            var d = document.getElementById(r.type);
            d.style.top = r.top;
            d.style.left = r.left;
        }
    });
}

function getItemsFromServer(){
    var temp = [];
    serverPost('getItems',{}, function(result){
        console.log(result.items);
        for(var i = 0; i < result.items.length;i++){
            temp.push(new Item(result.items[i].type,result.items[i].x,result.items[i].y,result.items[i].x2,result.items[i].y2));
            console.log(temp)
        }
        items = temp;
        ctx.clearRect(0,0, c.width, c.height);
        ctx.drawImage(img,0,0,size,size);
        drawItems();
    }, false);
}
function sendPositionsToServer(){
    var p = ["Mid","Jungle","Marksman","Support","Top"];
    var json = {positions: []};
    for(var i = 0; i < p.length; i++){
        var t = document.getElementById("red"+p[i]);
        json.positions.push({type: t.id, left: t.style.left, top:t.style.top})
    }
    for(var i = 0; i < p.length; i++){
        var t = document.getElementById("blue"+p[i]);
        json.positions.push({type: t.id, left: t.style.left, top:t.style.top})
    }
    serverPost('sendPositions',JSON.stringify(json), function(result){
        console.log(result.message);
    })
}
function sendItemsToServer(items){
    var json = {items: []};
    for(var i = 0; i < items.length; i++) {
        json.items.push({type: items[i].type, x: items[i].x, y: items[i].y, x2: items[i].x2, y2: items[i].y2});
    }
    serverPost('sendItems',JSON.stringify(json), function(result){
        console.log(result.message);
    })
}