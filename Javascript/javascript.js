//[[lines],[pings]]
var items = [[],[]];
var coords = [-1,-1];
var size = 900
var color = "#FF0000"
var drawType = 'test'
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var img = new Image()

img.onload = function(){
    ctx.drawImage(img,0,0,size,size);
    img.width = size;
    img.height = size;
};
img.src = "images/Map.jpg";

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
            document.getElementById("wardDrop").setAttribute("src", "images/HUD/Wards/pinkward.jpg");

        }

        else if (setTo == "greenWard") {
            console.log("greenWard set");
            drawType = 'greenWard';
            document.getElementById("wardDrop").setAttribute("src", "images/HUD/Wards/greenward.jpg");

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
        resetCoords()
    }
    //else do nothing
}

function getPosition(event) {

    //draws Image on Canvas centered on mouse click
    function draw(ping) {
        ctx.drawImage(ping, event.x - c.offsetLeft - ping.width / 2, event.y - c.offsetTop - ping.height / 2);
    }

    //draws images depending on drawType set
    if (drawType.substring(drawType.length - 4, drawType.length) == "Ward") {
        var ward = new Image();
        if (drawType == "pinkWard") {
            ward.src = "images/Map/Wards/pink-ward.jpg";
        }
        else if (drawType == "greenWard") {
            ward.src = "images/Map/Wards/green-ward.jpg";
        }
        draw(ward);
    }
    else if(drawType.substring(0,4) == "ping") {
        var ping = new Image();
        if (drawType == "pingDanger") {
            ping.src = "images/Map/Pings/ping-danger.jpg";
        }
        else if (drawType == "pingOMW") {
            ping.src = "images/Map/Pings/ping-OMW.jpg";
        }
        else if (drawType == "pingAssist") {
            ping.src = "images/Map/Pings/ping-assist.jpg";
        }
        else if (drawType == "pingCaution") {
            ping.src = "images/Map/Pings/ping-caution.jpg";
        }
        else if (drawType == "pingAttack") {
            ping.src = "images/Map/Pings/ping-attack.jpg";
        }
        else if (drawType == "pingCommand") {
            ping.src = "images/Map/Pings/ping-command.jpg";
        }
        else if (drawType == "pingDefend") {
            ping.src = "images/Map/Pings/ping-defend.jpg";
        }
        else if (drawType == "pingMIA") {
            ping.src = "images/Map/Pings/ping-mia.jpg";
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
        }
        resetCoords();
    }
}

function refresh(){
    console.log("clear");
    ctx.clearRect(0,0, c.width, c.width);
    ctx.drawImage(img,0,0,size,size);
    resetCoords();
}

function resetCoords(){
    coords[0] = -1;
    coords[1] = -1;
}