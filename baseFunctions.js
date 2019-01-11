Math.radians = function (degree) {
  return degree * Math.PI / 180;
}

Math.degrees = function (radian) {
  return radian * 180 / Math.PI;
}

function flushCanvas(ctx) {

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = "black";

}

function isContainedWithin(a, units, val) {
  return val >= a && val <= a + units;
}

function isTouching(a, b) {
  return isContainedWithin(b, PACMAN_RADIUS, a) || isContainedWithin(b, -PACMAN_RADIUS, a) || isContainedWithin(a, -PACMAN_RADIUS, b) || isContainedWithin(a, PACMAN_RADIUS, b) 
}

function checkCollisions(x, y, width, height, radius, pacManPosition) {
  return ((isTouching(pacManPosition.y, y) && isContainedWithin(x, width, pacManPosition.x))
    || (isTouching(pacManPosition.y, y + height) && isContainedWithin(x, width, pacManPosition.x))
    || (isTouching(pacManPosition.x, x) && isContainedWithin(y, height, pacManPosition.y))
    || (isTouching(pacManPosition.x, x + width) && isContainedWithin(y, height, pacManPosition.y))
  )
}


function roundedRect(ctx, x, y, width, height, radius) {

    ctx.beginPath();
    ctx.moveTo(x, y + radius);
    ctx.lineTo(x, y + height - radius);
    ctx.arcTo(x, y + height, x + radius, y + height, radius);
    ctx.lineTo(x + width - radius, y + height);
    ctx.arcTo(x + width, y + height, x + width, y + height - radius, radius);
    ctx.lineTo(x + width, y + radius);
    ctx.arcTo(x + width, y, x + width - radius, y, radius);
    ctx.lineTo(x + radius, y);
    ctx.arcTo(x, y, x, y + radius, radius);
    ctx.stroke();
}

function reset(){
    gameState = {
        pause: false,
        over: false,
        playAgain: false
    }

    pacmanMouthAngle = {
        angle: PACMAN_MOUTH_MAX_OPEN,
        closing: true
    };
    pacManDirections = {
        x: 1,
        y: 0
    }

    pacManSpeed = {
        x: 1,
        y: 0
    }

    pacManPosition = {
        x: GRID_CELL_SIZE / 2,
        y: GRID_CELL_SIZE / 2
    }
    PACMAN_RADIUS = GRID_CELL_SIZE / 2 - 6;
    PACMAN_MOUTH_MAX_OPEN = 30;

    OUTER_BOUNDARY = [[0, 0, 800, 800, 15]];

    GRID_1 = [...OUTER_BOUNDARY];

    GRID_1_RECTS = [
        [0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1],
        [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
        [0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1],
        [0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 0],
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1],
        [1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1],
        [1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1],
        [0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1],
        [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0],
        [0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0],
        [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0],
        [1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]

    createRectData(GRID_1_RECTS).forEach(rect => {
        GRID_1.push(cellToRect(...rect));
    });

    FOOD_SIZE = 4;

    PAC_ENEMY_NUM = 6;


    pacEnemies = [];

    for (let pacEnemy = 0; pacEnemy < PAC_ENEMY_NUM; pacEnemy++) {
        let xShift = Math.floor(Math.random() * 120);
        pacEnemies.push(new PacEnemy(400 - 60 + xShift, 400 + (Math.random() < 0.5 ? 20 : -20)));
    }
    foodPoints = [];
    allFoodPoints = [];
    filteredFoodPoints = [];

    canvas = document.getElementById('backCanvas');
    bgCtx = canvas.getContext('2d');
    drawBackdrop();

}