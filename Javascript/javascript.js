//[[lines],[pings]]
var items = [[],[]];
var coords = [-1,-1];
var size = 900;
var color = "#FF0000";
var drawType = 'test';
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var img = new Image();
var items = new Array();
img.src = "images/Map.jpg";
var guest = true;

function toggleClient(){
    guest ^=  true;
    var btn = document.getElementById("clientBtn");
    if(guest) {
        btn.textContent = "GUEST"
    }
    else{
        btn.textContent = "HOST"
    }
}
setInterval(function(){
    if(guest){
        console.log("guest");
        receive();
    }
    else{
        console.log("host");
        send();
    }
},3000);

img.onload = function(){
    img.width = 1000;
    img.height = 1000;
    ctx.drawImage(img,0,0, c.width, c.height);
}


function Item(type,x,y,x2,y2){
    this.type = type;
    this.x = x;
    this.y = y;
    this.x2 = x2;
    this.y2 = y2;
    this.print = function(){
        var str = "" + this.type + "/" + this.x + "/" + this.y;
        if(x2 != undefined){
            str += "/" + this.x2 + "/" + this.y2;
        }
        return str;
    };
}

function setFunction(setTo){
    function outlineBtn(s) {
        document.getElementById("lineBtn").style.border = "2px";
        document.getElementById("refreshBtn").style.border = "2px";
        document.getElementById("pingDrop").style.border = "2px";
        document.getElementById("wardDrop").style.border = "2px";
        document.getElementById(s).style.border="2px solid #FF0000";
    }
    if(setTo.substring(setTo.length - 4, setTo.length) == "Ward") {
        if (setTo == "pinkWard") {
            console.log("pinkWard set");
            drawType = 'pinkWard';
            document.getElementById("wardDrop").setAttribute("src", "images/HUD/Wards/pinkWard.jpg");

        }

        else if (setTo == "greenWard") {
            console.log("greenWard set");
            drawType = 'greenWard';
            document.getElementById("wardDrop").setAttribute("src", "images/HUD/Wards/greenWard.jpg");

        }
        outlineBtn("wardDrop");
        hideDropdown("wardDrop");
        resetCoords();
    }
    else if(setTo == "line"){
        console.log("line set");
        drawType = 'line';
        outlineBtn("lineBtn");
        resetCoords();
    }
    else if(setTo.substring(setTo.length - 4, setTo.length) == "Ping") {
        if (setTo == "assistPing") {
            console.log("Assist ping set");
            drawType = 'pingAssist';
            document.getElementById("pingDrop").setAttribute("src", "images/HUD/Pings/pingAssist.jpg");
        }
        else if (setTo == "attackPing") {
            console.log("Attack ping set");
            drawType = 'pingAttack';
            document.getElementById("pingDrop").setAttribute("src", "images/HUD/Pings/pingAttack.jpg");
        }

        else if (setTo == "cautionPing") {
            console.log("Caution ping set");
            drawType = 'pingCaution';
            document.getElementById("pingDrop").setAttribute("src", "images/HUD/Pings/pingCaution.jpg");
        }
        else if (setTo == "commandPing") {
            console.log("Command ping set");
            drawType = 'pingCommand';
            document.getElementById("pingDrop").setAttribute("src", "images/HUD/Pings/pingCommand.jpg");
        }
        else if (setTo == "defendPing") {
            console.log("Defend ping set");
            drawType = 'pingDefend';
            document.getElementById("pingDrop").setAttribute("src", "images/HUD/Pings/pingDefend.jpg");
        }
        else if (setTo == "missingPing") {
            console.log("MIA ping set");
            drawType = 'pingMIA';
            document.getElementById("pingDrop").setAttribute("src", "images/HUD/Pings/pingMIA.jpg");
        }
        else if (setTo == "dangerPing") {
            console.log("danger ping set");
            drawType = 'pingDanger';
            document.getElementById("pingDrop").setAttribute("src", "images/HUD/Pings/pingDanger.jpg");
        }
        else if (setTo == "OMWPing") {
            console.log("OMW ping set");
            drawType = 'pingOMW';
            document.getElementById("pingDrop").setAttribute("src", "images/HUD/Pings/pingOMW.jpg");
        }
        outlineBtn("pingDrop");
        hideDropdown("pingDrop");
        resetCoords();
    }
    else{
        console.log("O.o");
    }
}
myCanvas.addEventListener("mouseup", checkDrag, false);
myCanvas.addEventListener("mousedown", getPosition, false);

function checkDrag(event){
    if(event.x != coords[0] && event.y != coords[1] && coords[0] != -1 && coords[1] != -1){
        //then draw a line
        ctx.beginPath();
        ctx.moveTo(coords[0],coords[1]);
        ctx.lineTo(event.x - c.offsetLeft, event.y - c.offsetTop);
        ctx.strokeStyle = color;
        ctx.stroke();
        console.log("line from " + coords[0] + ":" + coords[1] + " to " + event.x + ":"  + event.y + " dragged");
        items.push(new Item("line",coords[0],coords[1],event.x - c.offsetLeft, event.y - c.offsetTop))
        resetCoords()
    }
    //else do nothing
}

function getPosition(event) {

    //draws Image on Canvas centered on mouse click
    function draw(ping) {
        ctx.drawImage(ping, event.x - c.offsetLeft - ping.width / 2, event.y - c.offsetTop - ping.height / 2);
        items.push(new Item(drawType, event.x - c.offsetLeft - ping.width / 2, event.y - c.offsetTop - ping.height / 2));
    }

    //draws images depending on drawType set
    if (drawType.substring(drawType.length - 4, drawType.length) == "Ward") {
        var ward = new Image();
        console.log("ward placed");
        if (drawType == "pinkWard") {
            ward.src = "images/Map/Wards/pinkWard.jpg";
        }
        else if (drawType == "greenWard") {
            ward.src = "images/Map/Wards/greenWard.jpg";
        }
        draw(ward);
    }
    else if(drawType.substring(0,4) == "ping") {
        var ping = new Image();
        console.log("ping placed");
        if (drawType == "pingDanger") {
            ping.src = "images/Map/Pings/pingDanger.jpg";
        }
        else if (drawType == "pingOMW") {
            ping.src = "images/Map/Pings/pingOMW.jpg";
        }
        else if (drawType == "pingAssist") {
            ping.src = "images/Map/Pings/pingAssist.jpg";
        }
        else if (drawType == "pingCaution") {
            ping.src = "images/Map/Pings/pingCaution.jpg";
        }
        else if (drawType == "pingAttack") {
            ping.src = "images/Map/Pings/pingAttack.jpg";
        }
        else if (drawType == "pingCommand") {
            ping.src = "images/Map/Pings/pingCommand.jpg";
        }
        else if (drawType == "pingDefend") {
            ping.src = "images/Map/Pings/pingDefend.jpg";
        }
        else if (drawType == "pingMIA") {
            ping.src = "images/Map/Pings/pingMIA.jpg";
        }
        else{
            console.log("error");
        }
        draw(ping);
    }
    else if(coords[0] == -1 && coords[1] == -1 && drawType == "line") {
        coords[0] = event.x;
        coords[1] = event.y;
    }
    else{
        if(drawType == "line"){
            ctx.beginPath();
            ctx.moveTo(coords[0],coords[1]);
            ctx.lineTo(event.x - c.offsetLeft, event.y - c.offsetTop);
            ctx.strokeStyle = color;
            ctx.stroke();
            console.log("line from " + coords[0] + ":" + coords[1] + " to " + event.x + ":"  + event.y);
            items.push(new Item("line",coords[0],coords[1],event.x - c.offsetLeft, event.y - c.offsetTop));
        }
        resetCoords();
    }
}

function refresh(){
    console.log("clear");
    ctx.clearRect(0,0, c.width, c.height);
    ctx.drawImage(img,0,0,size,size);
    resetCoords();
    items = [];
}

function undo(){
    console.log("undo");
    ctx.clearRect(0,0, c.width, c.height);
    ctx.drawImage(img,0,0,size,size);
    items.pop();
    drawItems();
}

function resetCoords(){
    coords[0] = -1;
    coords[1] = -1;
}
function save(){
    var str = "";
    for(var i = 0; i < items.length; i++){
        str += items[i].print() + ";"
    }
    str = str.substring(0, str.length - 1);
    window.prompt("Copy to clipboard: Ctrl+C, Enter", str);
}
function load() {
    // TODO: add error handling
    items = [];
    var input = window.prompt("Paste Code", "");
    var split1 = input.split(";");
    for(var i = 0; i < split1.length; i++) {

        var split2 = split1[i].split("/");
        if (split2[0] == "line") {
            items.push(new Item(split2[0], split2[1], split2[2], split2[3], split2[4]));
        }
        else {
            items.push(new Item(split2[0], split2[1], split2[2]));
        }
    }
    drawItems()
}
function drawItems(){
    printItems();
    ctx.beginPath();
    ctx.stroke();
    for(var i = 0; i < items.length; i++){
        var ping = new Image();
        var item = items[i];
        var type = item.type;
        if(type.substring(0,4) == "ping"){
            ping.src = "images/Map/Pings/" + type + ".jpg";
            ctx.drawImage(ping, items[i].x, items[i].y);
        }
        else if(type.substring(type.length - 4,type.length) == "Ward") {
            ping.src = "images/Map/Wards/" + type + ".jpg";
            ctx.drawImage(ping, items[i].x, items[i].y);
        }
        else if(type == "line"){
            ctx.beginPath();
            ctx.moveTo(item.x,item.y);
            ctx.lineTo(item.x2, item.y2);
            ctx.strokeStyle = color;
            ctx.stroke();
        }

    }
}
function printItems(){
    for(var i = 0; i < items.length; i++){
        console.log(items[i].print());
    }
}

function send(){
    sendItemsToServer(items);
}
function receive(){
    getItemsFromServer();
    console.log(items);
}