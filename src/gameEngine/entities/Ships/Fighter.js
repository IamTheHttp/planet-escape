import Entity from 'gameEngine/Entity';
import UIComponent from 'gameEngine/components/UIComponent';
import PositionComponent from 'gameEngine/components/PositionComponent';
import MoveComponent from 'gameEngine/components/MoveComponent';
import OwnerComponent, {getOwner} from 'gameEngine/components/OwnerComponent';
import {addFighter} from 'gameEngine/components/HasFighters';
import IsDocked from 'gameEngine/components/IsDocked';
import Sprite from 'gameEngine/components/Sprite';
import {
  CANVAS,
  CIRCLE,
  NEUTRAL,
  CAN_ATTACK_PLANETS,
  OWNER_COMPONENT,
  POSITION,
  HAS_FIGHTERS,
  FIGHTER_RADIUS,
  FIGHTER_SPEED
} from 'gameEngine/constants.js';

import fighter from 'assets/fighter.png';
let fighterImage = new Image();
fighterImage.src = fighter;

class Fighter {
  constructor(planet) {
    let ent = new Entity(Fighter);
    ent.addComponent(new UIComponent({
      name:CANVAS,
      data : {
        shape : CIRCLE
      }
    }));

    let player = getOwner(planet);
    let x = planet[POSITION].x;
    let y = planet[POSITION].y;
    ent.addComponent(new PositionComponent(x, y, FIGHTER_RADIUS));
    ent.addComponent(new MoveComponent(FIGHTER_SPEED));
    ent.addComponent(new OwnerComponent(player));
    ent.addComponent({ name:CAN_ATTACK_PLANETS});
    ent.addComponent(new IsDocked(true));
    ent.addComponent(new Sprite(fighterImage, [0, 0, 95, 95])); // sprite args

    addFighter(planet, ent);
    return ent;
  }
}

export default Fighter;

