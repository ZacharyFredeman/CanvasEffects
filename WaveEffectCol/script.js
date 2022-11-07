const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    effect.resize(canvas.width, canvas.height);
})

class Symbol{
    constructor(x, y, fontSize){
        this.characters = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯABCDEFGHIJKLMNOPQRSTUVWXYZ'; //ABCDEFGHIJKLMNOPQRSTUVWXYZ
        this.x = x;
        this.y = y;
        this.fontSize = fontSize;
        this.text ='';
        //this.canvasHeight = canvasHeight;
    }

    draw(context){
        //get random character from characters array
        this.text = this.characters.charAt(Math.floor(Math.random()* this.characters.length));
        

       // if(this.y %2 ==0){
         context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);
        //}
    }
}

class Effect{
    constructor(canvasWidth, canvasHeight){
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.fontSize = 30;
        this.columns = Math.ceil(this.canvasWidth/this.fontSize);
        this.rows = Math.ceil(this.canvasHeight/this.fontSize);
        this.symbols = [];
        this.#initialize();
    }

    #initialize(){
        let l = 1;
        let z = 0;
        //fill symbols array
        for(let i = 0; i <= (this.columns * this.rows); i++){
            if(z < this.columns){
                this.symbols[i] = new Symbol(z, l, this.fontSize);
                z++;
                //console.log(this.symbols[i]);
            }
            else if (l < this.rows/1.3 || l > this.rows -10){
                z=0;
                l++;
                this.symbols[i] = new Symbol(z, l, this.fontSize, this.canvasHeight);
            }
        }
        console.log(this.columns);
        console.log(this.rows);
        console.log(this.symbols);

    }
    resize(width, height){
        this.canvasWidth = width;
        this.canvasHeight = height;
        this.columns = this.canvasWidth/this.fontSize;
        this.rows = (this.canvasHeight/this.fontSize);
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
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        //draw transparent rectangle to slowly fade old symbols
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.textAlign = 'center'; //fix text allignment issues with diffretn characters
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle ='#0aff0a';

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