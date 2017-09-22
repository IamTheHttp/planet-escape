import Entity from 'gameEngine/Entity';
import {
  HAS_FIGHTERS,
  OWNER_COMPONENT,
  IS_DOCKED
} from 'gameEngine/constants';

import { diffPlayers} from 'gameEngine/components/OwnerComponent';
import {setDest} from 'gameEngine/components/PositionComponent';
import {getFighters} from 'gameEngine/components/HasFighters';
import {isAttackable} from 'gameEngine/components/Attackable';
import {
  getSelectedEntities,
  getEntitiesAtPos
} from 'gameEngine/systems/utils/userInput.util';

/**
 * Returns the number of successful hits
 * @param action
 */
export function attack(action) {
  let launchedFighters = 0;
  let attackingPlanets = getSelectedEntities().filter((attackingPlanet) => {
    return attackingPlanet.hasComponents([HAS_FIGHTERS, OWNER_COMPONENT]);
  });
  let defendingPlanets = getEntitiesAtPos(action.x, action.y).filter((ent) => {
    return isAttackable(ent);
  });

  attackingPlanets.forEach((attackingPlanet) => {
    // TODO - This makes no sense as there's only one defending planet at a time
    defendingPlanets.forEach((defendingPlanet) => {
      if (diffPlayers(attackingPlanet, defendingPlanet)) {
        getFighters(attackingPlanet).forEach((fighterEnt) => {
          setDest(fighterEnt, defendingPlanet);
          fighterEnt[IS_DOCKED].isDocked = false;
          launchedFighters++;
        });
      }
    });
  });
  return launchedFighters;
}

export default attack;