var foodPoints = [];
var allFoodPoints = [];
var filteredFoodPoints = [];

pacEnemy = new PacEnemy(GRID_CELL_SIZE / 2, GRID_CELL_SIZE / 2)

function draw() {
    canvas = document.getElementById('canvas');
    foodPoints = [];
    allFoodPoints = [];
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        flushCanvas(ctx)
        drawPacMan(ctx, { x: pacManPosition.x, y: pacManPosition.y })
        definePacFood(ctx)

        GRID_1.forEach(gridRect => {
            removeFoodPointsInRect(...gridRect)
            roundedRect(ctx, ...gridRect)
        })

        eatFood()

        drawPacFood(ctx)

        pacEnemy.saveCtx(ctx);
        pacEnemy.drawPacEnemy();
        updatePositons()
    }
    requestAnimationFrame(draw)
}

function definePacFood(ctx) {
    for (var i = 0; i < canvas.width; i += GRID_CELL_SIZE) {
        for (var j = 0; j < canvas.width; j += GRID_CELL_SIZE) {
            if (!filteredFoodPoints.includes([GRID_CELL_SIZE / 2 + i, GRID_CELL_SIZE / 2 + j].toString()))
                allFoodPoints.push([GRID_CELL_SIZE / 2 + i, GRID_CELL_SIZE / 2 + j].toString());
        }
    }
}

function drawPacFood(ctx) {
    for (var i = 0; i < allFoodPoints.length; i++) {
        if (!filteredFoodPoints.includes(allFoodPoints[i])) {
            ctx.fillRect(allFoodPoints[i].split(',').map(x => parseInt(x))[0], allFoodPoints[i].split(',').map(x => parseInt(x))[1], FOOD_SIZE, FOOD_SIZE);
        }
    }
}

function eatFood() {
    pacManHead = pacManPosition.y - PACMAN_RADIUS;
    pacManBack = pacManPosition.x - PACMAN_RADIUS;
    for (var i = pacManBack; i < pacManBack + 2 * PACMAN_RADIUS; i++) {
        for (var j = pacManHead; j < pacManHead + 2 * PACMAN_RADIUS; j++) {
            if (!(i % (GRID_CELL_SIZE / 2)) && !(j % (GRID_CELL_SIZE / 2))) {
                if (!filteredFoodPoints.includes([i, j].toString())) {
                    filteredFoodPoints.push([i, j].toString())
                }
            }
        }
    }
}

function updatePositons() {

    pacManPosition.x += pacManSpeed.x;
    pacManPosition.y += pacManSpeed.y;

    pacEnemy.goForward();

    for (let gridRect = 0; gridRect < GRID_1.length; gridRect++) {
        const element = GRID_1[gridRect];
        getPacManCollisionWith(element);
        pacEnemy.getCollisionWith(element)
    }

}

function removeFoodPointsInRect(x, y, width, height) {
    if (x || y) {
        for (var i = 0; i < allFoodPoints.length; i++) {
            foodX = allFoodPoints[i].split(',').map(x => parseInt(x))[0];
            foodY = allFoodPoints[i].split(',').map(x => parseInt(x))[1];
            if (
                (foodX >= x && foodX <= x + width) &&
                (foodY >= y && foodY <= y + height)
            ) {
                filteredFoodPoints.push(allFoodPoints[i]);
            }
        }
    }
}

document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    if (allowedKeys[e.keyCode]) {
        setPacManDirections(allowedKeys[e.keyCode])
    }

});

draw()