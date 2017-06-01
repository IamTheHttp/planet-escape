/** @namespace entity.components.localBonus */
import {PLANETBONUS_COMP} from 'gameEngine/constants';
class PlanetBonusComponent {
  constructor() {
    this.name = PLANETBONUS_COMP;
    this.bonuses = {};
    this.mod = {};
  }
}

export default PlanetBonusComponent;