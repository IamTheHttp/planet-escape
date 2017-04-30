/** @namespace entity.components.income */
import {INCOME_COMP} from 'gameEngine/constants';
class IncomeComponent{
  constructor(val = 0){
    this.name = INCOME_COMP;
    this.value = val;
  }
}

export default IncomeComponent;