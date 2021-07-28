
import {
  selectEntitiesInSelectedBox,
  unSelectAllEntities
} from 'gameEngine/systems/utils/userInput.util';

export function select(action) {
  unSelectAllEntities();
  selectEntitiesInSelectedBox(action.selectedBox);
}

export default select;