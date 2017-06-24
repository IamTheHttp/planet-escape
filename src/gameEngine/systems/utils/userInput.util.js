import {
  BUILDINGS_COMP,
  PLAYER_CONTROLLED,
  POSITION
} from 'gameEngine/constants';
import entityLoop from 'gameEngine/systems/utils/entityLoop';
import NullEntity from 'gameEngine/entities/NullEntity';

export function isPosInsideCircle(x,y,centerX,centerY,radius) {
  return Math.pow((x - centerX),2) + Math.pow((y - centerY),2) < Math.pow(radius,2);
}

export function selectEntity(entities,action) {
  entityLoop(entities,(ent) => {
    if (ent[PLAYER_CONTROLLED]) {
      let x = action.x;
      let y = action.y;
      let centerX = ent[POSITION].x;
      let centerY = ent[POSITION].y;
      let radius = ent[POSITION].radius;
      ent[PLAYER_CONTROLLED].selected = isPosInsideCircle(x,y,centerX,centerY,radius);
    }
  });
}

export function getSelectedEntity(entities) {
  let entity = false;
  // console.log(entities);
  entityLoop(entities,(ent) => {
    ent.hasComponents(PLAYER_CONTROLLED,() => {
      // this assumes only one item can ever be selected.
      if (ent[PLAYER_CONTROLLED].selected) {
        entity = ent;
      }
    });
  });
  return entity || new NullEntity();
}

export function setEntityDest(entity,action) {
  entity[POSITION].destX = action.x;
  entity[POSITION].destY = action.y;
}

export function getEntityAtPos(entities, x, y) {
  let entity = false;
  entityLoop(entities,(ent) => {
    ent.hasComponents(POSITION, () => {
      let centerX = ent[POSITION].x;
      let centerY = ent[POSITION].y;
      let radius = ent[POSITION].radius;
      if (isPosInsideCircle(x,y,centerX,centerY,radius)) {
        entity = ent;
      }
    });
  });
  return entity || new NullEntity();
  // this works since base radius is the same for all entities
}