import {
  BUILDINGS_COMP,
  PLAYERCONTROLLED_COMP,
  POSITION_COMP
} from 'gameEngine/constants';

import entityLoop from 'gameEngine/ecs/systems/utils/entityLoop';
export function isPosInsideCircle(x,y,centerX,centerY,radius) {
  return Math.pow((x - centerX),2) + Math.pow((y - centerY),2) < Math.pow(radius,2);
}

export function selectEntity(entities,action) {
  entityLoop(entities,(ent) => {
    if (ent[PLAYERCONTROLLED_COMP]) {
      let x = action.x;
      let y = action.y;
      let centerX = ent[POSITION_COMP].x;
      let centerY = ent[POSITION_COMP].y;
      let radius = ent[POSITION_COMP].radius;
      ent[PLAYERCONTROLLED_COMP].selected = isPosInsideCircle(x,y,centerX,centerY,radius);
    }
  });
}

export function calcDistance(source,dest) {
  let xDist = Math.pow(source.x - dest.x,2);
  let yDist = Math.pow(source.y - dest.y,2);
  let squaredDist = xDist + yDist;
  return Math.sqrt(squaredDist);
}

export function getSelectedEntity(entities) {
  let entity = false;
  entityLoop(entities,(ent) => {
    ent.hasComponents(PLAYERCONTROLLED_COMP,() => {
      // this assumes only one item can ever be selected.
      if (ent[PLAYERCONTROLLED_COMP].selected) {
        entity = ent;
      }
    });
  });
  return entity;
}

export function setEntityDest(entity,action) {
  // sets new destination for the entity
  // will be processed by a moveSystem
  entity[POSITION_COMP].destX = action.x;
  entity[POSITION_COMP].destY = action.y;
}


export function getEntityAtPos(entities, x, y) {
  let entity = false;
  entityLoop(entities,(ent) => {
    if (ent[POSITION_COMP]) {
      let centerX = ent[POSITION_COMP].x;
      let centerY = ent[POSITION_COMP].y;
      let radius = ent[POSITION_COMP].radius;
      if (isPosInsideCircle(x,y,centerX,centerY,radius)) {
        entity = ent;
      }
    }
  });
  return entity;
  // this works since base radius is the same for all entities
}