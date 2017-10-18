/** @namespace entity.components.localBonus */
import {PLAYER_CONTROLLED} from 'gameEngine/constants';
class PlayerControlledComponent {
  constructor() {
    this.name = PLAYER_CONTROLLED;
    this.selected = false;
  }
}

export default PlayerControlledComponent;

export function isSelected(entity) {
  return entity[PLAYER_CONTROLLED] && entity[PLAYER_CONTROLLED].selected;
}

export function unSelect(entity) {
  entity[PLAYER_CONTROLLED] && (entity[PLAYER_CONTROLLED].selected = false);
}