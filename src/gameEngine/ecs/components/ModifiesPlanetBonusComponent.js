/** @namespace entity.components.planetBonus */
import {MODS_PLANET_BONUSES} from 'gameEngine/constants';

class ModifiesPlanetBonusComponent{
  constructor(val = {}){
    this.name = MODS_PLANET_BONUSES;
    this.items = val;
  }
}

export default ModifiesPlanetBonusComponent;