/** @namespace entity.components.localBonus */
import {PLAYERCONTROLLED_COMP} from 'gameEngine/constants';
class PlayerControlledComponent {
  constructor() {
    this.name = PLAYERCONTROLLED_COMP;
    this.selected = false;
  }
}

export default PlayerControlledComponent;