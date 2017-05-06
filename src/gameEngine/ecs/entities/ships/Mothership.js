import Entity from 'gameEngine/ecs/Entity'
import PlayerControlled from 'gameEngine/ecs/components/PlayerControlledComponent';
import UIComponent from 'gameEngine/ecs/components/UIComponent';

class Mothership{
  constructor(){
    let ent = new Entity();
    ent.addComponent(new PlayerControlled());
    ent.addComponent(new UIComponent('canvas'));
    return ent;
  }
}

export default Mothership;