var allFoodPoints = [];
var filteredFoodPoints = [];

var canvas = document.getElementById('backCanvas');
var bgCtx = canvas.getContext('2d');

function drawBackdrop(){
    allFoodPoints = [];
    flushCanvas(bgCtx)
    definePacFood(bgCtx)

    GRID_1.forEach(gridRect => {
        removeFoodPointsInRect(...gridRect)
        roundedRect(bgCtx, ...gridRect)
    })
    drawPacFood(bgCtx)

}

drawBackdrop();

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
