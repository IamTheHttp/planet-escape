import Entity from '../../../lib/ECS/Entity';
import UIComponent from 'gameEngine/components/UIComponent';
import PositionComponent from 'gameEngine/components/PositionComponent';
import MoveComponent from 'gameEngine/components/MoveComponent';
import OwnerComponent, {getOwner} from 'gameEngine/components/OwnerComponent';
import {addFighter} from 'gameEngine/components/HasFighters';
import Defending from 'gameEngine/components/Defending';
import gameConfig from 'gameEngine/config';
import Sprite from 'gameEngine/components/Sprite';
import ObjectPool from 'lib/ObjectPool/ObjectPool';
import {
  CANVAS,
  CIRCLE,
  CAN_ATTACK_PLANETS,
  POSITION,
  FIGHTER_RADIUS,
  FIGHTER_SPEED,
  FIGHTER_IMAGE,
  OWNER_COMPONENT,
  IN_PLACE_TO_ATTACK
} from 'gameEngine/constants.js';

import fighter from 'assets/fighter.png';
let fighterPool;
let fighterImage = new Image();
fighterImage.src = fighter;

class Fighter {
  constructor(planet) {
    let ent = new Entity(Fighter);

    ent.addComponent(new MoveComponent(gameConfig[FIGHTER_SPEED]));
    ent.addComponent({name: CAN_ATTACK_PLANETS});
    ent.addComponent(new Defending);

    ent.addComponent(new Sprite([{
      name : FIGHTER_IMAGE
    }])); // sprite args

    ent.addComponent(new OwnerComponent(null));
    ent.addComponent(new PositionComponent(null, null, gameConfig[FIGHTER_RADIUS]));

    ent.remove = () => {
      // Whats the bear minimum we need to do to clean up a fighter?
      // Reset owner
      ent[OWNER_COMPONENT].player = null;
      // Reset position
      ent[POSITION].x = null;
      ent[POSITION].y = null;
      // Remove the 'in place to attack';
      ent.removeComponent(IN_PLACE_TO_ATTACK);
      // okay, we also need to reset the radius, since we change it for some reason!
      ent[POSITION].radius = gameConfig[FIGHTER_RADIUS];

      // reset the defending state
      fighterPool.release(ent);
      ent.addComponent(new Defending);
    };

    return ent;
  }
}

// TODO
// Should we allow hooks for addComponent / removeComponent?
// That would allow us to add the required logic in one place, while we avoid
// using magic functions that are defined in various places.
// Using the Refactor statement above :
// We can hook into "stopDefending" and add the UI comp.
export function addFighterUiComp(fighter) {
  fighter.addComponent(new UIComponent({
    name: CANVAS,
    shape : CIRCLE
  }));
}

fighterPool = new ObjectPool(Fighter);

function FighterFactory(planet) {
  // We take one from the pool but we reset some key parts in it
  let ent = fighterPool.acquire();

  ent[OWNER_COMPONENT].player = getOwner(planet);
  ent[POSITION].x = planet[POSITION].x;
  ent[POSITION].y = planet[POSITION].y;

  addFighter(planet, ent);
  return ent;
}

export {fighterPool};
export default FighterFactory;