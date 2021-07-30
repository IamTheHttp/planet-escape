import {ATTACKABLE} from 'gameEngine/constants';
import {Entity} from "game-platform";
class Attackable {
  public name: string;
  public isAttackable: boolean;
  constructor(bool: boolean) {
    this.name = ATTACKABLE;
    this.isAttackable = bool;
  }
}


export default Attackable;

export function isAttackable(ent: Entity) {
  // @ts-ignore TODO Update game platform so that Entity is indexable by strings.
  return ent.hasComponents(ATTACKABLE) && ent[ATTACKABLE].isAttackable;
};