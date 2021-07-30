import {
  selectEntitiesInSelectedBox,
  unSelectAllEntities
} from 'gameEngine/systems/utils/userInput.util';
import {IDispatchAction} from "../../../interfaces/interfaces";

export function select(action: IDispatchAction) {
  unSelectAllEntities();
  if (action.selectedBox) {
    selectEntitiesInSelectedBox(action.selectedBox);
  }
}

export default select;