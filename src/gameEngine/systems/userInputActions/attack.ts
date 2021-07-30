import {
  HAS_FIGHTERS,
  OWNER_COMPONENT,
  DEFENDING,
  POSITION,
  MOVEMENT_COMP,
  MOVING,
  PLAYER_1
} from 'gameEngine/constants';

import {diffPlayers} from 'gameEngine/components/OwnerComponent';
import {addFighterUiComp, FighterEntity, setFighterAsFleet} from 'gameEngine/entities/Ships/Fighter';
import {setDest, getDest, getPos} from 'gameEngine/components/PositionComponent';
import {getFighters, stopDefending} from 'gameEngine/components/HasFighters';
import {isAttackable} from 'gameEngine/components/Attackable';
import Moving from 'gameEngine/components/Moving';
import {
  getSelectedEntities,
  getEntitiesAtPos
} from 'gameEngine/systems/utils/userInput.util';
import {BaseEntity} from "../../BaseEntity";
import {IDispatchAction} from "../../../interfaces/interfaces";


/**
 * Returns the number of successful hits
 * @param action {} {x , y}
 * @param entities Array list of entities that are attacking
 */
export function attack(action: IDispatchAction | {x:number, y:number}, entities:BaseEntity[] = getSelectedEntities()) {
  let directedFighters = 0;
  let launchedFighters ;
  let fightersInFleet: FighterEntity[];

  let attackingPlanets = entities.filter((attackingPlanet) => {
    return attackingPlanet.hasComponents([HAS_FIGHTERS, OWNER_COMPONENT]);
  });

  let targetPlanet = getEntitiesAtPos(action.x, action.y).filter((ent:BaseEntity) => {
    return isAttackable(ent);
  })[0];

  if (!targetPlanet) {
    return directedFighters;
  }

  attackingPlanets.forEach((attackingPlanet) => {
    // each planet creates its own fleet
    launchedFighters = 0;
    fightersInFleet = [];

    getFighters(attackingPlanet).forEach((fighterEnt: FighterEntity) => {
      if (fighterEnt.hasComponents(DEFENDING)) {
        fighterEnt.addComponent(new Moving());
        stopDefending(fighterEnt); // adds more logic behind the scenes

        fightersInFleet.push(fighterEnt);
        setDest(fighterEnt, targetPlanet);
      }
    });


    let firstFighter = fightersInFleet[0];
    // only draw the first ship in the fleet
    addFighterUiComp(firstFighter); // only for the first
    setFighterAsFleet(firstFighter, fightersInFleet.length);

    directedFighters += fightersInFleet.length;
  });
  return directedFighters;
}

export default attack;