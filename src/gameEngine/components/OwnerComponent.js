import {OWNER_COMPONENT, NEUTRAL} from 'gameEngine/constants';
class OwnerComponent {
  constructor(player = NEUTRAL) {
    this.name = OWNER_COMPONENT;
    this.player = player;
  }
}

export default OwnerComponent;

export function getOwner(ent) {
  return ent[OWNER_COMPONENT].player;
}

export function diffPlayers(ent1, ent2) {
  return ent1[OWNER_COMPONENT].player !== ent2[OWNER_COMPONENT].player;
}

export function notNeutral(ent) {
  return ent[OWNER_COMPONENT].player !== NEUTRAL;
}