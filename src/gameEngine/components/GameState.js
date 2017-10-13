/**
 * Created by patrik.tolosa on 27/09/2017.
 */
/** @namespace entity.components.gameStatus */
import {GAME_STATE, IN_PROGRESS} from 'gameEngine/constants';
class GameState {
  constructor(val = IN_PROGRESS, players) {
    this.name = GAME_STATE;
    this.status = val;
    this.frameID = null;
    this.players = players;
  }
}

export default GameState;