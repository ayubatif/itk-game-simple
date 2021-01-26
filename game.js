var dPressed = false;
var aPressed = false;
var wPressed = false;
var sPressed = false;
var spacePressed = false;

var canvas = document.getElementById("gameScreen");
var ctx = canvas.getContext("2d");

var goalRadius = 30;
var goalX = canvas.width - goalRadius - 2;
var goalY = canvas.height / 2;


var ballRadius = 24;

var x = ballRadius * 3;
var y = canvas.height - ballRadius * 3;

var dx = 3;
var dy = -3;

function resetGame() {
    x = ballRadius * 3;
    y = canvas.height - ballRadius * 3;
    dx = 3;
    dy = -3;
    wPressed = aPressed = sPressed = dPressed = spacePressed = false;
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#bbb";
    ctx.fill();
    ctx.strokeStyle = "#777";
    ctx.stroke();
    ctx.closePath();
}

function drawBackground() {
    // Sky
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height/3 * 2);
    ctx.fillStyle = "#2D76ED";
    ctx.fill();
    ctx.closePath();
    
    // Grass
    ctx.beginPath();
    ctx.rect(0, canvas.height/3 * 2, canvas.width, canvas.height/3);
    ctx.fillStyle = "#43C100";
    ctx.fill();
    ctx.closePath();
}

function drawGoal() {
    ctx.beginPath();
    ctx.arc(goalX, goalY, goalRadius, 0, Math.PI*2);
    ctx.strokeStyle = "#FF0000";
    ctx.stroke();
    ctx.closePath();
}

function drawTrajectory() {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + dx * 10, y + dy * 10);
    ctx.strokeStyle = "#FF00FF";
    ctx.stroke();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    drawBall();
    drawGoal();
    drawTrajectory();

    // Move trajectory up and down
    if(wPressed) {
        dy -= 0.1;
    } else if(sPressed) {
        dy += 0.1;
    }

    // Move trajectory left and right
    if(aPressed) {
        dx -= 0.1;
    } else if(dPressed) {
        dx += 0.1;
    }

    // Start updating ball
    if(spacePressed) {
        dy += 0.1;

        x += dx;
        y += dy;
    }

    // Collision detection floor
    if (y > canvas.height - ballRadius) {
        dy *= -0.9;
        y = canvas.height - ballRadius;
    }
    // Collision detection right wall
    if (x > canvas.width - ballRadius) {
        dx *= -0.9;
        x = canvas.width - ballRadius;
    }
    // Collision detection left wall
    if (x < ballRadius) {
        dx *= -0.9;
        x = ballRadius;
    }

    // Collision detection goal
    if (Math.abs(x - goalX) < goalRadius/2 && Math.abs(y - goalY) < goalRadius/2) {
        alert("You did it!!!!!!!!!");
        resetGame();
    }
}

setInterval(draw, 10);



document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.key == "d") {
        dPressed = true;
    } 
    else if(e.key == "a") {
        aPressed = true;
    }
    else if (e.key == " ") {
        spacePressed = true;
    }
    else if (e.key == "w") {
        wPressed = true;
    }
    else if (e.key == "s") {
        sPressed = true;
    }
    else if (e.key == "r") {
        resetGame();
    }
}

function keyUpHandler(e) {
    if(e.key == "d") {
        dPressed = false;
    }
    else if(e.key == "a") {
        aPressed = false;
    }
    else if (e.key == "w") {
        wPressed = false;
    }
    else if (e.key == "s") {
        sPressed = false;
    }
}