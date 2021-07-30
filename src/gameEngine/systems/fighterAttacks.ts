import {
  getFighters,
  destroyFighter,
  getDefendingFighters,
  detachFighterFromPlanet,
  reassignFighter
} from 'gameEngine/components/HasFighters';
import {unSelect} from 'gameEngine/components/PlayerControlledComponent';
import Explosion from 'gameEngine/components/Explosion';
import {hasDest, isSamePos, destReached} from 'gameEngine/components/PositionComponent';
import {diffPlayers, getOwner} from 'gameEngine/components/OwnerComponent';

import {
  OWNER_COMPONENT,
  CAN_ATTACK_PLANETS,
  POSITION,
  IN_PLACE_TO_ATTACK,
  HAS_FIGHTERS,
  NEUTRAL,
  DEFENDING,
  EXPLOSION
} from 'gameEngine/constants';
import {BaseEntity} from "../BaseEntity";
import EarthLike from "../entities/planets/EarthLike";
import {ISystemArguments} from "../../interfaces/interfaces";
import {Entity} from "game-platform";
import {FighterEntity} from "../entities/Ships/Fighter";

function fighterAttacks(systemArguments: ISystemArguments) {
  let hits = Entity.getByComps([OWNER_COMPONENT, CAN_ATTACK_PLANETS, IN_PLACE_TO_ATTACK]);
  let planets = Entity.getByComps([HAS_FIGHTERS], 'array') as BaseEntity[];

  hits.forEach((attacker: FighterEntity) => {
    // first lets detect if we just 'hit' a friendly planet
    let friendlyPlanet = planets.find((planet) => {
      return isSamePos(planet, attacker) && !diffPlayers(planet, attacker);
    });

    if (friendlyPlanet) {
      reassignFighter(friendlyPlanet, attacker);
    } else {
      let foundPlanet = planets.find((planet: EarthLike) => {
        return isSamePos(planet, attacker) && diffPlayers(planet, attacker) ;
      });

      // if the defending planet has no docked fighters left
      if (getDefendingFighters(foundPlanet) === 0) {
        foundPlanet[OWNER_COMPONENT].player = getOwner(attacker);
        foundPlanet.addComponent(new Explosion());
        unSelect(foundPlanet);
        // we need to copy the array since we can't modify the array while we loop through it
        let arr = Object.assign([], getFighters(foundPlanet));
        arr.forEach((fighter) => {
          detachFighterFromPlanet(fighter);
          // we need to change owner..
          // destroyFighter(fighter);
        });
        destroyFighter(attacker);
        return ;
      }

      let defender = getFighters(foundPlanet).find((defFighter) => {
        // kill only 'defending' fighters
        return defFighter.hasComponents(DEFENDING);
      });

      destroyFighter(attacker);
      defender && destroyFighter(defender);
    }
  });
}

export default fighterAttacks;