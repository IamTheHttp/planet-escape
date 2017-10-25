import entityPlacer from 'shared/mapPlacement/entityPlacer';
import createGrid from 'shared/mapPlacement/grid';

let placeEntities = (entities, area, buffer = 1) => {
  let {topLeftAreaX, topLeftAreaY, bottomRightAreaX, bottomRightAreaY} = area;

  let squaresInLine = Math.floor((bottomRightAreaX - topLeftAreaX) / 10); // TODO - why 10? - each square is 10px?
  let grid = createGrid(area, squaresInLine); // squares in line

  entityPlacer(entities, grid, buffer);
  return grid;
};


export default placeEntities;