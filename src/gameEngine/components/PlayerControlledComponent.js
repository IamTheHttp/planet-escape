import {PLAYER_CONTROLLED} from 'gameEngine/constants';
class PlayerControlledComponent {
  constructor() {
    this.name = PLAYER_CONTROLLED;
    this.selected = false;
  }
}

export default PlayerControlledComponent;

export function isSelected(entity) {
  if (entity[PLAYER_CONTROLLED]) {
    return entity[PLAYER_CONTROLLED].selected;
  } else {
    return false;
  }
}

export function unSelect(entity) {
  entity[PLAYER_CONTROLLED] && (entity[PLAYER_CONTROLLED].selected = false);
}