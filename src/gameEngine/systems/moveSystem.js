import entityLoop from 'gameEngine/systems/utils/entityLoop';
import {
  POSITION,
  MOVEMENT_COMP
} from 'gameEngine/constants';

import {getPos,getDest,destReached} from 'gameEngine/components/PositionComponent';
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
    curX = Math.min(curX + speed , destX);
  }

  if (distanceX < 0) {
    curX = Math.max(curX - speed , destX);
  }

  if (distanceY > 0) {
    curY = Math.min(curY + speed , destY);
  }

  if (distanceY < 0) {
    curY = Math.max(curY - speed , destY);
  }

  entity[POSITION].x = curX;
  entity[POSITION].y = curY;
}

function moveSystem(entities) {
  entityLoop(entities,(entity) => {
    if (entity.hasComponents([MOVEMENT_COMP,POSITION])) {
      moveEntity(entity);
    }
  });
}

export default moveSystem;