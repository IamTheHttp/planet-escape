import Entity from 'gameEngine/Entity';
import entityLoop from 'gameEngine/systems/utils/entityLoop';
import {getFighters, destroyFighter, getDockedFighters, detachFighterFromPlanet} from 'gameEngine/components/HasFighters';
import {unSelect} from 'gameEngine/components/PlayerControlledComponent';
import {hasDest, isSamePos, destReached} from 'gameEngine/components/PositionComponent';
import {diffPlayers, getOwner} from 'gameEngine/components/OwnerComponent';
import Fighter from 'gameEngine/entities/Ships/Fighter';

import {
  OWNER_COMPONENT,
  CAN_ATTACK_PLANETS,
  POSITION,
  HAS_FIGHTERS,
  NEUTRAL,
  IS_DOCKED
} from 'gameEngine/constants';

function fighterAttacks() {
  let hits = Entity.getByComps([OWNER_COMPONENT, CAN_ATTACK_PLANETS, 'IN_PLACE_TO_ATTACK'], 'array');
  let planets = Entity.getByComps(HAS_FIGHTERS, 'array');

  hits.forEach((attacker) => {
    // first lets detect if we just 'hit' a friendly planet
    let friendlyPlanet = planets.find((planet) => {
      return isSamePos(planet, attacker) && !diffPlayers(planet, attacker) ;
    });

    // if we reached a friendly planet
    // let's join that planet!
    if (friendlyPlanet) {
      // destroy this fighter, and create a new one..
      // this prevents us from needing to remove the fighter from it's current list..
      // though it might be 'better', this is much easier.
      new Fighter(friendlyPlanet);
      destroyFighter(attacker);
      return;
    }

    let foundPlanet = planets.find((planet) => {
      return isSamePos(planet, attacker) && diffPlayers(planet, attacker) ;
    });

    // if the defending planet has no docked fighters left
    if (getDockedFighters(foundPlanet).length === 0) {
      foundPlanet[OWNER_COMPONENT].player = getOwner(attacker);
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

    // there must be a planet here.. always.. let's leave this comment for the future :)
    let defender = getFighters(foundPlanet).find((defFighter) => {
      // kill only 'docked' fighters without destination
      return defFighter[IS_DOCKED].isDocked;
    });
    // defender can be undefined.. if the planet is out of defenders

    destroyFighter(attacker);
    defender && destroyFighter(defender);
  });
}

export default fighterAttacks;