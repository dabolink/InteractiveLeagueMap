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
    if(setTo == "pinkWard"){
        console.log("pinkWard set");
        drawType = 'pinkWard';
        document.getElementById("wardDrop").setAttribute("src","images/HUD/Wards/pinkward.jpg");
        outlineBtn("wardDrop");
        hideDropdown("wardDrop");
        resetCoords()
    }

    else if(setTo == "greenWard"){
        console.log("greenWard set");
        drawType = 'greenWard';
        document.getElementById("wardDrop").setAttribute("src","images/HUD/Wards/greenward.jpg");
        outlineBtn("wardDrop");
        hideDropdown("wardDrop");
        resetCoords()
    }
    else if(setTo == "line"){
        console.log("line set");
        drawType = 'line';
        outlineBtn("lineBtn");
        resetCoords()
    }
    else if(setTo == "assistPing"){
        console.log("Assist ping set");
        drawType = 'pingAssist';
        document.getElementById("pingDrop").setAttribute("src","images/HUD/Pings/pingAssist.jpg");
        outlineBtn("pingDrop");
        hideDropdown("pingDrop");
        resetCoords();
    }
    else if(setTo == "attackPing"){
        console.log("Attack ping set");
        drawType = 'pingAttack';
        document.getElementById("pingDrop").setAttribute("src","images/HUD/Pings/pingAttack.jpg");
        outlineBtn("pingDrop");
        hideDropdown("pingDrop");
        resetCoords();
    }

    else if(setTo == "cautionPing"){
        console.log("Caution ping set");
        drawType = 'pingCaution';
        document.getElementById("pingDrop").setAttribute("src","images/HUD/Pings/pingCaution.jpg");
        outlineBtn("pingDrop");
        hideDropdown("pingDrop");
        resetCoords();
    }
    else if(setTo == "commandPing"){
        console.log("Command ping set");
        drawType = 'pingCommand';
        document.getElementById("pingDrop").setAttribute("src","images/HUD/Pings/pingCommand.jpg");
        outlineBtn("pingDrop");
        hideDropdown("pingDrop");
        resetCoords();
    }
    else if(setTo == "defendPing"){
        console.log("Defend ping set");
        drawType = 'pingDefend';
        document.getElementById("pingDrop").setAttribute("src","images/HUD/Pings/pingDefend.jpg");
        outlineBtn("pingDrop");
        hideDropdown("pingDrop");
        resetCoords();
    }
    else if(setTo == "missingPing"){
        console.log("MIA ping set");
        drawType = 'pingMIA';
        document.getElementById("pingDrop").setAttribute("src","images/HUD/Pings/pingMIA.jpg");
        outlineBtn("pingDrop");
        hideDropdown("pingDrop");
        resetCoords();
    }
    else if(setTo == "dangerPing"){
        console.log("danger ping set");
        drawType = 'pingDanger';
        document.getElementById("pingDrop").setAttribute("src","images/HUD/Pings/pingDanger.jpg");
        outlineBtn("pingDrop");
        hideDropdown("pingDrop");
        resetCoords();
    }
    else if(setTo == "OMWPing"){
        console.log("OMW ping set");
        drawType = 'pingOMW';
        outlineBtn("pingDrop");
        hideDropdown("pingDrop");
        document.getElementById("pingDrop").setAttribute("src","images/HUD/Pings/pingOMW.jpg");
        resetCoords();
    }
    else{
        console.log("O.o");
    }
}

myCanvas.addEventListener("mousedown", getPosition, false);

function getPosition(event)
{
    //draws Image on Canvas centered on mouse click
    function drawPing(ping) {
        ctx.drawImage(ping,event.x- c.offsetLeft - ping.width/2,event.y- c.offsetTop - ping.height/2);
    }

    //draws images depending on drawType set
    if(drawType == "pinkWard") {
        var ward = new Image();
        ward.src = "images/Map/Wards/pink-ward.jpg";
        ctx.drawImage(ward, event.x - c.offsetLeft - ward.width / 2, event.y - c.offsetTop - ward.height / 2);
    }
    else if(drawType == "greenWard"){
        var ward = new Image();
        ward.src = "images/Map/Wards/green-ward.jpg";
        ctx.drawImage(ward,event.x- c.offsetLeft - ward.width/2,event.y- c.offsetTop - ward.height/2);
    }
    else if(drawType == "pingDanger"){
        var danger = new Image();
        danger.src = "images/Map/Pings/ping-danger.jpg";
        drawPing(danger)
        console.log("danger!");
    }
    else if(drawType == "pingOMW"){
        var OMW = new Image();
        OMW.src = "images/Map/Pings/ping-OMW.jpg";
        drawPing(OMW)
    }
    else if(drawType == "pingAssist"){
        var ping = new Image();
        ping.src = "images/Map/Pings/ping-assist.jpg"
        drawPing(ping)
    }
    else if(drawType == "pingCaution"){
        var ping = new Image();
        ping.src = "images/Map/Pings/ping-caution.jpg"
        drawPing(ping)
    }
    else if(drawType == "pingAttack"){
        var ping = new Image();
        ping.src = "images/Map/Pings/ping-attack.jpg"
        drawPing(ping)
    }
    else if(drawType == "pingCommand"){
        var ping = new Image();
        ping.src = "images/Map/Pings/ping-command.jpg"
        drawPing(ping)
    }
    else if(drawType == "pingDefend"){
        var ping = new Image();
        ping.src = "images/Map/Pings/ping-defend.jpg"
        drawPing(ping)
    }
    else if(drawType == "pingMIA"){
        var ping = new Image();
        ping.src = "images/Map/Pings/ping-mia.jpg"
        drawPing(ping)
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