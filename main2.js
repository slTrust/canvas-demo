var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var using = false;
var eraserEnable = false;
autoSetCanvasSize(canvas)
listenToUser(canvas)
eraser.onclick = function(){
    eraserEnable = true;
    eraser.classList.add('active');
    pen.classList.remove('active');
}
pen.onclick = function(){
    eraserEnable = false;
    pen.classList.add('active');
    eraser.classList.remove('active');
}

red.onclick = function(){
    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'red';
    red.classList.add('active');
    green.classList.remove('active');
    blue.classList.remove('active');
}

green.onclick = function(){
    ctx.fillStyle = 'green';
    ctx.strokeStyle = 'green';
    red.classList.remove('active');
    green.classList.add('active');
    blue.classList.remove('active');
}
blue.onclick = function(){
    ctx.fillStyle = 'blue';
    ctx.strokeStyle = 'blue';
    red.classList.remove('active');
    green.classList.remove('active');
    blue.classList.add('active');
}


function listenToUser(canvas){
    var lastPoint = {x:undefined,y:undefined};
    // 特性检测
    if(document.body.ontouchstart!==undefined){
        //说明是触屏
        canvas.ontouchstart = function(ev){
            console.log('开始摸我了')
            //因为手机支持多点触碰   所以手指点击的时候是一个数组  ev.touches[0]
            var x = ev.touches[0].clientX;
            var y = ev.touches[0].clientY;
            using = true;
            if(eraserEnable){
                ctx.clearRect(x-10,y-10,20,20)
            }else{
                // drawCircle(x,y,1);
                lastPoint = {x:x,y:y};
            }
        }
        canvas.ontouchmove = function(ev){
            console.log('边摸边动')
            if(!using) return;
            var x = ev.touches[0].clientX;
            var y = ev.touches[0].clientY;
            if(eraserEnable){
                    ctx.clearRect(x-10,y-10,20,20)
            }else{
                // drawCircle(x,y,1);
                var newPoint = {x:x,y:y};
                drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y);
                lastPoint = newPoint;
            }
        }
        canvas.ontouchend = function(){
            console.log('摸完了')
            using = false;
        }
    }else{
        //非触屏
        canvas.onmousedown = function(e){
            console.log('down')
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
            console.log('move')
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
    }

    function drawCircle(x,y,radius){
        ctx.beginPath();
        ctx.fillStyle = 'black';
        ctx.arc(x,y,radius,0,Math.PI*2);
        ctx.fill();
    }

    function drawLine(x1,y1,x2,y2){
        ctx.beginPath();
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