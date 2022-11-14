var canvas = document.getElementById('canvas1');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//add a gui element to control wave & background variables

const wave ={
    y: canvas.height/2,
    length: 0.01,
    amplitude: 100,
    frequency: 0.01,
    hue: 255,
    saturation: 50,
    lightness: 50,
}

const bg ={
    r: 0,
    g: 0,
    b: 0,
    a: 0.01,
}

let increment = wave.frequency

function draw(){
    ctx.beginPath();
    ctx.moveTo(0, canvas.height/2);
    for(let i =0; i < canvas.width; i++){
        //ctx.lineTo(i, wave.y + Math.sin(i * wave.length + increment) * wave.amplitude);
        //make amplitude sin changing slap a sin on it
        ctx.lineTo(i, wave.y + Math.sin(i * wave.length + increment) * wave.amplitude * Math.sin(increment));
    }
    //ctx.strokeStyle = `hsla(${wave.hue} , ${wave.saturation}%, ${wave.lightness}%, 0.05)`;
    ctx.strokeStyle = `hsla(${Math.abs(wave.hue * Math.sin(increment))} , ${wave.saturation}%, ${wave.lightness}%, 1)`;
    //wave.hue+=1;
    ctx.stroke();
    increment += wave.frequency;
}

function animate(){
    //ctx.clearRect(0, 0, canvas.width, canvas.height);

    //fade in color background
    ctx.fillStyle = `rgba(${bg.r}, ${bg.g}, ${bg.b}, ${bg.a})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    draw();
    requestAnimationFrame(animate);
}
animate();