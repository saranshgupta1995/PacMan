function playGameOverAnimation() {
  ctx.clearRect(0, 0, 800, 800);
  if (killPacMan()) {
    gameState.playAgain = true;
    gameState.over = false;
  }
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
      pacEnemy.getCollisionWith(element);
      if (
        getPacManCollisionWith([
          pacEnemy.x - PACMAN_RADIUS,
          pacEnemy.y - PACMAN_RADIUS,
          2 * PACMAN_RADIUS,
          2 * PACMAN_RADIUS,
          10
        ])
      ) {
        gameState.over = true;
        gameState.pause = true;
        saveGameData();
      }
    });
  }
}

function saveGameData() {
  let url = "http://localhost:3001/pacmanSave";
  let data = {
    gameData: "pikachu",
    userName: "pokemon"
  };
  let fetchData = {
    method: "POST",
    mode:'no-cors',
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  };
  fetch(url, fetchData).then(res => {
    console.log(res);
  });
}

function setConfig(config) {
  switch (config) {
    case "space":
      gameState.pause = !gameState.pause;
      document.getElementsByTagName("ul")[0].style.opacity = 1;
      if (!gameState.pause) {
        document.getElementsByTagName("ul")[0].style.opacity = 0.5;
        requestAnimationFrame(draw);
      }

      if (gameState.playAgain) reset();

      break;
    case "do X":
      rewind();
      break;
  }
}

function snapshot() {
  var ulTag = document.getElementsByTagName("ul")[0];
  var canvasSnapshot = canvas.toDataURL();
  var backCanvasSrc = document.getElementById("backCanvas").toDataURL();
  var liTag = document.createElement("li");
  var imageAnimate = document.createElement("img");
  var backImage = document.createElement("img");
  backImage.classList.add("newBgSnap");
  liTag.classList.add("imageListElemet");
  let hash = ulTag.childElementCount;
  liTag.onclick = function() {
    if (gameState.pause) rewind(hash);
  };
  imageAnimate.src = canvasSnapshot;
  backImage.src = backCanvasSrc;
  imageAnimate.classList.add("newSnap");
  liTag.appendChild(imageAnimate);
  ulTag.insertChildAtIndex(liTag, 0);
  ulTag.style.opacity = gameState.pause ? 1 : 0.5;
  setTimeout(() => {
    imageAnimate.style.right = 0;
    imageAnimate.style.width = "200px";
  }, 50);
  setTimeout(() => {
    imageAnimate.style.position = "relative";
    liTag.appendChild(backImage);
  }, 550);
  takeSnap(hash, this, [
    "ctx",
    "parent",
    "canvas",
    "bgCtx",
    "rewindedLevel",
    "gameState",
    "callee",
    "caller"
  ]);
}

function draw() {
  if (gameState.over) {
    playGameOverAnimation();
  }

  if (gameState.pause && !gameState.rewind) {
    return;
  }

  ctx.clearRect(0, 0, 800, 800);
  drawPacMan(ctx, { x: pacManPosition.x, y: pacManPosition.y });

  eatFood();

  pacEnemies.forEach(pacEnemy => {
    pacEnemy.drawPacEnemy(ctx);
  });
  updatePositons();
  requestAnimationFrame(draw);
}

document.getElementById("gameDiv").onMount = () => {
  gameState = {
    pause: false,
    over: false,
    playAgain: false,
    rewind: false
  };

  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");

  document.addEventListener("keyup", function(e) {
    var allowedDirectionKeys = {
      37: "left",
      38: "up",
      39: "right",
      40: "down"
    };

    var configKeys = {
      32: "space",
      88: "do X"
    };

    var spanshotKey = {
      13: "enter"
    };

    if (allowedDirectionKeys[e.keyCode] && !gameState.pause) {
      setPacManDirections(allowedDirectionKeys[e.keyCode]);
    }

    if (configKeys[e.keyCode]) {
      setConfig(configKeys[e.keyCode]);
    }

    if (spanshotKey[e.keyCode]) {
      snapshot();
    }
  });

  draw();
};
