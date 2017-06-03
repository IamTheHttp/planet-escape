import entityLoop from 'gameEngine/ecs/systems/utils/entityLoop';
import {
  POSITION_COMP,
  MOVEMENT_COMP
} from 'gameEngine/constants';

function moveEntity(entity) {
  let curX = entity[POSITION_COMP].x;
  let curY = entity[POSITION_COMP].y;
  let destX = entity[POSITION_COMP].destX;
  let destY = entity[POSITION_COMP].destY;
  let speed = entity[MOVEMENT_COMP].speed;

  let distanceX = destX - curX;
  let distanceY = destY - curY;
  // distance can be 0, which means we do nothing.
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

  entity[POSITION_COMP].x = curX;
  entity[POSITION_COMP].y = curY;
}

function moveSystem(entities) {
  entityLoop(entities,(entity) => {
    if (entity.hasComponents([MOVEMENT_COMP,POSITION_COMP])) {
      moveEntity(entity);
    }
  });
}

export default moveSystem;