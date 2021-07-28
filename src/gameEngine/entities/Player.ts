import Entity from '../../lib/ECS/Entity';
import {BaseEntity} from "../BaseEntity";

class Player {
  constructor() {
    return new BaseEntity(Player);
  }
}

export default Player;