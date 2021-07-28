import {OWNER_COMPONENT, NEUTRAL} from 'gameEngine/constants';
import {BaseEntity} from "../BaseEntity";
class OwnerComponent {
  public name: string;
  public player: unknown;
  constructor(player = NEUTRAL) {
    this.name = OWNER_COMPONENT;
    this.player = player;
  }
}

export default OwnerComponent;

export function getOwner(ent: BaseEntity) {
  return ent[OWNER_COMPONENT].player;
}

export function diffPlayers(ent1: BaseEntity, ent2: BaseEntity) {
  return ent1[OWNER_COMPONENT].player !== ent2[OWNER_COMPONENT].player;
}

export function notNeutral(ent: BaseEntity) {
  return ent[OWNER_COMPONENT].player !== NEUTRAL;
}