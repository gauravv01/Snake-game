const canvas=document.getElementById('game');
const ctx=canvas.getContext('2d');

let tileCount=20;
let tileSize=18;
let headX=10;
let headY=10;


function Drawgame(){
   changeSnakePosition();

   let result=isGameOver();
   if(result){
    return
   }
   clearscreen();
   drawSnake();
   checkCollision();
   drawApple();

   drawScore();
   let speed=7;
   setTimeout(Drawgame, 1000/speed);

}

function clearscreen(){
    ctx.fillStyle='black';
    ctx.fillRect(0,0,canvas.clientWidth,canvas.clientHeight);
}

function drawSnake(){
    ctx.fillStyle='green';
    for(let i=0;i<snakeparts.length;i++){
        let part=snakeparts[i];
        ctx.fillRect(headX*tileCount,headY*tileCount,tileSize,tileSize);
    }
    snakeparts.push(new snakePart(headX,headY));
}


let Xvelocity=0;
let Yvelocity=0;

document.body.addEventListener('keydown',keyDown);

function keyDown(event){
if(event.keyCode==38){
    if(Yvelocity==1){
        return
    }
Yvelocity=-1;
Xvelocity=0;
}
if(event.keyCode==40){
    if(Yvelocity==-1){
        return
    }
    Yvelocity=1;
    Xvelocity=0;
    }
    if(event.keyCode==37){
        if(Xvelocity==1){
            return
        }
        Yvelocity=0;
        Xvelocity=-1;
        }
        if(event.keyCode==39){
            if(Xvelocity==-1){
                return
            }
            Yvelocity=0;
            Xvelocity=1;
            }
}

function changeSnakePosition(){
    headX=headX + Xvelocity;
    headY=headY + Yvelocity;
}

let appleX=5;
let appleY=5;

function drawApple(){
    ctx.fillStyle='red';
    ctx.fillRect(appleX*tileCount,appleY*tileCount,tileSize,tileSize)
}

const snakeparts=[];
let tailLength=2;


function checkCollision(){
    if(appleX==headX && appleY==headY){
        appleX=Math.floor(Math.random()*tileCount);
        appleY=Math.floor(Math.random()*tileCount);
        tailLength++;
        score++;
    }
}

class snakePart{
    constructor(x,y){
        this.x=x;
        this.y=y;
    }
}

let score=0;

function drawScore(){
    ctx.fillStyle='white';
    ctx.font='10px verdena';
    ctx.fillText('Score:' +score,canvas.clientWidth-50,10);
}

function isGameOver(){
        let gameover=false;

        if(Yvelocity===0 && Xvelocity===0){
            return false;
        }

        if(headX<0){
            gameover=true
        }
        else if(headX===tileCount){
            gameover=true
        }
        else if(headY<0){
            gameover=true
        }

        else if(headY===tileCount){
            gameover=true
        }

        for(let i=0;i<snakeparts.length;i++){
            let part=snakeparts[i];
            if(part.x===headX && part.y===headY){
                gameover=true
                break
            }
        }

        if(gameover){
            ctx.fillStyle='white';
            ctx.font='50px verdena';
            ctx.fillText('Game Over!', canvas.clientWidth/6.5,canvas.clientHeight/2);
        }
        return gameover;
}
Drawgame();