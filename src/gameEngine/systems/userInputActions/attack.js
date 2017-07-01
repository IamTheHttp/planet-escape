import Entity from 'gameEngine/Entity';
import {
  HAS_FIGHTERS,
  OWNER_COMPONENT,
  IS_DOCKED
} from 'gameEngine/constants';

import { diffPlayers} from 'gameEngine/components/OwnerComponent';
import {setDest} from 'gameEngine/components/PositionComponent';
import {getFighters} from 'gameEngine/components/HasFighters';

import {
  getSelectedEntity,
  getEntityAtPos
} from 'gameEngine/systems/utils/userInput.util';

export function attack(action) {
  let attackingPlanet = getSelectedEntity();
  let defendingPlanet = getEntityAtPos(action.x,action.y);


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

export default attack;