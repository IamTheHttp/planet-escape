import Entity from 'gameEngine/Entity';
import entityLoop from 'gameEngine/systems/utils/entityLoop';
import {getFighters, destroyFighter} from 'gameEngine/components/HasFighters';
import {hasDest, isSamePos, destReached} from 'gameEngine/components/PositionComponent';
import {
  OWNER_COMPONENT,
  CAN_ATTACK_PLANETS,
  POSITION,
  HAS_FIGHTERS,
  NEUTRAL,
  IS_DOCKED
} from 'gameEngine/constants';

function fighterAttacks(entities) {
  let hits = [];
  let planets = [];

  entityLoop(entities,(ent) => {
    ent.hasComponents([OWNER_COMPONENT,CAN_ATTACK_PLANETS,IS_DOCKED],() => {
      // get all fighters that have reached their pos...
      if (!ent[IS_DOCKED].isDocked && destReached(ent)) {
        hits.push(ent);
      }
    });

    ent.hasComponents(HAS_FIGHTERS, () => {
      planets.push(ent);
    });
  });

  hits.forEach((attacker) => {
    let foundPlanet = planets.find((planet) => {
      return isSamePos(planet,attacker);
    });

    // there must be a planet here.. always.. let's leave this comment for the future :)
    let defender = getFighters(foundPlanet).find((defFighter) => {
      // kill only 'docked' fighters without destination
      return defFighter[IS_DOCKED].isDocked;
      // get the first fighter that has no position...
    });
    // defender can be undefined.. if the planet is out of defenders
    attacker && destroyFighter(attacker);
    defender && destroyFighter(defender);

    if (getFighters(foundPlanet).length === 0) {
      foundPlanet[OWNER_COMPONENT].player = NEUTRAL;
    }
  });
}

export default fighterAttacks;