import Entity from '../../lib/ECS/Entity';
import entityLoop from '../../lib/ECS/util/entityLoop';
import {
  getFighters,
  destroyFighter,
  getDefendingFighters,
  detachFighterFromPlanet
} from 'gameEngine/components/HasFighters';
import {unSelect} from 'gameEngine/components/PlayerControlledComponent';
import Explosion from 'gameEngine/components/Explosion';
import {hasDest, isSamePos, destReached} from 'gameEngine/components/PositionComponent';
import {diffPlayers, getOwner} from 'gameEngine/components/OwnerComponent';
import Fighter from 'gameEngine/entities/Ships/Fighter';

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

function fighterAttacks() {
  let hits = Entity.getByComps([OWNER_COMPONENT, CAN_ATTACK_PLANETS, IN_PLACE_TO_ATTACK]);
  let planets = Entity.getByComps(HAS_FIGHTERS, 'array');

  hits.forEach((attacker) => {
    // first lets detect if we just 'hit' a friendly planet
    let friendlyPlanet = planets.find((planet) => {
      return isSamePos(planet, attacker) && !diffPlayers(planet, attacker);
    });

    // if we reached a friendly planet
    // let's join that planet!
    if (friendlyPlanet) {
      // destroy this fighter, and create a new one..
      // this prevents us from needing to remove the fighter from it's current list..
      // though it might be 'better', this is much easier.
      new Fighter(friendlyPlanet);
      destroyFighter(attacker);
    } else {
      let foundPlanet = planets.find((planet) => {
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