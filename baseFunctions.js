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
  // for(var i=0;i<=PACMAN_RADIUS;i++){
  //   res =( a === b + i || a === b - i);
  //   if(res){
  //     return true
  //   }
  // }
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
