import Entity from 'gameEngine/Entity';
import {
  HAS_FIGHTERS,
  OWNER_COMPONENT,
  IS_DOCKED,
  POSITION,
  MOVEMENT_COMP
} from 'gameEngine/constants';

import {diffPlayers} from 'gameEngine/components/OwnerComponent';
import {setDest, getDest, getPos} from 'gameEngine/components/PositionComponent';
import {getFighters} from 'gameEngine/components/HasFighters';
import {isAttackable} from 'gameEngine/components/Attackable';
import Moving from 'gameEngine/components/Moving';
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

// REFACTOR - This is now a moveFighters, and not just attack - same code is used to attack and move
export function attack(action, entities = getSelectedEntities(), redirectFighters = false) {
  let directedFighters = 0;
  let launchedFighters = 0;

  let attackingPlanets = entities.filter((attackingPlanet) => {
    return attackingPlanet.hasComponents([HAS_FIGHTERS, OWNER_COMPONENT]);
  });

  // this is "target planet", and not "defending planet"
  let targetPlanet = getEntitiesAtPos(action.x, action.y).filter((ent) => {
    return isAttackable(ent); // just attackable entities can have fighters.. really?
  })[0];

  if (!targetPlanet) {
    return;
  }

  let fightersInFleet = [];
  attackingPlanets.forEach((attackingPlanet) => {
    launchedFighters = 0;
    fightersInFleet = []; // reset the array

    getFighters(attackingPlanet).forEach((fighterEnt) => {
      if (!fighterEnt.hasComponents('MOVING')) {
        fighterEnt.addComponent(new Moving(true));
      }
      // if fighter already has a destination, we do not force a redirect..
      if ((getDest(fighterEnt).x && redirectFighters) || !getDest(fighterEnt).x) {
        setDest(fighterEnt, targetPlanet);
        if (fighterEnt[IS_DOCKED].isDocked) {
          fighterEnt[IS_DOCKED].isDocked = false;
          launchedFighters++;
          fightersInFleet.push(fighterEnt);
        }
        directedFighters++;
      }
    });

    // we resize the radius of the fighters in the fleet represent the fleet size
    // for each attacking planet, we create a new 'fleet';
    fightersInFleet.forEach((fighter) => {
      let speed = fighter[MOVEMENT_COMP].speed;
      let newSize = fighter[POSITION].radius + launchedFighters;
      fighter[POSITION].radius = Math.min(newSize, fighter[POSITION].radius * 8);
      // disalbe the slowdown, not sure this is required...
      // fighter[MOVEMENT_COMP].speed = Math.max(speed - launchedFighters * 0.07, 0.5); // slow down
    });
  });

  return directedFighters;
}

export default attack;