import entityLoop from 'lib/ECS/util/entityLoop';
import Entity from 'lib/ECS/Entity';


import {
  CLICK,
  PLAYER_1
} from 'gameEngine/constants';

import attack from 'gameEngine/systems/userInputActions/attack';
import select from 'gameEngine/systems/userInputActions/select';
import {getOwner} from 'gameEngine/components/OwnerComponent';
// store our actions, singleton
let actions = [];

import {
  selectAllEntities
} from 'gameEngine/systems/utils/userInput.util';

function userInputSystem() {
  // loop over all actions
  actions.forEach((action) => {
    // for each entity in the action, do the required logic
    if (action.entities) {
      entityLoop(action.entities, (ent) => {
        // do stuff here on multiple entities, not really used..
      });
    } else {
      if (action.name === CLICK) {
        let clickedEntities = action.hits.map((id) => {
          return Entity.entities[id];
        });

        if (clickedEntities.length === 0) {
          select(action);
        }

        // get all friendly entities clicked (for player 1)
        let friendlies = clickedEntities.filter((ent) => {
          return getOwner(ent) === PLAYER_1;
        });

        // if we clicked on friendlies, then what?
        if (friendlies.length > 0) {
          // if double click, select all
          action.dbClick && selectAllEntities(PLAYER_1);
          // if not, just select
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

