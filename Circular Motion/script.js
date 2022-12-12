const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];

var colorArray =[
    '#d61406',
    '#f79f1b',
    '#cc144f',
    '#c7389c',
    '#8f099c',
    '#350469',
];

window.addEventListener('resize',  function(event){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})


let mouse = {
    x: undefined,
    y: undefined,

}

window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    //console.log(mouse);
});

class Particle{
    constructor(){
        this.x = canvas.width/2;
        this.y = canvas.height/2;
        this.originX = this.x;
        this.originY = this.y;
        this.prevX = this.x;
        this.prevY =this.y;
        this.radius = Math.random() * (5 -2) +2;
        this.color = colorArray[Math.floor(Math.random() * colorArray.length -1)];;
        this.radians = Math.random() * Math.PI*2; //were on circle to start
        this.velocity = 0.05; //how fast particle moves
        this.distFromCenter =Math.random() * (100 - 50) +50;

        //this.lastPoint = {x: this.x, y: this.y};
        //make very cool by adding seprate diffrent distFromcenterfor x and y
        this.distFromCenterX =Math.random() * (100 - 50) +50;
        this.distFromCenterY =Math.random() * (100 - 50) +50;
    }

    update(){
        //update orgin location to mouse location
        if(mouse.x != null){
            this.originX = mouse.x;
            this.originY = mouse.y;
        }
        this.prevX = this.x;
        this.prevY =this.y;
        //add code later;
        //move points over time
        this.radians += this.velocity;
        //original location + cos of its radian * how far to move
        this.x = this.originX + Math.cos(this.radians) * this.distFromCenter; //make very cool change to DistFromCenterX
        //for cicular effect add sin to it
        this.y = this.originY + Math.sin(this.radians) * this.distFromCenter; //make very cool change to DistFromCenterY

    }

    draw(){
        // ctx.beginPath();
        // ctx.fillStyle = this.color;
        // ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        // ctx.fill();
        // ctx.closePath();

        //for less ridged look draw line instead
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        //ctx.moveTo(this.lastPoint.x, this.lastPoint.y); funky effect
        ctx.lineWidth = this.radius; 
        ctx.moveTo(this.prevX, this.prevY);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();
        ctx.closePath();
    }
}

function initParticles(){
    for(let i = 0; i < 50; i++){
        particlesArray.push(new Particle());
    }
}
initParticles();

function handleParticles(){
    for(let i = 0; i < particlesArray.length; i++){
        particlesArray[i].update();
        particlesArray[i].draw();
    }
}

console.log(particlesArray);

function animate(){
    //clear screen
    //ctx.clearRect(0, 0, canvas.width, canvas.height);

    //for fade effect
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    handleParticles();

    requestAnimationFrame(animate);
}
animate();