import Entity from 'gameEngine/Entity';
import entityLoop from 'gameEngine/systems/utils/entityLoop';
import {randFromArray} from 'shared/utils';
// import Fighter from 'gameEngine/entities/Ships/Fighter';
import {notNeutral, getOwner} from 'gameEngine/components/OwnerComponent';
import {getPos, calcDistance} from 'gameEngine/components/PositionComponent';
import {attack} from 'gameEngine/systems/userInputActions/attack';
import {getDockedFighters} from 'gameEngine/components/HasFighters';
import {
  OWNER_COMPONENT,
  HAS_FIGHTERS,
  PLAYER_1,
  NEUTRAL
} from 'gameEngine/constants';


function aiAttack(attacker) {
  let entities = Entity.getByComps([OWNER_COMPONENT, HAS_FIGHTERS]);
  let defenders = entityLoop(entities, (ent) => {
    return getOwner(ent) === PLAYER_1;
  });

  // TODO - another potential AI strategy is to attack the closest planets first
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

  // TODO - how do we support more players?
  // each enemy planet makes it's own decisions, detached from the others.
  let decisionMakers = entityLoop(entities, (ent) => {
    return getOwner(ent) !== PLAYER_1 && notNeutral(ent);
  });

  // only planets with at least 10 fighters do stuff..
  // only ONE planet makes decisions per turn..
  // TODO - number of planets that make decision might also be part of difficulty
  // TODO - why 10 fighters? this is hardcoded..
  let decider = decisionMakers.find((planet) => {
    return getDockedFighters(planet).length > 5;
  });

  // we can attack.
  // we can reinforce others.
  // we can expand.
  // we can do nothing - also viable..
  if (decider) {
    // expand first, once all neutrals are taken, attack!
    aiExpand(decider); // TODO - AI should check if they can take the neutral
    aiAttack(decider); // TODO - AI should check if they have enough to attack..
    // TODO - reinforce strategy
  } else {
    return false;
  }
}



export default ai;