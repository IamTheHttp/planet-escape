import {GameState} from 'gameEngine/components/GameState';
import {GAME, GAME_STATE, IN_PROGRESS} from 'gameEngine/constants';
import {BaseEntity} from "../BaseEntity";

class CurrentGame {
  [GAME_STATE]: GameState;
  constructor(numPlayers: number) {
    let ent = new BaseEntity(CurrentGame);
    ent.name = GAME;
    ent.addComponent(new GameState(IN_PROGRESS, numPlayers));
    return ent;
  }
}
export {CurrentGame}