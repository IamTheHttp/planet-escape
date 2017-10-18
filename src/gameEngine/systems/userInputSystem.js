import Entity from 'gameEngine/Entity';
import entityLoop from 'gameEngine/systems/utils/entityLoop';

import {
  BUILDINGS_COMP,
  SELECT,
  MOVE,
  ATTACK
} from 'gameEngine/constants';

import attack from 'gameEngine/systems/userInputActions/attack';
import select from 'gameEngine/systems/userInputActions/select';
// store our actions, singleton
let actions = [];

import {
  selectEntity,
  getSelectedEntities,
  setEntityDest
} from 'gameEngine/systems/utils/userInput.util';

function userInputSystem() {
  let entities = Entity.entities;
  // loop over all actions
  actions.forEach((action) => {
    // for each entity in the action, do the required logic
    if (action.entities) {
      entityLoop(action.entities, (ent) => {
        // do stuff here on multiple entities
      });
    } else {
      if (action.name === SELECT) {
        select(action);
      }

      if (action.name === MOVE) {
        let ents = getSelectedEntities();
        ents.forEach((selectedEntity) => {
          setEntityDest(selectedEntity, action);
        });
      }

      if (action.name === ATTACK) {
        attack(action);
      }
    }
  });
  // reset actions when we're done
  actions = [];
}


export default userInputSystem;

function pushAction(action) {
  actions.push(action);
}
export {pushAction};

