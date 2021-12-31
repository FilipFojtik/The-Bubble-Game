//Canvas    ----------------------------------------------------------------------------------------------------------------
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let score = 0;
let redBubble = 5;
let gameFrame = 0;
ctx.font = '50px Gill Sans MT';
let gameSpeed = 1;
let gameOver = false;

//Interakce ----------------------------------------------------------------------------------------------------------------
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

//Player    ----------------------------------------------------------------------------------------------------------------
const playerLeft = new Image();
playerLeft.src = 'Bubble_picture1.png';
const music = document.createElement('audio');
music.src = 'Music.mp3';
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
            music.play();
        }
        ctx.fillStyle = 'rgb(212,164,28)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        if (this.x >= mouse.x) {
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

//Bubbles +  ----------------------------------------------------------------------------------------------------------------
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
        ctx.fillStyle = 'white';
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
    if (gameFrame % 50 == 0) {
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
            (console.log('Bubble BUM +++'));
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

//Bubbles -  ----------------------------------------------------------------------------------------------------------------
const bubblesArrayb = [];
const bubbleImage = new Image();
bubbleImage.src = 'Bubble_picture3.png';
class Bubbleb {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 100;
        this.radius = 30;
        this.speed = Math.random() * 5 + 1;
        this.distance;
        this.soundb = Math.random() <= 0.5 ? 'sound3' : 'sound4';
    }
    update() {
        this.y -= this.speed;
        const dx = this.x - player.x;
        const dy = this.y - player.y;
        this.distance = Math.sqrt(dx*dx + dy*dy);
    }
    draw() {
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.drawImage(bubbleImage, this.x - 30, this.y - 30, this.radius * 2, this.radius * 2);
    }
}

const bubblePop3 = document.createElement('audio');
bubblePop3.src = 'Bubble3.mp3';
const bubblePop4 = document.createElement('audio');
bubblePop4.src = 'Bubble4.mp3';

function handleBubblesb() {
    if (gameFrame % 50 == 0) {
        bubblesArrayb.push(new Bubbleb());
        console.log(bubblesArrayb.length);
    }
    for (let i = 0; i < bubblesArrayb.length; i++) {
        bubblesArrayb[i].update();
        bubblesArrayb[i].draw();
    }
    for (let i = 0; i < bubblesArrayb.length; i++) {
        if(bubblesArrayb[i].y < 0 - bubblesArrayb[i].radius * 2) {
            bubblesArrayb.splice(i, 1);
        }
        if(bubblesArrayb[i].distance < bubblesArrayb[i].radius + player.radius) {
            (console.log('Bubble BUM ---'));
            if(!bubblesArrayb[i].counted) {
                if(bubblesArrayb[i].soundb == 'sound3') {
                    bubblePop3.play();
                } else {
                    bubblePop4.play();
                }
                //score -= redBubble;
                bubblesArrayb[i].counted = true;
                bubblesArrayb.splice(i, 1);
                handleGameOverB();
                handleGameOverT();
            }
        }
    }
}

//Pozadí    ----------------------------------------------------------------------------------------------------------------
const background = new Image();
background.src = 'Background1.png';

/*const background2 = new Image();
background2.src = 'Background2.png';

const BG = {
    x1: 0,
    x2: canvas.width,
    y: 0,
    width: canvas.width,
    height: canvas.height
}

function handleBackground() {
    BG.x1 -= gameSpeed;
    if(BG.x1 < -BG.width) BG.x1 = BG.width;
    BG.x2 -= gameSpeed;
    if(BG.x2 < -BG.width) BG.x2 = BG.width;
    ctx.drawImage(background, BG.x1, BG.y, BG.width, BG.height);
    ctx.drawImage(background2, BG.x2, BG.y, BG.width, BG.height);
}*/

//Game Over ----------------------------------------------------------------------------------------------------------------
const gameOverImage = new Image();
gameOverImage.src = 'Bubble_picture4.png';

function handleGameOverB() {
    ctx.fillStyle = 'rgb(212,164,28)';
    ctx.fillRect(canvas.width / 2 - 350, canvas.height / 2 - 100, 700, 200);
    gameOver = true;
    music.pause();
    localStorage.setItem("LastScore", score);
}
function handleGameOverT() {
    ctx.fillStyle = 'white';
    ctx.fillText('GAME OVER | Total Score: ' + score, canvas.width / 2 - 300, canvas.height / 2 + 15);
    player.splice(i, 1);
}

//Animace   ----------------------------------------------------------------------------------------------------------------
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //handleBackground();
    handleBubbles();
    handleBubblesb();
    player.update();
    player.draw();
    ctx.fillText('Score: ' + score, 10, 50);
    gameFrame ++;
    if (!gameOver) requestAnimationFrame(animate);
    //console.log(gameFrame);
}
animate();

window.addEventListener('resize', function() {
    canvasPosition = canvas.getBoundingClientRect();
});