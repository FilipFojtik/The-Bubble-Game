//Canvas
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let score = 0;
let gameFrame = 0;
ctx.font = '50px Georgia';

//Interakce
let canvasPosition = canvas.getBoundingClientRect();
const mouse = {
    x: canvas.width/2,
    y: canvas.height/2,
    click: false
}
canvas.addEventListener('mousedown', function(event) {
    mouse.click = true;
    mouse.x= event.x - canvasPosition.left;
    mouse.y = event.y - canvasPosition.top;
    console.log(event, mouse.x, mouse.y);
});
canvas.addEventListener('mouseup', function() {
    mouse.click = false;
});

//Player
const playerLeft = new Image();
playerLeft.src = 'Bubble_picture1.png';
//const playerRight = new Image();
//playerRight.src = 'Bubble_picture2.png';
class PLayer {
    constructor() {
        this.x = canvas.width/2;
        this.y = 0;
        this.radius = 50;
        this.angle = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.frame = 0;
        this.spriteWidth = 498;
        this.spriteHeight = 327;
    }
    update() {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        let theta = Math.atan2(dy, dx);
        this.angle = theta;
        if(mouse.x != this.x) {
            this.x -= dx/20;
        }
        if(mouse.y != this.y) {
            this.y -= dy/20;
        }
    }
    draw() {
        if(mouse.click) {
            ctx.lineWidth = 0.2;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
        ctx.fillStyle = 'rgb(212,164,28)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        if(this.x >= mouse.x) {
            ctx.drawImage(playerLeft, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight,
            this.spriteWidth, this.spriteHeight, 0 - 50, 0 - 50, this.spriteWidth/3, this.spriteHeight/3);
        } else {
            ctx.drawImage(playerLeft, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight,
            this.spriteWidth, this.spriteHeight, 0 - 50, 0 - 50, this.spriteWidth/3, this.spriteHeight/3);
        }
        ctx.restore();
    }
}
const player = new PLayer();

//Bubbles
const bubblesArray = [];
class Bubble {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 100;
        this.radius = Math.random() * 20 + 10;
        this.speed = Math.random() * 5 + 1;
        this.distance;
        this.counted = false;
        this.sound = Math.random() <= 0.5 ? 'sound1' : 'sound2';
    }
    update() {
        this.y -= this.speed;
        const dx = this.x - player.x;
        const dy = this.y - player.y;
        this.distance = Math.sqrt(dx*dx + dy*dy);
    }
    draw() {
        ctx.fillStyle = 'rgb(212,212,212)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }
}

const bubblePop1 = document.createElement('audio');
bubblePop1.src = 'Bubble1.mp3';
const bubblePop2 = document.createElement('audio');
bubblePop2.src = 'Bubble2.mp3';

function handleBubbles() {
    if(gameFrame % 50 == 0) {
        bubblesArray.push(new Bubble());
        console.log(bubblesArray.length);
    }
    for (let i = 0; i < bubblesArray.length; i++) {
        bubblesArray[i].update();
        bubblesArray[i].draw();
    }
    for (let i = 0; i < bubblesArray.length; i++) {
        if(bubblesArray[i].y < 0 - bubblesArray[i].radius * 2) {
            bubblesArray.splice(i, 1);
        }
        if(bubblesArray[i].distance < bubblesArray[i].radius + player.radius) {
            (console.log('Bubble BUM'));
            if(!bubblesArray[i].counted) {
                if(bubblesArray[i].sound == 'sound1') {
                    bubblePop1.play();
                } else {
                    bubblePop2.play();
                }
                score ++;
                bubblesArray[i].counted = true;
                bubblesArray.splice(i, 1);
            }
        }
    }
}

//Pozadí
const background = new Image();
background.src = 'Background1.png';

function handleBackground() {
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
}

//Animace
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleBackground();
    handleBubbles();
    player.update();
    player.draw();
    ctx.fillText('Score: ' + score, 10, 50);
    gameFrame ++;
    //console.log(gameFrame);
    requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize', function() {
    canvasPosition = canvas.getBoundingClientRect();
});