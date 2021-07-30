/**
 * Given a start and end block, get all blocks in between (for example, 11 and 33, will get 0 blocks
 * @param startGridBlock
 * @param endGridBlock
 * @param grid
 * @returns {Array}
 */
import {IGrid, IGridBlock} from "../../interfaces/interfaces";

function getBlocks(startGridBlock: IGridBlock, endGridBlock: IGridBlock, grid: IGrid) {
  let blocks = [];
  let row = startGridBlock.row;
  while (row < endGridBlock.row) {
    let col = startGridBlock.col;
    while (col < endGridBlock.col) {
      blocks.push(grid[row][col]);
      col++;
    }
    row++;
  }
  return blocks;
}

export default getBlocks;