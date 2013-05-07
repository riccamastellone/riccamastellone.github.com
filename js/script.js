/* 
*
* riccardomastellone.com
* 
* I wrote this code, minified it and lost the original (idiot).
* I then had to make some modifications and started expanding it back again
* I'm sorry but it still looks like shit!
*
* 01.07.2012 - Let's add a little bit of patriotism! Forza Italia!
*
*/

function loop(){if(mouseIsDown){RADIUS_SCALE+=(RADIUS_SCALE_MAX-RADIUS_SCALE)*.02}else{RADIUS_SCALE-=(RADIUS_SCALE-RADIUS_SCALE_MIN)*.02}RADIUS_SCALE=Math.min(RADIUS_SCALE,RADIUS_SCALE_MAX);
context.fillStyle="rgba(0,0,0,0.05)";
context.fillRect(0,0,context.canvas.width,context.canvas.height);
for(i=0,len=particles.length;i<len;i++){var a=particles[i];
var b={x:a.position.x,y:a.position.y};a.angle+=a.speed;a.shift.x+=(mouseX-a.shift.x)*a.speed;a.shift.y+=(mouseY-a.shift.y)*a.speed;a.position.x=a.shift.x+Math.cos(i+a.angle)*a.orbit*RADIUS_SCALE;
a.position.y=a.shift.y+Math.sin(i+a.angle)*a.orbit*RADIUS_SCALE;a.position.x=Math.max(Math.min(a.position.x,SCREEN_WIDTH),0);
a.position.y=Math.max(Math.min(a.position.y,SCREEN_HEIGHT),0);a.size+=(a.targetSize-a.size)*.05;
if(Math.round(a.size)==Math.round(a.targetSize)){a.targetSize=1+Math.random()*7}context.beginPath();
context.fillStyle=a.fillColor;context.strokeStyle=a.fillColor;context.lineWidth=a.size;context.moveTo(b.x,b.y);
context.lineTo(a.position.x,a.position.y);context.stroke();context.arc(a.position.x,a.position.y,a.size/2,0,Math.PI*2,true);
context.fill()}}function canvasTouchMoveHandler(a){if(a.touches.length==1){a.preventDefault();
mouseX=a.touches[0].pageX-(window.innerWidth-SCREEN_WIDTH)*.5;mouseY=a.touches[0].pageY-(window.innerHeight-SCREEN_HEIGHT)*.5}}
function canvasTouchStartHandler(a){if(a.touches.length==1){a.preventDefault();
mouseX=a.touches[0].pageX-(window.innerWidth-SCREEN_WIDTH)*.5;mouseY=a.touches[0].pageY-(window.innerHeight-SCREEN_HEIGHT)*.5}}
function documentMouseUpHandler(a){mouseIsDown=false}function documentMouseDownHandler(a){mouseIsDown=true}
function documentMouseMoveHandler(a){mouseX=a.clientX-(window.innerWidth-SCREEN_WIDTH)*.5;mouseY=a.clientY-(window.innerHeight-SCREEN_HEIGHT)*.5}

// Let's have some color variations!
/*
function colorLuminance(hex, lum) {  
    hex = String(hex).replace(/[^0-9a-f]/gi, '');  
    if (hex.length < 6) {  
        hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];  
    }  
    lum = lum || 0;  
    var rgb = "#", c, i;  
    for (i = 0; i < 3; i++) {  
        c = parseInt(hex.substr(i*2,2), 16);  
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);  
        rgb += ("00"+c).substr(c.length);  
    }  
    return rgb;  
}  
*/


function createParticles(){particles=[];

// Italian flag: 3 colors
blocchi = (QUANTITY/3);

// Green White Red!
tricolore = new Array("ce2b37", "009246","ffffff");

for(var p=0;p<3;p++) {
	
	for(var a=0;a<blocchi;a++){
		var b={position:{x:mouseX,y:mouseY},
		shift:{x:mouseX,y:mouseY},
		size:1,
		angle:0,
		speed:.01+Math.random()*.04,targetSize:1,
		//fillColor:(colorLuminance(tricolore[p], Math.random())).toString(16),
                fillColor:"#"+(Math.random()*4210752+11184810|0).toString(16),
		orbit:RADIUS*.5+RADIUS*.5*Math.random()};
		particles.push(b);
		}
	}
}
	
	function init(){canvas=document.getElementById("canvas");if(canvas&&canvas.getContext){context=canvas.getContext("2d");
	document.addEventListener("mousemove",documentMouseMoveHandler,false);document.addEventListener("mousedown",documentMouseDownHandler,false);document.addEventListener("mouseup",documentMouseUpHandler,false);canvas.addEventListener("touchstart",canvasTouchStartHandler,false);canvas.addEventListener("touchmove",canvasTouchMoveHandler,false);createParticles();windowResizeHandler();setInterval(loop,1e3/60)}}var SCREEN_WIDTH=$(window).width();var SCREEN_HEIGHT=$(window).height();var RADIUS=150;var RADIUS_SCALE=1;var RADIUS_SCALE_MIN=1;var RADIUS_SCALE_MAX=1.5;var QUANTITY=25;var canvas;var context;var particles;var mouseX=window.innerWidth-SCREEN_WIDTH;var mouseY=window.innerHeight-SCREEN_HEIGHT;var mouseIsDown=false;init();$("a").click(function(){$(this).effect("pulsate",{times:5},1000);});
function windowResizeHandler(){canvas.width=$(window).width();canvas.height=$(window).height();canvas.style.position="absolute";canvas.style.left=0*.5+"px";canvas.style.top=0*.5+"px"}$(window).resize(function(){windowResizeHandler()})