import entityLoop from 'gameEngine/systems/utils/entityLoop';
import Entity from 'gameEngine/Entity';
import {
  POSITION,
  MOVEMENT_COMP,
  MOVING,
  IS_DOCKED
} from 'gameEngine/constants';

import {getPos, getDest, destReached} from 'gameEngine/components/PositionComponent';
function moveEntity(entity) {
  if (destReached(entity)) {
    entity[IS_DOCKED].isDocked = true;
    entity.removeComponent(MOVING);
    // TODO - IN_PLACE_TO_ATTACK is only for different players, else it's just docked..
    // for example, if we move to a friendly planet, we're not in place to attack...
    // TODO aside / What happens when we try add the same component multiple times?
    // TODO - Create a proper component for IN_PLACE_TO_ATTACK
    entity.addComponent({
      name : 'IN_PLACE_TO_ATTACK'
    });
    return;
  }

  let destX = getDest(entity).x;
  let destY = getDest(entity).y;
  let LINEAR = true; // future movements might not be "linear"

  if (LINEAR && destX && destY) {
    let curX = getPos(entity).x;
    let curY = getPos(entity).y;
    let gradient = (destY - curY) / (destX - curX);
    let speed = entity[MOVEMENT_COMP].speed;
    let distanceX = destX - curX;
    let newX = null;

    //  if gradient === Infinity we only move on Y axis..
    if (gradient === Infinity || gradient === -Infinity) {
      if (gradient >= 0) {
        entity[POSITION].y = Math.min(entity[POSITION].y + speed, destY);
      } else {
        entity[POSITION].y = Math.max(entity[POSITION].y - speed, destY);
      }
      return;
    }

    if (distanceX > 0) {
      newX = Math.min(curX + Math.sqrt(Math.pow(speed, 2) / (Math.pow(gradient, 2) + 1)), destX);
    }
    //
    if (distanceX < 0) {
      newX = Math.max(curX - Math.sqrt(Math.pow(speed, 2) / (Math.pow(gradient, 2) + 1)), destX);
    }
    entity[POSITION].x = newX;
    entity[POSITION].y = gradient * (newX - curX) + curY;
  }
}

function moveSystem() {
  let entities = Entity.getByComps([MOVEMENT_COMP, POSITION, MOVING], 'array');

  entityLoop(entities, (entity) => {
    moveEntity(entity);
  });
}

export default moveSystem;