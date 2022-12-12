const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//mouse
let mouse = {
    x: undefined,
    y: undefined,
}

window.addEventListener("resize", function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight

    //needs to recreate and redraw particles
    particlesArray = [];
    drawParticles();
});


//mouse movement 
canvas.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;

    //console.log(mouse);
});

//code
let particlesArray = [];

class Particle{
    constructor(){
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.originX = this.x;
        this.originY = this.y;

        this.speedX = Math.random() * (1 +1) -1;
        this.speedY = Math.random() * (1+1) -1;
        this.radius = Math.random() * (20 -10) + 10;//doublecheck how this random works
        this.areaX = Math.random() * (150 -50) +50 ;
        this.areaY = Math.random() * (150 -50) +50;

        //change opacity based off mouse location
        this.color ='rgba(66, 255, 178, 0.8)';
        this.opacity = 1;
    }
    update(){
        this.x += this.speedX;
        this.y += this.speedY;

        //particles move in their own little world
        let xDist = this.originX - this.x;
        if(xDist > this.areaX || xDist < -this.areaX){
            this.speedX = -this.speedX;
        }
        let yDist = this.originY - this.y;
        if(yDist > this.areaY || yDist < -this.areaY){
            this.speedY = -this.speedY;
        }

        //if mouse is near particle make particle visible
        //circle pythag
        let mouseDistX = mouse.x - this.x;
        let mouseDistY = mouse.y - this.y;
        let mouseDist = Math.sqrt(mouseDistX * mouseDistX + mouseDistY * mouseDistY);
        if(mouseDist < 50 && mouseDist > -100){
            this.opacity =0.8;
            //console.log(this.opacity);
        }
        else if(mouseDist < 100 && mouseDist> -200){
            this.opacity = 0.3;
        }
        else if(mouseDist < 150 && mouseDist> -200){
            this.opacity = 0.1;
        }
        else{
            this.opacity = 0.00;
        }
        this.color = 'rgba(66, 255, 178, ' + this.opacity + ')';
        this.lineColor = 'rgba(66, 255, 178, ' + this.opacity/2 + ')';
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}

function handleParticles(){
    for(let i =0; i < particlesArray.length; i++){
        particlesArray[i].update();
        particlesArray[i].draw();


        // constilation effect
        for(let l =0; l < particlesArray.length; l++){
            //pythag for dist between particles
            const distX = particlesArray[i].x - particlesArray[l].x;
            const distY = particlesArray[i].y - particlesArray[l].y;
            const distance = Math.sqrt(distX * distX + distY * distY);
            
            //make it so lines only touch border of circle
            //calc pythag og center to edge of circle
            // let newX = 0;
            // let newY = 0;

            // let toX = 0;
            // let toY = 0;
            // if(distX < 0){
            //     //is negative
            //     newX = particlesArray[i].x + particlesArray[i].radius;
            //     toX = particlesArray[l].x - particlesArray[l].radius;
            // }
            // else{
            //     //is positive
            //     newX = particlesArray[i].x - particlesArray[i].radius;
            //     toX = particlesArray[l].x + particlesArray[l].radius;
            // }

            // //check y dist
            // if(distY < 0){
            //     newY = particlesArray[i].y - particlesArray[i].radius;
            //     toY = particlesArray[l].y + particlesArray[l].radius;
            // }
            // else{
            //     newY = particlesArray[i].y + particlesArray[i].radius;
            //     toY = particlesArray[l].y - particlesArray[l].radius;
            // }

            if(distance < 150){
                ctx.beginPath();
                ctx.strokeStyle = particlesArray[l].color;
                ctx.lineWidth = particlesArray[i]/3;

                // ctx.moveTo(newX, newY);
                // ctx.lineTo(toX, toY);

                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[l].x, particlesArray[l].y);
                ctx.stroke();
                ctx.closePath();
            }
        }

        //alternate consilation effect to the first 5 partilces
        // let overflowed = 0;
        // for(let l =i; l < i+25; l++){
        //     if(l < particlesArray.length){
        //         ctx.beginPath();
        //         ctx.strokeStyle = color;
        //         ctx.lineWidth = particlesArray[i]/3;
        //         ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
        //         ctx.lineTo(particlesArray[l].x, particlesArray[l].y);
        //         ctx.stroke();
        //         ctx.closePath();
        //     }
        //     else{
        //         ctx.beginPath();
        //         ctx.strokeStyle = color;
        //         ctx.lineWidth = particlesArray[i]/3;
        //         ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
        //         ctx.lineTo(particlesArray[overflowed].x, particlesArray[overflowed].y);
        //         ctx.stroke();
        //         ctx.closePath();
        //         overflowed++;
        //     }
        // }
    }
}

function drawParticles(){
    let screenArea = canvas.width * canvas.height;
    for(let i =0; i < screenArea * 0.0001; i++){
        particlesArray.push(new Particle());
    }
}
drawParticles();

console.log(particlesArray);

function animate(){
    //clear screen
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    handleParticles();

    requestAnimationFrame(animate);
}
animate();