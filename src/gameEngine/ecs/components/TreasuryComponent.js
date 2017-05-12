/** @namespace entity.components.localBonus */
import {TREASURY_COMP,GOLD_RESOURCE} from 'gameEngine/constants';
class TreasuryComponent{
  constructor(){
    this.name = TREASURY_COMP;
    this.items = {
      [GOLD_RESOURCE] : 0
    };
  }
}

export default TreasuryComponent;