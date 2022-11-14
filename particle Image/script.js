window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const image1 =this.document.getElementById("image1");

    class Particle{
        constructor(effect, x, y, color){
            this.effect = effect;
            this.x = Math.random() * this.effect.width;//Math.random() * this.effect.width
            this.y = Math.random() * this.effect.height;//Math.random() * this.effect.height
            this.originX = Math.floor(x);
            this.originY = Math.floor(y);
            this.color = color;
            this.size = this.effect.gap;
            this.vx = 0;//Math.random() * 2-1
            this.vy = 0;
            this.ease = 0.05;
            this.dx = 0;
            this.dy = 0;
            this.distance = 0;
            this.force = 0;
            this.angle = 0; //direction pushed away by mouse
            this.friction = 0.5;
        }
        draw(context){
            context.fillStyle = this.color;
            context.fillRect(this.x, this.y, this.size, this.size);
        }
        update(){
            // this.x += this.vx;
            // this.y += this.vy;

            this.dx = this.effect.mouse.x - this.x;
            this.dy = this.effect.mouse.y - this.y;
            this.distance = (this.dx * this.dx + this.dy * this.dy);//coudl swrt, affects radius
            this.force = -this.effect.mouse.radius / this.distance;
            if(this.distance< this.effect.mouse.radius){
                this.angle = Math.atan2(this.dy, this.dx);
                this.vx += this.force * Math.cos(this.angle);
                this.vy += this.force * Math.sin(this.angle);
            }

            this.x += (this.vx *= this.friction) +(this.originX -this.x) *this.ease;
            this.y += (this.vy *= this.friction) +(this.originY - this.y) *this.ease;
        }
        warp(){
            this.x = Math.random() * this.effect.width;
            this.y = Math.random() * this.effect.height;
            this.ease = 0.08;
        }
    }

    class Effect{
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.particlesArray = [];
            this.image1 = document.getElementById("image1");
            this.centerX = this.width * 0.5;
            this.centerY = this.height * 0.5;
            this.x = this.centerX - this.image1.width * 0.5; //this.image.width
            this.y = this.centerY - this.image1.height * 0.5; //this.image.height
            this.gap = 5;
            this.mouse={
                radius: 1500,
                x: undefined,
                y: undefined
            }
            window.addEventListener('mousemove', event =>{
                this.mouse.x = event.x;
                this.mouse.y = event.y;

            });
        }
        init(context){
            // for(let i =0; i < 100; i++)
            // this.particlesArray.push(new Particle(this));
            context.drawImage(this.image1, this.x, this.y);
            const pixels = context.getImageData(0, 0, this.width, this.height).data;
            for(let y = 0; y<this.height; y += this.gap){
                for(let x = 0; x < this.width; x += this.gap){
                    const index = (y * this.width + x) * 4;
                    const red = pixels[index];
                    const green = pixels[index + 1];
                    const blue = pixels[index + 2];
                    const alpha = pixels[index + 3];
                    const color = 'rgb('+ red + ',' + green + ',' + blue + ')';

                    if(alpha > 0){
                        this.particlesArray.push(new Particle(this, x, y, color));
                    }
                }
            }
        }
        draw(context){
            this.particlesArray.forEach(particle => particle.draw(context));
            
        }
        update(){
            this.particlesArray.forEach(particle=> particle.update());
        }
        warp(){
            this.particlesArray.forEach(particle=> particle.warp());
        }
    }

    const effect = new Effect(canvas.width, canvas.height);
    effect.init(ctx);
    console.log(effect);

    function animate(){
        ctx.clearRect(0, 0, canvas.width, canvas.height );
        effect.draw(ctx);
        effect.update();
        requestAnimationFrame(animate);
    }
    animate();

    //warp button
    const warpButton = document.getElementById("warpButton");
    warpButton.addEventListener('click', function(){
        effect.warp();
    }); 
    // ctx.fillRect(50, 50, 100, 200);
    // ctx.drawImage(image1, 0, 0, 500, 500);
});