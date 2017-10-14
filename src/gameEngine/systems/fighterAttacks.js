import Entity from 'gameEngine/Entity';
import entityLoop from 'gameEngine/systems/utils/entityLoop';
import {getFighters, destroyFighter, getDockedFighters} from 'gameEngine/components/HasFighters';
import {hasDest, isSamePos, destReached} from 'gameEngine/components/PositionComponent';
import {diffPlayers, setOwner} from 'gameEngine/components/OwnerComponent';
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
  let hits = [];
  let planets = [];

  let fighterEnts = Entity.getByComps([OWNER_COMPONENT, CAN_ATTACK_PLANETS, IS_DOCKED]);
  let planetEnts = Entity.getByComps(HAS_FIGHTERS);

  entityLoop(fighterEnts, (ent) => {
    // get all fighters that have reached their pos...
    if (!ent[IS_DOCKED].isDocked && destReached(ent)) {
      hits.push(ent);
    }
  });

  //  turning it into an array..
  entityLoop(planetEnts, (ent) => {
    planets.push(ent);
  });

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

    // if we reached a destination without a planet, boohoo, kill the fighter
    if (!foundPlanet) {
      // destroy the fighter
      destroyFighter(attacker);
      return;
    }

    // if the defending planet has no fighters left, we got it..
    // this needs to be fixed - no fighters DOCKED.
    if (getDockedFighters(foundPlanet).length === 0) {
      destroyFighter(attacker);
      foundPlanet[OWNER_COMPONENT].player = NEUTRAL;
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