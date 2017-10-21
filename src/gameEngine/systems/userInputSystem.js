import Entity from 'gameEngine/Entity';
import entityLoop from 'gameEngine/systems/utils/entityLoop';

import {
  CLICK,
  DB_CLICK,
  MOVE,
  ATTACK,
  PLAYER_1
} from 'gameEngine/constants';

import attack from 'gameEngine/systems/userInputActions/attack';
import select from 'gameEngine/systems/userInputActions/select';
import {getOwner} from 'gameEngine/components/OwnerComponent';
// store our actions, singleton
let actions = [];

import {
  selectEntity,
  getSelectedEntities,
  setEntityDest,
  selectAllEntities,
  unSelectAllEntities,
  getClickedEntitiy
} from 'gameEngine/systems/utils/userInput.util';

function userInputSystem() {
  let entities = Entity.entities;
  // loop over all actions
  actions.forEach((action) => {
    // for each entity in the action, do the required logic
    if (action.entities) {
      entityLoop(action.entities, (ent) => {
        // do stuff here on multiple entities, not really used..
      });
    } else {
      if (action.name === CLICK) {
        let clickedEntities = getClickedEntitiy(action);
        // is this friendly?

        // if i clicked on nothing, we might have a selection box.
        if (clickedEntities.length === 0) {
          select(action);
          // select(action); // this will also unselect first..
        }


        // if i licked on a friendly, select it
        let friendlies = clickedEntities.filter((ent) => {
          return getOwner(ent) === PLAYER_1;
        });

        if (friendlies.length > 0) {
          // if i double clicked, and clicked on a friendly, select ALL.
          action.dbClick && selectAllEntities(PLAYER_1);
          !action.dbClick && select(action);
        }

        // if i clicked on an enemy or neutral, attack..
        let enemies = clickedEntities.filter((ent) => {
          return getOwner(ent) !== PLAYER_1;
        });

        if (enemies.length) {
          attack(action);
        }
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

