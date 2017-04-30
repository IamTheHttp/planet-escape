/** @namespace entity.components.costs */
import {COSTS_COMP} from 'gameEngine/constants';
class CostsComponent{
  constructor(val = {}){
    this.name = COSTS_COMP;
    this.items = val;
  }
}

export default CostsComponent;