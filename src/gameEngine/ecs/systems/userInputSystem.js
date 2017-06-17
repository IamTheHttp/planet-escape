import {
  BUILDINGS_COMP,
  PLAYERCONTROLLED_COMP,
  POSITION_COMP,
  CAN_COLONIZE_COMP,
  SELECT,
  MOVE,
  COLONIZE,
  OWNER_COMPONENT,
  PLAYER_1
} from 'gameEngine/constants';
// store our actions, singleton
let actions = [];

function pushAction(action) {
  actions.push(action);
}

import {
  selectEntity,
  getSelectedEntity,
  setEntityDest,
  getEntityAtPos,
  calcDistance
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
      if (action.name === SELECT) {
        selectEntity(entities,action);
      }

      if (action.name === MOVE) {
        let selectedEntity = getSelectedEntity(entities);
        selectedEntity && setEntityDest(selectedEntity,action);
      }

      if (action.name === COLONIZE) {
        let selectedEntity = getSelectedEntity(entities);
        let targetEntity = getEntityAtPos(entities,action.x,action.y);

        selectedEntity &&
        targetEntity   &&
        selectedEntity.hasComponents([CAN_COLONIZE_COMP,OWNER_COMPONENT], () => {
          targetEntity.hasComponents(OWNER_COMPONENT, () => {
            let diffPlayers = selectedEntity[OWNER_COMPONENT].player !== targetEntity[OWNER_COMPONENT].player;
            let dist = calcDistance(
              selectedEntity[POSITION_COMP],
              targetEntity[POSITION_COMP]
            );
            let inRange = dist < selectedEntity[CAN_COLONIZE_COMP].distance;
            if (inRange && diffPlayers) {
              targetEntity[OWNER_COMPONENT].player = PLAYER_1;
              targetEntity[OWNER_COMPONENT].playerChangeTime = +(new Date());
            }
          });
        });
      }
    }
  });
  // reset actions when we're done
  actions = [];
}

export default userInputSystem;
export {pushAction};