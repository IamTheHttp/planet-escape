/** @namespace entity.components.localBonus */
import {LOCALBONUS_COMP} from 'gameEngine/constants';
class LocalBonusComponent{
  constructor(){
    this.name = LOCALBONUS_COMP;
    this.bonuses = {};
    this.mod = {};
  }
}

export default LocalBonusComponent;