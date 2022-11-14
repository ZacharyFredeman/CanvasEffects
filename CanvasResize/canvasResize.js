var canvas = document.getElementById('canvas1');
console.log(canvas);
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


// //draw a rectangle
// ctx.fillRect(50, 50, 150, 150);

// //draw a line
// ctx.beginPath();
// ctx.moveTo(210, 210);
// ctx.lineTo(400, 400);
// ctx.strokeStyle = 'magenta';
// ctx.stroke();

// //draw a circle
// //x, y, startAngle, endAngle, bool draw counterclockwise
// ctx.beginPath();
// ctx.arc(400, 400, 50, 0, Math.PI *2, false);
// ctx.strokeStyle = 'blue';
// ctx.stroke();

// //draw an arc and fill it in
// ctx.beginPath();
// ctx.arc(600, 400, 50, 0, Math.PI *1.5, false);
// ctx.strokeStyle = 'green';
// ctx.fillStyle = 'orange';
// ctx.fill();
// ctx.stroke();

// //draw multiple arcs objects
// for(let i = 0; i < 5; i++){
//     let x = Math.random() * canvas.width;
//     let y = Math.random() * canvas.height;
//     let r = Math.random() * 100;
//     let d = Math.random()*20;
//     d =d/10;

//     ctx.beginPath();
//     ctx.arc(x, y, r, 0, Math.PI *d, false);
//     ctx.strokeStyle = 'green';
//     ctx.fillStyle = 'orange';
//     ctx.fill();
//     ctx.stroke();
// }

window.addEventListener('resize',  function(event){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    //dynamically genrate circles when resized
    init();
})


let mouse = {
    x: undefined,
    y: undefined
}

let maxR = 50;
let minR = 10;

var colorArray =[
    '#fff',
    '#ffaa33',
    '99ffaaa',
    '00ff00',
    '#4411aa',
    '#ff1100',
];

//mouse movement
//needs type of event, function to call
window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    //console.log(mouse);
});

//draw some circles and bounce them around the screen
function Circle(x, y, xSpeed, ySpeed, radius){
    this.x = x;
    this.y = y;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.radius = radius;
    //this.maxR = radiusMin;
    this.minR = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length -1)];

    this.draw = function(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI *2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    this.update = function(){
        this.x += this.xSpeed;
        this.y += this.ySpeed;

        if(this.x + this.radius > canvas.width || this.x - this.radius < 0 ){
            this.xSpeed = -this.xSpeed;
        }
    
        if(this.y + this.radius > canvas.height || this.y - this.radius < 0 ){
            this.ySpeed = -this.ySpeed;
        }

        //mouse check
        //make circle bigger if near mouse
        if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && this.radius < maxR){
            if(mouse.y - this.y < 50 && mouse.y - this.y > -50){
                //make circle bigger
                this.radius +=1;
            }
        }
        else if(this.radius > this.minR){
            //circle gets smaller
            this.radius -=0.5;
        }
    }
}

//array to store arcs
let circleArray = [];

//for window resize to regenerate circles
function init(){
    circleArray = [];

    for(let i =0; i < 1000; i++){
        let r = Math.random() * (25 -5*2) +5;
        let x = Math.random() * (canvas.width - r*2) + r;
        let y = Math.random() * (canvas.height - r*2) +r;
        let speedX = Math.random() * 4 - 2;
        let speedY = Math.random() * 4 - 2;
        circleArray.push(new Circle(x, y, speedX, speedY, r));
    }
}


//console.log(circleArray);

let xA = 55;
let yA = 55;

let xSpeed = 5;
let ySpeed =5;
let aRadius = 50;
function animate(){
    //clear the screen
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for(let i = 0; i < circleArray.length; i++){
        //calls circle draw method
        circleArray[i].draw();
        //calls circle update method
        circleArray[i].update();
    }

    //calss the animatefunction recursively
    requestAnimationFrame(animate);
}
init();
animate();