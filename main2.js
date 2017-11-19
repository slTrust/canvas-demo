//防止页面抖动 这样会禁掉其他功能
// document.body.ontouchstart = function(ev){
//     ev.preventDefault();
// }
// 这样也不好使  也会禁用本身的功能
// document.body.addEventListener('touchstart',function(ev){
//     ev.preventDefault();
// })

// 去设置canvas的样式改为定位

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var lineWidth = 5;
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

thin.onclick = function(){
    lineWidth  = 5 ;
}
thick.onclick = function(){
    lineWidth = 10;
}
clear.onclick = function(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
}

download.onclick = function(){
   // var image = document.getElementById("canvas").toDataURL("image/png").replace("image/png", "image/octet-stream");
   // download.setAttribute("href", image);
   var url  = canvas.toDataURL("image/png")
   var oLink = document.createElement('a');
   document.body.appendChild(oLink);
   oLink.href = url;
   oLink.download = '我的画儿';
   oLink.target = '_blank'
   oLink.click();
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
        ctx.lineWidth = lineWidth;
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