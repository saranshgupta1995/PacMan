GRID_CELL_SIZE = 40;

function cellToRect(x, y, columnCount, rowCount) {
  return [
    x * GRID_CELL_SIZE,
    y * GRID_CELL_SIZE,
    columnCount * GRID_CELL_SIZE,
    rowCount * GRID_CELL_SIZE,
    10
  ];
}

function createRectData(array) {
  totalRect = [];
  for (let rowCount = 0; rowCount < array.length; rowCount++) {
      columnCount = 0;
      width = 0;
      [...array[rowCount], 0].forEach(column => {
        width += column;
        if (!column) {
          if (width) totalRect.push([columnCount - width, rowCount, width, 1]);
          width = 0;
        }
        columnCount++;
      });      
  }
  return totalRect;
}

var PACMAN_RADIUS = GRID_CELL_SIZE / 2 - 6;
var PACMAN_MOUTH_MAX_OPEN = 30;

var OUTER_BOUNDARY = [[0, 0, 800, 800, 15]];

var GRID_1 = [...OUTER_BOUNDARY];

var GRID_1_RECTS = [
  [0, 1, 4, 1],
  [5, 0, 1, 3],
  [7, 3, 1, 3],
  [7, 1, 1, 1],
  [9, 1, 4, 4],
  [9, 0, 4, 4]
];

createRectData([
  [1, 1, 0, 1],
  [1, 1, 1, 1],
  [0, 0, 0, 1],
  [0, 0, 0, 1]
]).forEach(rect => {
  GRID_1.push(cellToRect(...rect));
});

FOOD_SIZE = 4;
