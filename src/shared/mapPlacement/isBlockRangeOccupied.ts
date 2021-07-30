import getBlocks from 'shared/mapPlacement/getBlocks';
import {IGrid, IGridBlock} from "../../interfaces/interfaces";

/**
 * Given a start and end block, returns true if at least one block is occupied in range
 * @param startGridBlock
 * @param endGridBlock
 * @param grid
 * @returns {boolean}
 */
function isBlockRangeOccupied(startGridBlock: IGridBlock, endGridBlock: IGridBlock, grid: IGrid) {
  let blocks = getBlocks(startGridBlock, endGridBlock, grid);
  let atLeastOneOccupied = false;
  blocks.forEach((block) => {
    atLeastOneOccupied = atLeastOneOccupied || block.occupied;
  });
  return atLeastOneOccupied;
}

export default isBlockRangeOccupied;