import getBlocksFromPos from 'shared/mapPlacement/getBlocksFromPos';
import isBlockRangeOccupied from 'shared/mapPlacement/isBlockRangeOccupied';
import {IGrid} from "../../interfaces/interfaces";


/**
 * Checks if a circle can be placed in the grid in a specific coordinate.
 * function is SAFE - checks if position is not out of bounds and is not occupied
 * @param x
 * @param y
 * @param radius
 * @param grid
 * @returns {boolean}
 */
function canCircleBePlacedInPos(x: number, y: number, radius: number, grid: IGrid): boolean {
  const blocks = getBlocksFromPos(x, y, radius, grid);

  if (blocks) {
    let {startGridBlock, endGridBlock} = blocks;
    return !isBlockRangeOccupied(startGridBlock, endGridBlock, grid);

  } else {
    return false;
  }
}
export default canCircleBePlacedInPos;