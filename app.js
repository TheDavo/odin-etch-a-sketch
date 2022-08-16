// DOM Variables
const gridContainer = document.getElementById('grid-container');
const drawingBoard = document.getElementById('drawing-board');
const drawingCtx = drawingBoard.getContext('2d');
const penColorInput = document.getElementById('pen-color');
const penColorShow = document.querySelector('.pen-color p');

let numRows = 16;
let numCols = 16;
let penColor = 'black';

// EVENT LISTENERS
drawingBoard.addEventListener('mousemove', (event) => {
  const width = drawingBoard.width;
  const height = drawingBoard.height;
  const bound = drawingBoard.getBoundingClientRect();
  // console.log(
  //   `X ${Math.floor(
  //     (event.clientX - bound.left) / (width / numRows)
  //   )}, Y ${Math.floor((event.clientY - bound.top) / (height / numCols))}`
  // );
  drawingCtx.fillStyle = penColor;
  drawingCtx.fillRect(
    Math.floor((event.clientX - bound.left) / (width / numRows)),
    Math.floor((event.clientY - bound.top) / (height / numCols)),
    1,
    1
  );
});

penColorInput.addEventListener('input', (event) => {
  penColor = event.target.value;
  penColorShow.innerText = penColor;
});

// GRID DRAWING

// DO NOT USE, SCALED VERSION IS BETTER
// Each grid is treated as one pixel!
/*
const fillWithRects = function (numRow = 16, numCol = 16) {
  numRows = numRow;
  numCols = numCol;
  const width = drawingBoard.width;
  const height = drawingBoard.height;
  clearCanvas();

  const colSize = Math.floor(width / numCol);
  const rowSize = Math.floor(height / numRow);
  drawingCtx.lineWidth = 1;
  for (let row = 0; row < width; row += rowSize) {
    for (let col = 0; col < height; col += colSize) {
      drawingCtx.strokeRect(row, col, rowSize, colSize);
      // console.log(`Row Loc: ${row}\nCol Loc: ${col}`);
    }
  }
};
*/

// Uses the canvas context scale() function
// By using the scale() function each block can be considered a pixel
const fillWithRectsScaled = function (numRow = 16, numCol = 16) {
  numRows = numRow;
  numCols = numCol;
  const width = drawingBoard.width;
  const height = drawingBoard.height;
  clearCanvas();
  drawingCtx.scale(width / numCol, height / numRow);

  if (numRow > numCol || numRow == numCol) {
    drawingCtx.lineWidth = 1 / Math.floor(height / numRow);
  } else {
    drawingCtx.lineWidth = 1 / Math.floor(width / numCol);
  }

  for (let row = 0; row < numRow; row++) {
    for (let col = 0; col < numCol; col++) {
      drawingCtx.strokeRect(row, col, 1, 1);
      drawingCtx.fillStyle = 'white';
      drawingCtx.fillRect(row, col, 1, 1);
    }
  }
};

const clearCanvas = function () {
  const width = drawingBoard.width;
  const height = drawingBoard.height;
  drawingCtx.setTransform(1, 0, 0, 1, 0, 0);
  drawingCtx.clearRect(0, 0, width, height);
};

const resetCanvas = function () {
  fillWithRectsScaled(numRows, numCols);
};

window.onload = () => {
  fillWithRectsScaled(10, 10);
};
