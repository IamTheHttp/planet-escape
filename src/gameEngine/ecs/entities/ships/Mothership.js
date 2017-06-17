import Entity from 'gameEngine/ecs/Entity';
import PlayerControlled from 'gameEngine/ecs/components/PlayerControlledComponent';
import UIComponent from 'gameEngine/ecs/components/UIComponent';
import PositionComponent from 'gameEngine/ecs/components/PositionComponent';
import MoveComponent from 'gameEngine/ecs/components/MoveComponent';
import CanColonize from 'gameEngine/ecs/components/CanColonize';
import OwnerComponent from 'gameEngine/ecs/components/OwnerComponent';
import {
  CANVAS,
  CIRCLE,
  PLAYER_0
} from 'gameEngine/constants.js';
class Mothership {
  constructor(x,y,player = PLAYER_0) {
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
    ent.addComponent(new CanColonize());
    ent.addComponent(new OwnerComponent(player));
    return ent;
  }
}

export default Mothership;