import {entityPlacer} from 'shared/mapPlacement/entityPlacer';
import {createGrid} from 'shared/mapPlacement/grid';
import {BaseEntity} from "../gameEngine/BaseEntity";
import {IArea} from "../interfaces/interfaces";
const PX_PER_SQUARE = 10;

export function placeEntities (entities: Record<string, BaseEntity> | BaseEntity[], area: IArea, buffer: number) {
  let {topLeftAreaX, topLeftAreaY, bottomRightAreaX, bottomRightAreaY} = area;

  let squaresInLine = Math.floor((bottomRightAreaX - topLeftAreaX) / PX_PER_SQUARE);
  let grid = createGrid(area, squaresInLine); // squares in line

  entityPlacer(entities, grid, buffer);
  return grid;
};

