import Entity from 'gameEngine/Entity';
import GameState from 'gameEngine/components/GameState';
import {GAME, IN_PROGRESS} from 'gameEngine/constants';

class Game {
  constructor(numPlayers) {
    let ent = new Entity(Game);
    ent.name = GAME;
    ent.addComponent(new GameState(IN_PROGRESS, numPlayers));
    return ent;
  }
}
export default Game;