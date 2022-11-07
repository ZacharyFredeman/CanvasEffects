const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = [];

//resize when window size is changed
window.addEventListener('resize', function(){
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;

  
});


//store mouse cordinates
const mouse = {
    x: undefined,
    y: undefined,
}

canvas.addEventListener('click', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    //console.log(event);
    //drawCircle();
})

canvas.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    //drawCircle();
})


// function drawCircle(){
//     ctx.fillStyle ='white';
//     ctx.strokeStyle='red';
//     ctx.lineWidth = 10;//change width of line drawn

//     ctx.beginPath();//tell canvas to place brush and start drawing new shape
//     ctx.arc(mouse.x, mouse.y, 50, 0, Math.PI *2);
//     ctx.fill();//colorsw in whoel shape
//     ctx.stroke();//colors just outline of shape
// }

class Particle{
    constructor(){
        //this.x = mouse.x;
        //this.y = mouse.y;
        this.x = Math.random() *canvas.width;
        this.y = Math.random() *canvas.height;

        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() *3 - 1.5;
        this.speedY = Math.random() *3 - 1.5;
    }
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
    }
    draw(){
        ctx.fillStyle ='white';
        ctx.strokeStyle='red';
        ctx.lineWidth = 3;//change width of line drawn
    
        ctx.beginPath();//tell canvas to place brush and start drawing new shape
        ctx.arc(this.x, this.y, this.size, 0, Math.PI *2);
        ctx.fill();//colorsw in whoel shape
        ctx.stroke();//colors just outline of shape
    }
}

function init(){
    for(let i =0; i < 100; i++){
        particlesArray.push(new Particle());
    }
}
init();
//console.log(particlesArray);

function handleParticles(){
    for(let i =0; i < particlesArray.length; i++){
        particlesArray[i].update();
        particlesArray[i].draw();
    }
}

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    //drawCircle();
    handleParticles();

    requestAnimationFrame(animate);
}
animate();

//console.log(ctx);