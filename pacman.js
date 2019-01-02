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
  x: GRID_CELL_SIZE/2,
    y: GRID_CELL_SIZE / 2
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
