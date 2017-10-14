import Entity from 'gameEngine/Entity';
import entityLoop from 'gameEngine/systems/utils/entityLoop';
import {randFromArray} from 'shared/utils';
// import Fighter from 'gameEngine/entities/Ships/Fighter';
import {notNeutral, getOwner} from 'gameEngine/components/OwnerComponent';
import {getPos} from 'gameEngine/components/PositionComponent';
import {attack} from 'gameEngine/systems/userInputActions/attack';
import {
  OWNER_COMPONENT,
  HAS_FIGHTERS,
  PLAYER_1
} from 'gameEngine/constants';

function aiAttacks() {
  let entities = Entity.getByComps([OWNER_COMPONENT, HAS_FIGHTERS]);
  // let targetCandidates = Entity.getByComps([OWNER_COMPONENT, HAS_FIGHTERS])
  //
  // so each player needs to do things
  // TODO - how do we support more players?
  let attackers = entityLoop(entities, (ent) => {
    return getOwner(ent) !== PLAYER_1 && notNeutral(ent);
  });

  let defenders = entityLoop(entities, (ent) => {
    return getOwner(ent) === PLAYER_1;
  });

  // TODO - another potential AI strategy is to attack the closest planets first
  let defenderPos = getPos(randFromArray(defenders));
  let attacker = randFromArray(attackers);
  attack(defenderPos, [attacker], false); // redirect false, do not change dest of fighters
}

export default aiAttacks;