import Entity from 'gameEngine/Entity';
import {
  HAS_FIGHTERS,
  OWNER_COMPONENT,
  IS_DOCKED,
  POSITION,
  MOVEMENT_COMP
} from 'gameEngine/constants';

import { diffPlayers} from 'gameEngine/components/OwnerComponent';
import {setDest, getDest, getPos} from 'gameEngine/components/PositionComponent';
import {getFighters} from 'gameEngine/components/HasFighters';
import {isAttackable} from 'gameEngine/components/Attackable';
import {
  getSelectedEntities,
  getEntitiesAtPos
} from 'gameEngine/systems/utils/userInput.util';

/**
 * Returns the number of successful hits
 * @param action {} {x , y}
 * @param entities Array list of entities that are attacking
 * @param redirectFighters
 */

// TODO - This is now a moveFighters, and not just attack - same code is used to attack and move
export function attack(action, entities = getSelectedEntities(), redirectFighters = true) {
  let directedFighters = 0;
  let launchedFighters = 0;

  let attackingPlanets = entities.filter((attackingPlanet) => {
    return attackingPlanet.hasComponents([HAS_FIGHTERS, OWNER_COMPONENT]);
  });
  let defendingPlanets = getEntitiesAtPos(action.x, action.y).filter((ent) => {
    return isAttackable(ent); // just attackable entities can have fighters.. really?
  });

  let fightersInFleet = [];
  attackingPlanets.forEach((attackingPlanet) => {
    launchedFighters = 0;
    // TODO - This makes no sense as there's only one defending planet at a time
    defendingPlanets.forEach((defendingPlanet) => {
      getFighters(attackingPlanet).forEach((fighterEnt) => {
        // if fighter already has a destination, we do not force a redirect..
        if ((getDest(fighterEnt).x && redirectFighters) || !getDest(fighterEnt).x) {
          setDest(fighterEnt, defendingPlanet);
          if (fighterEnt[IS_DOCKED].isDocked) {
            fighterEnt[IS_DOCKED].isDocked = false;
            launchedFighters++;
            fightersInFleet.push(fighterEnt);
          }
          directedFighters++;
        }
      });
    });
  });

  // we resize the radius of the fighters in the fleet represent the fleet size
  fightersInFleet.forEach((fighter) => {
    let speed = fighter[MOVEMENT_COMP].speed;
    fighter[POSITION].radius += launchedFighters;
    // disalbe the slowdown, not sure this is required...
    // fighter[MOVEMENT_COMP].speed = Math.max(speed - launchedFighters * 0.07, 0.5); // slow down
  });

  return directedFighters;
}

export default attack;