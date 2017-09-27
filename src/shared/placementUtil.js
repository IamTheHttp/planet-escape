import {randFromRange} from 'shared/utils';
import logger from 'shared/logger';
import entityLoop from 'gameEngine/systems/utils/entityLoop';
import {
  POSITION
} from 'gameEngine/constants.js';

let getGridBlockFromPos = (grid, topLeftX, topLeftY) => {
  let topLeftAreaY = grid[0][0].topLeftY;
  let topLeftAreaX = grid[0][0].topLeftX;

  // get the grid row/col for this X/Y pos..
  let distFromTop = topLeftY - topLeftAreaY;
  let distFromLeft = topLeftX - topLeftAreaX;
  let row = Math.floor(distFromTop / grid.squareY);
  let col = Math.floor(distFromLeft / grid.squareY);
  let gridExists = grid[row] && grid[row][col];
  return gridExists ? grid[row][col] : false;
};

let createGrid = (area, squaresInLine) => {
  let {topLeftAreaX, topLeftAreaY, bottomRightAreaX, bottomRightAreaY} = area;
  let grid = [];

  let xLen = bottomRightAreaX - topLeftAreaX;
  let yLen = bottomRightAreaY - topLeftAreaY;

  let squareX = xLen / squaresInLine;
  let squareY = yLen / squaresInLine;

  let row = 0;
  let remainingX = xLen;

  while (remainingX !== 0) {
    grid[row] = [];
    let col = 0;
    let remainingY = yLen;

    while (remainingY !== 0) {
      remainingY -= squareY;
      grid[row][col] = {
        topLeftX : topLeftAreaX + squareX * col,
        topLeftY : topLeftAreaY + squareY * row,
        row,
        col,
        occupied : false
      };
      col++;
    }
    row++;
    remainingX -= squareX;
  }

  grid.squareX = squareX;
  grid.squareY = squareY;
  grid.xLen = xLen;
  grid.yLen = yLen;
  return grid;
};

let entityPlacer = (entities, area) => {
  let {topLeftAreaX, topLeftAreaY, bottomRightAreaX, bottomRightAreaY} = area;
  let squaresInLine = 100;
  let grid = createGrid(area, squaresInLine); // squares in line

  entityLoop(entities, (ent) => {
    let count = 0;
    let pos = ent[POSITION];
    let startGridBlock = null;
    let endGridBlock = null;
    let topLeftX = false;
    let topLeftY = false;
    let bottomRightX = false;
    let bottomRightY = false;
    while (!endGridBlock) {
      count++;
      if (count === 10) {
        logger.error('bail out from search loop');
        return;
      }
      // potential x and y for top left squares
      topLeftX = randFromRange(topLeftAreaX, bottomRightAreaX);
      topLeftY = randFromRange(topLeftAreaY, bottomRightAreaY);
      bottomRightX = topLeftX + pos.radius * 2 ;
      bottomRightY = topLeftY + pos.radius * 2 ;
      startGridBlock = getGridBlockFromPos(grid, topLeftX, topLeftY);
      endGridBlock = getGridBlockFromPos(grid, bottomRightX, bottomRightY);
    }
    // if start and end grids are the same, it's the same block.
    // the entity will be inside the square
    // we'll also check if this grid is occupied
    if (startGridBlock === endGridBlock && !startGridBlock.occupied) {
      pos.x = topLeftX + pos.radius;
      pos.y = topLeftY + pos.radius;
      startGridBlock.occupied = true;
    } else {
      // we'll need to occupy all columns from start to end in each row.
      let allFree = true;
      let blocks = [];
      let row = startGridBlock.row;
      while (row < endGridBlock.row) {
        let col = startGridBlock.col;
        while (col < endGridBlock.col) {
          blocks.push(grid[row][col]);
          allFree = allFree && !grid[row][col].occupied;
          col++;
        }
        row++;
      }
      if (allFree) {
        // mark all blocks as occupied.
        blocks.forEach((block) => {
          block.occupied = true;
        });
        // position the entity.
        pos.x = topLeftX + pos.radius;
        pos.y = topLeftY + pos.radius;
      }
    }
  });

  return grid;
};



export {
  entityPlacer,
  getGridBlockFromPos,
  createGrid
};
