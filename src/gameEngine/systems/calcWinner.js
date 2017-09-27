import Entity from 'gameEngine/Entity';
import entityLoop from 'gameEngine/systems/utils/entityLoop';

import {OWNER_COMPONENT, PLAYER_1, NEUTRAL, GAME_WON} from 'gameEngine/constants';
function calcWinner() {
  let entities = Entity.getByComps([OWNER_COMPONENT]);

  let enemyEntitiesLeft = 0;
  entityLoop(entities, (ent) => {
    let owner = ent[OWNER_COMPONENT].player;
    let friendlies = [PLAYER_1, NEUTRAL];
    if (friendlies.indexOf(owner) === -1) {
      enemyEntitiesLeft++;
    }
  });

  // Simple lose algorithem - if no enemy entities left, we win.
  // TODO - Can this run less than every frame?git st
  if (enemyEntitiesLeft === 0) {
    return GAME_WON;
  }
}



export default calcWinner;