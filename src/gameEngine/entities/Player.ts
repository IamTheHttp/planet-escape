import Entity from '../../lib/ECS/Entity';
import {BaseEntity} from "../BaseEntity";

class Player {
  constructor(playerName: string) {
    return new BaseEntity(Player);
  }
}

export default Player;