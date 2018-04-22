import Entity from '../../lib/ECS/Entity';
import GameState from 'gameEngine/components/GameState';
import {GAME, IN_PROGRESS} from 'gameEngine/constants';

class CurrentGame {
  constructor(numPlayers) {
    let ent = new Entity(CurrentGame);
    ent.name = GAME;
    ent.addComponent(new GameState(IN_PROGRESS, numPlayers));
    return ent;
  }
}
export default CurrentGame;