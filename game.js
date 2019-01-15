gameState = {
    pause: false,
    over: false,
    playAgain: false
}

canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d');

function draw() {

    if (gameState.over) {
        playGameOverAnimation()
    }

    if (gameState.pause) {
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

    if (allowedDirectionKeys[e.keyCode]) {
        setPacManDirections(allowedDirectionKeys[e.keyCode])
    }

    if (configKeys[e.keyCode]) {
        setConfig(configKeys[e.keyCode])
    }
});

draw()