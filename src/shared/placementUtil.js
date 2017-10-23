import {randFromRange} from 'shared/utils';
import logger from 'shared/logger';
import entityLoop from 'gameEngine/systems/utils/entityLoop';
import {
  POSITION
} from 'gameEngine/constants.js';

function getBlocks(startGridBlock, endGridBlock, grid) {
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
  return allFree ? blocks : [];
}

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

  let xLen = bottomRightAreaX - topLeftAreaX; // 1920
  let yLen = bottomRightAreaY - topLeftAreaY; // 1080

  let squareLength = Math.floor(xLen / squaresInLine); // 1920 / 192 = 10

  let row = 0;
  let remainingY = yLen;

  while (remainingY >= squareLength) {
    grid[row] = [];
    let col = 0;
    let remainingX = xLen;

    while (remainingX >= squareLength) {
      remainingX -= squareLength;
      grid[row][col] = {
        topLeftX : topLeftAreaX + squareLength * col,
        topLeftY : topLeftAreaY + squareLength * row,
        row,
        col,
        occupied : false
      };
      col++;
    }
    row++;
    remainingY -= squareLength;
  }

  grid.squareX = squareLength;
  grid.squareY = squareLength;
  grid.xLen = xLen;
  grid.yLen = yLen;

  return grid;
};





let splitAreaToFour = (area) => {
  // cut area into 4 places..
  if (!area) {
    return;
  }
  let xAreaLen = area.bottomRightAreaX - area.topLeftAreaX;
  let yAreaLen = area.bottomRightAreaY - area.topLeftAreaY;

  let topLeft = {
    topLeftAreaX : area.topLeftAreaX,
    topLeftAreaY : area.topLeftAreaY,
    bottomRightAreaX : xAreaLen / 2,
    bottomRightAreaY : yAreaLen / 2
  };

  let topRight = {
    topLeftAreaX : xAreaLen / 2,
    topLeftAreaY : area.topLeftAreaY,
    bottomRightAreaX : xAreaLen,
    bottomRightAreaY : yAreaLen / 2
  };

  let bottomLeft = {
    topLeftAreaX : area.topLeftAreaX,
    topLeftAreaY : yAreaLen / 2,
    bottomRightAreaX : xAreaLen / 2,
    bottomRightAreaY : yAreaLen
  };
  let bottomRight = {
    topLeftAreaX : xAreaLen / 2,
    topLeftAreaY : yAreaLen / 2,
    bottomRightAreaX : xAreaLen,
    bottomRightAreaY : yAreaLen
  };

  return [topLeft, topRight, bottomLeft, bottomRight];
};

let placeEntities = (entities, area, buffer = 1) => {
  let first = splitAreaToFour(area)[0];
  let second = splitAreaToFour(area)[1];
  let third = splitAreaToFour(area)[2];
  let fourth = splitAreaToFour(area)[3];

  let entArr = entityLoop(entities, () => {
    return true; // filter all to an array
  });

  // split array into 4 chunks..
  // let ents = [entArr[0], entArr[1]];

  if (entArr.length % 4 === 0) {
    let fourthOfEnts = entArr.slice(entArr.length * 0, entArr.length * 1 / 4);
    let secondFourth = entArr.slice(entArr.length * 1 / 4, entArr.length * 2 / 4);
    let thirdFourth = entArr.slice(entArr.length * 2 / 4, entArr.length * 3 / 4);
    let fourFourths = entArr.slice(entArr.length * 3 / 4, entArr.length * 4 / 4);
    entityPlacer(fourthOfEnts, first, buffer);
    entityPlacer(secondFourth, second, buffer);
    entityPlacer(thirdFourth, third, buffer);
    entityPlacer(fourFourths, fourth, buffer);
  }
};


let entityPlacer = (entities, area, buffer = 1) => {
  let {topLeftAreaX, topLeftAreaY, bottomRightAreaX, bottomRightAreaY} = area;

  let squaresInLine = Math.floor((bottomRightAreaX - topLeftAreaX) / 10); // TODO - why 10? - each square is 10px?
  let grid = createGrid(area, squaresInLine); // squares in line

  let placedEntities = entityLoop(entities, (ent) => {
    let pos = ent[POSITION];
    let count = 0;
    let startGridBlock = null;
    let endGridBlock = null;
    let topLeftX = false;
    let topLeftY = false;
    let bottomRightX = false;
    let bottomRightY = false;

    // so we want a loop to run until this entity is placed..
    while (pos.x === null) {
      endGridBlock = false; // reset it..
      count++;
      /* istanbul ignore if */
      if (count === 1000) {
        // console.log(count);
        logger.error('ERROR PLACING ENTITY - Still no pos');
        return false;
      }

      while (!endGridBlock) {
        count++;
        /* istanbul ignore if */
        if (count === 1000) {
          logger.error('ERROR PLACING ENTITY - cannot find free grids');
          break;
        }
        // potential x and y for top left squares
        topLeftX = randFromRange(topLeftAreaX, bottomRightAreaX);
        topLeftY = randFromRange(topLeftAreaY, bottomRightAreaY);
        bottomRightX = topLeftX + pos.radius * 2 * buffer ; // 2 for scatter
        bottomRightY = topLeftY + pos.radius * 2 * buffer ; // 2 for scatter
        startGridBlock = getGridBlockFromPos(grid, topLeftX, topLeftY);
        endGridBlock = getGridBlockFromPos(grid, bottomRightX, bottomRightY);
      }

      if (!endGridBlock) {
        break;
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
        let blocks = getBlocks(startGridBlock, endGridBlock, grid);

        if (blocks.length > 0) {
          // mark all blocks as occupied.
          blocks.forEach((block) => {
            block.occupied = true;
          });
          // position the entity.
          pos.x = topLeftX + pos.radius;
          pos.y = topLeftY + pos.radius;
          return true;
        }
      }
    }
  });
  return {grid, placedEntities};
};

export {
  placeEntities as entityPlacer,
  getGridBlockFromPos,
  createGrid
};
