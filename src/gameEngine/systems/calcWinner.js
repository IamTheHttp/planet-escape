import Entity from 'gameEngine/Entity';
import entityLoop from 'gameEngine/systems/utils/entityLoop';
import {isAttackable} from 'gameEngine/components/Attackable';
import {OWNER_COMPONENT, PLAYER_1, NEUTRAL, GAME_WON, GAME_LOST} from 'gameEngine/constants';
function calcWinner() {
  let entities = Entity.getByComps([OWNER_COMPONENT]);

  let enemyEntitiesLeft = 0;
  let playerEntsLeft = 0;
  // TODO - PERF -  This should be cached somehow, no reason to go over it all the time
  entityLoop(entities, (ent) => {
    let owner = ent[OWNER_COMPONENT].player;
    let friendlies = [PLAYER_1, NEUTRAL];

    // only attackable ents count to winning condition
    if (isAttackable(ent)) {
      if (friendlies.indexOf(owner) === -1) {
        enemyEntitiesLeft++;
      }

      if ([PLAYER_1].indexOf(owner) > -1) {
        playerEntsLeft++;
      }
    }
  });

  // Simple lose algorithem - if no enemy entities left, we win.
  // TODO - Can this run less than every frame?
  if (enemyEntitiesLeft === 0) {
    return GAME_WON;
  }

  if (playerEntsLeft === 0) {
    return GAME_LOST;
  }
}



export default calcWinner;