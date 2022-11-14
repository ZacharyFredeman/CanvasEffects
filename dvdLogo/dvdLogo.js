var canvas = document.getElementById('canvas1');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class dvd{
    constructor(){
        this.x = canvas.width/2;
        this.y = canvas.height/2;
        this.txt = "DVD";

        this.speedX = 2;
        this.speedY = 2;
    }
    update(){
        if(this.x >= canvas.width - ctx.measureText(this.txt).width/2 || this.x <= ctx.measureText(this.txt).width/2){
            this.speedX = -this.speedX;
        }
        if(this.y >= canvas.height || this.y <= 15){
            this.speedY = -this.speedY;
        }
        this.x += this.speedX;
        this.y += this.speedY;
    }
    draw(){
        ctx.font = "30px Arial";
        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.fillText(this.txt, this.x, this.y);
    }
}

const logo = new dvd();

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    logo.update();
    logo.draw();
    
    requestAnimationFrame(animate);
}
animate();