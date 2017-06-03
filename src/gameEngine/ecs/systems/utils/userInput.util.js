import {
  BUILDINGS_COMP,
  PLAYERCONTROLLED_COMP,
  POSITION_COMP
} from 'gameEngine/constants';

export function isClickedInCircle(x,y,centerX,centerY,radius) {
  return Math.pow((x - centerX),2) + Math.pow((y - centerY),2) < Math.pow(radius,2);
}

export function selectEntity(entities,action) {
  for (let entID in entities) {
    let ent = entities[entID];
    if (ent[PLAYERCONTROLLED_COMP]) {
      let x = action.x;
      let y = action.y;
      let centerX = ent[POSITION_COMP].x;
      let centerY = ent[POSITION_COMP].y;
      let radius = ent[POSITION_COMP].radius;
      ent[PLAYERCONTROLLED_COMP].selected = isClickedInCircle(x,y,centerX,centerY,radius);
    }
  }
}

export function getSelectedEntity(entities) {
  for (let entID in entities) {
    let ent = entities[entID];
    if (ent[PLAYERCONTROLLED_COMP] && ent[PLAYERCONTROLLED_COMP].selected) {
      return ent;
    }
  }
  return false;
}

export function moveSelectedEntity(entity,action) {
  // sets new destination for the entity
  // will be processed by a moveSystem
  entity[POSITION_COMP].destX = action.x;
  entity[POSITION_COMP].destY = action.y;
}