const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = [];
let hue = 0;


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
    for(let i =0; i < 10; i++){
        particlesArray.push(new Particle());
    }

})

canvas.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    for(let i =0; i < 5; i++){
        particlesArray.push(new Particle());
    }
})

class Particle{
    constructor(){
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * 15 + 1;
        this.speedX = Math.random() *3 - 1.5;
        this.speedY = Math.random() *3 - 1.5;

        //particle holds color
        this.color = 'hsl(' + hue + ', 100%, 50%)';
    }
    update(){
        this.x += this.speedX;
        this.y += this.speedY;

        //make particles shrink as they move
        if(this.size > 0.2){
            this.size -=0.1;
        }
    }
    draw(){
        //can dynamiclly change color, saturation, lightness

        //for changing particle color continousioly
        //ctx.fillStyle ='hsl(' + hue + ', 100%, 50%)';
         
        //for mainting paritcle same color
        ctx.fillStyle= this.color; 
        
        //ctx.strokeStyle='red';
        //ctx.lineWidth = 3;//change width of line drawn
    
        ctx.beginPath();//tell canvas to place brush and start drawing new shape
        ctx.arc(this.x, this.y, this.size, 0, Math.PI *2);
        ctx.fill();//colorsw in whoel shape
        //ctx.stroke();//colors just outline of shape
    }
}


function handleParticles(){
    for(let i =0; i < particlesArray.length; i++){
        particlesArray[i].update();
        particlesArray[i].draw();
        //for constilation effect
        for(let l =0; l < particlesArray.length; l++){
            //use pythagtheorm to calc distance between particles
            const dx = particlesArray[i].x - particlesArray[l].x;
            const dy = particlesArray[i].y - particlesArray[l].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if(distance < 100){
                ctx.beginPath();

                ctx.strokeStyle = particlesArray[i].color;
                //ctx.lineWidth = particlesArray[i].size/10;
                ctx.lineWidth = 0.5;

                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[l].x, particlesArray[l].y);
                ctx.stroke();
                ctx.closePath();
            }
        }

        //check to despawn after checking distance
        if(particlesArray[i].size <= 0.2){
            particlesArray.splice(i, 1);
            //need to adjust i or itll skip a particle, creating a particle blink effect
            console.log(particlesArray.length);
            i--;
        }
    }
}

function animate(){
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    //for each particle to leave trail
    ctx.fillStyle = 'rgba(0, 0, 0, 0.01)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //drawCircle();
    handleParticles();

    //change how fast it goes through color spectrum
    hue+=10;

    requestAnimationFrame(animate);
}
animate();

//console.log(ctx);