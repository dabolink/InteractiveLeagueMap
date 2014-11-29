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
        document.getElementById("wardDrop").setAttribute("src","images/pinkward.jpg");
        outlineBtn("wardDrop");
        hideDropdown("wardDrop");
        resetCoords()
    }

    else if(setTo == "greenWard"){
        console.log("greenWard set");
        drawType = 'greenWard';
        document.getElementById("wardDrop").setAttribute("src","images/greenward.jpg");
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
    else if(setTo == "dangerPing"){
        console.log("danger ping set");
        drawType = 'pingDanger';
        document.getElementById("pingDrop").setAttribute("src","images/pingDanger.jpg");
        outlineBtn("pingDrop");
        hideDropdown("pingDrop");
        resetCoords();
    }
    else if(setTo == "OMWPing"){
        console.log("OMW ping set");
        drawType = 'pingOMW';
        outlineBtn("pingDrop");
        hideDropdown("pingDrop");
        document.getElementById("pingDrop").setAttribute("src","images/pingOMW.jpg");
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
        ward.src = "images/pinkward.jpg";
        ctx.drawImage(ward, event.x - c.offsetLeft - ward.width / 2, event.y - c.offsetTop - ward.height / 2);
    }
    else if(drawType == "greenWard"){
        var ward = new Image();
        ward.src = "images/greenward.jpg";
        ctx.drawImage(ward,event.x- c.offsetLeft - ward.width/2,event.y- c.offsetTop - ward.height/2);
    }
    else if(drawType == "pingDanger"){
        var danger = new Image();
        danger.src = "images/ping-danger.jpg";
        drawPing(danger)
        console.log("danger!");
    }
    else if(drawType == "pingOMW"){
        var OMW = new Image();
        OMW.src = "images/ping-omw.jpg";
        drawPing(OMW)
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