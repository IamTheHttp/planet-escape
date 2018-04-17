import entityLoop from 'gameEngine/systems/utils/entityLoop';
import Entity from 'gameEngine/Entity';
import {
  POSITION,
  MOVEMENT_COMP,
  MOVING,
  DEFENDING,
  UI_COMP
} from 'gameEngine/constants';


import {getPos, getDest, destReached} from 'gameEngine/components/PositionComponent';
import InPlaceToAttack from 'gameEngine/components/InPlaceToAttack';
import Defending from 'gameEngine/components/Defending';

function moveEntity(entity) {
  if (destReached(entity)) {
    entity.removeComponent(MOVING);
    // TODO aside / What happens when we try add the same component multiple times?
    entity.addComponent(new InPlaceToAttack());
    // TODO - are we really defending already? seems wrong.
    // entity.addComponent(new Defending());
    entity.removeComponent(UI_COMP); // we're done moving, no longer need UI
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