/** @namespace entity.components.consumption */
import {CONSUMPTION_COMP} from 'gameEngine/constants';

class ConsumptionComponent{
  constructor(val = {}){
    this.name = CONSUMPTION_COMP;
    this.items = val;
  }
}

export default ConsumptionComponent;