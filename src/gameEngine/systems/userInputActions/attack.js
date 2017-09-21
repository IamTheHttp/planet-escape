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
  getSelectedEntity,
  getEntityAtPos
} from 'gameEngine/systems/utils/userInput.util';

export function attack(action) {
  return new Promise((resolve, reject) => {
    let attackingPlanet = getSelectedEntity();
    let defendingPlanet = getEntityAtPos(action.x, action.y);

    if (!isAttackable(defendingPlanet)) {
      resolve(false);
      return;
      // return;
    }
    attackingPlanet.hasComponents([HAS_FIGHTERS, OWNER_COMPONENT], () => {
      defendingPlanet.hasComponents(OWNER_COMPONENT, () => {
        if (diffPlayers(attackingPlanet, defendingPlanet)) {
          getFighters(attackingPlanet).forEach((fighterEnt) => {
            setDest(fighterEnt, defendingPlanet);
            fighterEnt[IS_DOCKED].isDocked = false;
            resolve(true);
            return;
          });
          // attackingPlanet[HAS_FIGHTERS].fighters = []; //  empty the fighters...
        }
      });
    });
  });
}

export default attack;