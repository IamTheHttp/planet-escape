import Entity from 'gameEngine/Entity';
import entityLoop from 'gameEngine/systems/utils/entityLoop';
import {getFighters, destroyFighter} from 'gameEngine/components/HasFighters';
import {hasDest, isSamePos, destReached} from 'gameEngine/components/PositionComponent';
import {diffPlayers} from 'gameEngine/components/OwnerComponent';
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
    let foundPlanet = planets.find((planet) => {
      return isSamePos(planet, attacker) && diffPlayers(planet, attacker) ;
    });

    if (!foundPlanet) {
      // destroy the fighter
      destroyFighter(attacker);
      return;
    }

    // there must be a planet here.. always.. let's leave this comment for the future :)
    let defender = getFighters(foundPlanet).find((defFighter) => {
      // kill only 'docked' fighters without destination
      return defFighter[IS_DOCKED].isDocked;
      // get the first fighter that has no position...
    });
    // defender can be undefined.. if the planet is out of defenders
    destroyFighter(attacker);
    defender && destroyFighter(defender);

    if (getFighters(foundPlanet).length === 0) {
      foundPlanet[OWNER_COMPONENT].player = NEUTRAL;
    }
  });
}

export default fighterAttacks;