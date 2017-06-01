/** @namespace entity.components.localBonus */
import {POSITION_COMP} from 'gameEngine/constants';
class PlayerControlledComponent {
  constructor(x,y) {
    this.name = POSITION_COMP;
    this.x = x;
    this.y = y;
    this.radius = 20;
    this.selected = false;
  }
}

export default PlayerControlledComponent;