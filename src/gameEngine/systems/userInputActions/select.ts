
import {
  selectEntitiesInSelectedBox,
  unSelectAllEntities
} from 'gameEngine/systems/utils/userInput.util';
import {IDispatchAction} from "../../../interfaces/interfaces";

export function select(action: Partial<IDispatchAction>) {
  unSelectAllEntities();
  selectEntitiesInSelectedBox(action.selectedBox);
}

export default select;