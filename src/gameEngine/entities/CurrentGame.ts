import Entity from '../../lib/ECS/Entity';
import GameState from 'gameEngine/components/GameState';
import {GAME, IN_PROGRESS} from 'gameEngine/constants';
import {BaseEntity} from "../BaseEntity";

class CurrentGame {
  constructor(numPlayers: number) {
    let ent = new BaseEntity(CurrentGame);
    ent.name = GAME;
    ent.addComponent(new GameState(IN_PROGRESS, numPlayers));
    return ent;
  }
}
export {CurrentGame}