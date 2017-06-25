import Entity from 'gameEngine/Entity';
import {
  BUILDINGS_COMP,
  HAS_FIGHTERS,
  POSITION,
  CAN_COLONIZE_COMP,
  SELECT,
  MOVE,
  COLONIZE,
  OWNER_COMPONENT,
  PLAYER_1,
  ATTACK,
  IS_DOCKED,
  NEUTRAL
} from 'gameEngine/constants';

import {getOwner, setOwner, diffPlayers} from 'gameEngine/components/OwnerComponent';
import {getColonizeDistance} from 'gameEngine/components/CanColonize';
import {calcDistance,setDest} from 'gameEngine/components/PositionComponent';
import {getFighters} from 'gameEngine/components/HasFighters';

// store our actions, singleton
let actions = [];

function pushAction(action) {
  actions.push(action);
}

import {
  selectEntity,
  getSelectedEntity,
  setEntityDest,
  getEntityAtPos
} from 'gameEngine/systems/utils/userInput.util';


export function attack(entities, action) {
  let attackingPlanet = getSelectedEntity(entities);
  let defendingPlanet = getEntityAtPos(entities,action.x,action.y);

  attackingPlanet.hasComponents([HAS_FIGHTERS,OWNER_COMPONENT], () => {
    defendingPlanet.hasComponents(OWNER_COMPONENT, () => {
      if (diffPlayers(attackingPlanet,defendingPlanet)) {
        getFighters(attackingPlanet).forEach((fighterEnt) => {
          setDest(fighterEnt,defendingPlanet);
          fighterEnt[IS_DOCKED].isDocked = false;
        });
        // attackingPlanet[HAS_FIGHTERS].fighters = []; //  empty the fighters...
      }
    });
  });
}

function colonize(entities, action) {
  let selectedEntity = getSelectedEntity(entities);
  let targetEntity = getEntityAtPos(entities,action.x,action.y);
  selectedEntity.hasComponents([CAN_COLONIZE_COMP,OWNER_COMPONENT], () => {
    targetEntity.hasComponents(OWNER_COMPONENT, () => {
      let dist = calcDistance(selectedEntity, targetEntity);

      let inRange = dist < getColonizeDistance(selectedEntity);
      if (inRange && getOwner(targetEntity) === NEUTRAL) {
        setOwner(targetEntity,PLAYER_1);
        targetEntity[OWNER_COMPONENT].playerChangeTime = +(new Date());
      }
    });
  });
}

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
        // okay, so if they don't have a canvas UI, we should add it?
        // totally..
        let selectedEntity = getSelectedEntity(entities);
        !selectedEntity.isNull && setEntityDest(selectedEntity,action);
      }

      if (action.name === COLONIZE) {
        colonize(entities, action);
      }

      if (action.name === ATTACK) {
        attack(entities, action);
      }
    }
  });
  // reset actions when we're done
  actions = [];
}


export default userInputSystem;
export {pushAction};