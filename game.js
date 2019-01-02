var foodPoints = [];
var allFoodPoints = [];
var filteredFoodPoints = [];

function draw() {
    canvas = document.getElementById('canvas');
    foodPoints = [];
    allFoodPoints = [];
    // filteredFoodPoints = [];
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

        drawPacEnemy(ctx)
        // for (var i = 0; i < 8; i++) {
        //   ctx.fillRect(51 + i * 16, 35, 4, 4);
        // }

        // for (i = 0; i < 6; i++) {
        //   ctx.fillRect(115, 51 + i * 16, 4, 4);
        // }

        // for (i = 0; i < 8; i++) {
        //   ctx.fillRect(51 + i * 16, 99, 4, 4);
        // }
        updatePositons()
    }
    requestAnimationFrame(draw)
}

function definePacFood(ctx) {
    for (var i = 0; i < canvas.width; i += GRID_CELL_SIZE) {
        for (var j = 0; j < canvas.width; j += GRID_CELL_SIZE) {
            if (!filteredFoodPoints.includes([GRID_CELL_SIZE / 2 + i, GRID_CELL_SIZE / 2 + j].toString()))
                allFoodPoints.push([GRID_CELL_SIZE / 2 + i, GRID_CELL_SIZE / 2 + j].toString());
            // ctx.fillRect(GRID_CELL_SIZE / 2 + i, GRID_CELL_SIZE / 2 + j, FOOD_SIZE, FOOD_SIZE);
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
                if (!filteredFoodPoints.includes([i,j].toString())) {
                    filteredFoodPoints.push([i,j].toString())
                }
            }
        }
    }
}

function updatePositons() {

    pacManPosition.x += pacManSpeed.x;
    pacManPosition.y += pacManSpeed.y;

    for (let gridRect = 0; gridRect < GRID_1.length; gridRect++) {
        const element = GRID_1[gridRect];
        if (checkCollisions(...element, pacManPosition)) {
            pacManPosition.x -= pacManSpeed.x;
            pacManPosition.y -= pacManSpeed.y;
            break;
        }
    }

}
// A utility function to draw a rectangle with rounded corners.

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

function drawPacEnemy(ctx) {
    ctx.beginPath();
    ctx.moveTo(83, 116);
    ctx.lineTo(83, 102);
    ctx.bezierCurveTo(83, 94, 89, 88, 97, 88);
    ctx.bezierCurveTo(105, 88, 111, 94, 111, 102);
    ctx.lineTo(111, 116);
    ctx.lineTo(106.333, 111.333);
    ctx.lineTo(101.666, 116);
    ctx.lineTo(97, 111.333);
    ctx.lineTo(92.333, 116);
    ctx.lineTo(87.666, 111.333);
    ctx.lineTo(83, 116);
    ctx.fill();

    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.moveTo(91, 96);
    ctx.bezierCurveTo(88, 96, 87, 99, 87, 101);
    ctx.bezierCurveTo(87, 103, 88, 106, 91, 106);
    ctx.bezierCurveTo(94, 106, 95, 103, 95, 101);
    ctx.bezierCurveTo(95, 99, 94, 96, 91, 96);
    ctx.moveTo(103, 96);
    ctx.bezierCurveTo(100, 96, 99, 99, 99, 101);
    ctx.bezierCurveTo(99, 103, 100, 106, 103, 106);
    ctx.bezierCurveTo(106, 106, 107, 103, 107, 101);
    ctx.bezierCurveTo(107, 99, 106, 96, 103, 96);
    ctx.fill();

    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(101, 102, 2, 0, Math.PI * 2, true);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(89, 102, 2, 0, Math.PI * 2, true);
    ctx.fill();
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