import {OWNER_COMPONENT, PLAYER_0} from 'gameEngine/constants';
class OwnerComponent {
  constructor(player = PLAYER_0) {
    this.name = OWNER_COMPONENT;
    this.player = player;
    this.playerChangeTime = false; // planet never changed hands...
  }
}

export default OwnerComponent;