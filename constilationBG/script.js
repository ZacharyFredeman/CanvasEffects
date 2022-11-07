const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = [];
let hue = Math.floor(Math.random() *(360-0) + 0);


//resize when window size is changed
window.addEventListener('resize', function(){
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
});

class Particle{
    constructor(){
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 15 + 1;
        this.speedX = Math.random() *3 - 1.5;
        this.speedY = Math.random() *3 - 1.5;
        this.grow = false;

        //particle holds color
        //this.color = 'hsl(' + hue + ', 100%, 50%)';
    }
    update(){
        this.x += this.speedX;
        this.y += this.speedY;

        //make particles shrink and grow as they move
        if(this.size > 0.2 && this.grow == false){
            this.size -=0.1;
        }
        else{
            this.size +=0.1;
        }
    }
    draw(){
        //can dynamiclly change color, saturation, lightness
        ctx.fillStyle ='hsl(' + hue + ', 100%, 50%)'; //for changing particle color continousioly
        //ctx.fillStyle= this.color; //for mainting paritcle same color

        ctx.beginPath();//tell canvas to place brush and start drawing new shape
        ctx.arc(this.x, this.y, this.size, 0, Math.PI *2);
        ctx.fill();//colorsw in whoel shape
    }
}


function handleParticles(){
    for(let i =0; i < particlesArray.length; i++){
        particlesArray[i].update();
        particlesArray[i].draw();
        
        //for constilation effect
        // for(let l =0; l < particlesArray.length; l++){
        //     //use pythagtheorm to calc distance between particles
        //     const dx = particlesArray[i].x - particlesArray[l].x;
        //     const dy = particlesArray[i].y - particlesArray[l].y;
        //     const distance = Math.sqrt(dx * dx + dy * dy);
        //     if(distance < 100){
        //         ctx.beginPath();

        //         ctx.strokeStyle = 'hsl(' + hue + ', 100%, 50%)';
        //         ctx.lineWidth = particlesArray[i].size/3;
        //         //ctx.lineWidth = 0.5;

        //         ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
        //         ctx.lineTo(particlesArray[l].x, particlesArray[l].y);
        //         ctx.stroke();
        //         ctx.closePath();
        //     }
        // }

        //check wether particle should grow or shrink
        if(particlesArray[i].size <= 0.2){
            particlesArray[i].grow = true;
        }
        else if(particlesArray[i].size >= 20){
            particlesArray[i].grow = false;
        }

        //check particle remains in bounds
        if(particlesArray[i].x >= canvas.width || particlesArray[i].x <= 0){
            //switch direction
            particlesArray[i].speedX = -1 * (particlesArray[i].speedX);
        }
        if(particlesArray[i].y >= canvas.height || particlesArray[i].y <= 0){
            particlesArray[i].speedY = -1 * (particlesArray[i].speedY);
        }

    }
}

function drawParticles(){
    for(let i =0; i < 600; i++){
        particlesArray.push(new Particle());
    }
}
drawParticles();

function animate(){
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    //for each particle to leave trail
    ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    handleParticles();

    //change how fast it goes through color spectrum
    hue+=0.5;

    requestAnimationFrame(animate);
}
animate();