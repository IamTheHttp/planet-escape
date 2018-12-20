import Entity from '../../lib/ECS/Entity';

class Player {
  constructor() {
    let ent = new Entity(Player);
    return ent;
  }
}

export default Player;