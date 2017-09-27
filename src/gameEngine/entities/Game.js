import Entity from 'gameEngine/Entity';
import GameState from 'gameEngine/components/GameState';
import {GAME} from 'gameEngine/constants';

class Game {
  constructor() {
    let ent = new Entity(Game);
    ent.name = GAME;
    ent.addComponent(new GameState());
    return ent;
  }
}
export default Game;