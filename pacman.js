var pacmanMouthAngle = {
    angle: PACMAN_MOUTH_MAX_OPEN,
    closing: true
};
var pacManDirections = {
    x: 1,
    y: 0
}

var pacManSpeed = {
    x: 1,
    y: 0
}

var pacManPosition = {
    x: GRID_CELL_SIZE / 2,
    y: GRID_CELL_SIZE / 2
}

function killPacMan() {
    ctx.beginPath();
    if (pacmanMouthAngle.angle <= 180)
        pacmanMouthAngle.angle += 2;
    else{
        pacEnemies.push(new PacEnemy(pacManPosition.x, pacManPosition.y));
        return 'done'
    }
    mouthAngle = Math.radians(pacmanMouthAngle.angle - getPacManMouthAngle())
    ctx.arc(pacManPosition.x, pacManPosition.y, PACMAN_RADIUS, - mouthAngle, Math.PI * pacManDirections.y + mouthAngle, true);
    ctx.lineTo(pacManPosition.x, pacManPosition.y);
    ctx.fill();

}

function drawPacMan(ctx, positionObj) {
    ctx.beginPath();
    pacmanMouthAngle.angle = ((pacmanMouthAngle.closing ? -2 : +2) + pacmanMouthAngle.angle);
    if (pacmanMouthAngle.angle === PACMAN_MOUTH_MAX_OPEN || pacmanMouthAngle.angle === 2) {
        pacmanMouthAngle.closing = !pacmanMouthAngle.closing
    }
    mouthAngle = Math.radians(pacmanMouthAngle.angle - getPacManMouthAngle())
    ctx.arc(positionObj.x, positionObj.y, PACMAN_RADIUS, - mouthAngle, Math.PI * pacManDirections.y + mouthAngle, true);
    ctx.lineTo(positionObj.x, positionObj.y);
    ctx.fill();
}

/**
 get PacMan collisions with given rect
 @param {array} element * [x, w, rectWidth, rectHeight]
 @return {boolean} * has element Collided with given rect?
 */

function getPacManCollisionWith(element) {
    if (checkCollisions(...element, pacManPosition)) {
        pacManPosition.x -= pacManSpeed.x;
        pacManPosition.y -= pacManSpeed.y;
        return true
    }
}

function getPacManMouthAngle() {

    if (pacManDirections.x === -1) {
        return 180
    }
    if (pacManDirections.y === 1) {
        return 270
    }
    if (pacManDirections.x === 1) {
        return 0
    }
    if (pacManDirections.y === -1) {
        return 90
    }
}

function setPacManDirections(direction) {

    pacManDirections.x = 0;
    pacManDirections.y = 0;
    pacManSpeed.x = 0;
    pacManSpeed.y = 0;

    newDirection = {};
    switch (direction) {
        case ('left'): {
            pacManDirections.x = -1
            pacManSpeed.x = -1
            break;
        }
        case ('right'): {
            pacManDirections.x = 1
            pacManSpeed.x = 1
            break;
        }
        case ('up'): {
            pacManDirections.y = 1
            pacManSpeed.y = -1
            break;
        }
        case ('down'): {
            pacManDirections.y = -1
            pacManSpeed.y = 1
            break;
        }
    }

}
