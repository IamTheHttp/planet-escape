import Entity from 'gameEngine/Entity';
import PlayerControlled from 'gameEngine/components/PlayerControlledComponent';
import UIComponent from 'gameEngine/components/UIComponent';
import PositionComponent from 'gameEngine/components/PositionComponent';
import MoveComponent from 'gameEngine/components/MoveComponent';
import CanColonize from 'gameEngine/components/CanColonize';
import OwnerComponent from 'gameEngine/components/OwnerComponent';
import {
  CANVAS,
  CIRCLE,
  NEUTRAL
} from 'gameEngine/constants.js';
class Mothership {
  constructor(x, y, player = NEUTRAL) {
    let ent = new Entity();
    ent.addComponent(new PlayerControlled());
    ent.addComponent(new UIComponent({
      name:CANVAS,
      data : {
        shape : CIRCLE
      }
    }));
    ent.addComponent(new PositionComponent(x, y));
    ent.addComponent(new MoveComponent());
    ent.addComponent(new CanColonize());
    ent.addComponent(new OwnerComponent(player));
    return ent;
  }
}

export default Mothership;