import Entity from 'gameEngine/ecs/Entity';
import PlayerControlled from 'gameEngine/ecs/components/PlayerControlledComponent';
import UIComponent from 'gameEngine/ecs/components/UIComponent';
import PositionComponent from 'gameEngine/ecs/components/PositionComponent';
import MoveComponent from 'gameEngine/ecs/components/MoveComponent';
import {
  CANVAS,
  CIRCLE
} from 'gameEngine/constants.js';
class Mothership {
  constructor(x,y) {
    let ent = new Entity();
    ent.addComponent(new PlayerControlled());
    ent.addComponent(new UIComponent({
      name:CANVAS,
      data : {
        shape : CIRCLE
      }
    }));
    ent.addComponent(new PositionComponent(x,y));
    ent.addComponent(new MoveComponent());
    return ent;
  }
}

export default Mothership;