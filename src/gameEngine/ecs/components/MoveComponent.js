/** @namespace entity.components.buildings.inProgress */
/** @namespace entity.components.buildings.built */
import {MOVEMENT_COMP} from 'gameEngine/constants';
class MoveComponent {
  constructor(speed = 1.5) {
    this.name = MOVEMENT_COMP;
    this.speed = speed;
  }
}

export default MoveComponent;
