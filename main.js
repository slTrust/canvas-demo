var canvas = document.getElementById('canvas');
var using = false;
var eraserEnable = false;
autoSetCanvasSize(canvas)
listenToMouse(canvas)
eraser.onclick = function(){
    eraserEnable = false;
    actions.className ='actions x';
   
}
brush.onclick = function(){
    eraserEnable = true;
    actions.className ='actions';
   
}
function listenToMouse(canvas){
    var ctx = canvas.getContext('2d');
    
    var lastPoint = {x:undefined,y:undefined};
    canvas.onmousedown = function(e){
        var x = e.clientX;
        var y = e.clientY;
        using = true;
        if(eraserEnable){
            ctx.clearRect(x-10,y-10,20,20)
        }else{
            // drawCircle(x,y,1);
            lastPoint = {x:x,y:y};
        }
    }

    canvas.onmousemove = function(e){
        if(!using) return;
        var x = e.clientX;
        var y = e.clientY;
        if(eraserEnable){
                ctx.clearRect(x-10,y-10,20,20)
        }else{
          
                // drawCircle(x,y,1);
                var newPoint = {x:x,y:y};
                drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y);
                lastPoint = newPoint;
        }
    }

    canvas.onmouseup = function(){
        using = false;
    }
    function drawCircle(x,y,radius){
        ctx.beginPath();
        ctx.fillStyle = 'black';
        ctx.arc(x,y,radius,0,Math.PI*2);
        ctx.fill();
    }

    function drawLine(x1,y1,x2,y2){
        ctx.beginPath();
        ctx.strokeStyle = 'black';
        ctx.lineWidth =5;
        ctx.moveTo(x1,y1);
        ctx.lineTo(x2,y2);
        ctx.stroke();
        ctx.closePath();
    }
   
}




function autoSetCanvasSize(canvas){
    function setCanvasSize(){
        var pageH = document.documentElement.clientHeight;
        var pageW = document.documentElement.clientWidth;
        canvas.width = pageW;
        canvas.height = pageH;
    }
    setCanvasSize();
    window.onresize = function(){
        setCanvasSize();
    }
}