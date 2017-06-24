import Entity from 'gameEngine/Entity';
import UIComponent from 'gameEngine/components/UIComponent';
import PositionComponent from 'gameEngine/components/PositionComponent';
import MoveComponent from 'gameEngine/components/MoveComponent';
import OwnerComponent, {setOwner,getOwner} from 'gameEngine/components/OwnerComponent';
import {addFighter} from 'gameEngine/components/HasFighters';
import IsDocked from 'gameEngine/components/IsDocked';
import {
  CANVAS,
  CIRCLE,
  NEUTRAL,
  CAN_ATTACK_PLANETS,
  OWNER_COMPONENT,
  POSITION,
  HAS_FIGHTERS
} from 'gameEngine/constants.js';
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
    ent.addComponent(new PositionComponent(x,y,5));
    ent.addComponent(new MoveComponent(5));
    ent.addComponent(new OwnerComponent(player));
    ent.addComponent({ name:CAN_ATTACK_PLANETS});
    ent.addComponent(new IsDocked(true));
    ent.planetID = planet.id;
    addFighter(planet,ent);
    return ent;
  }
}

export default Fighter;