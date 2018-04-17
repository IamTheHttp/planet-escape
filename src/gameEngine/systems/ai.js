import Entity from 'gameEngine/Entity';
import entityLoop from 'gameEngine/systems/utils/entityLoop';
import {randFromArray} from 'shared/utils';
// import Fighter from 'gameEngine/entities/Ships/Fighter';
import {notNeutral, getOwner} from 'gameEngine/components/OwnerComponent';
import {getPos, calcDistance} from 'gameEngine/components/PositionComponent';
import {attack} from 'gameEngine/systems/userInputActions/attack';
import {getDefendingFighters} from 'gameEngine/components/HasFighters';
import {
  OWNER_COMPONENT,
  HAS_FIGHTERS,
  PLAYER_1,
  NEUTRAL,
  AI_MIN_FIGHTERS
} from 'gameEngine/constants';

import gameConfig from 'gameEngine/config';

function aiAttack(attacker) {
  let entities = Entity.getByComps([OWNER_COMPONENT, HAS_FIGHTERS]);
  let defenders = entityLoop(entities, (ent) => {
    return getOwner(ent) === PLAYER_1;
  });

  let defenderPos = getPos(randFromArray(defenders));
  attack(defenderPos, [attacker], false); // redirect false, do not change dest of fighters
}

function aiExpand(expander) {
  let entities = Entity.getByComps([OWNER_COMPONENT, HAS_FIGHTERS]);
  let neutrals = entityLoop(entities, (ent) => {
    return getOwner(ent) === NEUTRAL;
  });

  let cd = calcDistance;
  if (neutrals.length > 0) {
    // get the one closest to us..
    let expandToPlanet = neutrals.reduce((lastPlanet, currentPlanet) => {
      return cd(expander, lastPlanet) < cd(expander, currentPlanet) ? lastPlanet : currentPlanet;
    });

    attack(getPos(expandToPlanet), [expander], false); // redirect false, do not change dest of fighters
  }
}

function ai() {
  let entities = Entity.getByComps([OWNER_COMPONENT, HAS_FIGHTERS]);
  // let targetCandidates = Entity.getByComps([OWNER_COMPONENT, HAS_FIGHTERS])

  // each enemy planet makes it's own decisions, detached from the others.
  let decisionMakers = entityLoop(entities, (ent) => {
    return getOwner(ent) !== PLAYER_1 && notNeutral(ent);
  });

  // only planets with at least AI_MIN_FIGHTERS fighters do stuff..
  // only ONE planet makes decisions per turn..
  let decider = decisionMakers.find((planet) => {
    return getDefendingFighters(planet).length > gameConfig[AI_MIN_FIGHTERS];
  });

  // we can attack.
  // we can reinforce others.
  // we can expand.
  // we can do nothing - also viable..
  if (decider) {
    // expand first, once all neutrals are taken, attack!
    aiExpand(decider);
    aiAttack(decider);
  } else {
    return false;
  }
}



export default ai;