import {PLAYER_CONTROLLED} from 'gameEngine/constants';
import {BaseEntity} from "../BaseEntity";
class PlayerControlledComponent {
  public name;
  public selected:boolean;
  constructor() {
    this.name = PLAYER_CONTROLLED;
    this.selected = false;
  }
}

export default PlayerControlledComponent;

export function isSelected(entity: BaseEntity) {
  if (entity[PLAYER_CONTROLLED]) {
    return entity[PLAYER_CONTROLLED].selected;
  } else {
    return false;
  }
}

export function unSelect(entity: BaseEntity) {
  entity[PLAYER_CONTROLLED] && (entity[PLAYER_CONTROLLED].selected = false);
}