/** @namespace entity.components.localBonus */
import {PLAYERCONTROLLED_COMP} from 'gameEngine/constants';
class PlayerControlledComponent{
  constructor(){
    this.name = PLAYERCONTROLLED_COMP;
    this.x = 50;
    this.y = 50;
    this.radius = 20;
    this.selected = false;
  }
}

export default PlayerControlledComponent;