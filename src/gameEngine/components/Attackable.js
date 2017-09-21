import {ATTACKABLE} from 'gameEngine/constants';
class Attackable {
  constructor(bool) {
    this.name = ATTACKABLE;
    this.isAttackable = bool;
  }
}

export default Attackable;

export function isAttackable(ent) {
  return ent.hasComponents(ATTACKABLE) && ent[ATTACKABLE].isAttackable;
};