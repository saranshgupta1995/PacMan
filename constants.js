GRID_CELL_SIZE = 40;

function cellToRect(x, y, columnCount, rowCount) {
    return [x * GRID_CELL_SIZE, y * GRID_CELL_SIZE, (columnCount) * GRID_CELL_SIZE, (rowCount) * GRID_CELL_SIZE, 10]
}

var PACMAN_RADIUS = GRID_CELL_SIZE / 2 - 6;
var PACMAN_MOUTH_MAX_OPEN = 30;

var OUTER_BOUNDARY = [
    [0, 0, 800, 800, 15]
]

var GRID_1 = [
    ...OUTER_BOUNDARY,
];

var GRID_1_RECTS = [
    [0, 1, 4, 1],
    [5, 0, 1, 3],
    [7, 3, 1, 3],
    [7, 1, 1, 1],
    [9, 1, 4, 4],
    [9, 0, 4, 4],
]

GRID_1_RECTS.forEach(rect => {
    GRID_1.push(cellToRect(...rect));
})

FOOD_SIZE = 4;