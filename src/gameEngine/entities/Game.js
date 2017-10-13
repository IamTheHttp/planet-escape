import Entity from 'gameEngine/Entity';
import GameState from 'gameEngine/components/GameState';
import {GAME, IN_PROGRESS} from 'gameEngine/constants';

class Game {
  constructor() {
    let ent = new Entity(Game);
    ent.name = GAME;
    ent.addComponent(new GameState(IN_PROGRESS, 2)); // TODO 2 players
    return ent;
  }
}
export default Game;