import entityLoop from 'gameEngine/systems/utils/entityLoop';
import Entity from 'gameEngine/Entity';
import {
  POSITION,
  MOVEMENT_COMP
} from 'gameEngine/constants';

import {getPos, getDest, destReached} from 'gameEngine/components/PositionComponent';
function moveEntity(entity) {
  if (destReached(entity)) {
    return;
  }

  let curX = getPos(entity).x;
  let curY = getPos(entity).y;
  let destX = getDest(entity).x;
  let destY = getDest(entity).y;
  let speed = entity[MOVEMENT_COMP].speed;

  let distanceX = destX - curX;
  let distanceY = destY - curY;
  // if distance is positive, we need to add to the component's position

  if (distanceX > 0) {
    curX = Math.min(curX + speed, destX);
  }

  if (distanceX < 0) {
    curX = Math.max(curX - speed, destX);
  }

  if (distanceY > 0) {
    curY = Math.min(curY + speed, destY);
  }

  if (distanceY < 0) {
    curY = Math.max(curY - speed, destY);
  }

  // console.log(entity);
  entity[POSITION].x = curX;
  entity[POSITION].y = curY;
}

function moveSystem() {
  let entities = Entity.getByComps([MOVEMENT_COMP, POSITION]);

  entityLoop(entities, (entity) => {
    moveEntity(entity);
  });
}

export default moveSystem;