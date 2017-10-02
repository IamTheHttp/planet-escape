import Entity from 'gameEngine/Entity';
import UIComponent from 'gameEngine/components/UIComponent';
import PositionComponent from 'gameEngine/components/PositionComponent';
import MoveComponent from 'gameEngine/components/MoveComponent';
import OwnerComponent, {setOwner, getOwner} from 'gameEngine/components/OwnerComponent';
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
  HAS_FIGHTERS
} from 'gameEngine/constants.js';

// TODO move to assets list or something..
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
    ent.addComponent(new PositionComponent(x, y, 15));
    ent.addComponent(new MoveComponent(2));
    ent.addComponent(new OwnerComponent(player));
    ent.addComponent({ name:CAN_ATTACK_PLANETS});
    ent.addComponent(new IsDocked(true));
    ent.addComponent(new Sprite(fighterImage, [0, 0, 95, 95])); // sprite args

    ent.planetID = planet.id;
    addFighter(planet, ent);
    return ent;
  }
}

export default Fighter;