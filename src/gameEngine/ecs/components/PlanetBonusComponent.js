/** @namespace entity.components.planetBonus */
import {PLANETBONUS_COMP} from 'gameEngine/constants';

class PlanetBonusComponent{
  constructor(val = {}){
    this.name = PLANETBONUS_COMP;
    this.items = val;
  }
}

export default PlanetBonusComponent;