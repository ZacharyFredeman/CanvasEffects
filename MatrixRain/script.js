const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//apply a gradient color to the letter based of their position on canvas, pass it into its fillStyle
let gradientL = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
gradientL.addColorStop(0, 'red');
gradientL.addColorStop(0.2, 'yellow');
gradientL.addColorStop(0.4, 'green');
gradientL.addColorStop(0.6, 'blue');
gradientL.addColorStop(0.8, 'white');
gradientL.addColorStop(1, 'cyan');

//Radial needs (centerpointx,centerpointY, radius, outCircleX, outCircleY, radius2 )
let gradientR = ctx.createRadialGradient(canvas.width/2, canvas.height/2, 100, canvas.width/2, canvas.height/2, 500);
gradientR.addColorStop(0, 'red');
gradientR.addColorStop(0.2, 'yellow');
gradientR.addColorStop(0.4, 'green');
gradientR.addColorStop(0.6, 'blue');
gradientR.addColorStop(0.8, 'white');
gradientR.addColorStop(1, 'cyan');

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    effect.resize(canvas.width, canvas.height);

    //for resize of gradient
    gradientL = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradientL.addColorStop(0, 'red');
    gradientL.addColorStop(0.2, 'yellow');
    gradientL.addColorStop(0.4, 'green');
    gradientL.addColorStop(0.6, 'blue');
    gradientL.addColorStop(0.8, 'white');
    gradientL.addColorStop(1, 'cyan');

    //Radial needs (centerpointx,centerpointY, radius, outCircleX, outCircleY, radius2 )
    gradientR = ctx.createRadialGradient(canvas.width/2, canvas.height/2, 100, canvas.width/2, canvas.height/2, 500);
    gradientR.addColorStop(0, 'red');
    gradientR.addColorStop(0.2, 'yellow');
    gradientR.addColorStop(0.4, 'green');
    gradientR.addColorStop(0.6, 'blue');
    gradientR.addColorStop(0.8, 'white');
    gradientR.addColorStop(1, 'cyan');
})

class Symbol{
    constructor(x, y, fontSize, canvasHeight){
        this.characters = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯABCDEFGHIJKLMNOPQRSTUVWXYZ'; //ABCDEFGHIJKLMNOPQRSTUVWXYZ
        this.x = x;
        this.y = y;
        this.fontSize = fontSize;
        this.text ='';
        this.canvasHeight = canvasHeight;
    }

    draw(context){
        //get random character from characters array
        this.text = this.characters.charAt(Math.floor(Math.random()* this.characters.length));
        
        context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);

        //when chars reach bottom of canvas reset them to top of canvas
        if(this.y * this.fontSize > this.canvasHeight && Math.random()>0.95){//math.rand makes each col falll at diffrent times
            this.y = 0;
        }
        else{
            this.y +=1;
        }
    }
}

class Effect{
    constructor(canvasWidth, canvasHeight){
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.fontSize = 25;
        this.columns = this.canvasWidth/this.fontSize;
        this.symbols = [];
        this.#initialize();
    }

    #initialize(){
        //fill symbols array
        for(let i = 0; i < this.columns; i++){
            this.symbols[i] = new Symbol(i, 0, this.fontSize, this.canvasHeight);
        }
        //console.log(this.symbols);

    }
    resize(width, height){
        this.canvasWidth = width;
        this.canvasHeight = height;
        this.columns = this.canvasWidth/this.fontSize;
        this.symbols = [];
        this.#initialize();
    }
}

const effect = new Effect(canvas.width, canvas.height);

//used to adjust animation framerate
let lastTime =0;
const fps = 15;
const nextFrame = 1000/fps;
let timer = 0;



function animate(timeStamp){

    //run every 30 fps
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    if(timer > nextFrame){
        //draw transparent rectangle to slowly fade old symbols
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.textAlign = 'center'; //fix text allignment issues with diffretn characters
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        //change color
        ctx.fillStyle("#00FF00")
        //ctx.fillStyle =gradientL;

        //set built in font property
        ctx.font = effect.fontSize + 'px monospace';

        //draw each symbol
        effect.symbols.forEach(symbol => symbol.draw(ctx));

        //reset timer
        timer =0;
    }
    else{
        timer += deltaTime;
    }

    requestAnimationFrame(animate);//automatically passees a timestamp
}
animate(0);