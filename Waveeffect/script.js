const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    //effect.resize(canvas.width, canvas.height);
})

let amplitude = 400;
let frequency = 0.05;
let hue2 =200;

function drawSin(nextFrame){
    ctx.beginPath();
    ctx.strokeStyle = 'hsla(' + hue2 + ", 100%, 50%, 0.9)";;
    ctx.lineWidth = 20;
    ctx.moveTo(-1, canvas.height/2);

    for(let i = 0; i <= canvas.width; i++){
        let y = amplitude * Math.sin(frequency * i + nextFrame);
        ctx.lineTo(i, y + canvas.height/2);
    }
    ctx.stroke();
}

//used to adjust animation framerate
let lastTime =0;
const fps = 15;
const nextFrame = 1000/fps;
let timer = 0;
let frame =0;
let hue =0;
//Math.floor(Math.random() * 255);

function animate(timeStamp){
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    frame+=0.05;

    if(timer > nextFrame){
        //ctx.fillStyle = 'rgba(40, 67, 135, 0.9)';
        ctx.fillStyle = 'hsla(' + hue + ", 100%, 50%, 0.3)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        hue+=0.5;
        hue2+=0.5
        drawSin(frame);
    }
    else{
        timer += deltaTime;
    }
    requestAnimationFrame(animate);
}
animate(0);