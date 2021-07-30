/**
 * Created by patrik.tolosa on 27/09/2017.
 */
/** @namespace entity.components.gameStatus */
import {GAME_STATE, IN_PROGRESS} from 'gameEngine/constants';

export class GameState {
  public name: string;
  public frameID: number;
  public status: unknown;
  public players: number;


  constructor(val: unknown = IN_PROGRESS, numPlayers: number) {
    this.name = GAME_STATE;
    this.status = val;
    this.frameID = null;
    this.players = numPlayers;
  }
}
