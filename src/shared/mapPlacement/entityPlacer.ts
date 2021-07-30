import {randFromRange} from 'shared/utils';
import {logger} from 'shared/logger';
import {
  POSITION
} from 'gameEngine/constants.js';
import canCircleBePlacedInPos from 'shared/mapPlacement/canCircleBePlacedInPos';
import placeEntityInGrid from 'shared/mapPlacement/placeEntityInGrid';
import {BaseEntity} from "../../gameEngine/BaseEntity";
import {entityLoop} from "game-platform";
import {IGrid} from "../../interfaces/interfaces";

export function entityPlacer(entities: Record<string, BaseEntity> | BaseEntity[], grid: IGrid, buffer:number) {
  let xMin = grid[0][0].topLeftX;
  let yMin = grid[0][0].topLeftY;
  let xMax = xMin + grid.xLen;
  let yMax = yMin + grid.yLen;


  // place all the entities with a POS first. as these come from the initialization!
  let entsWithPos = entityLoop(entities, (ent: BaseEntity) => {
    return ent[POSITION] && ent[POSITION].x > 0 && ent[POSITION].y > 0;
  });

  entsWithPos.forEach((ent: BaseEntity) => {
    // we don't check if it's possible to position them, as this is hardcoded
    let {x, y, radius} = ent[POSITION];
    if (canCircleBePlacedInPos(x, y, radius, grid)) {
      placeEntityInGrid(ent, x, y, radius, grid);
    } else {
      logger.error('cannot place initial entities on map..');
    }
  });

  let placedEntities = entityLoop(entities, (ent:BaseEntity) => {
    let pos = ent[POSITION];
    let bufferedRadius = pos.radius * buffer;
    let count = 0;
    // so we want a loop to run until this entity is placed..
    while (pos.x === null) {
      count++;
      /* istanbul ignore if */
      if (count === 1000) {
        logger.error('ERROR PLACING ENTITY - Still no pos');
        return false;
      }
      // potential x and y for top left squares
      let x = randFromRange(xMin, xMax);
      let y = randFromRange(yMin, yMax);

      if (canCircleBePlacedInPos(x, y, bufferedRadius, grid)) {
        placeEntityInGrid(ent, x, y, bufferedRadius, grid);
      }
    }
  });
  return {grid, placedEntities};
}