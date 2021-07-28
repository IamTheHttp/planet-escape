import entityLoop from '../../lib/ECS/util/entityLoop';
import Entity from '../../lib/ECS/Entity';
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
import {ISystemArguments} from "../../d.ts/interfaces";
import {BaseEntity} from "../BaseEntity";

function moveEntity(entity) {
  if (destReached(entity)) {
    entity.removeComponent(MOVING);
    entity.addComponent(new InPlaceToAttack());
    entity.removeComponent(UI_COMP); // we're done moving, no longer need UI
    return;
  }

  let destX = getDest(entity).x;
  let destY = getDest(entity).y;

  /* istanbul ignore next */
  if (destX && destY) {
    let curX = getPos(entity).x;
    let curY = getPos(entity).y;

    // REFACTOR to be using angle instead of gradient, we're already calculating this field
    let gradient = (destY - curY) / (destX - curX);
    let speed = entity[MOVEMENT_COMP].speed;
    let distanceX = destX - curX;
    let newX = null;

    //  if gradient === Infinity we only move on Y axis..
    if (Math.abs(gradient) === Infinity) {
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

function moveSystem(systemArguments: ISystemArguments) {
  let entities = Entity.getByComps([MOVEMENT_COMP, POSITION, MOVING]);
  if (entities.length) {
    entityLoop(entities, (entity: BaseEntity) => {
      moveEntity(entity);
    });
  }
}

export default moveSystem;