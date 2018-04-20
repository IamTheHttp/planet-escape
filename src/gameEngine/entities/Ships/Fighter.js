import Entity from 'gameEngine/Entity';
import UIComponent from 'gameEngine/components/UIComponent';
import PositionComponent from 'gameEngine/components/PositionComponent';
import MoveComponent from 'gameEngine/components/MoveComponent';
import OwnerComponent, {getOwner} from 'gameEngine/components/OwnerComponent';
import {addFighter} from 'gameEngine/components/HasFighters';
import Defending from 'gameEngine/components/Defending';
import gameConfig from 'gameEngine/config';
import Sprite from 'gameEngine/components/Sprite';
import {
  CANVAS,
  CIRCLE,
  CAN_ATTACK_PLANETS,
  POSITION,
  FIGHTER_RADIUS,
  FIGHTER_SPEED
} from 'gameEngine/constants.js';

import fighter from 'assets/fighter.png';
let fighterImage = new Image();
fighterImage.src = fighter;

class Fighter {
  constructor(planet) {
    let ent = new Entity(Fighter);

    let player = getOwner(planet);
    let x = planet[POSITION].x;
    let y = planet[POSITION].y;
    ent.addComponent(new PositionComponent(x, y, gameConfig[FIGHTER_RADIUS]));
    ent.addComponent(new MoveComponent(gameConfig[FIGHTER_SPEED]));
    ent.addComponent(new OwnerComponent(player));
    ent.addComponent({name: CAN_ATTACK_PLANETS});
    ent.addComponent(new Defending);
    ent.addComponent(new Sprite(fighterImage, [0, 0, 95, 95])); // sprite args

    addFighter(planet, ent);
    return ent;
  }
}

// REFACTOR - Should we allow hooks for addComponent / removeComponent?
// That would allow us to add the required logic in one place, while we avoid
// using magic functions that are defined in various places.

// TODO
// Using the Refactor statement above :
// We can hook into "stopDefending" and add the UI comp.
export function addFighterUiComp(fighter) {
  fighter.addComponent(new UIComponent({
    name: CANVAS,
    data: {
      shape: CIRCLE
    }
  }));
}

export default Fighter;

