import Entity from 'gameEngine/Entity';
import {
  HAS_FIGHTERS,
  OWNER_COMPONENT,
  DEFENDING,
  POSITION,
  MOVEMENT_COMP,
  MOVING
} from 'gameEngine/constants';

import {diffPlayers} from 'gameEngine/components/OwnerComponent';
import {addFighterUiComp} from 'gameEngine/entities/Ships/Fighter';
import {setDest, getDest, getPos} from 'gameEngine/components/PositionComponent';
import {getFighters, stopDefending} from 'gameEngine/components/HasFighters';
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
  let launchedFighters ;
  let fightersInFleet;

  let attackingPlanets = entities.filter((attackingPlanet) => {
    return attackingPlanet.hasComponents([HAS_FIGHTERS, OWNER_COMPONENT]);
  });

  let targetPlanet = getEntitiesAtPos(action.x, action.y).filter((ent) => {
    return isAttackable(ent);
  })[0];

  if (!targetPlanet) {
    return directedFighters;
  }

  attackingPlanets.forEach((attackingPlanet) => {
    // each planet creates its own fleet
    launchedFighters = 0;
    fightersInFleet = [];

    getFighters(attackingPlanet).forEach((fighterEnt) => {
      if (fighterEnt.hasComponents(DEFENDING)) {
        fighterEnt.addComponent(new Moving());
        stopDefending(fighterEnt); // adds more logic behind the scenes
        addFighterUiComp(fighterEnt); // because we're moving, we need UI!
        fightersInFleet.push(fighterEnt);
        setDest(fighterEnt, targetPlanet);
      }
    });

    // we resize the radius of the fighters in the fleet represent the fleet size
    fightersInFleet.forEach((fighter) => {
      let speed = fighter[MOVEMENT_COMP].speed;
      let newSize = fighter[POSITION].radius + fightersInFleet.length;
      fighter[POSITION].radius = Math.min(newSize, fighter[POSITION].radius * 8);
      // disalbe the slowdown, not sure this is required...
      // fighter[MOVEMENT_COMP].speed = Math.max(speed - launchedFighters * 0.07, 0.5); // slow down
    });

    directedFighters += fightersInFleet.length;
  });
  return directedFighters;
}

export default attack;