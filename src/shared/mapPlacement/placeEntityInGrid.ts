import {POSITION} from 'gameEngine/constants';
import getBlocksFromPos from 'shared/mapPlacement/getBlocksFromPos';
import getBlocks from 'shared/mapPlacement/getBlocks';
import {BaseEntity} from "../../gameEngine/BaseEntity";
import {IGrid} from "../../interfaces/interfaces";

/**
 * Places an entity in target X,Y, with a radius arg (we ignore the entity's radius)
 * Function is UNSAFE, this function will set all the blocks as occupied and set the position of
 * the entity, it WILL NOT CHECK if the grids are free or unoccupied
 * @param ent
 * @param targetX
 * @param targetY
 * @param radius
 * @param grid
 */
export function placeEntityInGrid(ent: BaseEntity, targetX: number, targetY: number, radius:number, grid: IGrid) {
  const blocksFromPosition = getBlocksFromPos(targetX, targetY, radius, grid);;

  if (blocksFromPosition) {
    let {startGridBlock, endGridBlock} = blocksFromPosition;
    let blocks = getBlocks(startGridBlock, endGridBlock, grid);
    blocks.forEach((block) => {
      block.occupied = true;
    });
    ent[POSITION].x = targetX;
    ent[POSITION].y = targetY;
  }
}

export default placeEntityInGrid;