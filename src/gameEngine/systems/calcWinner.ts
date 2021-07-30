import {isAttackable} from 'gameEngine/components/Attackable';
import {ATTACKABLE, OWNER_COMPONENT, PLAYER_1, NEUTRAL, GAME_WON, GAME_LOST} from 'gameEngine/constants';
import {BaseEntity} from "../BaseEntity";
import {Entity, entityLoop} from "game-platform";
function calcWinner() {
  let entities = Entity.getByComps([ATTACKABLE, OWNER_COMPONENT]);
  let enemyEntitiesLeft = 0;
  let playerEntsLeft = 0;

  entityLoop(entities, (ent: BaseEntity) => {
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
  if (enemyEntitiesLeft === 0) {
    return GAME_WON;
  }

  if (playerEntsLeft === 0) {
    return GAME_LOST;
  }
}



export default calcWinner;