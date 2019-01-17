gameState = {
    pause: false,
    over: false,
    playAgain: false,
    rewind: false
}

canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d');

function draw() {

    if (gameState.over) {
        playGameOverAnimation()
    }

    if (gameState.pause && !gameState.rewind) {
        return
    }

    ctx.clearRect(0, 0, 800, 800);
    drawPacMan(ctx, { x: pacManPosition.x, y: pacManPosition.y })

    eatFood()

    pacEnemies.forEach(pacEnemy => {
        pacEnemy.drawPacEnemy(ctx);
    });
    updatePositons()
    requestAnimationFrame(draw)
}

function playGameOverAnimation() {

    ctx.clearRect(0, 0, 800, 800);
    if (killPacMan()) {
        gameState.playAgain = true;
        gameState.over = false;
    };
    pacEnemies.forEach(pacEnemy => {
        pacEnemy.drawPacEnemy(ctx);
        pacEnemy.animateEyes();
    });
    requestAnimationFrame(draw);

}

function eatFood() {
    pacManHead = pacManPosition.y - PACMAN_RADIUS;
    pacManBack = pacManPosition.x - PACMAN_RADIUS;
    for (var i = pacManBack; i < pacManBack + 2 * PACMAN_RADIUS; i++) {
        for (var j = pacManHead; j < pacManHead + 2 * PACMAN_RADIUS; j++) {
            if (!(i % (GRID_CELL_SIZE / 2)) && !(j % (GRID_CELL_SIZE / 2))) {
                if (!filteredFoodPoints.includes([i, j].toString())) {
                    filteredFoodPoints.push([i, j].toString());
                    drawBackdrop();
                }
            }
        }
    }
}

function updatePositons() {

    pacManPosition.x += pacManSpeed.x;
    pacManPosition.y += pacManSpeed.y;

    pacEnemies.forEach(pacEnemy => {
        pacEnemy.goForward();
    });

    for (let gridRect = 0; gridRect < GRID_1.length; gridRect++) {
        const element = GRID_1[gridRect];
        getPacManCollisionWith(element);
        pacEnemies.forEach(pacEnemy => {
            pacEnemy.getCollisionWith(element)
            if (getPacManCollisionWith([pacEnemy.x - PACMAN_RADIUS, pacEnemy.y - PACMAN_RADIUS, 2 * PACMAN_RADIUS, 2 * PACMAN_RADIUS, 10])) {
                gameState.over = true;
                gameState.pause = true;
            }
        })
    }

}

function setConfig(config) {
    switch (config) {
        case 'space':
            gameState.pause = !gameState.pause;
            if (!gameState.pause) {
                requestAnimationFrame(draw)
            }

            if (gameState.playAgain)
                reset();

            break;
        case 'do X':
            rewind();
            break;
    }
}

document.addEventListener('keyup', function (e) {
    var allowedDirectionKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
    };

    var configKeys = {
        32: 'space',
        88: 'do X'
    }

    if (allowedDirectionKeys[e.keyCode] && !gameState.pause) {
        setPacManDirections(allowedDirectionKeys[e.keyCode])
    }

    if (configKeys[e.keyCode]) {
        setConfig(configKeys[e.keyCode])
    }
});

textString=""
function coolText (gameText) {
    textString+=gameText + '\n';
    textArray = textString.split('\n');
    var frontCanvas = document.getElementById('frontCanvas');
    frontCtx = frontCanvas.getContext('2d');
    frontCtx.clearRect(0, 0, frontCanvas.width, frontCanvas.height);
    frontCtx.font = "40px Comic Sans MS";
    frontCtx.fillStyle = "black";
    frontCtx.textAlign = "center";
    textHeight = frontCanvas.height/2 - (textArray.length/2 * LINE_HEIGHT);
    for(var i = 0; i < textArray.length; i++) {
        frontCtx.fillText(textArray[i], frontCanvas.width/2, textHeight + (i * LINE_HEIGHT));
    }
}
// coolText("SARANSH");
// coolText("GUPTA");
// coolText("GARIMA");
// coolText("SAXENA");
// coolText("WOAH");
draw()
