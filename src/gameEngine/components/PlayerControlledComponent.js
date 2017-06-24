/** @namespace entity.components.localBonus */
import {PLAYER_CONTROLLED} from 'gameEngine/constants';
class PlayerControlledComponent {
  constructor() {
    this.name = PLAYER_CONTROLLED;
    this.selected = false;
  }
}

export default PlayerControlledComponent;