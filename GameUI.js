var images = {};
var totalResources=4;
var numLoaded=0;
var fps=60;
var context;
var charX=245;
var charY=185;
var canvas;

loadImage("torso");
loadImage("legs");
loadImage("head");
loadImage("hair");

//Setup canvas
function prepareCanvas(canvasDiv, canvasWidth, canvasHeight)
{
	// Create the canvas (Neccessary for IE because it doesn't know what a canvas element is)
	canvas = document.createElement('canvas');
	canvas.setAttribute('width', canvasWidth);
	canvas.setAttribute('height', canvasHeight);
	canvas.setAttribute('id', 'canvas');
	canvasDiv.appendChild(canvas);
	
	if(typeof G_vmlCanvasManager != 'undefined') {
		canvas = G_vmlCanvasManager.initElement(canvas);
	}
	context = canvas.getContext("2d"); // Grab the 2d canvas context
	// Note: The above code is a workaround for IE 8and lower. Otherwise we could have used:
	//     context = document.getElementById('canvas').getContext("2d");
	
	loadImage("torso");
	loadImage("head");
	loadImage("hair");
	loadImage("legs");
	
}


//Load image
function loadImage(name){
	images[name] = new Image();
	images[name].onload = function(){
		resourceLoaded();
	}
	images[name].src="images/"+name+".png";
}

function resourceLoaded(){
	numLoaded++;
	if (numLoaded==totalResources){
		setInterval(redraw,1000/fps);
	}
}

function redraw(){
	var x = charX;
	var y = charY;
	
	canvas.width = canvas.width; //Clear canvas
	context.drawImage(images["torso"],x-37,y-95);
	context.drawImage(images["head"],x-39,y-133);
	context.drawImage(images["hair"],x-39,x-193);
	context.drawImage(images["legs"],x-37,y-90);
}