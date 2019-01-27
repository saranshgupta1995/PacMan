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
            document.getElementsByTagName('ul')[0].style.opacity = 1;
            if (!gameState.pause) {
                document.getElementsByTagName('ul')[0].style.opacity = 0.5;
                requestAnimationFrame(draw);
            }

            if (gameState.playAgain)
                reset();

            break;
        case 'do X':
            rewind();
            break;
    }
}

showImageAnimation = false;

function snapshot() {
    var ulTag = document.getElementsByTagName('ul')[0];
    var canvasSnapshot = canvas.toDataURL();
    var liTag = document.createElement('li');
    var hrTag = document.createElement('hr');
    var imageAnimate = document.createElement('img');
    liTag.style.height = '200px';
    liTag.style.width = '100%';
    let hash = ulTag.childElementCount;
    liTag.onclick = function() {
        if(gameState.pause)
            rewind(hash);
    }
    imageAnimate.src = canvasSnapshot;
    imageAnimate.style.position = "absolute";
    imageAnimate.style.top = 0;
    imageAnimate.style.zIndex = -30;
    imageAnimate.style.right = '1000px';
    imageAnimate.style.width = '800px';
    imageAnimate.style.transitionDuration = "500ms";
    showImageAnimation = true;
    liTag.appendChild(imageAnimate);
    liTag.appendChild(hrTag)
    ulTag.insertChildAtIndex(liTag, 0);
    ulTag.style.opacity = gameState.pause? 1 : 0.5;    
    setTimeout(()=>{
        imageAnimate.style.right = 0;
        imageAnimate.style.width = '200px';
    },50)
    setTimeout(() => {
        showImageAnimation = false;
        imageAnimate.style.position = "relative";
    },550)
    takeSnap(hash, this, ["ctx","parent","canvas","bgCtx","rewindedLevel","gameState","callee","caller"]);
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

    var spanshotKey = {
        13: 'enter'
    }

    if (allowedDirectionKeys[e.keyCode] && !gameState.pause) {
        setPacManDirections(allowedDirectionKeys[e.keyCode])
    }

    if (configKeys[e.keyCode]) {
        setConfig(configKeys[e.keyCode])
    }

    if(spanshotKey[e.keyCode]){
        snapshot();
    }
});

draw()
