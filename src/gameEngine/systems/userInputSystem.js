import Entity from 'gameEngine/Entity';
import entityLoop from 'gameEngine/systems/utils/entityLoop';

import {
  BUILDINGS_COMP,
  SELECT,
  MOVE,
  COLONIZE,
  ATTACK
} from 'gameEngine/constants';

import colonize from 'gameEngine/systems/userInputActions/colonize';
import attack from 'gameEngine/systems/userInputActions/attack';
// store our actions, singleton
let actions = [];

import {
  selectEntity,
  getSelectedEntity,
  setEntityDest
} from 'gameEngine/systems/utils/userInput.util';

function userInputSystem() {
  let entities = Entity.entities;
  // loop over all actions
  actions.forEach((action) => {
    // for each entity in the action, do the required logic
    if (action.entities) {
      entityLoop(action.entities, (ent) => {
        let toBuild;
        if (action.name === 'build') {
          toBuild = entities[action.entityID];
          ent.components[BUILDINGS_COMP].inProgress.push(new toBuild.constructor());
        }
      });
    } else {
      if (action.name === SELECT) {
        selectEntity(entities,action);
      }

      if (action.name === MOVE) {
        let selectedEntity = getSelectedEntity();
        !selectedEntity.isNull && setEntityDest(selectedEntity,action);
      }

      if (action.name === COLONIZE) {
        colonize(action);
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

