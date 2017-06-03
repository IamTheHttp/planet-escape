import {
  BUILDINGS_COMP,
  PLAYERCONTROLLED_COMP,
  POSITION_COMP
} from 'gameEngine/constants';
// store our actions, singleton
let actions = [];

function pushAction(action) {
  actions.push(action);
}

import {
  selectEntity,
  getSelectedEntity,
  moveSelectedEntity
} from 'gameEngine/ecs/systems/utils/userInput.util';

function userInputSystem(entities) {
  // loop over all actions
  actions.forEach((action) => {
    // for each entity in the action, do the required logic
    if (action.entities) {
      action.entities.forEach((entityID) => {
        let ent = entities[entityID];
        let toBuild;
        switch (action.name) {
        case 'build':
          toBuild = entities[action.entityID];
          ent.components[BUILDINGS_COMP].inProgress.push(new toBuild.constructor());
          break;
        default:
          break;
        }
      });
    } else {
      if (action.name === 'select') {
        selectEntity(entities,action);
      }
      if (action.name === 'move') {
        let selectedEntity = getSelectedEntity(entities);
        selectedEntity && moveSelectedEntity(selectedEntity,action);
      }
    }
  });
  // reset actions when we're done
  actions = [];
}

export default userInputSystem;
export {pushAction};